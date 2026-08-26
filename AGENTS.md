<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project conventions

## Stack

- **Next.js** (App Router) + **TypeScript**
- **MUI (Material UI)** for UI components — prefer MUI components over raw HTML elements wherever a suitable component exists
- **Tailwind CSS** for layout, spacing, and utility styling — do not use MUI's `sx` prop or `Box` for layout/spacing if a Tailwind class achieves the same result

## Styling rules

1. **Mobile first, always.** Start from the smallest screen and layer up with Tailwind responsive prefixes (`sm:`, `md:`, `lg:`). Never design desktop-first and then adapt down.
2. Use **Tailwind** for: margin, padding, gap, flex/grid layout, width/height, responsive breakpoints, text sizing.
3. Use **MUI** for: interactive components (Button, Menu, MenuItem, TextField, Dialog, Snackbar, etc.), theming, and component-level variants.
4. Do not mix `sx` layout props and Tailwind classes for the same concern — pick one. Tailwind wins for layout/spacing; MUI wins for component appearance.
5. Avoid inline styles unless there is no Tailwind or MUI equivalent.

## General

- This is a simple, content-focused **wedding site**. Keep UI clean and lightweight — no over-engineering.
- Keep components small and co-located with their page when they are only used once.
