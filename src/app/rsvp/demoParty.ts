import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

/**
 * Stand-in party used when `/rsvp` is opened without a `?partyId=`, so the form
 * can be worked on without the wedding backend running. Guest search and real
 * party loading arrive in a later spec.
 */
export const DEMO_PARTY: Party = {
  partyName: 'Demo Party',
  partyId: 'demo-party',
  guestCount: 2,
  members: [
    {
      Name: 'Al Sigman',
      'First Name': 'Al',
      'Last Name': 'Sigman',
      brideGroom: 'groom',
      'Family / Friends': 'family',
      age: 'adult',
      uuid: 'groom--al-sigman',
      group_name: 'Demo Party',
      group_id: 'demo-party',
      rsvp: 'Not Responded',
    },
    {
      Name: 'Chels Sigman',
      'First Name': 'Chels',
      'Last Name': 'Sigman',
      brideGroom: 'bride',
      'Family / Friends': 'family',
      age: 'adult',
      uuid: 'bride--chels-sigman',
      group_name: 'Demo Party',
      group_id: 'demo-party',
      rsvp: 'Not Responded',
    },
  ],
}
