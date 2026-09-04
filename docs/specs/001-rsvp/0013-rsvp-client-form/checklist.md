# Spec 0013 — RSVP Client Form: Implementation Checklist

Tracking list for the multi-step RSVP form. Each phase branch checks off its
own items; every PR body carries the full list with cumulative state.

## Phase 1 — Form state model & step machine (`phase-1-form-state-model`)

- [x] Per-guest detail entries keyed by guest `uuid` (dietary preference, favorite color, spirit animal)
- [x] Party-level contact block (email, phone, text opt-in)
- [x] Per-step Zod schemas so each step validates only its own fields
- [x] `useRSVPSteps` navigation hook (next / back / goto, guarded by step validity)
- [x] `toSubmitRsvpRequest` mapper: form values → `SubmitRsvpRequest`
- [x] `useFormikRSVP` validates against the current step only

## Phase 2 — Steps 1 & 2 (`phase-2-steps-select-and-details`)

- [x] Step 1: guest checklist rendered from `party.members`
- [x] Step 2: per-selected-guest dietary preference, HEX color picker, spirit animal

## Phase 3 — Steps 3 & 4 (`phase-3-steps-contact-and-result`)

- [x] Step 3: email, phone number, text opt-in (opt-in recommended copy)
- [x] Step 4: success / error terminal step with `chelsandalsigman@gmail.com` contact

## Phase 4 — Orchestrator & submission (`phase-4-orchestrator`)

- [x] `RSVPForm.tsx` client component wiring Formik + the four steps
- [x] localStorage persistence via `useFormStorage` (restore on mount, save on change, clear on success)
- [x] Submit through the `submitRsvp` server action, errors routed to step 4
- [x] Barrel `index.ts` export
- [x] `tsc --noEmit` and `next lint` clean

## Out of scope (per spec)

- Page-level stitching / routing — later spec
- Guest search UI — the form starts from an already-resolved party
- Visual design polish

## Known blockers

- **B1 — RESOLVED.** The backend accepts `guestName`, `dietaryPreference` and
  `spiritAnimal` per RSVP entry plus `email` / `phoneNumber` / `textOptIn` at the
  top level, so the collected answers are now submitted rather than dropped.
  `rsvpEntrySchema` was missing the **required** `guestName`, which made every
  submit fail backend validation.
- **B2 — Meal choice.** Backend supports `mealChoice`; spec 0013 defines no meal
  step, so it is not sent.
- **B4 — Favorite color removed.** The HEX picker called for in the spec was
  taken out of the form; re-add if it is still wanted.
- **B5 — `/rsvp` has no party.** Without guest search the bare route can only
  point guests at their invitation link; `/rsvp/<partyId>` is the working entry.
