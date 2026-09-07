# Tasks: Photo Gallery Implementation

## 1. Dependencies and Environment Setup

- [x] 1.1 Install required npm packages: `cloudinary`, `react-toastify`, `react-photo-gallery` (or `react-justified-grid`) and verify they appear in package.json
- [x] 1.2 Add environment variables to .env.example: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_UPLOAD_PRESET, ADMIN_PIN
- [x] 1.3 Configure local .env.local with TODO placeholders for Cloudinary credentials and verify environment variables are accessible in dev server
- [ ] 1.4 Create Cloudinary upload preset "wedding_photos" in dashboard with specified settings (see design.md) and verify preset name appears in settings (MANUAL STEP - user must configure in Cloudinary dashboard)
- [x] 1.5 Update .env.production and .env.development with TODO comments for production Cloudinary configuration

## 2. TypeScript Types and Constants

- [x] 2.1 Create `src/types/media.ts` with MediaType, MediaItem, UploadSignature, and ModerationAction types and verify TypeScript compilation succeeds
- [x] 2.2 Add file validation constants (MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES) to media.ts and verify types are importable in other files

## 3. Cloudinary SDK Configuration

- [x] 3.1 Create `src/serverActions/photos/cloudinary.ts` with Cloudinary v2 SDK initialization using environment variables and verify import doesn't throw errors
- [x] 3.2 Add helper functions for URL transformations (getJustifiedImageUrl, getSquareThumbnailUrl, getVideoThumbnailUrl, getLightboxUrl) and verify generated URLs match expected Cloudinary format
- [x] 3.3 Export configured cloudinary client for use in other server actions and verify import works in a test file

## 4. Upload Server Actions

- [x] 4.1 Implement `src/serverActions/photos/generateUploadSignature.ts` that creates signed upload params and verify it returns signature, timestamp, api_key, cloud_name
- [x] 4.2 Add error handling for missing environment variables in generateUploadSignature and verify appropriate error message when CLOUDINARY_API_SECRET is missing
- [x] 4.3 Add 'use server' directive and export generateUploadSignature as server action and verify it's callable from client components

## 5. Upload Form Component

- [x] 5.1 Create `src/components/gallery/PhotoUploadForm.tsx` with file input, caption field, submitter name field, and upload button using MUI components
- [x] 5.2 Implement client-side file validation (validateFile function) for file types and sizes and verify validation error messages appear for invalid files
- [x] 5.3 Add multi-file selection support and display selected files list with file names and sizes
- [x] 5.4 Integrate react-toastify ToastContainer and configure toast styling to match MUI theme
- [x] 5.5 Implement upload handler that calls generateUploadSignature, then uploads each file directly to Cloudinary with progress tracking
- [x] 5.6 Add MUI LinearProgress in toast notifications for each uploading file and verify progress bar updates during upload
- [x] 5.7 Handle upload success by showing success toast and clearing form fields
- [x] 5.8 Handle upload errors by showing error toasts with specific error messages and verify error handling for network failures
- [x] 5.9 Ensure uploaded files include context metadata (caption, submitter) and tags (wedding-photos, pending) and verify in Cloudinary dashboard after test upload

## 6. Gallery Display Server Actions

- [x] 6.1 Implement `src/serverActions/photos/listApprovedPhotos.ts` using Cloudinary Admin API to search for tags=["approved"] and verify it returns array of MediaItem objects
- [x] 6.2 Add cursor-based pagination support with next_cursor return value and verify subsequent fetches continue from cursor
- [x] 6.3 Add error handling for Cloudinary API failures and log errors to console with clear messages
- [x] 6.4 Implement client-side shuffle logic for random gallery order and verify photos appear in different order on each page load

## 7. Gallery Display Components

- [x] 7.1 Create `src/components/gallery/MediaCard.tsx` to render individual photo/video with thumbnail, caption, and submitter name
- [x] 7.2 Add responsive image rendering using Cloudinary transformation URLs (desktop: justified, mobile: square crop) and verify correct URLs at different viewport sizes
- [x] 7.3 Add video thumbnail rendering with play button overlay icon and duration display
- [x] 7.4 Create `src/components/gallery/VideoPlayer.tsx` modal component with MUI Dialog and native HTML5 video player
- [x] 7.5 Implement video modal open/close handlers and verify video plays when modal opens and stops when closed
- [x] 7.6 Create `src/components/gallery/PhotoGallery.tsx` with react-photo-gallery justified grid layout for desktop
- [x] 7.7 Add responsive CSS to switch to single-column layout on mobile (≤768px) with square-cropped images
- [x] 7.8 Implement infinite scroll using Intersection Observer that triggers listApprovedPhotos when near bottom and verify additional items load on scroll
- [x] 7.9 Add loading states (initial load spinner, infinite scroll loading indicator at bottom)
- [x] 7.10 Add empty state UI "No photos yet. Be the first to share!" when no approved photos exist and verify display when gallery is empty
- [x] 7.11 Add error state UI with retry button when gallery fetch fails and verify display by simulating API failure

## 8. Main Gallery Page

- [x] 8.1 Update `src/app/about-us/add-your-pictures/page.tsx` to render PhotoUploadForm and PhotoGallery components
- [x] 8.2 Add page heading and description text explaining the photo gallery feature
- [ ] 8.3 Verify complete upload-to-display flow: upload photo → see it in Cloudinary with "pending" tag → manually approve in dashboard → see it appear in gallery

## 9. Admin PIN Authentication

- [x] 9.1 Create `src/serverActions/photos/verifyAdminPin.ts` server action that compares input PIN against ADMIN_PIN environment variable and verify returns boolean
- [x] 9.2 Create `src/components/admin/PinAuth.tsx` component with 6-digit PIN input using MUI TextField
- [x] 9.3 Add PIN submission handler that calls verifyAdminPin and shows error toast on incorrect PIN
- [x] 9.4 Add success state that grants access to moderation interface on correct PIN and verify authentication flow

## 10. Moderation Server Actions

- [x] 10.1 Implement `src/serverActions/photos/listPendingPhotos.ts` using Cloudinary Admin API to search for tags=["pending"] and verify returns pending MediaItem array
- [x] 10.2 Implement `src/serverActions/photos/moderatePhoto.ts` that updates tags using Cloudinary Admin API explicit() method and verify tag changes from "pending" to "approved" or "rejected"
- [x] 10.3 Add error handling for moderation failures and return error messages to client
- [ ] 10.4 Verify moderation actions by checking Cloudinary dashboard for updated tags after test approve/reject

## 11. Admin Moderation Components

- [x] 11.1 Create `src/components/admin/PendingMediaCard.tsx` with thumbnail, caption, submitter, timestamp, and Approve/Reject buttons
- [x] 11.2 Add video duration display for video thumbnails in pending cards
- [x] 11.3 Implement approve handler that calls moderatePhoto('approve') and removes item from list on success
- [x] 11.4 Implement reject handler that calls moderatePhoto('reject') and removes item from list on success
- [x] 11.5 Add error toasts for failed moderation actions and verify error messages display correctly
- [x] 11.6 Add optimistic UI updates that remove card immediately with rollback on error

## 12. Admin Moderation Page

- [x] 12.1 Create `src/app/admin/pending-photos/page.tsx` with PIN authentication gate using PinAuth component
- [x] 12.2 After PIN verification, fetch and display pending items using listPendingPhotos and render PendingMediaCard for each item
- [x] 12.3 Add grid layout for pending items using MUI Grid and verify responsive layout on desktop and mobile
- [x] 12.4 Display pending item count in page heading and verify count updates after approve/reject actions
- [x] 12.5 Add empty state "No pending items to review" when no pending uploads exist
- [ ] 12.6 Verify complete moderation flow: upload photo → see in pending list → approve → see in public gallery

## 13. Error Handling and Edge Cases

- [ ] 13.1 Add error boundary or error handling for missing Cloudinary environment variables and verify clear error message in console
- [ ] 13.2 Handle network timeout errors in upload flow and display user-friendly timeout message
- [ ] 13.3 Handle invalid Cloudinary credentials gracefully and log authentication errors
- [ ] 13.4 Test file size limit enforcement (20MB images, 100MB videos) and verify rejection messages
- [ ] 13.5 Test invalid file type rejection (PDF, .txt, etc.) and verify error messages
- [ ] 13.6 Test multi-file upload with mixed success/failure scenarios and verify partial success handling

## 14. Video Support Testing

- [ ] 14.1 Test video upload (MP4, MOV) and verify successful upload to Cloudinary
- [ ] 14.2 Verify Cloudinary auto-generates video thumbnails and thumbnails appear in gallery and moderation interface
- [ ] 14.3 Test video playback in modal and verify video controls (play, pause, seek, volume) work correctly
- [ ] 14.4 Test video modal keyboard controls (Escape to close) and verify modal closes on ESC key
- [ ] 14.5 Verify video streaming URL optimization and video plays smoothly without full download

## 15. Responsive Design Testing

- [ ] 15.1 Test gallery layout on desktop (>768px) and verify justified grid maintains aspect ratios
- [ ] 15.2 Test gallery layout on mobile (≤768px) and verify single-column square-cropped layout
- [ ] 15.3 Test upload form on mobile and verify usable file selection and input fields
- [ ] 15.4 Test moderation interface on mobile and verify thumbnails and buttons are accessible
- [ ] 15.5 Test video modal on mobile and verify full-screen video playback works

## 16. Integration Testing

- [ ] 16.1 Complete end-to-end test: guest uploads photo with caption → admin sees in pending → admin approves → photo appears in public gallery
- [ ] 16.2 Complete end-to-end test: guest uploads video → admin sees with thumbnail → admin approves → video appears in gallery with play button
- [ ] 16.3 Test reject workflow: upload photo → admin rejects → photo does not appear in gallery
- [ ] 16.4 Test multiple simultaneous uploads and verify all files upload in parallel with individual progress tracking
- [ ] 16.5 Test infinite scroll with 30+ approved photos and verify smooth pagination and no duplicates
- [ ] 16.6 Test random gallery order by refreshing page multiple times and verify different order each time

## 17. Documentation and Deployment Prep

- [x] 17.1 Document Cloudinary setup steps in README or deployment guide with upload preset configuration details
- [x] 17.2 Document required environment variables and their purpose in .env.example
- [ ] 17.3 Add TODO comments in code where Cloudinary credentials need to be configured
- [ ] 17.4 Verify all environment variables are configured in production deployment (.env.production)
- [x] 17.5 Test production build with `npm run build` and verify no TypeScript or build errors

## 18. Final Polish

- [ ] 18.1 Review all toast notification messages for clarity and consistency
- [ ] 18.2 Review loading states and ensure spinners/skeletons appear during all async operations
- [ ] 18.3 Verify all MUI component styling matches existing wedding site theme
- [ ] 18.4 Test with real HEIC images from iPhone and verify automatic conversion works
- [ ] 18.5 Performance test: verify gallery with 100+ images loads efficiently with lazy loading
- [ ] 18.6 Accessibility check: verify keyboard navigation works for upload form, gallery, and moderation interface
