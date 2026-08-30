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

- [ ] `RSVPForm.tsx` client component wiring Formik + the four steps
- [ ] localStorage persistence via `useFormStorage` (restore on mount, save on change, clear on success)
- [ ] Submit through the `submitRsvp` server action, errors routed to step 4
- [ ] Barrel `index.ts` export
- [ ] `tsc --noEmit` and `next lint` clean

## Out of scope (per spec)

- Page-level stitching / routing — later spec
- Guest search UI — the form starts from an already-resolved party
- Visual design polish

## Known blockers

- **B1 — Backend contract gap.** `SubmitRsvpRequest` (`weddingBackend.schemas.ts`)
  accepts only `partyId` + `rsvps[{ guestId, isAttending, mealChoice }]`. Dietary
  preference, favorite color, spirit animal, email, phone and text opt-in have
  nowhere to go. Collected and validated client-side, held out of the request
  payload until the backend exposes fields for them.
- **B2 — Meal choice.** The backend supports `mealChoice`, but spec 0013 does not
  ask for a meal step, so none is rendered and the field is omitted.
