import { z } from 'zod'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

/** Presets for the dietary radio; anything else is treated as a custom answer. */
export const DIETARY_PRESETS = ['love it all', 'vegetarian'] as const
export const DEFAULT_DIETARY_PREFERENCE = DIETARY_PRESETS[0]

export const guestDetailsSchema = z.object({
  dietaryPreference: z.string().optional(),
  spiritAnimal: z.string().optional(),
})
export type GuestDetails = z.infer<typeof guestDetailsSchema>

/** The shape of the form — used to validate drafts read back from storage. */
export const draftSchema = z.object({
  // guest uuid -> attending. A missing key means the guest has not answered yet,
  // which is why this is a record and not a list of attending ids.
  responses: z.record(z.boolean()),
  guestDetails: z.record(guestDetailsSchema),
  email: z.string(),
  phone: z.string(),
  textOptIn: z.boolean().default(false),
})
export type RSVPFormValues = z.infer<typeof draftSchema>

/** The same shape plus the rules a guest must satisfy to submit. */
export const rsvpFormSchema = draftSchema.extend({
  email: z.string().email('Enter a valid email'),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{10,}$/, 'Enter a valid phone number'),
})

export type RSVPStep = 1 | 2 | 3 | 4

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
