'use server'

import { type SubmitRsvp } from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const SUBMIT_RSVP_ENDPOINT = '/rsvp'

export const submitRsvp = (async (request) => {
  const res = await backendClient(SUBMIT_RSVP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(request),
  })
  if (!res.ok) {
    console.error(`Failed to submit RSVP: ${res.status} ${res.statusText}`)
    return { success: false }
  }
  return { success: true }
}) satisfies SubmitRsvp
