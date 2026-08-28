import { z } from 'zod'
import { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

export const RSVPFormSchema = z.object({
  selectedGuestIds: z.array(z.string()).min(1, 'Select at least one guest'),
  dietaryPreferences: z.record(z.string()),
  favoriteColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  spiritAnimal: z.string().min(1, 'Spirit animal is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().regex(/^\+?[0-9\s\-()]{10,}$/, 'Invalid phone'),
  textOptIn: z.boolean(),
  currentStep: z.number(),
})

export type RSVPFormValues = z.infer<typeof RSVPFormSchema>

export interface RSVPFormProps {
  party: Party
  onSuccess?: (result: { success: true }) => void
  onError?: (error: Error) => void
  storageKey?: string
}

export const getInitialFormValues = (): RSVPFormValues => ({
  selectedGuestIds: [],
  dietaryPreferences: {},
  favoriteColor: '#000000',
  spiritAnimal: '',
  email: '',
  phoneNumber: '',
  textOptIn: false,
  currentStep: 1,
})
