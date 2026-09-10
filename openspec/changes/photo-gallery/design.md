# Design: Photo Gallery with Upload & Moderation

## Context

The wedding site currently uses:
- Next.js 16 App Router with server actions pattern (see `src/serverActions/rsvp/` for existing patterns)
- MUI components for UI (established in NavBar, RSVP forms)
- Formik + Zod for form validation (RSVP forms)
- `output: 'standalone'` deployment to Cloud Run (no Next.js image optimization)
- Stateless Next.js layer - no local database (RSVP data lives in WEDDING_BACKEND)

The `/about-us/add-your-pictures` route exists as an empty placeholder. This feature is self-contained and does not interact with the WEDDING_BACKEND - all data lives in Cloudinary.

See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Enable guest photo/video uploads without requiring authentication
- Provide admin moderation before content goes live
- Responsive gallery that works well on mobile and desktop
- Leverage Cloudinary for all media processing (no server-side image manipulation)
- Keep Next.js layer stateless (no database dependency)

**Non-Goals:**
- User authentication for uploads (guests upload anonymously with name input)
- Robust admin authentication system (simple PIN is sufficient for wedding context)
- Advanced gallery features (search, filtering by date, albums)
- Real-time updates (manual refresh acceptable)
- Video editing or advanced processing

## Decisions

### Decision 1: Cloudinary as Single Source of Truth

**Choice:** Use Cloudinary metadata (tags + context fields) to store all photo data, avoiding a separate database.

**Rationale:**
- Next.js deployment is stateless (`output: 'standalone'`) on Cloud Run
- Adding database (Cloud SQL, Firestore) adds operational complexity for a single feature
- Cloudinary already stores media files; extending it to store metadata keeps architecture simple
- Moderation workflow maps cleanly to tag changes: `pending` → `approved` / `rejected`

**Alternatives Considered:**
- **SQLite in container**: Lost on container restart, not suitable for production
- **Cloud SQL**: Adds cost and operational overhead for minimal metadata
- **Firestore**: Good fit for GCP ecosystem but unnecessary for simple tag-based moderation

**Trade-off:** Cloudinary Search API has query limitations vs. full database, but acceptable for wedding gallery scale (<1000 photos expected).

### Decision 2: Direct Browser Upload with Signed URLs

**Choice:** Generate upload signature server-side, upload directly from browser to Cloudinary (not proxied through Next.js).

**Rationale:**
- Avoids Next.js server handling large file uploads (especially videos up to 100MB)
- Reduces Cloud Run bandwidth costs and request timeout risks
- Cloudinary handles format conversion (HEIC → WebP), no need for Sharp processing
- Signed uploads maintain security (API secret never exposed to browser)

**Alternatives Considered:**
- **Server-side upload via Next.js**: Would require handling large files in server actions, potential timeouts
- **Unsigned uploads**: Less secure, anyone with cloud name could upload

**Implementation:**
```typescript
// Server action generates signature
async function generateUploadSignature() {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, upload_preset: 'wedding_photos' },
    process.env.CLOUDINARY_API_SECRET
  );
  return { signature, timestamp, api_key, cloud_name };
}

// Browser uploads directly
const formData = new FormData();
formData.append('file', file);
formData.append('signature', sig.signature);
// ... other params
await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
  method: 'POST',
  body: formData
});
```

### Decision 3: Eliminate Sharp from Architecture

**Choice:** Do not use Sharp library; rely entirely on Cloudinary for image/video processing.

**Rationale:**
- Cloudinary upload presets handle format conversion (HEIC → WebP/AVIF)
- Cloudinary transformations handle resizing (max 1920x1080)
- Sharp only works server-side (Node.js), not in browser for client-side compression
- Cloudinary's video transcoding is more robust than any Node.js solution

**Sharp was initially considered for:**
- Pre-upload compression → Browser Canvas API could do this, but adds complexity with minimal benefit
- HEIC conversion → Cloudinary handles automatically
- Server-side processing → Not needed with direct uploads

**Trade-off:** Large file uploads consume more bandwidth, mitigated by client-side validation (20MB images, 100MB videos) and Cloudinary's optimization.

### Decision 4: Responsive Gallery Layout Strategy

**Choice:**
- Desktop (>768px): Justified grid layout (react-photo-gallery or similar)
- Mobile (≤768px): Single-column square crops

**Rationale:**
- Justified grid shows full images without cropping, better for varied aspect ratios
- Mobile square crops create visual consistency on small screens (Instagram pattern)
- Cloudinary transformations handle both: `c_limit` for justified, `c_fill` for squares
- Different layouts optimize for viewport constraints

**Implementation:**
```typescript
// Desktop: maintain aspect ratio
const desktopUrl = `${baseUrl}/w_auto,c_limit,q_auto,f_auto/${publicId}`;

// Mobile: square crop with smart gravity
const mobileUrl = `${baseUrl}/w_400,h_400,c_fill,g_auto,q_auto/${publicId}`;
```

**Alternatives Considered:**
- **Same layout both viewports**: Compromises either mobile UX (tiny images in grid) or desktop (cropped images)
- **Masonry layout**: Harder to implement, less predictable UX

### Decision 5: Admin PIN Authentication

**Choice:** Simple 6-digit PIN stored in environment variable, no session management.

**Rationale:**
- Wedding context: moderation is temporary need (not long-term production app)
- Low security threat model (worst case: someone approves/rejects photos)
- Avoids adding auth infrastructure (NextAuth, session storage)
- PIN validation is server-side (server action checks env var)

**Implementation:**
```typescript
// Server action
async function verifyAdminPin(pin: string): Promise<boolean> {
  return pin === process.env.ADMIN_PIN;
}
```

**Trade-off:** No protection against brute force, but acceptable for temporary wedding site. Could add rate limiting if needed.

### Decision 6: Toast Notifications for Upload Feedback

**Choice:** Use react-toastify with MUI progress bars for upload status.

**Rationale:**
- Non-blocking UI (users can navigate while uploads continue)
- react-toastify is lightweight, established library
- MUI progress bars match existing design system (NavBar, RSVP forms use MUI)
- Supports stacking multiple toasts for multi-file uploads

**Alternatives Considered:**
- **Inline progress indicators**: Blocks UI, less flexible
- **MUI Snackbar**: More limited than react-toastify for stacking and progress display

### Decision 7: Random Gallery Order Implementation

**Choice:** Fetch all approved items, shuffle client-side, implement infinite scroll by slicing the shuffled array.

**Rationale:**
- Cloudinary Search API doesn't support random sorting
- Expected scale (<500 photos) makes client-side shuffle acceptable
- Maintains consistent random order during session (better UX than re-shuffling on each fetch)

**Alternatives Considered:**
- **Server-side random with caching**: Adds complexity, stateless deployment makes caching harder
- **True random per page**: Disrupts UX (same photo appears multiple times while scrolling)

**Trade-off:** Won't scale beyond ~1000 items (too much data to fetch upfront), but sufficient for wedding gallery.

### Decision 8: Cloudinary Upload Preset Configuration

**Choice:** Require manual upload preset creation in Cloudinary dashboard (not automated).

**Rationale:**
- Cloudinary doesn't provide stable API for preset creation
- Preset configuration is one-time setup task
- Manual configuration ensures proper settings (transformations, tagging, folder)

**Required Preset Settings:**
```yaml
Name: wedding_photos
Signing mode: Signed
Folder: wedding-gallery
Allowed formats: jpg, png, gif, heic, heif, webp, mp4, mov, avi
Eager transformations:
  - w_1920,h_1080,c_limit,q_auto,f_auto (images)
  - w_1920,h_1080,c_limit,q_auto,vc_auto (videos)
Auto tagging: wedding-photos, pending
Video thumbnails: Enabled
```

## Risks / Trade-offs

### Risk: Cloudinary API Rate Limits
- **Mitigation:** Free tier supports 2,500 transformations/month; wedding gallery unlikely to exceed. Monitor usage in dashboard.

### Risk: Large Video Uploads on Slow Connections
- **Mitigation:** Client-side validation enforces 100MB limit. Upload progress bar gives feedback. User can close tab and uploads continue to Cloudinary.

### Risk: No Video Processing Feedback
- **Mitigation:** Cloudinary transcodes videos asynchronously. Thumbnail appears in moderation interface once processing completes (usually <1 minute).

### Risk: Cloudinary Search API Performance
- **Mitigation:** For initial launch, fetch all approved items is acceptable. If gallery grows beyond 1000 items, implement server-side pagination with cursor-based fetching.

### Risk: Admin PIN Brute Force
- **Mitigation:** Low threat model for wedding context. Could add simple rate limiting (3 attempts per IP per minute) if needed.

### Risk: Missing Environment Variables
- **Mitigation:** Server actions check for required env vars and fail gracefully with clear error messages. Document setup in README/deployment guide.

### Trade-off: Client-Side Shuffle Doesn't Scale
- **Accepted:** For wedding gallery scope (<500 photos), fetching all items upfront is acceptable. If needed later, can implement server-side random sampling.

### Trade-off: No Real-Time Moderation Updates
- **Accepted:** Admin must manually refresh pending photos page to see new uploads. Acceptable for wedding use case (moderation happens in batches, not continuously).

## Migration Plan

### Phase 1: Cloudinary Setup
1. Create Cloudinary account (if not exists)
2. Configure upload preset "wedding_photos" with specifications above
3. Add environment variables to .env.local (dev) and Cloud Run (production)
4. Test upload signature generation

### Phase 2: Core Upload Implementation
1. Install dependencies: `cloudinary`, `react-toastify`, `react-photo-gallery`
2. Create Cloudinary SDK config file
3. Implement `generateUploadSignature` server action
4. Build `PhotoUploadForm` component
5. Test file upload flow (dev environment uploads to Cloudinary)

### Phase 3: Gallery Display
1. Implement `listApprovedPhotos` server action
2. Build `PhotoGallery` component with responsive layouts
3. Add infinite scroll with intersection observer
4. Test on mobile and desktop viewports

### Phase 4: Moderation Interface
1. Implement PIN verification server action
2. Build admin PIN entry form
3. Implement `listPendingPhotos` and `moderatePhoto` server actions
4. Build pending photo cards with approve/reject buttons
5. Test full moderation flow (upload → review → approve → appears in gallery)

### Phase 5: Video Support
1. Add video player modal component
2. Implement Cloudinary video thumbnail URLs
3. Test video upload and playback

### Phase 6: Polish
1. Add error handling and edge cases
2. Implement empty states (no photos yet, loading errors)
3. Test error scenarios (network failures, invalid files)
4. Verify toast notifications work as expected

### Rollback Strategy
- Feature is isolated to `/about-us/add-your-pictures` route
- No database migrations or data dependencies
- Rollback: revert route to empty placeholder, data remains in Cloudinary
- Can disable uploads by removing Cloudinary env vars (breaks upload, but gallery still works for existing approved items)

## Open Questions

### Q1: Should video modal support keyboard navigation (arrow keys for next/previous)?
- **Deferrable:** Can add in polish phase if time permits. Not essential for MVP.

### Q2: Should there be a "Report" button in gallery for inappropriate content?
- **Deferrable:** Low risk for wedding guest context. Can add if needed post-launch.

### Q3: Should admin interface show rejected photos separately or hide them completely?
- **Decision needed before tasks:** Determines if we need separate query for rejected items.
- **Recommendation:** Hide rejected items completely (simpler), admin can view in Cloudinary dashboard if needed.
