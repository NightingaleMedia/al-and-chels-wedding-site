# Proposal: Photo Gallery with Upload & Moderation

## Why

Wedding guests want to share their favorite photos and videos of Chelsea and Al, but we currently have no way to collect and display user-generated content. The `/about-us/add-your-pictures` route exists as an empty placeholder. We need a complete photo gallery feature with upload capabilities and moderation controls to ensure quality content before it goes live.

## What Changes

- **New**: Multi-file upload form supporting images (JPG, PNG, GIF, HEIC, WebP) and videos (MP4, MOV, AVI)
- **New**: Direct upload to Cloudinary with automatic format conversion and optimization
- **New**: Public gallery displaying approved photos/videos with responsive layouts
  - Desktop: Justified grid (Google Photos style) maintaining aspect ratios
  - Mobile: Single-column Instagram-style square crops
- **New**: Admin moderation interface at `/admin/pending-photos` protected by 6-digit PIN
- **New**: Upload progress feedback using MUI progress bars in toast notifications
- **New**: Video playback with thumbnails and play button overlays
- **New**: Infinite scroll pagination for gallery
- **New**: Cloudinary-based metadata storage using tags and context fields

## Capabilities

### New Capabilities

- `photo-gallery/upload`: User upload flow for photos and videos with caption and submitter name
- `photo-gallery/moderation`: Admin review and approval/rejection of pending uploads
- `photo-gallery/display`: Public gallery view with responsive layouts and infinite scroll
- `photo-gallery/cloudinary-integration`: Cloudinary SDK setup, signed uploads, and transformations

### Modified Capabilities

<!-- No existing capabilities are being modified - this is entirely new functionality -->

## Impact

### New Dependencies
- `cloudinary` - Node SDK for Cloudinary API operations
- `react-toastify` - Toast notifications for upload progress and errors
- `react-photo-gallery` or similar - Justified grid layout for desktop gallery

### New Environment Variables
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary account identifier
- `CLOUDINARY_API_KEY` - API key for signed uploads
- `CLOUDINARY_API_SECRET` - Secret for generating upload signatures
- `CLOUDINARY_UPLOAD_PRESET` - Upload preset name (must be created in Cloudinary dashboard)
- `ADMIN_PIN` - 6-digit PIN for admin moderation access

### New Routes
- `/about-us/add-your-pictures` - Public upload form + gallery (currently empty placeholder)
- `/admin/pending-photos` - Admin moderation interface (new)

### Affected Components
- `src/app/about-us/add-your-pictures/page.tsx` - Transform from empty placeholder to full feature

### New Files
- `src/components/gallery/PhotoUploadForm.tsx`
- `src/components/gallery/PhotoGallery.tsx`
- `src/components/gallery/MediaCard.tsx`
- `src/components/gallery/VideoPlayer.tsx`
- `src/components/admin/PinAuth.tsx`
- `src/components/admin/PendingMediaCard.tsx`
- `src/serverActions/photos/generateUploadSignature.ts`
- `src/serverActions/photos/listPendingPhotos.ts`
- `src/serverActions/photos/moderatePhoto.ts`
- `src/serverActions/photos/listApprovedPhotos.ts`
- `src/serverActions/photos/verifyAdminPin.ts`
- `src/serverActions/photos/cloudinary.ts`
- `src/types/media.ts`

### External Setup Required
- Cloudinary account configuration
- Upload preset creation in Cloudinary dashboard with transformations and tagging rules
- Environment variable configuration across dev/production environments

### Architecture Notes
- **No Sharp processing needed** - Cloudinary handles all format conversion (HEIC, etc.) and optimization
- **No WEDDING_BACKEND involvement** - Entirely handled in Next.js BFF layer
- **Cloudinary as source of truth** - Metadata stored in Cloudinary tags and context fields
- **Stateless Next.js deployment** - No local database required
