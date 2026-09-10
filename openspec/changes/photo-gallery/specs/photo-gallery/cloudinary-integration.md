# Spec: photo-gallery/cloudinary-integration

## Purpose

Establishes Cloudinary SDK configuration, upload preset requirements, and integration patterns for photo gallery functionality.

## ADDED Requirements

### Requirement: Cloudinary SDK must be configured with credentials

The system SHALL initialize Cloudinary SDK with credentials from environment variables.

#### Scenario: SDK initialization
- **WHEN** server action imports Cloudinary client
- **THEN** client is configured with CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET from environment

#### Scenario: Missing credentials
- **WHEN** required environment variables are not set
- **THEN** system logs error and upload operations fail with clear error message

#### Scenario: Public cloud name
- **WHEN** client-side code needs cloud name
- **THEN** NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is accessible in browser

### Requirement: Upload preset must be configured in Cloudinary dashboard

The system SHALL require a named upload preset "wedding_photos" configured with specific transformations and settings.

#### Scenario: Upload preset configuration
- **WHEN** upload preset "wedding_photos" is configured
- **THEN** it includes eager transformations: `w_1920,h_1080,c_limit,q_auto,f_auto` for images

#### Scenario: Video transformations
- **WHEN** video is uploaded via preset
- **THEN** preset applies eager transformation: `w_1920,h_1080,c_limit,q_auto,vc_auto`

#### Scenario: Allowed formats
- **WHEN** upload preset is used
- **THEN** allowed formats include: jpg, png, gif, heic, heif, webp, mp4, mov, avi

#### Scenario: Folder organization
- **WHEN** files are uploaded via preset
- **THEN** files are stored in Cloudinary folder "wedding-gallery"

#### Scenario: Automatic tagging
- **WHEN** files are uploaded via preset
- **THEN** Cloudinary automatically applies tags ["wedding-photos", "pending"]

#### Scenario: Video thumbnail generation
- **WHEN** video is uploaded
- **THEN** Cloudinary automatically generates thumbnail from video

### Requirement: Upload signatures must be generated server-side

The system SHALL generate Cloudinary upload signatures using API secret on server.

#### Scenario: Signature generation
- **WHEN** client requests upload signature
- **THEN** server action generates SHA-1 signature using timestamp, upload_preset, and API secret

#### Scenario: Signature includes timestamp
- **WHEN** signature is generated
- **THEN** current Unix timestamp is included in signature parameters

#### Scenario: Signature includes preset
- **WHEN** signature is generated
- **THEN** upload_preset parameter "wedding_photos" is included

#### Scenario: API secret never exposed
- **WHEN** signature is returned to client
- **THEN** API secret is not included (only signature hash, timestamp, api_key)

### Requirement: Client uploads directly to Cloudinary

The system SHALL upload files from browser directly to Cloudinary API endpoint.

#### Scenario: Direct upload endpoint
- **WHEN** browser uploads file
- **THEN** request goes to `https://api.cloudinary.com/v1_1/{cloud_name}/upload`

#### Scenario: Upload includes signature
- **WHEN** upload request is sent
- **THEN** form data includes signature, timestamp, api_key, upload_preset, and file

#### Scenario: Upload includes context metadata
- **WHEN** upload includes caption and submitter
- **THEN** form data includes context parameter formatted as `caption={text}|submitter={name}`

#### Scenario: Upload includes tags
- **WHEN** upload is initiated
- **THEN** form data includes tags parameter with comma-separated values

### Requirement: Cloudinary Admin API queries media by tags

The system SHALL use Cloudinary Admin API to search and filter media by tags.

#### Scenario: Search by pending tag
- **WHEN** moderation interface queries pending items
- **THEN** Admin API search uses expression `tags=pending`

#### Scenario: Search by approved tag
- **WHEN** gallery queries approved items
- **THEN** Admin API search uses expression `tags=approved`

#### Scenario: Pagination support
- **WHEN** search returns many results
- **THEN** response includes next_cursor for pagination

#### Scenario: Search returns metadata
- **WHEN** Admin API returns results
- **THEN** each item includes public_id, resource_type, format, dimensions, url, context, tags, created_at

### Requirement: Tag updates use Cloudinary Admin API

The system SHALL update resource tags via Admin API for moderation actions.

#### Scenario: Approve updates tags
- **WHEN** admin approves item
- **THEN** Admin API explicit call updates tags from ["pending"] to ["approved"]

#### Scenario: Reject updates tags
- **WHEN** admin rejects item
- **THEN** Admin API explicit call updates tags from ["pending"] to ["rejected"]

#### Scenario: Tag update by public_id
- **WHEN** moderation action targets specific item
- **THEN** Admin API call references item by public_id

### Requirement: Cloudinary transformations are applied via URL parameters

The system SHALL construct Cloudinary URLs with transformation parameters for different display contexts.

#### Scenario: Responsive image URL
- **WHEN** desktop gallery requests image
- **THEN** URL includes transformation `w_auto,c_limit,q_auto,f_auto`

#### Scenario: Mobile crop URL
- **WHEN** mobile gallery requests image
- **THEN** URL includes transformation `w_400,h_400,c_fill,g_auto`

#### Scenario: Video thumbnail URL
- **WHEN** video thumbnail is requested
- **THEN** URL includes `.jpg` extension and `so_2` (start offset 2 seconds) parameter

#### Scenario: Lightbox full-size URL
- **WHEN** user opens image in lightbox
- **THEN** URL includes transformation `w_1920,h_1080,c_limit,q_auto`

### Requirement: Environment variables must be configured per deployment

The system SHALL require specific environment variables for each deployment environment.

#### Scenario: Required variables documented
- **WHEN** developer sets up environment
- **THEN** documentation lists: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_UPLOAD_PRESET, ADMIN_PIN

#### Scenario: Development environment
- **WHEN** running locally
- **THEN** .env.local contains all required Cloudinary variables

#### Scenario: Production environment
- **WHEN** deployed to Cloud Run
- **THEN** production environment variables are configured with production Cloudinary account

### Requirement: Cloudinary errors are handled gracefully

The system SHALL provide clear error handling for Cloudinary API failures.

#### Scenario: Upload API error
- **WHEN** Cloudinary upload API returns error
- **THEN** error is caught and user-friendly message is displayed

#### Scenario: Admin API error
- **WHEN** Cloudinary Admin API call fails
- **THEN** error is logged to console and user sees retry option

#### Scenario: Network timeout
- **WHEN** Cloudinary request times out
- **THEN** system displays message "Request timed out. Please try again."

#### Scenario: Invalid credentials
- **WHEN** API credentials are invalid
- **THEN** system logs error "Cloudinary authentication failed" and prevents upload attempts
