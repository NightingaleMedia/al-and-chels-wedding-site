'use server'

import { z } from 'zod'
import { errorEnvelopeSchema, type SubmitRsvp } from './weddingBackend.schemas'
import { backendClient } from '../backendClient'

const SUBMIT_RSVP_ENDPOINT = '/rsvp'

export const submitRsvp = (async (request) => {
  const res = await backendClient(SUBMIT_RSVP_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(request),
  })
  const parsed = z
    .union([z.object({ ok: z.literal(true) }), errorEnvelopeSchema])
    .parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return { success: true }
}) satisfies SubmitRsvp
