## 1. Environment Setup

- [ ] 1.1 Add `NEXT_PUBLIC_WEDDING_BACKEND` environment variable to `.env.example`, `.env.development`, `.env.local`, and `.env.production` with the backend URL value and verify the variable is accessible in browser code

## 2. Shared Request Body Construction

- [ ] 2.1 Create `src/serverActions/warmup/` directory and verify it exists
- [ ] 2.2 Create `src/serverActions/warmup/warmupRequest.ts` with `createWarmupRequestBody()` function and verify the file exports correctly
- [ ] 2.3 Implement function to return `{ services: [] }` structure and verify TypeScript types are correct
- [ ] 2.4 Verify the function is a pure function with no side effects and can be imported from both server and client code

## 3. Server Action Implementation

- [ ] 3.1 Create `src/serverActions/warmup/pingBackend.ts` with server action and verify the file imports correctly
- [ ] 3.2 Add `'use server'` directive at the top of `pingBackend.ts` and verify it's a valid server action
- [ ] 3.3 Import `createWarmupRequestBody()` from `warmupRequest.ts` and verify the import succeeds
- [ ] 3.4 Implement POST request to `/warmup` using `backendClient` with body from `createWarmupRequestBody()` and verify the function compiles without TypeScript errors
- [ ] 3.5 Add error handling that throws on non-ok responses and verify the error behavior matches the spec

## 4. Client-Side Utility Implementation

- [ ] 4.1 Create `src/utils/pingBackendClient.ts` with client-side function and verify the file is created
- [ ] 4.2 Import `createWarmupRequestBody()` from `src/serverActions/warmup/warmupRequest.ts` and verify the import works in client context
- [ ] 4.3 Implement POST fetch to `${process.env.NEXT_PUBLIC_WEDDING_BACKEND}/api/v1/warmup` with body from `createWarmupRequestBody()` and verify TypeScript compilation succeeds
- [ ] 4.4 Add Content-Type header as `application/json` and stringify the body and verify the request format is correct
- [ ] 4.5 Add error handling that rejects the Promise on fetch failure and verify error propagation works correctly
- [ ] 4.6 Test that the function can be imported in a client component and verify no server-side dependencies leak into client code

## 5. React Hook Implementation

- [ ] 5.1 Create `src/hooks/` directory if it doesn't exist and verify the directory is present
- [ ] 5.2 Create `src/hooks/usePingBackend.ts` and verify the file exists
- [ ] 5.3 Implement hook with `useState` for `loading` and `error` states and verify TypeScript types are correct
- [ ] 5.4 Implement `ping` function that calls `pingBackendClient()`, sets loading to true before the call, and sets loading to false after completion and verify state transitions work correctly
- [ ] 5.5 Add error capture that sets `error` state when `pingBackendClient()` rejects and clears error on successful ping and verify error handling matches the spec
- [ ] 5.6 Add `'use client'` directive at the top of the file and verify the hook can only be used in client components
- [ ] 5.7 Return object with `{ ping, loading, error }` from the hook and verify the return type is correctly inferred

## 6. Verification

- [ ] 6.1 Verify all utilities import and use `createWarmupRequestBody()` by inspecting the imports in each file
- [ ] 6.2 Verify all utilities target `/api/v1/warmup` endpoint with POST method consistently by inspecting the code paths
- [ ] 6.3 Verify the request body format is `{ services: [] }` across all utilities by checking the body construction
- [ ] 6.4 Import `pingBackend` in a test server component and verify it compiles and executes without errors
- [ ] 6.5 Import `pingBackendClient` in a test client component and verify it can be called from the browser
- [ ] 6.6 Use `usePingBackend()` in a test client component and verify the hook returns the expected `{ ping, loading, error }` interface
- [ ] 6.7 Run `npm run build` and verify the build succeeds without errors or warnings related to the new files
