'use server'

import {
  partyEnvelopeSchema,
  type GetPartyByPartyId,
} from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const GET_PARTY_BY_PARTY_ID_ENDPOINT = '/info/party'

export const getPartyByPartyId = (async (partyId) => {
  const res = await backendClient(
    `${GET_PARTY_BY_PARTY_ID_ENDPOINT}/${partyId}`,
  )
  const parsed = partyEnvelopeSchema.parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return parsed.data
}) satisfies GetPartyByPartyId
