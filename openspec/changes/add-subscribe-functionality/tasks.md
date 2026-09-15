## 1. Server Action Implementation

- [ ] 1.1 Define Zod schemas in `src/serverActions/optIn/optIn.ts` for subscription request/response types matching the backend API contract. Verify schemas are exported and include `phoneNumber` field validation.
- [ ] 1.2 Implement `subscribeToUpdates` server action in `src/serverActions/optIn/optIn.ts` that calls `POST /api/v1/sms/subscribers` via `backendClient`. Verify the function is marked with `'use server'` directive and returns success/error status.
- [ ] 1.3 Add error handling to catch backend failures and return structured error responses. Verify console logs capture error details and function returns `{ success: false }` on failure.

## 2. Form Page UI Implementation

- [ ] 2.1 Create the page component structure in `src/app/send-me-updates/page.tsx` with `'use client'` directive. Verify the file exports a default component and renders without errors.
- [ ] 2.2 Add Formik form setup with initial values for `phoneNumber` field and `onSubmit` handler that calls `subscribeToUpdates`. Verify Formik initializes with empty string and handles submission.
- [ ] 2.3 Implement Zod validation schema for phone number using regex `/^\+?[0-9\s\-()]{10,}$/` (matching RSVP form pattern). Verify validation rejects empty and malformed inputs.
- [ ] 2.4 Add Material-UI `TextField` component for phone number input with proper label, error display, and helper text. Verify field shows validation errors from Formik.
- [ ] 2.5 Add submit `Button` component that triggers form submission and is disabled during `formik.isSubmitting`. Verify button shows correct states.

## 3. State Management and User Feedback

- [ ] 3.1 Add local state for tracking submission status (idle, submitting, success, error). Verify state updates correctly through submission lifecycle.
- [ ] 3.2 Implement success message display after successful subscription. Verify message appears and form clears on success.
- [ ] 3.3 Implement error message display for backend failures with retry capability. Verify error messages show for API failures and form remains editable.
- [ ] 3.4 Add loading indicator or disabled state to submit button during submission. Verify button is disabled when `formik.isSubmitting` is true.

## 4. Integration and Styling

- [ ] 4.1 Apply Material-UI theming to match existing form styles (use Paper variant, Typography components). Verify page matches visual style of RSVP form.
- [ ] 4.2 Add page heading and descriptive text explaining the subscription feature. Verify content is clear and matches site tone.
- [ ] 4.3 Ensure responsive layout works on mobile and desktop breakpoints. Verify form is usable on small screens (<768px).

## 5. Verification and Testing

- [ ] 5.1 Manual test: Submit valid phone number and verify success message displays and backend receives request. Check browser console for successful API call.
- [ ] 5.2 Manual test: Submit empty phone number and verify validation error prevents submission. Check that error message displays.
- [ ] 5.3 Manual test: Submit malformed phone number (e.g., "abc") and verify validation error displays. Check format validation works.
- [ ] 5.4 Manual test: Simulate backend error (modify server action temporarily) and verify error message displays with retry option. Check error handling works.
- [ ] 5.5 Manual test: Click submit multiple times rapidly and verify only one submission occurs. Check button disabling works during submission.
