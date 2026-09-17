'use server'

import { z } from 'zod'
import { backendClient } from '../backendClient'

/* -------------------------------- schemas -------------------------------- */

export const subscribeRequestSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required'),
})

export const subscriberSchema = z.object({
  phoneNumber: z.string(),
  guestId: z.string().optional(),
  status: z.enum(['subscribed', 'unsubscribed']),
  subscribedAt: z.string(),
  unsubscribedAt: z.string().optional(),
  source: z.enum(['rsvp_form', 'sms', 'admin']),
})

export const subscribeResponseSchema = z.object({
  ok: z.literal(true),
  subscriber: subscriberSchema,
})

/* --------------------------------- types --------------------------------- */

export type SubscribeRequest = z.infer<typeof subscribeRequestSchema>
export type Subscriber = z.infer<typeof subscriberSchema>
export type SubscribeResponse = z.infer<typeof subscribeResponseSchema>

export type SubscribeToUpdates = (
  request: SubscribeRequest,
) => Promise<{ success: boolean; error?: string }>

/* ------------------------------- actions ------------------------------- */

const SUBSCRIBE_ENDPOINT = '/sms/subscribers'

export const subscribeToUpdates = (async (request) => {
  try {
    const res = await backendClient(SUBSCRIBE_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(request),
    })

    if (!res.ok) {
      const errorBody = await res.text()
      console.error(
        `[subscribeToUpdates] Failed: ${res.status} ${res.statusText}`,
        errorBody,
      )
      return { success: false, error: 'Failed to subscribe. Please try again.' }
    }

    return { success: true }
  } catch (error) {
    console.error('[subscribeToUpdates] Exception:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}) satisfies SubscribeToUpdates
