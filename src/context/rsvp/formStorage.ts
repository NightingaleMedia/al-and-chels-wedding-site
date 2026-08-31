import type { RSVPFormValues } from '@/components/forms/RSVPForm/types'

const key = (partyId: string) => `rsvp-form-${partyId}`

/** localStorage wrapper that is a no-op wherever storage is unavailable (SSR, private mode). */
export const draftStorage = {
  load: (partyId: string): RSVPFormValues | null => {
    try {
      const raw = localStorage.getItem(key(partyId))
      return raw ? (JSON.parse(raw) as RSVPFormValues) : null
    } catch {
      return null
    }
  },

  save: (partyId: string, values: RSVPFormValues) => {
    try {
      localStorage.setItem(key(partyId), JSON.stringify(values))
    } catch {
      // storage full or blocked — the draft is a convenience, not a requirement
    }
  },

  clear: (partyId: string) => {
    try {
      localStorage.removeItem(key(partyId))
    } catch {
      // see above
    }
  },
}
