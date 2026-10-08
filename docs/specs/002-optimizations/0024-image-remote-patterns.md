# 0024 — Replace deprecated `images.domains` with `images.remotePatterns`

**Group:** C — Configuration hardening

## Problem

`next.config.ts` uses `images.domains`, which Next.js 16 deprecates. The build
prints:

```
⚠ `images.domains` is deprecated in favor of `images.remotePatterns`.
  Please update next.config.ts to protect your application from malicious users.
```

Current config:

```ts
images: {
  domains: ['localhost', 'cache.marriott.com', 'media-api.xogrp.com'],
},
```

## Goal

Migrate to `remotePatterns`, keeping only the hostnames actually needed.

```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cache.marriott.com' },
    { protocol: 'https', hostname: 'media-api.xogrp.com' },
    { protocol: 'http', hostname: 'localhost' },
  ],
},
```

## Steps

1. Confirm which remote hosts are still used for `next/image` (search for
   `next/image` usage and image `src` values). Drop any hostname that is no
   longer referenced.
2. Replace `images.domains` with `images.remotePatterns`.
3. Run `npm run build`.

## Acceptance Criteria

- The `images.domains` deprecation warning no longer appears in build output.
- Remote images still load correctly in `next dev` / production build.
- `npm run build` passes.
