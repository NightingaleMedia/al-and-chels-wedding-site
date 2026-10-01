## Context

The project uses Next.js with server actions for backend communication. The existing `backendClient` utility in `src/serverActions/backendClient.ts` handles server-side authenticated requests to the WEDDING_BACKEND. Components use React hooks with `useState` for state management (no React Query or similar library). The backend exposes a `/api/v1/warmup` endpoint that accepts POST requests with a body containing a services list to prevent cold starts.

See proposal.md - Why for motivation.

## Goals / Non-Goals

**Goals:**
- Provide three distinct ways to ping `/warmup`: server action, client utility, and React hook
- Centralize request body construction so callers don't need to know about the services list
- Follow existing project patterns (server actions in `src/serverActions/`, utilities in `src/utils/`, hooks in `src/hooks/`)
- Reuse `backendClient` for server-side calls to maintain consistent authentication and logging
- Keep the hook implementation simple using `useState` (no external state management library)

**Non-Goals:**
- Automatic warmup scheduling or polling (consumers can implement their own triggers)
- Retry logic or exponential backoff (can be added later if needed)
- Warmup metrics or monitoring beyond existing backend logging
- Configuration of warmup endpoint path (hardcoded to `/warmup`)

## Decisions

### Decision 1: Centralized request body construction

**Choice:** Create a shared `createWarmupRequestBody()` function that all warmup utilities import and use to construct the POST body.

**Rationale:** Callers shouldn't need to know what services to warm up or how to format the request body. Centralizing this logic means changing the services list requires updating only one place, not three.

**Alternatives considered:**
- Each utility constructs its own body: Would duplicate the services list logic and make it easy for implementations to drift out of sync
- Accept services as a parameter: Pushes the burden onto callers, defeating the goal of a simple "just ping the backend" interface

### Decision 2: Three separate execution wrappers with shared body logic

**Choice:** Create three functions (server action, client utility, and hook) that each handle their execution context but share the body construction logic.

**Rationale:** Server actions run in Node.js with access to `backendClient` and authentication, while client-side code runs in the browser without those capabilities. The React hook adds state management on top of the client utility. These execution contexts require different implementations, but the body format is identical across all three.

**Alternatives considered:**
- Single utility with environment detection: Would mix server and client code, violating Next.js's server/client boundary
- Server action only with client wrapper: Would add unnecessary network hops (browser → Next.js server → backend instead of browser → backend)

### Decision 3: Client-side calls go directly to backend, not through Next.js API routes

**Choice:** `pingBackendClient()` POSTs to `WEDDING_BACKEND` directly from the browser.

**Rationale:** The warmup endpoint is idempotent. Going through Next.js would add latency and server load without providing authentication benefits (warmup doesn't require auth).

**Alternatives considered:**
- Proxy through Next.js API route: Adds unnecessary hop and server processing
- Use server action from client: Violates the separation of concerns (server actions shouldn't be exposed to browser for generic backend access)

### Decision 4: Hook uses `useState` for state management

**Choice:** `usePingBackend()` uses React's built-in `useState` hook for `loading` and `error` state.

**Rationale:** The project doesn't use React Query, TanStack Query, or similar libraries. Following the existing pattern seen in components like `PhotoGallery.tsx` and `GuestSearch.tsx`.

**Alternatives considered:**
- Add React Query: Overkill for a simple ping operation
- useReducer: More complex than needed for two boolean/error states

### Decision 5: Client-side URL construction

**Choice:** Client utility will need to read `WEDDING_BACKEND` from environment variables exposed to the browser via `NEXT_PUBLIC_` prefix.

**Rationale:** `process.env.WEDDING_BACKEND` is server-only. Browser code needs a public environment variable.

**Alternatives considered:**
- Hardcode production URL: Would break in development/staging environments
- Fetch from `/api/config` endpoint: Adds unnecessary complexity and latency

## Risks / Trade-offs

**[Risk]** Client-side calls bypass authentication that `backendClient` provides.
→ **Mitigation:** The `/warmup` endpoint should be designed as a public, no-op endpoint that doesn't expose sensitive data or operations.

**[Risk]** `WEDDING_BACKEND` URL needs to be exposed as `NEXT_PUBLIC_WEDDING_BACKEND` for client-side access.
→ **Mitigation:** This is already a known backend URL and doesn't expose secrets. Document the new environment variable requirement.

**[Risk]** No retry logic means transient failures won't recover automatically.
→ **Mitigation:** Warmup is best-effort. Callers can implement their own retry if needed. The error state in the hook makes failures visible.

**[Trade-off]** Three separate implementations increase code to maintain.
→ **Accepted:** The execution context differences justify separate implementations. The shared body construction logic eliminates the main source of duplication. Each wrapper is simple (10-20 lines).

**[Trade-off]** The shared `createWarmupRequestBody()` function needs to be importable from both server and client code.
→ **Accepted:** Place it in a location accessible to both contexts (e.g., `src/serverActions/warmup/warmupRequest.ts`). It's a pure function with no side effects, so it's safe to import anywhere.

## Open Questions

None - the implementation is straightforward given existing patterns in the codebase.
