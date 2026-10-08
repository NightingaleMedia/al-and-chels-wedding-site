# 002 — Build & Rendering Optimizations

## Overview

Clean up and optimize the app after enabling **Cache Components**
(`cacheComponents: true` in `next.config.ts`). The production build was failing
during prerendering; the hard failures are now fixed (see "Already Done" below).
This spec covers the remaining cleanup, correctness, and optimization work.

## Already Done (build is green)

- `src/app/loading.tsx` no longer performs backend work during prerender.
- Added `src/components/warmup/BackendWarmup.tsx` — runs `pingBackend()` at
  request time (`await connection()` + `pingBackend()`), returns `null`, must be
  rendered inside `<Suspense>`.
- `src/app/rsvp/page.tsx` and `src/app/send-me-updates/page.tsx` now render
  `<Suspense fallback={null}><BackendWarmup /></Suspense>` instead of awaiting
  `pingBackend()` at the top level.

## Ground Rules

Under `cacheComponents: true`, every route is prerendered into a static shell at
build time. Anything request-time or non-deterministic (cookies, headers,
searchParams, uncached fetch, `Math.random`, `Date.now`, `new Date`,
`crypto.randomUUID`) must be either:

- **(a)** wrapped in `"use cache"` + `cacheLife(...)` (cached/prerendered), or
- **(b)** inside a `<Suspense>` boundary with `await connection()` before the
  dynamic work (streamed at request time), or
- **(c)** moved into a Client Component.

Do not re-introduce blocking backend calls or synchronous non-deterministic IO
into prerendered (server, non-Suspense) code paths. Run `npm run build` after
each group and keep it green.

Reference: https://nextjs.org/docs/app/guides/migrating-to-cache-components

## Task Groups

### Group A — Cache Components cleanup
Finish adopting Cache Components by removing the temporary codemod opt-outs and
converting data-driven routes to the correct pattern.

- **[0021-remove-static-opt-outs.md](./0021-remove-static-opt-outs.md)** —
  Delete the dead `export const instant = false` opt-outs from purely static
  pages.
- **[0022-dynamic-route-suspense.md](./0022-dynamic-route-suspense.md)** —
  Convert `rsvp/[partyId]` to the Suspense-params pattern and review/fix the
  remaining data-touching pages.

### Group B — Markup & layout semantics
- **[0023-single-main-landmark.md](./0023-single-main-landmark.md)** —
  Keep a single `<main>` landmark in the root layout; remove nested `<main>`
  tags from pages and resolve clashing container styles.

### Group C — Configuration hardening
- **[0024-image-remote-patterns.md](./0024-image-remote-patterns.md)** —
  Replace the deprecated `images.domains` with `images.remotePatterns`.

### Group D — Backend warm-up architecture
- **[0025-warmup-architecture.md](./0025-warmup-architecture.md)** —
  Evaluate whether per-page `<BackendWarmup>` is the right approach or whether
  warm-up belongs somewhere more central. (Requires sign-off before changing.)

### Group E — Governance / preventing regressions
- **[0026-codify-conventions.md](./0026-codify-conventions.md)** —
  Record the lessons/technical debt from this spec in `AGENTS.md` (and
  `openspec/specs/` where appropriate) so these mistakes don't recur.

## Acceptance Criteria (whole spec)

- `npm run build` passes with no prerender errors and no `images.domains`
  deprecation warning.
- No remaining `export const instant = false` / `@next-codemod-ignore` comments
  unless a route genuinely must block (documented inline with the reason).
- No blocking backend calls or synchronous non-deterministic IO in prerendered
  server code.
- Exactly one `<main>` landmark per rendered page.
- Static pages render as `○ (Static)`; data-driven routes render as
  `◐ (Partial Prerender)`.
- The lessons from this spec are codified in `AGENTS.md` (and `openspec/specs/`
  where appropriate) so they are enforced on future work.
