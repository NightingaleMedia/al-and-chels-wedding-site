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

# Branching Strategy

Every spec gets a **feature branch** and **phase branches**.

## Pattern

```
feature/spec-NNN-description          ← Feature branch for entire spec
  └─ spec-NNN-description/phase-N-description  ← Sub-branch for each phase
```

## Workflow

**Start a new spec (Phase 1):**

```bash
.claude/scripts/create-feature-branch.sh "001-rsvp" "types-and-utilities"
```

This creates:

- `feature/spec-001-rsvp` (if it doesn't exist)
- `spec-001-rsvp/phase-1-types-and-utilities` (checked out)

**Move to next phase:**

```bash
.claude/scripts/create-feature-branch.sh "001-rsvp" "hooks" 2
```

Creates and checks out: `spec-001-rsvp/phase-2-hooks`

## Automation

- Script in `.claude/scripts/create-feature-branch.sh` handles branch creation
- Hook reminds you if commits are on wrong branch
- Each phase branch tracks back to its feature branch for PR merging

# Pull Request Standard

Every spec gets a checklist file at `specs/<spec>/checklist.md`, broken down by
phase. Each phase branch checks off the items it completed; the PR body carries
the **full** checklist with cumulative state, so a reviewer can see remaining
work at a glance.

PR bodies use exactly these four sections, in this order:

1. **Checklist** — the whole spec checklist, copied verbatim with completed
   items ticked. This is the main content of the PR.
2. **What was done** — a high-level bullet list of the changes in this PR.
3. **Design notes** — the architectural thinking: what was chosen, what was
   rejected, and why. Defend the design choices; do not just describe them.
4. **Blockers & metadata** — anything blocked or deferred (give it an ID and
   reference it from the checklist), plus base branch, spec link, and how the
   change was verified.

If something is blocked, mark it in the PR rather than silently working around
it, and leave its checklist item unticked.
