'use server'

import { z } from 'zod'
import { backendRequest } from './backendRequest'
import { errorEnvelopeSchema, type SubmitRsvp } from './weddingBackend.schemas'

const submitEnvelopeSchema = z.union([z.object({ ok: z.literal(true) }), errorEnvelopeSchema])

export const submitRsvp = (async (request) => {
  await backendRequest({
    action: 'submitRsvp',
    path: '/rsvp',
    method: 'POST',
    envelope: submitEnvelopeSchema,
    body: request,
    // Guest answers stay out of the logs; these are enough to trace a submission.
    details: {
      partyId: request.partyId,
      guestCount: request.rsvps.length,
      attendingCount: request.rsvps.filter((rsvp) => rsvp.isAttending).length,
    },
  })
  return { success: true }
}) satisfies SubmitRsvp
