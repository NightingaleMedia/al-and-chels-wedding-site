# 0022 — Convert data-driven routes to the Cache Components pattern

**Group:** A — Cache Components cleanup

## Problem

Some routes access data that cannot be prerendered. They currently rely on
`export const instant = false` to "allow blocking," which is a migration crutch,
not the intended end state. They should use the proper Cache Components pattern:
push dynamic data access below a `<Suspense>` boundary (streamed at request time)
or cache it with `"use cache"`.

## Scope

### 1. `src/app/rsvp/[partyId]/page.tsx`

Currently awaits `props.params` at the top and then
`await getPartyByPartyId(partyId)` inside a try/catch, guarded by
`export const instant = false`.

Per the docs ("Await `params` inside `<Suspense>`"), the page component must not
await `params` at the top. Instead:

- Make the default export a **non-async** function that passes the `params`
  promise down into a `<Suspense fallback={...}>`-wrapped child component.
- Move `await props.params`, `getPartyByPartyId`, and the try/catch error
  handling (the `ErrorPanel` fallback) into that async child.
- Remove `export const instant = false` and its codemod comment block.
- Use a sensible fallback (e.g. `LoadingPageComponents` or a simple skeleton).

### 2. `src/app/about-us/photo-gallery/page.tsx`
### 3. `src/app/admin/pending-photos/page.tsx`

- **Read each first.** If they are Client Components (`'use client'`) or only
  fetch via client code (`useEffect` / server actions called client-side), they
  prerender fine — just remove the `instant = false` opt-out and comment block.
- If either does server-side data access, apply the same Suspense +
  `connection()` pattern, or `"use cache"` + `cacheLife(...)` if the data is
  cacheable.

## Steps

1. Refactor `rsvp/[partyId]` to the Suspense-params pattern.
2. Review and clean up `photo-gallery` and `admin/pending-photos`.
3. Run `npm run build`.
4. In `next dev`, verify `/rsvp/<validId>` renders the form and
   `/rsvp/<invalidId>` renders the error panel.

## Acceptance Criteria

- `rsvp/[partyId]` builds as `◐ (Partial Prerender)` with no `instant = false`.
- Valid and invalid `partyId` both behave correctly at runtime.
- `photo-gallery` and `admin/pending-photos` build without opt-outs (or with a
  documented reason if one is truly required).
- `npm run build` passes.
