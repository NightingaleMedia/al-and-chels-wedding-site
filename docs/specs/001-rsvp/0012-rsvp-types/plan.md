# Implement Spec 2: RSVP API Types & Real Endpoints

## Context

`specs/002-rsvp-types/spec.md` supplies four curl examples against the real
wedding backend and asks for zod schemas + TypeScript interfaces derived
from them, plus wiring up the real endpoint paths that Spec 1 left as
`TODO` constants. Rather than guessing field shapes, the curls were run
against the live backend (`localhost:8080`, served by the sibling
`wedding-invite-sheet-sync` project) to inspect real responses. All
shapes below are taken directly from those responses, not guessed.

Current state in `src/serverActions/rsvp/`:

- `weddingBackend.interfaces.ts` — all request/response interfaces are
  still empty (`{}`), per Spec 1.
- `submitRsvp.ts` — endpoint already hardcoded to `/rsvp` (matches the
  "Submit RSVP" curl as-is).
- `getGuestByPartyId.ts` — `GET`, endpoint `TODO`, takes `partyId: string`.
- `searchGuestByName.ts` — `POST`, endpoint `TODO`.

The four curls map to these files as follows — with one mismatch and one
gap:

| Curl                          | Method + path                       | Existing file                                                                                   |
| ----------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Search Wedding Party By Guest | `POST /info/party-by-guest/search`  | `searchGuestByName.ts`                                                                          |
| Get Party By UUID             | `GET /info/party-by-guest/:guestId` | **none — new file**                                                                             |
| Get Party by Party ID         | `GET /info/party/:partyId`          | `getGuestByPartyId.ts` (misnamed — it fetches a _party_ by _party id_, not a guest by party id) |
| Submit RSVP                   | `POST /rsvp`                        | `submitRsvp.ts`                                                                                 |

Per user decision: rename `getGuestByPartyId.ts` → `getPartyByPartyId.ts`
(and its types) to match what it actually does, and add a new
`getPartyByGuestId.ts` for the previously-uncovered "Get Party By UUID"
route. Per user decision, this spec also reconciles the `.env.example`
naming mismatch flagged as an open question in Spec 1
(`RSVP_API_BASE_URL` vs. the code's `process.env.WEDDING_BACKEND`).

`zod` is present only as a transitive dependency today (pulled in via
another package per `package-lock.json`), not a direct one — it must be
added to `package.json` to be used directly.

## Confirmed API behavior (from live requests)

All three read endpoints (`search`, `party-by-guest/:uuid`,
`party/:partyId`) share one response envelope and one party shape:

```
GET localhost:8080/info/party/slater-johnson-party  ->  200
{"ok":true,"data":{"partyName":"Slater Johnson Party","partyId":"slater-johnson-party","guestCount":2,
  "members":[{"Name":"Max Slater","First Name":"Max","Last Name":"Slater","brideGroom":"groom",
    "Family / Friends":"friends","age":"adult","uuid":"groom--max-slater","group_name":"Slater Johnson Party",
    "group_id":"slater-johnson-party","rsvp":"Attending"}, ...]}}

GET localhost:8080/info/party/does-not-exist  ->  404
{"ok":false,"error":"Party not found"}

GET localhost:8080/info/party-by-guest/bride--jon-sheehan  ->  200
{"ok":true,"data":{"partyName":"Sheehan Sheehan Party","guestCount":4,"members":[...]}}
  (this party's record has no top-level partyId and members have no group_id —
   confirmed to be a per-record data quality gap, not an endpoint difference:
   the same "Sheehan Sheehan Party" record is missing partyId/group_id when
   reached via search too, while "Slater Johnson Party" has both fields via
   every endpoint that returns it)

POST localhost:8080/info/party-by-guest/search  {"searchQuery":"Jon Sheehan"}  ->  200
  Returns a single party object under "data" (same shape as above), NOT an array.
  Requires an exact "First Last" match, case-insensitive ("jon sheehan" also
  matched); "Sheehan" alone or "Slater" alone returned 404 Guest not found.

POST localhost:8080/rsvp  {"partyId":"slater-johnson-party","rsvps":[{"guestId":"groom--emjay-johnson","isAttending":false,"mealChoice":"fish"}]}  ->  200
{"ok":true}
  Confirmed this persists: re-fetching the party afterward shows
  "rsvp":"Not Attending" for that guest (was "Not Responded"). The three
  observed `rsvp` string values are "Not Responded" / "Attending" / "Not Attending".
  mealChoice does NOT appear anywhere in the read (GET) response — it's
  write-only from the client's perspective.

  The backend does NOT validate partyId/guestId consistency or required
  fields on write: submitting a real guestId under an unrelated partyId,
  or omitting partyId entirely, both still returned {"ok":true}/200. This
  is a backend leniency quirk, not something to replicate in the request
  schema — the schema still models the documented shape.
```

Field-name note: the identifier the write endpoint calls `guestId` is the
same identifier the read endpoints expose as `uuid` on a member (e.g.
`"groom--max-slater"`) — different key name, same id space, confirmed by
using a `uuid` from a GET response as the `guestId` in a POST `/rsvp` and
seeing it take effect.

## Files to create

1. **`src/serverActions/rsvp/getPartyByGuestId.ts`** (new)
   Same pattern as the other action files: `'use server'`, `GET`,
   `GET_PARTY_BY_GUEST_ID_ENDPOINT = '/info/party-by-guest'`, takes
   `guestId: string`, fetches `` `${...}${ENDPOINT}/${guestId}` ``,
   parses the response with `partyEnvelopeSchema.parse(...)`, throws if
   `ok: false`, returns `.data`, `satisfies GetPartyByGuestId`.

## Files to rename

2. **`src/serverActions/rsvp/getGuestByPartyId.ts` → `getPartyByPartyId.ts`**
   Content otherwise follows the same pattern update as below.

## Files to rewrite

3. **`src/serverActions/rsvp/weddingBackend.interfaces.ts` → `weddingBackend.schemas.ts`**
   Replace the empty interfaces with zod schemas + inferred types (schema
   is the source of truth, types are `z.infer<...>`), built from the
   confirmed shapes above. Renames `GetGuestByPartyId*` →
   `GetPartyByPartyId*` and adds `GetPartyByGuestId*`:

   ```ts
   import { z } from 'zod'

   export const memberSchema = z.object({
     Name: z.string(),
     'First Name': z.string(),
     'Last Name': z.string(),
     brideGroom: z.enum(['bride', 'groom']),
     'Family / Friends': z.enum(['family', 'friends']),
     age: z.enum(['adult', 'child']),
     uuid: z.string(),
     group_name: z.string(),
     group_id: z.string().optional(), // absent on some party records — see Open Questions
     rsvp: z.enum(['Not Responded', 'Attending', 'Not Attending']),
   })
   export type Member = z.infer<typeof memberSchema>

   export const partySchema = z.object({
     partyName: z.string(),
     partyId: z.string().optional(), // absent on some party records — see Open Questions
     guestCount: z.number(),
     members: z.array(memberSchema),
   })
   export type Party = z.infer<typeof partySchema>

   const errorEnvelopeSchema = z.object({
     ok: z.literal(false),
     error: z.string(),
   })

   const partyEnvelopeSchema = z.union([
     z.object({ ok: z.literal(true), data: partySchema }),
     errorEnvelopeSchema,
   ])

   // Search Wedding Party By Guest — POST /info/party-by-guest/search
   export const searchGuestByNameRequestSchema = z.object({
     searchQuery: z.string(),
   })
   export type SearchGuestByNameRequest = z.infer<
     typeof searchGuestByNameRequestSchema
   >
   export type SearchGuestByNameResponse = Party
   export type SearchGuestByName = (
     request: SearchGuestByNameRequest,
   ) => Promise<SearchGuestByNameResponse>

   // Get Party By UUID — GET /info/party-by-guest/:guestId
   export type GetPartyByGuestIdResponse = Party
   export type GetPartyByGuestId = (
     guestId: string,
   ) => Promise<GetPartyByGuestIdResponse>

   // Get Party by Party ID — GET /info/party/:partyId
   export type GetPartyByPartyIdResponse = Party
   export type GetPartyByPartyId = (
     partyId: string,
   ) => Promise<GetPartyByPartyIdResponse>

   // Submit RSVP — POST /rsvp
   export const rsvpEntrySchema = z.object({
     guestId: z.string(),
     isAttending: z.boolean(),
     mealChoice: z.string().optional(),
   })
   export const submitRsvpRequestSchema = z.object({
     partyId: z.string(),
     rsvps: z.array(rsvpEntrySchema),
   })
   export type SubmitRsvpRequest = z.infer<typeof submitRsvpRequestSchema>
   export type SubmitRsvpResponse = { success: true }
   export type SubmitRsvp = (
     request: SubmitRsvpRequest,
   ) => Promise<SubmitRsvpResponse>

   export { partyEnvelopeSchema, errorEnvelopeSchema }
   ```

   The exported function types return the unwrapped `Party` /
   `{ success: true }` shape (matching Spec 1's original signatures);
   each action file is responsible for parsing the `{ok, data}` /
   `{ok:false, error}` envelope and throwing on `ok: false`, so callers
   never see the envelope.

## Files to update

4. **`submitRsvp.ts`** — import from `./weddingBackend.schemas`; parse
   the raw response with a `z.union([z.object({ok: z.literal(true)}),
errorEnvelopeSchema])`, throw `new Error(parsed.error)` if
   `ok: false`, else return `{ success: true }`.

5. **`searchGuestByName.ts`** — set
   `SEARCH_GUEST_BY_NAME_ENDPOINT = '/info/party-by-guest/search'`;
   import from `./weddingBackend.schemas`; parse with
   `partyEnvelopeSchema`, throw on `ok: false`, else return `.data`.

6. **`getPartyByPartyId.ts`** (renamed) — set
   `GET_PARTY_BY_PARTY_ID_ENDPOINT = '/info/party'`, fetch
   `` `${...}${ENDPOINT}/${partyId}` `` (was previously built from the
   TODO constant alone with `partyId` unused — now `partyId` is used as
   a path segment, per the real route); parse with `partyEnvelopeSchema`,
   throw on `ok: false`, else return `.data`.

7. **`package.json`** — add `"zod"` to `dependencies` (currently only a
   transitive dependency, per `package-lock.json`).

8. **`.env.example`** — rename `RSVP_API_BASE_URL` → `WEDDING_BACKEND` to
   match `process.env.WEDDING_BACKEND` used throughout
   `src/serverActions/rsvp/`. Also correct its stale comment references
   (`src/serverActions/rsvp.ts` → `src/serverActions/rsvp/`,
   `specs/001-rsvp/spec.md` → `specs/001-rsvp-server-actions/spec.md`,
   and reference Spec 2 for the field shapes).

## Not touched

- No UI wiring — nothing outside `src/serverActions/rsvp/` currently
  imports these files, so the renames are safe.
- No retry logic or backend-side write validation — the backend itself
  doesn't validate partyId/guestId consistency on write, and that's a
  backend behavior, not something for the client adapter to work around
  in this spec.

## Open questions

- `partyId` (on the party object) and `group_id` (on each member) are
  absent for at least one real party record ("Sheehan Sheehan Party")
  across every endpoint that returns it, while present for others
  ("Slater Johnson Party"). Modeled as `.optional()` here; worth
  flagging to whoever owns the backend/data source as a data-completeness
  gap rather than treated as a documented "sometimes missing" contract.
- `mealChoice` is accepted on write but never appears in any read
  response — there's no way to confirm its accepted values (only
  `"chicken"` and `"fish"` were tried) or whether it's persisted at all.
  Modeled as `z.string().optional()`.
- The error envelope shape (`{ok:false, error:string}`) was only
  confirmed for read endpoints (404s). `/rsvp` was never observed to
  fail — its error shape is assumed to match by consistency with the
  other three endpoints, not directly confirmed.

## Verification

- `npx tsc --noEmit` to confirm the schemas, inferred types, and
  `satisfies` checks compile.
- `npm run lint` to confirm the new/renamed files pass ESLint.
- `npm install` after the `package.json` change to lock `zod` as a
  direct dependency.
- Re-run the four curls from `spec.md` against `localhost:8080` once
  implemented, to confirm the real fetch calls parse cleanly through the
  new schemas.
