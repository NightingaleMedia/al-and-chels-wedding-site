'use server'

import { backendRequest } from './backendRequest'
import { partyEnvelopeSchema, type GetPartyByGuestId } from './weddingBackend.schemas'

export const getPartyByGuestId = (async (guestId) => {
  const { data } = await backendRequest({
    action: 'getPartyByGuestId',
    path: `/info/party-by-guest/${guestId}`,
    method: 'GET',
    envelope: partyEnvelopeSchema,
    details: { guestId },
  })
  return data
}) satisfies GetPartyByGuestId
