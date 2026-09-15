## Purpose

Allows wedding guests to subscribe to SMS updates through a dedicated web form without requiring completion of the RSVP process.

## ADDED Requirements

### Requirement: Phone number submission

The system SHALL accept a phone number submission from a user through the `/send-me-updates` page and create a subscription record via the backend API.

#### Scenario: Valid phone number submitted
- **WHEN** a user enters a valid phone number and submits the form
- **THEN** the system SHALL call `POST /api/v1/sms/subscribers` with the phone number
- **AND** the system SHALL display a success message confirming subscription

#### Scenario: Invalid phone number submitted
- **WHEN** a user enters an invalid phone number (empty or malformed)
- **THEN** the system SHALL display a validation error
- **AND** the system SHALL NOT submit the request to the backend

#### Scenario: Backend submission fails
- **WHEN** the backend API returns an error response
- **THEN** the system SHALL display an error message to the user
- **AND** the system SHALL allow the user to retry submission

### Requirement: Form validation

The system SHALL validate phone number input before submission.

#### Scenario: Required field validation
- **WHEN** a user attempts to submit an empty phone number field
- **THEN** the system SHALL display a validation error
- **AND** the system SHALL prevent form submission

#### Scenario: Phone number format validation
- **WHEN** a user enters text that doesn't match phone number patterns
- **THEN** the system SHALL display a format validation error
- **AND** the system SHALL prevent form submission

### Requirement: User feedback

The system SHALL provide clear feedback for all subscription states.

#### Scenario: Submission in progress
- **WHEN** a submission is being processed
- **THEN** the system SHALL disable the submit button
- **AND** the system SHALL indicate loading state to the user

#### Scenario: Successful subscription
- **WHEN** a subscription is successfully created
- **THEN** the system SHALL display a success message
- **AND** the system SHALL clear the form or indicate completion

#### Scenario: Duplicate subscription
- **WHEN** a phone number is already subscribed
- **THEN** the system SHALL handle the backend response gracefully
- **AND** the system SHALL display an appropriate message to the user

### Requirement: Backend integration

The system SHALL integrate with the existing backend SMS subscription API.

#### Scenario: API request format
- **WHEN** submitting a subscription
- **THEN** the system SHALL send a POST request to `/api/v1/sms/subscribers`
- **AND** the request body SHALL include `phoneNumber` as a required field
- **AND** the request SHALL be authenticated using the existing backendClient utility

#### Scenario: API authentication
- **WHEN** making backend API requests
- **THEN** the system SHALL use the backendClient utility for authentication
- **AND** the system SHALL handle authentication failures appropriately
