'use server'

import { partyEnvelopeSchema, type SearchGuestByName } from './weddingBackend.schemas'

const SEARCH_GUEST_BY_NAME_ENDPOINT = '/info/party-by-guest/search'

export const searchGuestByName = (async (request) => {
  const res = await fetch(`${process.env.WEDDING_BACKEND}${SEARCH_GUEST_BY_NAME_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    cache: 'no-store',
  })
  const parsed = partyEnvelopeSchema.parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return parsed.data
}) satisfies SearchGuestByName
