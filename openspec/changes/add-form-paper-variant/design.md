## Context

The wedding site uses Material-UI v9.4.0 with a custom theme defined in `src/styles/theme.ts`. The theme currently customizes palette, typography, breakpoints, and component overrides for MuiCssBaseline, MuiList, MuiListItem, and MuiToolbar. Forms like RSVPForm currently use Tailwind classes for layout rather than MUI Paper components. The project uses TypeScript with React 19 and Next.js 16.

See proposal.md - Why for motivation.

## Goals / Non-Goals

**Goals:**
- Create a reusable, theme-aware form container using MUI Paper variant pattern
- Provide clear customization points for developers to adjust visual properties
- Maintain type safety with TypeScript module augmentation
- Follow MUI v9 best practices for theme extension

**Non-Goals:**
- Automatically migrating existing forms to use the new variant (optional adoption)
- Creating multiple form-related variants (starting with one "form" variant)
- Replacing or removing Tailwind from the project

## Decisions

### Decision 1: Use MUI Paper variants over custom wrapper component

**Rationale:** MUI's variant system is the standard pattern for creating component style variations. It integrates natively with the theme, supports TypeScript augmentation, and is more maintainable than creating a custom wrapper component.

**Alternatives considered:**
- **Custom FormPaper component wrapping Paper**: Would require more boilerplate, duplicate Paper's props, and doesn't leverage MUI's built-in variant system
- **Styled component using Emotion**: Would work but loses integration with theme.components structure and the variant prop pattern developers expect

### Decision 2: Define variant in theme.ts using components.MuiPaper.variants

**Rationale:** This is MUI's official pattern for adding custom variants. It keeps all theme configuration centralized in one file and allows the variant to access theme values (palette, spacing, etc.) through the theme parameter.

**Alternatives considered:**
- **Separate theme extension file**: Would modularize the code but fragments theme configuration across multiple files, making it harder to see the full theme structure
- **Runtime styled override**: Would work but wouldn't be available at theme creation time

### Decision 3: TypeScript augmentation in a dedicated .d.ts file

**Rationale:** TypeScript module augmentation for MUI requires a separate declaration file. Placing it in `src/types/mui-augmentation.d.ts` follows common patterns and keeps type definitions separate from runtime code.

**Alternatives considered:**
- **Co-locate with theme.ts**: TypeScript module augmentation doesn't work well in .ts files that are imported normally; requires a .d.ts file
- **Global types directory**: Could use `types/` at root, but `src/types/` keeps it closer to the theme implementation

### Decision 4: Provide boilerplate values with comments, not finalized styling

**Rationale:** The user specifically requested "boilerplate and places where I can tweak the knobs" and wants to "add my own design spec". This means providing reasonable defaults with clear comments indicating what each property controls.

**Alternatives considered:**
- **Empty placeholders**: Would require user to research all properties
- **Fully designed variant**: Would overstep the user's request to customize the design themselves

## Risks / Trade-offs

**[Risk] Module augmentation may not be picked up by TypeScript** → Mitigation: Ensure tsconfig.json includes the types directory, or place the .d.ts file where TypeScript will automatically discover it (src/types/)

**[Risk] Form variant might conflict with future MUI variant names** → Mitigation: Use a descriptive name ("form") that's unlikely to conflict; MUI rarely adds new Paper variants

**[Trade-off] Variant-based approach requires theme access** → This means the variant only works within ThemeProvider, but that's already required for the existing theme

**[Trade-off] Developers must remember to use variant="form"** → This is intentional - allows gradual adoption and doesn't force the style on all Paper components
