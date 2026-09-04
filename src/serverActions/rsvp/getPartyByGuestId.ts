'use server'

import {
  partyResponseSchema,
  type GetPartyByGuestId,
} from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const GET_PARTY_BY_GUEST_ID_ENDPOINT = '/info/party-by-guest'

export const getPartyByGuestId = (async (guestId) => {
  const res = await backendClient(
    `${GET_PARTY_BY_GUEST_ID_ENDPOINT}/${guestId}`,
  )
  if (!res.ok) throw new Error(res.statusText)
  return partyResponseSchema.parse(await res.json()).data
}) satisfies GetPartyByGuestId
