## Why

Wedding guests need a simple, standalone way to subscribe to SMS updates without going through the full RSVP flow. The backend API already supports SMS subscription management via `/api/v1/sms/subscribers`, but the frontend currently only offers opt-in through the RSVP form. A dedicated subscription page enables guests to sign up for updates at any time, even if they've already RSVP'd or want to subscribe before completing their RSVP.

## What Changes

- Add a new server action `subscribeToUpdates` in `src/serverActions/optIn/optIn.ts` that calls the backend's `POST /api/v1/sms/subscribers` endpoint
- Create a complete subscribe form UI at `/send-me-updates` page with phone number input and submission handling
- Implement form validation using Formik and Zod (matching existing patterns in the RSVP flow)
- Add success/error state handling with user feedback
- Follow existing Material-UI theming and form patterns used in `RSVPForm`

## Capabilities

### New Capabilities

- `sms-subscription`: User-facing SMS subscription functionality that allows guests to opt-in to receive wedding updates via text message through a dedicated subscription page

### Modified Capabilities

<!-- No existing capabilities are being modified - this is a new feature addition -->

## Impact

**Affected Files:**
- `src/serverActions/optIn/optIn.ts` - currently empty, will be populated with subscribe action
- `src/app/send-me-updates/page.tsx` - currently stub component, will be replaced with full form
- Potentially `src/serverActions/rsvp/weddingBackend.schemas.ts` - may need to add subscription-related types/schemas

**Integration Points:**
- Backend API endpoint `POST /api/v1/sms/subscribers` (already implemented)
- Existing `backendClient` utility for authenticated backend communication
- Material-UI components and theming system
- Formik form management library (already in use)

**No Breaking Changes**
