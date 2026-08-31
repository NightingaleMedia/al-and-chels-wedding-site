'use server'

import {
  partyEnvelopeSchema,
  type GetPartyByPartyId,
} from './weddingBackend.schemas'

const GET_PARTY_BY_PARTY_ID_ENDPOINT = '/info/party'

export const getPartyByPartyId = (async (partyId) => {
  const res = await fetch(
    `${process.env.WEDDING_BACKEND}${GET_PARTY_BY_PARTY_ID_ENDPOINT}/${partyId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    },
  )
  const parsed = partyEnvelopeSchema.parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return parsed.data
}) satisfies GetPartyByPartyId
