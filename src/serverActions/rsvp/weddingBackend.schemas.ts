import { z } from 'zod'

export const memberSchema = z.object({
  Name: z.string(),
  'First Name': z.string(),
  'Last Name': z.string(),
  brideGroom: z.enum(['bride', 'groom']),
  'Family / Friends': z.enum(['family', 'friends']),
  age: z.enum(['adult', 'child']),
  uuid: z.string(),
  group_name: z.string(),
  group_id: z.string().optional(),
  rsvp: z.enum(['Not Responded', 'Attending', 'Not Attending']),
  spiritAnimal: z.string().optional(),
  foodPref: z.string().optional(),
})
export type Member = z.infer<typeof memberSchema>

export const partySchema = z.object({
  partyName: z.string(),
  partyId: z.string().optional(),
  guestCount: z.number(),
  members: z.array(memberSchema),
})
export type Party = z.infer<typeof partySchema>

const errorEnvelopeSchema = z.object({
  ok: z.literal(false),
  error: z.string(),
})

const partyEnvelopeSchema = z.union([
  z.object({ ok: z.literal(true), data: partySchema }),
  errorEnvelopeSchema,
])

// Search Wedding Party By Guest — POST /info/party-by-guest/search
export const searchGuestByNameRequestSchema = z.object({
  searchQuery: z.string(),
})
export type SearchGuestByNameRequest = z.infer<
  typeof searchGuestByNameRequestSchema
>
export type SearchGuestByNameResponse = Party
export type SearchGuestByName = (
  request: SearchGuestByNameRequest,
) => Promise<SearchGuestByNameResponse>

// Get Party By UUID — GET /info/party-by-guest/:guestId
export type GetPartyByGuestIdResponse = Party
export type GetPartyByGuestId = (
  guestId: string,
) => Promise<GetPartyByGuestIdResponse>

// Get Party by Party ID — GET /info/party/:partyId
export type GetPartyByPartyIdResponse = Party
export type GetPartyByPartyId = (
  partyId: string,
) => Promise<GetPartyByPartyIdResponse>

// Submit RSVP — POST /rsvp
export const rsvpEntrySchema = z.object({
  guestId: z.string(),
  guestName: z.string(),
  isAttending: z.boolean(),
  foodPref: z.string().optional(),
  spiritAnimal: z.string().optional(),
})
export const submitRsvpRequestSchema = z.object({
  partyId: z.string(),
  rsvps: z.array(rsvpEntrySchema),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  textOptIn: z.boolean().optional(),
})
export type SubmitRsvpRequest = z.infer<typeof submitRsvpRequestSchema>
export type SubmitRsvpResponse = { success: true }
export type SubmitRsvp = (
  request: SubmitRsvpRequest,
) => Promise<SubmitRsvpResponse>

export { partyEnvelopeSchema, errorEnvelopeSchema }
