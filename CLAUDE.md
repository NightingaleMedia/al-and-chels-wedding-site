@AGENTS.md

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
