import { z } from 'zod'
/* -------------------------------- schemas -------------------------------- */

export const subscribeRequestSchema = z.union([
  z.object({
    phoneNumber: z.string().min(1, 'Phone number is required'),
  }),
  z.object({
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  }),
])

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
