'use server'

import { partyEnvelopeSchema, type GetPartyByGuestId } from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const GET_PARTY_BY_GUEST_ID_ENDPOINT = '/info/party-by-guest'

export const getPartyByGuestId = (async (guestId) => {
  const res = await backendClient(`${GET_PARTY_BY_GUEST_ID_ENDPOINT}/${guestId}`)
  const parsed = partyEnvelopeSchema.parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return parsed.data
}) satisfies GetPartyByGuestId
