import { z } from 'zod'
import type { FormikErrors } from 'formik'
import type {
  Party,
  SubmitRsvpRequest,
} from '@/serverActions/rsvp/weddingBackend.schemas'
import {
  DEFAULT_DIETARY_PREFERENCE,
  DIETARY_PRESETS,
  rsvpFormSchema,
  type RSVPFormValues,
  type RSVPStep,
} from './types'

/**
 * A guest who already responded is read-only: we show what they said and leave
 * their answer — and their existing food/spirit answers — untouched.
 */
export const splitMembers = (party: Party) => ({
  editableMembers: party.members.filter((m) => m.rsvp === 'Not Responded'),
  lockedMembers: party.members.filter((m) => m.rsvp !== 'Not Responded'),
})

export const getInitialValues = (party: Party): RSVPFormValues => ({
  responses: {},
  guestDetails: Object.fromEntries(
    party.members.map((m) => [
      m.uuid,
      { dietaryPreference: DEFAULT_DIETARY_PREFERENCE, spiritAnimal: '' },
    ]),
  ),
  email: '',
  phone: '',
  textOptIn: false,
})

/** Whether a dietary answer is one of the presets rather than a custom one. */
export const isDietaryPreset = (value: string | undefined) =>
  DIETARY_PRESETS.some((preset) => preset === value)

/**
 * Each step validates only what it renders; step 4 is the result screen.
 *
 * Step 1 depends on the party: guests who already responded are locked, so only
 * the editable ones need an answer.
 */
export const getStepSchemas = (
  editableGuestIds: string[],
): Record<RSVPStep, z.ZodTypeAny> => ({
  1: z.object({
    responses: z
      .record(z.boolean())
      .refine(
        (responses) => editableGuestIds.every((id) => id in responses),
        'Answer for everyone in your party',
      ),
  }),
  2: rsvpFormSchema.pick({ guestDetails: true }),
  3: rsvpFormSchema.pick({ email: true, phone: true, textOptIn: true }),
  4: z.object({}),
})

/** Zod issues keyed by field path, which is the shape Formik wants. */
export const toFormikErrors = (
  error: z.ZodError,
): FormikErrors<RSVPFormValues> =>
  Object.fromEntries(
    error.issues.map((issue) => [issue.path.join('.'), issue.message]),
  )

/**
 * Only the editable members are submitted — re-sending a locked member would
 * overwrite the answer they already gave with this form's defaults.
 */
export const toSubmitRequest = (
  partyId: string,
  editableMembers: Party['members'],
  values: RSVPFormValues,
): SubmitRsvpRequest => ({
  partyId,
  email: values.email,
  phone: values.phone,
  textOptIn: values.textOptIn,
  rsvps: editableMembers.map((member) => ({
    guestId: member.uuid,
    guestName: member.Name,
    isAttending: values.responses[member.uuid] ?? false,
    // The form calls it dietaryPreference; the backend field is foodPref.
    foodPref: values.guestDetails[member.uuid]?.dietaryPreference,
    spiritAnimal: values.guestDetails[member.uuid]?.spiritAnimal,
  })),
})
