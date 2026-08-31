import { z } from 'zod'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

export const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i
export const PHONE_REGEX = /^\+?[0-9\s\-()]{10,}$/

export const DEFAULT_COLOR = '#000000'

export const guestDetailsSchema = z.object({
  dietaryPreference: z.string(),
  favoriteColor: z.string().regex(HEX_COLOR_REGEX, 'Pick a color'),
  spiritAnimal: z.string().min(1, 'Spirit animal is required'),
})
export type GuestDetails = z.infer<typeof guestDetailsSchema>

export const contactSchema = z.object({
  email: z.string().email('Enter a valid email'),
  phoneNumber: z.string().regex(PHONE_REGEX, 'Enter a valid phone number'),
  textOptIn: z.boolean(),
})
export type Contact = z.infer<typeof contactSchema>

export const rsvpFormSchema = z.object({
  attendingGuestIds: z.array(z.string()).min(1, 'Select at least one guest'),
  guestDetails: z.record(guestDetailsSchema),
  contact: contactSchema,
})
export type RSVPFormValues = z.infer<typeof rsvpFormSchema>

export const RSVP_STEPS = [1, 2, 3, 4] as const
export type RSVPStep = (typeof RSVP_STEPS)[number]

export const FIRST_STEP: RSVPStep = 1
export const LAST_STEP: RSVPStep = 4

/**
 * Details are only required for the guests actually being RSVP'd, so step 2 is
 * validated against the current selection rather than the whole record.
 */
const step2Schema = rsvpFormSchema.superRefine((values, ctx) => {
  values.attendingGuestIds.forEach((guestId) => {
    const result = guestDetailsSchema.safeParse(values.guestDetails[guestId])
    if (result.success) return
    result.error.issues.forEach((issue) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: issue.message,
        path: ['guestDetails', guestId, ...issue.path],
      })
    })
  })
})

/**
 * Each step validates only the fields it renders, so a guest is never blocked
 * by an error on a screen they have not reached yet. Step 4 is terminal and
 * has nothing left to validate.
 */
export const stepSchemas: Record<RSVPStep, z.ZodTypeAny> = {
  1: rsvpFormSchema.pick({ attendingGuestIds: true }),
  2: step2Schema,
  3: rsvpFormSchema.pick({ contact: true }),
  4: z.object({}),
}

export const getInitialGuestDetails = (): GuestDetails => ({
  dietaryPreference: '',
  favoriteColor: DEFAULT_COLOR,
  spiritAnimal: '',
})

/**
 * Seeds a detail entry for every member of the party up front. Selection then
 * only ever toggles ids in `attendingGuestIds` — no lazily-created records, no
 * undefined checks in the step components.
 */
export const getInitialFormValues = (party: Party): RSVPFormValues => ({
  attendingGuestIds: [],
  guestDetails: Object.fromEntries(
    party.members.map((member) => [member.uuid, getInitialGuestDetails()]),
  ),
  contact: { email: '', phoneNumber: '', textOptIn: false },
})

export interface RSVPFormProps {
  party: Party
  onSuccess?: (result: { success: true }) => void
  onError?: (error: Error) => void
  storageKey?: string
}
