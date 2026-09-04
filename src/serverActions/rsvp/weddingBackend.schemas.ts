import { z } from 'zod'

// Shapes for the notion-sync API (see its OpenAPI doc). Every endpoint either
// answers with `{ ok: true, data }` or fails with a 404 — there is no richer
// error body worth modelling.

/* -------------------------------- schemas -------------------------------- */

export const guestSchema = z.object({
  Name: z.string(),
  'First Name': z.string(),
  'Last Name': z.string(),
  group_name: z.string(),
  group_id: z.string(),
  brideGroom: z.enum(['bride', 'groom']),
  'Family / Friends': z.enum(['friends', 'family']),
  age: z.enum(['adult', 'child', 'infant']),
  uuid: z.string(),
  rsvp: z
    .enum(['Attending', 'Not Attending', 'Not Responded'])
    .default('Not Responded'),
  spiritAnimal: z.string().optional(),
  foodPref: z.string().optional(),
})

export const partySchema = z.object({
  partyName: z.string(),
  partyId: z.string(),
  guestCount: z.number(),
  members: z.array(guestSchema),
})

/** All three party lookups answer with this. */
export const partyResponseSchema = z.object({
  ok: z.literal(true),
  data: partySchema,
})

export const searchGuestByNameRequestSchema = z.object({
  searchQuery: z.string().min(1),
})

export const submitRsvpRequestSchema = z.object({
  partyId: z.string().min(1),
  email: z.string().max(64).optional(),
  phone: z.string().max(64).optional(),
  textOptIn: z.boolean().optional(),
  rsvps: z
    .array(
      z.object({
        guestId: z.string().min(1),
        isAttending: z.boolean(),
        foodPref: z.string().max(64).optional(),
        spiritAnimal: z.string().max(64).optional(),
      }),
    )
    .min(1),
})

/* --------------------------------- types --------------------------------- */

export type Guest = z.infer<typeof guestSchema>
export type Party = z.infer<typeof partySchema>

export type SearchGuestByNameRequest = z.infer<
  typeof searchGuestByNameRequestSchema
>
export type SubmitRsvpRequest = z.infer<typeof submitRsvpRequestSchema>

// GET /info/party/:partyId
export type GetPartyByPartyId = (partyId: string) => Promise<Party>

// GET /info/party-by-guest/:guestId
export type GetPartyByGuestId = (guestId: string) => Promise<Party>

// POST /info/party-by-guest/search
export type SearchGuestByName = (
  request: SearchGuestByNameRequest,
) => Promise<Party>

// POST /rsvp
export type SubmitRsvp = (
  request: SubmitRsvpRequest,
) => Promise<{ success: boolean }>
