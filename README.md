# Al & Chel's Wedding Site

This repository contains a Next.js wedding website with the initial navigation, page structure, and "save the date" launch mode configured.

## High-level features added in this feature branch

- Added a wedding-focused route structure with dedicated pages for:
  - `/save-the-date`
  - `/about-us`
  - `/getting-there`
  - `/the-location`
  - `/pictures`
  - `/registry`
  - `/schedule`
  - `/add-your-story`
- Added a Material UI-based top navigation component (`src/components/NavBar.tsx`) with links to all major wedding sections.
- Added global theming via Material UI (`src/styles/theme.ts`, `src/styles/ThemeRegistry.tsx`) and wired it into the app layout.
- Added feature flags (`src/features.ts`) to control:
  - whether the navbar is shown
  - whether the site is locked to only the save-the-date experience
- Added middleware (`src/middleware.ts`) that redirects all non-framework routes to `/save-the-date` when `onlySaveTheDate` is enabled.
- Updated app layout wiring (`src/app/layout.tsx`) to include theme providers and optional navbar rendering.

## Libraries added in this feature branch

- `@mui/material`
- `@mui/icons-material`
- `@mui/material-nextjs`
- `@emotion/react`
- `@emotion/styled`
- `@emotion/cache`

These packages provide the Material UI component library plus Emotion styling support required by MUI in the App Router setup.

## Relevant implementation details

- The current feature defaults are:
  - `navbar: false`
  - `onlySaveTheDate: true`
- With these defaults, users are redirected to `/save-the-date`, and the navbar is hidden until those flags are changed.
- Global styles were moved to `src/styles/globals.css` and imported from layout.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.
