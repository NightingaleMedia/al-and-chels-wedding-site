# 0021 — Remove dead `instant = false` opt-outs from static pages

**Group:** A — Cache Components cleanup

## Problem

A codemod blanket-added `export const instant = false` (plus a
`// @next-codemod-ignore ...` comment block) to nearly every page during Cache
Components adoption. `instant = false` only defers instant-navigation
*validation*; it does not force a route dynamic and does not suppress real
prerender errors. For purely static pages it is dead weight that hides whether
the page truly prerenders cleanly.

## Scope

Purely static pages (static JSX, no server-side data access). For each, delete
the `export const instant = false` line **and** the preceding
`// @next-codemod-ignore` / "Remove this opt-out" / "See:" comment block:

- `src/app/travel/page.tsx`
- `src/app/travel/day-of-travel/page.tsx`
- `src/app/travel/getting-there/page.tsx`
- `src/app/travel/accommodations/page.tsx`
- `src/app/faqs/page.tsx`
- `src/app/about-us/page.tsx`
- `src/app/about-us/add-your-pictures/page.tsx`
- `src/app/coming-soon/page.tsx`
- `src/app/privacy-policy/page.tsx`
- `src/app/terms-and-conditions/page.tsx`
- `src/app/the-location/page.tsx`
- `src/app/the-wedding/location/page.tsx`
- `src/app/the-wedding/schedule/page.tsx`
- `src/app/registry/page.tsx`
- `src/app/save-the-date/page.tsx`

Also remove the commented-out `// export const instant = false` and codemod
comment block from `src/app/page.tsx`.

## Steps

1. **Read each file first** and confirm it has no server-side data access / async
   data fetching. If a page actually fetches data, do **not** handle it here —
   defer it to [0022](./0022-dynamic-route-suspense.md).
2. Remove the opt-out line and its comment block.
3. Run `npm run build`.

## Acceptance Criteria

- All listed routes still build and appear as `○ (Static)` in the route table.
- No `instant = false` or `@next-codemod-ignore` comments remain in these files.
- `npm run build` passes.

## Notes

- `src/app/about-us/add-your-story/page.tsx` had no opt-out in the audit — verify
  and leave as-is if already clean.
- Do not touch `rsvp/[partyId]`, `about-us/photo-gallery`, or
  `admin/pending-photos` here; they are covered by 0022.
