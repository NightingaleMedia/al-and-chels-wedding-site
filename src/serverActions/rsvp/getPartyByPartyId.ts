'use server'

import {
  partyResponseSchema,
  type GetPartyByPartyId,
} from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const GET_PARTY_BY_PARTY_ID_ENDPOINT = '/info/party'

export const getPartyByPartyId = (async (partyId) => {
  const res = await backendClient(
    `${GET_PARTY_BY_PARTY_ID_ENDPOINT}/${partyId}`,
  )
  if (!res.ok) throw new Error(res.statusText)
  return partyResponseSchema.parse(await res.json()).data
}) satisfies GetPartyByPartyId
