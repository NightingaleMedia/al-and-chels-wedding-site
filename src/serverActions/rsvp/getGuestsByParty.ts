'use server'

import {
  guestsByPartyResponseSchema,
  type ByParty,
} from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const GUESTS_BY_PARTY_ENDPOINT = '/info/guests/by-party'

export async function getGuestsByParty(): Promise<ByParty[]> {
  const res = await backendClient(GUESTS_BY_PARTY_ENDPOINT, {
    headers: { 'auth-token': process.env.AUTH_TOKEN! },
  })
  if (!res.ok) throw new Error(res.statusText)
  return guestsByPartyResponseSchema.parse(await res.json()).data
}
