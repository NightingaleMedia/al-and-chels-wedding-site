'use server'

import { backendRequest } from './backendRequest'
import { partyEnvelopeSchema, type GetPartyByPartyId } from './weddingBackend.schemas'

export const getPartyByPartyId = (async (partyId) => {
  const { data } = await backendRequest({
    action: 'getPartyByPartyId',
    path: `/info/party/${partyId}`,
    method: 'GET',
    envelope: partyEnvelopeSchema,
    details: { partyId },
  })
  return data
}) satisfies GetPartyByPartyId
