'use server'

import { partyEnvelopeSchema, type GetPartyByGuestId } from './weddingBackend.schemas'

const GET_PARTY_BY_GUEST_ID_ENDPOINT = '/info/party-by-guest'

export const getPartyByGuestId = (async (guestId) => {
  const res = await fetch(`${process.env.WEDDING_BACKEND}${GET_PARTY_BY_GUEST_ID_ENDPOINT}/${guestId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })
  const parsed = partyEnvelopeSchema.parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return parsed.data
}) satisfies GetPartyByGuestId
