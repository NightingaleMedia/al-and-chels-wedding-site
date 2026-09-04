'use server'

import {
  partyResponseSchema,
  type SearchGuestByName,
} from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const SEARCH_GUEST_BY_NAME_ENDPOINT = '/info/party-by-guest/search'

export const searchGuestByName = (async (request) => {
  const res = await backendClient(SEARCH_GUEST_BY_NAME_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(request),
  })
  if (!res.ok) throw new Error(res.statusText)
  return partyResponseSchema.parse(await res.json()).data
}) satisfies SearchGuestByName
