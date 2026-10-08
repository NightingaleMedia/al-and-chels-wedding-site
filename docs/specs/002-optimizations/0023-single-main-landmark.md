# 0023 — Single `<main>` landmark & resolve container style clashes

**Group:** B — Markup & layout semantics

## Problem

The root layout already renders a `<main>` landmark that wraps all page content:

```tsx
// src/app/layout.tsx
<main className="min-h-full max-w-screen-md mt-[42px] flex-1">
  <Box className="pt-6">{children}</Box>
</main>
```

But several pages render their **own** `<main>` inside that one, producing nested
`<main>` elements. Nesting landmark `<main>` tags is invalid HTML and an
accessibility problem (there must be exactly one `<main>` per page). It also
causes **clashing container styles** — the layout constrains width with
`max-w-screen-md` and adds `pt-6`, while pages independently set `max-w-xl` /
`max-w-2xl`, `mx-auto`, and their own padding, so the two containers fight.

### Offending pages (nested `<main>`)

- `src/app/page.tsx` — `<main className="p-4">`
- `src/app/rsvp/page.tsx` — `<main className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">`
- `src/app/the-wedding/schedule/page.tsx` — `<main className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">`
- `src/app/rsvp/[partyId]/page.tsx` — **two** `<main>` tags (success + error branches)

## Goal

- Keep exactly **one** `<main>` landmark, in `src/app/layout.tsx`.
- Pages must not render `<main>`. Replace each page-level `<main>` with a
  non-landmark wrapper (`<div>`, `<section>`, or MUI `<Box>`).
- Page wrapper styles must not clash with the layout container. Decide where each
  responsibility lives and apply consistently:
  - **Width constraint / centering** (`max-w-*`, `mx-auto`): pick one owner.
    Prefer the layout's `<main>` as the single width authority. If specific pages
    need a different max width (e.g. RSVP's `max-w-xl`, schedule's `max-w-2xl`),
    decide whether to (a) widen/neutralize the layout constraint and let pages
    own width, or (b) keep the layout as the authority and drop the per-page
    `max-w-*`. Document the chosen convention.
  - **Padding**: avoid stacking the layout's `Box pt-6` with per-page `p-4` /
    `py-8` in a way that produces inconsistent spacing. Normalize so top/side
    padding is predictable across routes.

## Suggested approach

1. Establish the convention in `layout.tsx`: the `<main>` (and its inner `Box`)
   is the single container that owns max width, horizontal centering, and base
   padding. Adjust its classes if needed so pages don't need their own container.
2. In each offending page, change `<main ...>` to `<div ...>` / `<Box ...>` and
   strip the container-level classes that now duplicate the layout
   (`max-w-*`, `mx-auto`, and redundant padding), keeping only page-specific
   layout like `flex flex-col gap-*`.
3. For `rsvp/[partyId]`, coordinate with [0022](./0022-dynamic-route-suspense.md)
   since that file is being refactored anyway — both `<main>` branches must
   become non-`main` wrappers.

## Acceptance Criteria

- Exactly one `<main>` element in the rendered DOM for every route (verify in the
  browser / via view-source).
- No visual regressions: page width, centering, and spacing look correct and
  consistent across `/`, `/rsvp`, `/rsvp/[partyId]`, and
  `/the-wedding/schedule`.
- A short note in this file (or the PR description) stating the agreed container
  convention (who owns width/centering/padding).
- `npm run build` passes.
