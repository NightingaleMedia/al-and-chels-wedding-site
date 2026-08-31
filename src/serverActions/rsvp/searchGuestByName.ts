'use server'

import { backendRequest } from './backendRequest'
import { partyEnvelopeSchema, type SearchGuestByName } from './weddingBackend.schemas'

export const searchGuestByName = (async (request) => {
  const { data } = await backendRequest({
    action: 'searchGuestByName',
    path: '/info/party-by-guest/search',
    method: 'POST',
    envelope: partyEnvelopeSchema,
    body: request,
    details: { searchQuery: request.searchQuery },
  })
  return data
}) satisfies SearchGuestByName
