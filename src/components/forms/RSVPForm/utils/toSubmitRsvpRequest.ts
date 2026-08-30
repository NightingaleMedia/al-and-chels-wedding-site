import type { Party, SubmitRsvpRequest } from '@/serverActions/rsvp/weddingBackend.schemas'
import type { RSVPFormValues } from '../types'

/** `partyId` is optional on the party schema; members carry it as `group_id`. */
export const resolvePartyId = (party: Party): string => {
  const partyId = party.partyId ?? party.members.find((m) => m.group_id)?.group_id
  if (!partyId) throw new Error('Party is missing an id, cannot submit RSVP')
  return partyId
}

/**
 * Every member of the party is reported, not just the checked ones: an
 * unchecked guest is an explicit decline, which is what the backend's
 * `isAttending: false` means. Silently omitting them would leave those guests
 * stuck on "Not Responded".
 *
 * Dietary preference, favorite color and spirit animal are deliberately not
 * sent — see blocker B1, the backend contract has no fields for them.
 */
export const toSubmitRsvpRequest = (
  party: Party,
  values: RSVPFormValues,
): SubmitRsvpRequest => ({
  partyId: resolvePartyId(party),
  rsvps: party.members.map((member) => ({
    guestId: member.uuid,
    isAttending: values.attendingGuestIds.includes(member.uuid),
  })),
})
