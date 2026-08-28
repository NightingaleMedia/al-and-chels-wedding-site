'use server'

import { z } from 'zod'
import { errorEnvelopeSchema, type SubmitRsvp } from './weddingBackend.schemas'

export const submitRsvp = (async (request) => {
  const res = await fetch(`${process.env.WEDDING_BACKEND}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    cache: 'no-store',
  })
  const parsed = z.union([
    z.object({ ok: z.literal(true) }),
    errorEnvelopeSchema,
  ]).parse(await res.json())
  if (!parsed.ok) throw new Error(parsed.error)
  return { success: true }
}) satisfies SubmitRsvp
