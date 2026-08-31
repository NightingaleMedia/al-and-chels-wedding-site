import { Alert, Typography } from '@mui/material'
import { RSVPForm } from '@/components/forms/RSVPForm'
import { DEMO_PARTY } from './demoParty'

/**
 * `/rsvp` with no party yet. Guest search lands here in a later spec; for now it
 * renders the form against a demo party so the flow can be worked on. A known
 * party is served by `/rsvp/<partyId>`.
 */
export default function RSVPPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <Typography variant="h1">RSVP</Typography>
      <Alert severity="info">
        Showing a demo party — open /rsvp/&lt;partyId&gt; to load a real one.
      </Alert>
      <RSVPForm party={DEMO_PARTY} storageKey={DEMO_PARTY.partyId} />
    </main>
  )
}
