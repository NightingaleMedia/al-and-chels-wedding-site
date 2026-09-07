# Spec: photo-gallery/display

## Purpose

Displays approved photos and videos in a responsive, infinite-scrolling gallery accessible to all wedding site visitors.

## ADDED Requirements

### Requirement: Gallery displays only approved media

The system SHALL show only media items tagged as "approved" in the public gallery.

#### Scenario: Fetch approved items
- **WHEN** gallery page loads
- **THEN** system queries Cloudinary for items with tags=["approved"]

#### Scenario: Pending items excluded
- **WHEN** gallery queries media
- **THEN** items with tags=["pending"] are not included in results

#### Scenario: Rejected items excluded
- **WHEN** gallery queries media
- **THEN** items with tags=["rejected"] are not included in results

### Requirement: Desktop layout uses justified grid

The system SHALL display gallery in justified grid layout on desktop viewports (> 768px).

#### Scenario: Justified grid rendering
- **WHEN** user views gallery on desktop (viewport width > 768px)
- **THEN** gallery displays items in rows with uniform height maintaining aspect ratios

#### Scenario: Mixed aspect ratios
- **WHEN** gallery contains images with different aspect ratios
- **THEN** justified layout arranges them in visually balanced rows

#### Scenario: Images maintain aspect ratio
- **WHEN** images are displayed in justified grid
- **THEN** no images are cropped to fit (full image shown with original aspect ratio)

### Requirement: Mobile layout uses single column square crops

The system SHALL display gallery in single-column layout with square-cropped images on mobile viewports (≤ 768px).

#### Scenario: Mobile single column
- **WHEN** user views gallery on mobile (viewport width ≤ 768px)
- **THEN** gallery displays items in single column

#### Scenario: Square crop on mobile
- **WHEN** images are displayed on mobile
- **THEN** images are cropped to square format (1:1 aspect ratio)

#### Scenario: Cloudinary transformation for mobile
- **WHEN** mobile layout requests image
- **THEN** Cloudinary URL includes transformation `w_400,h_400,c_fill,g_auto`

### Requirement: Gallery supports infinite scroll

The system SHALL load additional items as user scrolls to bottom of gallery.

#### Scenario: Initial page load
- **WHEN** gallery page first loads
- **THEN** system fetches and displays initial batch (20 items)

#### Scenario: Scroll to bottom triggers load
- **WHEN** user scrolls within viewport of bottom
- **THEN** system fetches next batch of items

#### Scenario: Cursor-based pagination
- **WHEN** system fetches next batch
- **THEN** request includes cursor from previous response for pagination

#### Scenario: No more items
- **WHEN** all approved items have been loaded
- **THEN** system stops fetching and shows no loading indicator

### Requirement: Gallery displays items in random order

The system SHALL randomize the order of approved items in the gallery.

#### Scenario: Random order on load
- **WHEN** gallery fetches approved items
- **THEN** items are shuffled randomly before display

#### Scenario: Consistent random order per session
- **WHEN** user scrolls through gallery in single session
- **THEN** order remains consistent (same shuffle) throughout session

### Requirement: Images use Cloudinary transformations

The system SHALL request images from Cloudinary with appropriate transformations for display context.

#### Scenario: Desktop thumbnail transformation
- **WHEN** desktop justified grid requests image
- **THEN** Cloudinary URL includes `w_auto,c_limit,q_auto,f_auto`

#### Scenario: Automatic format selection
- **WHEN** browser supports modern formats
- **THEN** Cloudinary serves WebP or AVIF based on browser capability

#### Scenario: Quality optimization
- **WHEN** images are requested
- **THEN** Cloudinary applies automatic quality optimization (`q_auto`)

### Requirement: Videos display thumbnail with play button

The system SHALL show video thumbnail with play button overlay in gallery.

#### Scenario: Video thumbnail display
- **WHEN** approved video appears in gallery
- **THEN** Cloudinary auto-generated thumbnail is displayed

#### Scenario: Play button overlay
- **WHEN** video thumbnail is displayed
- **THEN** play button icon is overlaid on thumbnail

#### Scenario: Video duration display
- **WHEN** video thumbnail is shown
- **THEN** video duration is displayed on thumbnail

### Requirement: Clicking video opens playback modal

The system SHALL open video player in modal when user clicks video thumbnail.

#### Scenario: Video modal opens
- **WHEN** user clicks video thumbnail
- **THEN** modal opens with video player

#### Scenario: Video playback controls
- **WHEN** video modal is open
- **THEN** native HTML5 video controls are available (play, pause, seek, volume)

#### Scenario: Video URL optimization
- **WHEN** video modal loads video
- **THEN** Cloudinary URL includes streaming optimizations

#### Scenario: Close modal
- **WHEN** user clicks close button or outside modal
- **THEN** video modal closes and video stops playing

### Requirement: Gallery displays caption and submitter

The system SHALL show caption and submitter name with each media item.

#### Scenario: Display caption
- **WHEN** media item has caption in context metadata
- **THEN** caption is displayed below thumbnail

#### Scenario: Display submitter name
- **WHEN** media item has submitter in context metadata
- **THEN** submitter name is displayed (e.g., "Submitted by: John Doe")

#### Scenario: Missing caption
- **WHEN** media item has no caption
- **THEN** no caption text is shown (or empty placeholder)

### Requirement: Gallery handles loading states

The system SHALL display appropriate loading indicators during data fetches.

#### Scenario: Initial load indicator
- **WHEN** gallery is first loading
- **THEN** loading spinner or skeleton is displayed

#### Scenario: Infinite scroll loading
- **WHEN** fetching next batch of items
- **THEN** loading indicator appears at bottom of gallery

#### Scenario: Loading error
- **WHEN** fetch fails
- **THEN** error message is displayed "Unable to load gallery. Please refresh."

### Requirement: Gallery shows empty state when no photos exist

The system SHALL display helpful message when no approved photos exist yet.

#### Scenario: No approved photos
- **WHEN** zero approved items exist
- **THEN** system displays "No photos yet. Be the first to share!"

#### Scenario: Empty state with upload CTA
- **WHEN** empty state is shown
- **THEN** interface includes clear path to upload form
