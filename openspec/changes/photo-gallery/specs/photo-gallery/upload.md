# Spec: photo-gallery/upload

## Purpose

Enables wedding guests to upload photos and videos with captions and submitter information for sharing memories of Chelsea and Al.

## ADDED Requirements

### Requirement: User can upload images and videos

The system SHALL accept image files (JPEG, PNG, GIF, HEIC, HEIF, WebP) and video files (MP4, MOV, AVI) from users.

#### Scenario: Valid image upload
- **WHEN** user selects a JPEG image file under 20MB
- **THEN** system accepts the file and initiates upload to Cloudinary

#### Scenario: Valid video upload
- **WHEN** user selects an MP4 video file under 100MB
- **THEN** system accepts the file and initiates upload to Cloudinary

#### Scenario: HEIC format conversion
- **WHEN** user uploads an HEIC image from iPhone
- **THEN** system accepts the file and Cloudinary converts it to web-compatible formats

#### Scenario: Invalid file type rejection
- **WHEN** user selects a PDF or non-media file
- **THEN** system displays error message "Invalid file type. Please upload images or videos."

#### Scenario: Image exceeds size limit
- **WHEN** user selects an image file over 20MB
- **THEN** system displays error message "File too large. Max 20MB for images, 100MB for videos."

#### Scenario: Video exceeds size limit
- **WHEN** user selects a video file over 100MB
- **THEN** system displays error message "File too large. Max 20MB for images, 100MB for videos."

### Requirement: User can upload multiple files simultaneously

The system SHALL support selecting and uploading multiple files in a single operation.

#### Scenario: Multiple file selection
- **WHEN** user selects 3 image files
- **THEN** system displays all 3 files in the upload queue

#### Scenario: Parallel upload processing
- **WHEN** user initiates upload with 3 files
- **THEN** system uploads all files and tracks progress for each individually

### Requirement: User can add optional caption and submitter name

The system SHALL accept optional text input for caption and required text input for submitter name.

#### Scenario: Upload with caption
- **WHEN** user uploads a photo with caption "Great memories!"
- **THEN** system stores the caption with the photo in Cloudinary context metadata

#### Scenario: Upload with submitter name
- **WHEN** user uploads a photo with submitter name "John Doe"
- **THEN** system stores the submitter name with the photo in Cloudinary context metadata

#### Scenario: Upload without caption
- **WHEN** user uploads a photo without entering a caption
- **THEN** system accepts the upload and stores empty caption

### Requirement: Upload uses signed Cloudinary direct upload

The system SHALL generate signed upload parameters server-side and upload directly from browser to Cloudinary.

#### Scenario: Signature generation
- **WHEN** user initiates upload
- **THEN** server action generates signed upload signature with timestamp and returns upload credentials

#### Scenario: Direct browser upload
- **WHEN** browser receives upload signature
- **THEN** browser uploads file directly to Cloudinary API endpoint without proxying through Next.js server

### Requirement: Uploads are tagged as pending by default

The system SHALL tag all new uploads with "pending" status in Cloudinary.

#### Scenario: New upload tagging
- **WHEN** user completes file upload to Cloudinary
- **THEN** Cloudinary stores the file with tags ["wedding-photos", "pending"]

### Requirement: User receives upload progress feedback

The system SHALL display upload progress using toast notifications with progress bars.

#### Scenario: Upload progress display
- **WHEN** file upload is in progress
- **THEN** system displays toast notification with MUI progress bar showing upload percentage

#### Scenario: Upload success notification
- **WHEN** all files upload successfully
- **THEN** system displays success toast "All X files uploaded! They'll appear after moderation"

#### Scenario: Individual file completion
- **WHEN** one file completes in multi-file upload
- **THEN** system displays individual success toast for that file

### Requirement: Upload errors are reported to user

The system SHALL display clear error messages when uploads fail.

#### Scenario: Network error during upload
- **WHEN** upload fails due to network connectivity
- **THEN** system displays error toast "Failed to upload {filename}. Please try again."

#### Scenario: Cloudinary service error
- **WHEN** Cloudinary API returns error response
- **THEN** system displays error toast and logs error details to console

#### Scenario: Signature generation failure
- **WHEN** server action fails to generate upload signature
- **THEN** system displays error toast "Upload failed. Please try again later."

### Requirement: Cloudinary optimizes uploaded media automatically

The system SHALL configure Cloudinary upload preset to enforce maximum dimensions and quality optimization.

#### Scenario: Image dimension limiting
- **WHEN** user uploads a 4000x3000 pixel image
- **THEN** Cloudinary creates optimized version with max dimensions 1920x1080 maintaining aspect ratio

#### Scenario: Video transcoding
- **WHEN** user uploads a high-resolution video
- **THEN** Cloudinary transcodes video to optimized format with max dimensions 1920x1080

#### Scenario: Automatic format selection
- **WHEN** browser supports WebP format
- **THEN** Cloudinary serves images in WebP format for optimal compression
