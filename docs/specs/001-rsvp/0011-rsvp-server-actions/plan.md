# Implement Spec 1: Wedding Backend API Client Adapter

## Context

`specs/001-rsvp-server-actions/spec.md` defines the skeleton for a set of
Next.js server actions that will talk to an external wedding backend. This
is Spec 1: it establishes file layout, function signatures, and empty
request/response interfaces only. Field-level shapes, real endpoint paths,
and error handling are explicitly out of scope and deferred to Spec 2. The
spec's own "Open questions" section also defers reconciling the
`WEDDING_BACKEND` vs. existing `.env.example`'s `RSVP_API_BASE_URL` naming
mismatch to Spec 2 — so `.env.example` is left untouched in this pass, and
the code uses `process.env.WEDDING_BACKEND` exactly as specified.

`src/serverActions/` currently exists but is empty. `AGENTS.md` (project
conventions) was checked against `node_modules/next/dist/docs/.../use-server.md`
for this custom Next.js build (16.2.9) — the `'use server'` file-directive
pattern used in the spec's example code is valid as-is.

## Files to create

1. **`src/serverActions/weddingBackend.interfaces.ts`**
   Exactly the interfaces/types block from the spec (lines 28-42):
   `SubmitRsvpRequest`/`Response`/`SubmitRsvp`,
   `GetGuestByPartyIdRequest`/`Response`/`GetGuestByPartyId`,
   `SearchGuestByNameRequest`/`Response`/`SearchGuestByName` — all empty
   interfaces, no guessed fields.

2. **`src/serverActions/submitRsvp.ts`**
   `'use server'` file, POST, matches the spec's exact example (lines 49-66):
   imports `SubmitRsvp` type, `SUBMIT_RSVP_ENDPOINT` constant left as
   `'' // TODO: set endpoint path`, fetches
   `` `${process.env.WEDDING_BACKEND}${SUBMIT_RSVP_ENDPOINT}` `` with POST,
   JSON headers, `cache: 'no-store'`, `satisfies SubmitRsvp`.

3. **`src/serverActions/getGuestByPartyId.ts`**
   Same pattern, GET method, `GET_GUEST_BY_PARTY_ID_ENDPOINT` TODO constant,
   takes `partyId: string` as the function argument (per the
   `GetGuestByPartyId` type), `satisfies GetGuestByPartyId`. Confirmed with
   user: `partyId` is left unused in the fetch call — the URL is built only
   from the TODO endpoint constant, mirroring `submitRsvp`'s minimal
   pattern. Whether `partyId` becomes a path segment, query param, etc. is
   an endpoint-shape decision explicitly deferred to Spec 2.

4. **`src/serverActions/searchGuestByName.ts`**
   Same pattern, POST method, `SEARCH_GUEST_BY_NAME_ENDPOINT` TODO constant,
   `satisfies SearchGuestByName`.

## Not touched

- `.env.example` (naming reconciliation explicitly deferred to Spec 2 per
  the spec's own "Open questions")
- No UI wiring, no real endpoint paths, no field shapes, no error handling
  — all explicitly out of scope per the spec

## Verification

- `npx tsc --noEmit` to confirm the `satisfies` checks and types compile.
- `npm run lint` to confirm the new files pass ESLint.
