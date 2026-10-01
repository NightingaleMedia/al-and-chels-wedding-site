## Context

The wedding site currently has SMS subscription functionality embedded within the RSVP flow (Step 3 of RSVPForm), but there is no standalone way for guests to subscribe. The backend API (`POST /api/v1/sms/subscribers`) already exists and is admin-authenticated using the `backendClient` utility.

The existing codebase uses:
- **Forms**: Formik for state management, Zod for validation
- **UI**: Material-UI components with a custom theme
- **Server Actions**: Next.js server actions in `src/serverActions/` directory organized by feature
- **API Integration**: Centralized `backendClient` utility that handles authentication and request formatting

The target files (`src/serverActions/optIn/optIn.ts` and `src/app/send-me-updates/page.tsx`) exist but are currently empty/stub implementations.

See proposal.md for motivation and specs/sms-subscription/spec.md for requirements.

## Goals / Non-Goals

**Goals:**
- Create a minimal, standalone subscription form following existing RSVP form patterns
- Reuse existing validation, API client, and UI component patterns
- Provide clear user feedback for all states (submitting, success, error)
- Match the visual style and user experience of existing forms

**Non-Goals:**
- Guest ID association (backend accepts optional `guestId`, but this form won't collect it)
- Unsubscription functionality (out of scope for this change)
- Integration with existing RSVP data (this is a standalone opt-in path)
- Complex multi-step flow (single-page form only)

## Decisions

### 1. Use Formik for form state management

**Decision:** Use Formik with Zod validation, matching the RSVP form pattern.

**Rationale:** 
- Consistency with existing codebase (see `RSVPFormContext.tsx`)
- Proven pattern for validation error handling
- Simple form doesn't need full context provider like RSVP (single field, no multi-step flow)

**Alternative considered:** Plain React state + validation
- **Rejected:** Would diverge from established patterns and make codebase inconsistent

### 2. Implement as client component with embedded form logic

**Decision:** Create a client component page with inline Formik logic rather than a separate context provider.

**Rationale:**
- The form is simple (single field: phone number)
- No multi-step flow or complex state management needed
- No shared state between components
- RSVPFormContext's complexity is overkill for this use case

**Alternative considered:** Create SubscribeFormContext like RSVPFormContext
- **Rejected:** Over-engineering for a single-field form

### 3. Create server action schema in optIn directory

**Decision:** Add Zod schemas for the subscription API to `src/serverActions/optIn/optIn.ts` rather than extending `weddingBackend.schemas.ts`.

**Rationale:**
- Keeps subscription-related types colocated with their usage
- `weddingBackend.schemas.ts` is focused on guest/party/RSVP domain
- Subscription is a distinct concern (SMS opt-in vs guest management)

**Alternative considered:** Extend `weddingBackend.schemas.ts` with subscription types
- **Rejected:** Would conflate two separate concerns; the schemas file is already focused on the RSVP domain

### 4. Phone number validation pattern

**Decision:** Reuse the exact regex pattern from RSVP form: `/^\+?[0-9\s\-()]{10,}$/`

**Rationale:**
- Consistency in validation across the app
- Already validated in production use
- Flexible enough for international formats

**Reference:** `src/context/rsvp/types.ts` line 30-32

### 5. Success state handling

**Decision:** Display success message in-place and keep the form visible (cleared) rather than redirecting.

**Rationale:**
- Allows users to immediately see confirmation
- Keeps user on the page in case they want to subscribe another number
- Simpler implementation (no routing needed)
- Matches the simple, focused nature of the feature

**Alternative considered:** Redirect to confirmation page or hide form
- **Rejected:** Over-complicates a simple interaction; adds unnecessary navigation

## Risks / Trade-offs

**[Risk]** Duplicate submissions if user clicks submit multiple times  
→ **Mitigation:** Disable submit button while `formik.isSubmitting` is true (standard Formik pattern used in RSVP form)

**[Risk]** Backend rate limiting or validation errors not gracefully handled  
→ **Mitigation:** Wrap backend call in try-catch, display generic error message to user, log specifics to console for debugging

**[Risk]** Phone number already subscribed (backend may return duplicate error)  
→ **Mitigation:** Display friendly message indicating they're already subscribed (handled in error state, checked per API response)

**[Trade-off]** No guest ID association means backend won't link this subscription to guest records  
→ **Acceptable:** Per requirements, this is a standalone subscription path. Guest linking can be added later if needed via optional `guestId` field already supported by API.

**[Trade-off]** Client-side validation can be bypassed  
→ **Acceptable:** Backend performs its own validation. Client validation is for UX only.
