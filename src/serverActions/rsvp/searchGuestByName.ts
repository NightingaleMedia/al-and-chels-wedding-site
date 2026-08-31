'use server'

import { partyEnvelopeSchema, type SearchGuestByName } from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const SEARCH_GUEST_BY_NAME_ENDPOINT = '/info/party-by-guest/search'

export const searchGuestByName = (async (request) => {
  const res = await backendClient(SEARCH_GUEST_BY_NAME_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(request),
  })
  const parsed = partyEnvelopeSchema.parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return parsed.data
}) satisfies SearchGuestByName
