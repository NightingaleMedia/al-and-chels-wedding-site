import { z } from 'zod'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

/** Presets for the dietary radio; anything else is treated as a custom answer. */
export const DIETARY_PRESETS = ['love it all', 'vegetarian'] as const
export const DEFAULT_DIETARY_PREFERENCE = DIETARY_PRESETS[0]

export const guestDetailsSchema = z.object({
  dietaryPreference: z.string(),
  spiritAnimal: z.string(),
})
export type GuestDetails = z.infer<typeof guestDetailsSchema>

/** The shape of the form — used to validate drafts read back from storage. */
export const draftSchema = z.object({
  attendingGuestIds: z.array(z.string()),
  guestDetails: z.record(guestDetailsSchema),
  email: z.string(),
  phoneNumber: z.string(),
  textOptIn: z.boolean(),
})
export type RSVPFormValues = z.infer<typeof draftSchema>

/** The same shape plus the rules a guest must satisfy to submit. */
export const rsvpFormSchema = draftSchema.extend({
  attendingGuestIds: z.array(z.string()).min(1, 'Select at least one guest'),
  email: z.string().email('Enter a valid email'),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9\s\-()]{10,}$/, 'Enter a valid phone number'),
})

export type RSVPStep = 1 | 2 | 3 | 4

/** Each step validates only what it renders; step 4 is the result screen. */
export const stepSchemas: Record<RSVPStep, z.ZodTypeAny> = {
  1: rsvpFormSchema.pick({ attendingGuestIds: true }),
  2: rsvpFormSchema.pick({ guestDetails: true }),
  3: rsvpFormSchema.pick({ email: true, phoneNumber: true, textOptIn: true }),
  4: z.object({}),
}

export const getInitialValues = (party: Party): RSVPFormValues => ({
  attendingGuestIds: [],
  guestDetails: Object.fromEntries(
    party.members.map((m) => [
      m.uuid,
      { dietaryPreference: DEFAULT_DIETARY_PREFERENCE, spiritAnimal: '' },
    ]),
  ),
  email: '',
  phoneNumber: '',
  textOptIn: false,
})
