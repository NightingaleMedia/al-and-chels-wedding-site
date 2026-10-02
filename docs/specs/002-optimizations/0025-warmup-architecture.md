# 0025 — Review backend warm-up architecture

**Group:** D — Backend warm-up architecture

> **Requires sign-off before implementing.** This is an evaluation task; do not
> change the warm-up wiring without checking with the user, since it may be
> intentional for cold-start latency.

## Context

The backend warm-up (`pingBackend()` → mints a Google OIDC token via
`google-auth-library`, then POSTs `/warmup`) was previously called at the top of
`loading.tsx`, `rsvp/page.tsx`, and `send-me-updates/page.tsx`. Doing this during
prerender crashed the build (non-deterministic IO — `Math.random`/`Date.now`
inside the auth library).

It is now isolated in `src/components/warmup/BackendWarmup.tsx`, which calls
`await connection()` then `await pingBackend()` and returns `null`. It is
rendered inside `<Suspense fallback={null}>` on the RSVP and send-me-updates
pages.

## Questions to resolve

1. **Intent:** Is the warm-up meant to fire on a few key pages (RSVP flow entry
   points) or site-wide? What backend cold-start problem is it solving?
2. **Placement:** Per-page `<BackendWarmup>` is easy to forget and duplicate.
   Alternatives to evaluate:
   - A shared component rendered once in the layout behind `<Suspense>` (fires on
     every request — may be too aggressive / costly).
   - A client-side fire-and-forget (e.g. `fetch` in an effect, or on user intent
     such as focusing the search field) so it never touches render/prerender.
   - A dedicated route handler / middleware triggered by the client.
3. **Cost & correctness:** Each warm-up mints an OIDC token and hits the backend.
   Confirm this is acceptable per request, and that failures are non-fatal to the
   page (currently `pingBackend` throws on non-OK — inside `<Suspense>` this
   would surface as an error; confirm desired behavior).

## Deliverable

- A short recommendation (keep as-is vs. consolidate vs. move client-side) with
  rationale, posted for user sign-off.
- Only after approval: implement the chosen approach and keep the build green.

## Acceptance Criteria

- Documented recommendation reviewed by the user.
- If changed: warm-up still never runs during prerender, `npm run build` passes,
  and warm-up behavior at runtime matches the agreed intent.
