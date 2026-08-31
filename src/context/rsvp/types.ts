import { z } from 'zod'
import type { useFormik } from 'formik'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

/** Presets for the dietary radio; anything else is treated as a custom answer. */
export const DIETARY_PRESETS = ['love it all', 'vegetarian'] as const
export const DEFAULT_DIETARY_PREFERENCE = DIETARY_PRESETS[0]

export const guestDetailsSchema = z.object({
  dietaryPreference: z.string().optional(),
  spiritAnimal: z.string().optional(),
})
export type GuestDetails = z.infer<typeof guestDetailsSchema>

/** The shape of the form. */
export const formValuesSchema = z.object({
  // guest uuid -> attending. A missing key means the guest has not answered yet,
  // which is why this is a record and not a list of attending ids.
  responses: z.record(z.boolean()),
  guestDetails: z.record(guestDetailsSchema),
  email: z.string(),
  phone: z.string(),
  textOptIn: z.boolean().default(false),
})
export type RSVPFormValues = z.infer<typeof formValuesSchema>

/** The same shape plus the rules a guest must satisfy to submit. */
export const rsvpFormSchema = formValuesSchema.extend({
  email: z.string().email('Enter a valid email'),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{10,}$/, 'Enter a valid phone number'),
})

export type RSVPStep = 1 | 2 | 3 | 4

export type RSVPStatus = 'editing' | 'success' | 'error'

/** Everything the step components may read. They hold no state of their own. */
export interface RSVPFormContextValue {
  party: Party
  formik: ReturnType<typeof useFormik<RSVPFormValues>>
  step: RSVPStep
  status: RSVPStatus
  errorMessage?: string
  /** Editable members who have answered yes — the ones step 2 asks about. */
  attendingMembers: Party['members']
  /** Members still to answer. */
  editableMembers: Party['members']
  /** Members who responded before this visit; read-only. */
  lockedMembers: Party['members']
  setResponse: (guestId: string, isAttending: boolean) => void
  next: () => void
  back: () => void
  retry: () => void
}
