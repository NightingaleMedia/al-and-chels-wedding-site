## Why

The backend needs to be kept warm to avoid cold starts that degrade user experience. Currently there is no reusable mechanism to ping the `/warmup` endpoint. This change provides three ways to trigger backend warmup: a server action for server-side pinging, a client-side utility for direct browser calls, and a React hook for component-level integration.

## What Changes

- Add shared utility `createWarmupRequestBody()` in `src/serverActions/warmup/warmupRequest.ts` that constructs the POST body with services to warm up
- Add server action `pingBackend()` in `src/serverActions/warmup/pingBackend.ts` that POSTs to `/warmup` using `backendClient` and the shared body constructor
- Add client-side utility `pingBackendClient()` in `src/utils/pingBackendClient.ts` that POSTs to `/warmup` directly from the browser using the shared body constructor
- Add React hook `usePingBackend()` in `src/hooks/usePingBackend.ts` that wraps the client-side utility with loading and error state management
- All implementations use the same centralized body construction logic so callers don't need to know about the services list

## Capabilities

### New Capabilities
- `backend-warmup`: Backend warmup utilities for keeping the service responsive by pinging the `/warmup` endpoint

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- **New code**: Four new files under `src/serverActions/warmup/` (shared request body + server action), `src/utils/`, and `src/hooks/`
- **Dependencies**: Uses existing `backendClient` for server-side calls; client-side calls fetch directly
- **Usage**: Components and pages can import any of the three warmup functions based on their execution context - all use the same centralized body construction so callers don't need implementation knowledge
- **No breaking changes**: Purely additive functionality
