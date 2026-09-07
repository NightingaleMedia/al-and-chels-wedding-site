# Spec: photo-gallery/moderation

## Purpose

Provides admin interface to review and approve or reject user-uploaded photos and videos before they appear in the public gallery.

## ADDED Requirements

### Requirement: Admin access requires PIN authentication

The system SHALL require a 6-digit PIN to access moderation interface.

#### Scenario: Correct PIN entry
- **WHEN** admin enters correct 6-digit PIN
- **THEN** system grants access to pending photos interface

#### Scenario: Incorrect PIN entry
- **WHEN** admin enters incorrect PIN
- **THEN** system displays error toast "Incorrect PIN. Please try again." and clears input

#### Scenario: PIN verification uses environment variable
- **WHEN** system validates PIN
- **THEN** system compares against ADMIN_PIN environment variable

### Requirement: Admin can view all pending photos and videos

The system SHALL display all media items with "pending" tag in moderation interface.

#### Scenario: List pending items
- **WHEN** admin accesses `/admin/pending-photos`
- **THEN** system fetches and displays all items with tags ["pending"] from Cloudinary

#### Scenario: Display pending count
- **WHEN** pending photos are displayed
- **THEN** interface shows total count "Pending Photos & Videos (X items)"

#### Scenario: No pending items
- **WHEN** no pending uploads exist
- **THEN** system displays message "No pending items to review"

### Requirement: Pending items display metadata

The system SHALL show caption, submitter name, thumbnail, and upload timestamp for each pending item.

#### Scenario: Image metadata display
- **WHEN** pending image is displayed
- **THEN** interface shows thumbnail, caption, submitter name, and upload timestamp

#### Scenario: Video metadata display
- **WHEN** pending video is displayed
- **THEN** interface shows video thumbnail, duration, caption, submitter name, and upload timestamp

#### Scenario: Missing caption display
- **WHEN** uploaded item has no caption
- **THEN** interface shows empty or placeholder caption field

### Requirement: Admin can approve pending items

The system SHALL allow admin to mark pending items as approved.

#### Scenario: Approve photo
- **WHEN** admin clicks "Approve" button on pending item
- **THEN** system updates Cloudinary tags from ["pending"] to ["approved"]

#### Scenario: Approved item removed from pending list
- **WHEN** item is approved
- **THEN** item is removed from pending photos interface

#### Scenario: Approve action failure
- **WHEN** approve action fails due to API error
- **THEN** system displays error toast "Failed to approve photo. Please try again." and item remains pending

### Requirement: Admin can reject pending items

The system SHALL allow admin to mark pending items as rejected.

#### Scenario: Reject photo
- **WHEN** admin clicks "Reject" button on pending item
- **THEN** system updates Cloudinary tags from ["pending"] to ["rejected"]

#### Scenario: Rejected item removed from pending list
- **WHEN** item is rejected
- **THEN** item is removed from pending photos interface

#### Scenario: Reject action failure
- **WHEN** reject action fails due to API error
- **THEN** system displays error toast "Failed to reject photo. Please try again." and item remains pending

### Requirement: Moderation actions use Cloudinary Admin API

The system SHALL use Cloudinary Admin API to update resource tags for moderation.

#### Scenario: Tag update via Admin API
- **WHEN** admin approves or rejects item
- **THEN** server action calls Cloudinary Admin API to update tags on the resource

#### Scenario: API authentication
- **WHEN** server action calls Cloudinary Admin API
- **THEN** request includes API key and secret from environment variables

### Requirement: Moderation interface shows visual grid

The system SHALL display pending items in a grid layout with thumbnails and action buttons.

#### Scenario: Grid display
- **WHEN** pending photos page loads
- **THEN** interface displays items in grid with thumbnails, metadata, and Approve/Reject buttons per item

#### Scenario: Video thumbnail generation
- **WHEN** pending video is displayed
- **THEN** Cloudinary auto-generated thumbnail is shown with duration overlay

### Requirement: Only approved items appear in public gallery

The system SHALL exclude pending and rejected items from public gallery queries.

#### Scenario: Gallery query excludes pending
- **WHEN** public gallery fetches photos
- **THEN** query filters for tags=["approved"] only

#### Scenario: Rejected items never shown
- **WHEN** item is rejected
- **THEN** item never appears in public gallery even if later approved (requires manual tag change)
