# Spec 1: Wedding Backend API Client Adapter

## Goal

Define the shape of a set of Next.js server actions that talk to the
external wedding backend via the built-in `fetch`. This spec establishes
file layout, method signatures, and empty request/response interfaces
only — no guessing at field names, types, or endpoint paths. Spec 2 will
fill in the interfaces, endpoints, and fetch logic.

## Config

- `WEDDING_BACKEND` — base URL of the backend, read from `.env`, server-side only.

## File layout

- `src/serverActions/weddingBackend.interfaces.ts` — all request/response interfaces and function types
- `src/serverActions/submitRsvp.ts` — POST, submit an RSVP for a guest/party
- `src/serverActions/getGuestByPartyId.ts` — GET, fetch a guest/party by party id
- `src/serverActions/searchGuestByName.ts` — POST, search for a guest by name

Each method is its own server action file (`'use server'`) and uses
`satisfies` against its function type from the interfaces file to
guarantee conformance without widening the exported type.

## Interfaces (to be filled in — Spec 2)

```ts
// src/serverActions/weddingBackend.interfaces.ts

export interface SubmitRsvpRequest {}
export interface SubmitRsvpResponse {}
export type SubmitRsvp = (request: SubmitRsvpRequest) => Promise<SubmitRsvpResponse>

export interface GetGuestByPartyIdRequest {}
export interface GetGuestByPartyIdResponse {}
export type GetGuestByPartyId = (partyId: string) => Promise<GetGuestByPartyIdResponse>

export interface SearchGuestByNameRequest {}
export interface SearchGuestByNameResponse {}
export type SearchGuestByName = (request: SearchGuestByNameRequest) => Promise<SearchGuestByNameResponse>
```

## Method file pattern

Endpoint paths are unknown — each file gets a `SCREAMING_SNAKE_CASE`
constant left as a `TODO` for a human to fill in.

```ts
// src/serverActions/submitRsvp.ts
'use server'

import type { SubmitRsvp } from './weddingBackend.interfaces'

const SUBMIT_RSVP_ENDPOINT = '' // TODO: set endpoint path

export const submitRsvp = (async (request) => {
  const res = await fetch(`${process.env.WEDDING_BACKEND}${SUBMIT_RSVP_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    cache: 'no-store',
  })
  return res.json()
}) satisfies SubmitRsvp
```

`getGuestByPartyId.ts` and `searchGuestByName.ts` follow the same
pattern (`GET_GUEST_BY_PARTY_ID_ENDPOINT`, `SEARCH_GUEST_BY_NAME_ENDPOINT`),
using `GetGuestByPartyId` / `SearchGuestByName` for the `satisfies` check
and `GET` / `POST` respectively for `method`.

## Out of scope for Spec 1

- Field-level shape of request/response bodies
- Actual endpoint paths
- Error handling / rate limiting / response validation
- Wiring into UI

## Open questions

- Endpoint paths for each method (`TODO` constants above)
- Existing `.env.example` defines `RSVP_API_BASE_URL`, not `WEDDING_BACKEND` — reconcile naming before Spec 2
