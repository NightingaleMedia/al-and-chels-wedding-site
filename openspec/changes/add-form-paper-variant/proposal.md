## Why

The wedding site currently lacks a consistent, styled container component for forms. Forms are rendered with basic Tailwind classes (`flex flex-col gap-6 outline-1 p-2`), but would benefit from a dedicated Material-UI Paper variant that provides reusable, theme-aware styling specifically designed for form containers on this site.

## What Changes

- Add a new `"form"` variant to the MUI Paper component through theme augmentation
- Extend TypeScript types for Material-UI to recognize the new variant
- Provide boilerplate theme configuration with clearly marked customization points for visual properties (elevation, padding, borders, colors, etc.)
- Create a reusable form container pattern that integrates with the existing theme

## Capabilities

### New Capabilities

- `ui/form-paper-variant`: Custom Material-UI Paper variant for form containers with theme augmentation and TypeScript module augmentation

### Modified Capabilities

## Impact

- **Theme Configuration**: `src/styles/theme.ts` will be extended with Paper component variant definitions
- **TypeScript Types**: New type declaration file needed for Material-UI module augmentation to support the custom variant
- **Form Components**: Existing forms (RSVPForm and others) can optionally adopt the new variant
- **Design System**: Establishes a pattern for future theme customizations and variant extensions
