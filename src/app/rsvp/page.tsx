import { Divider, Typography } from '@mui/material'

/** Guest search lands here in a later spec; for now the form needs a party id. */
export default function RSVPPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <Typography variant="h1">RSVP</Typography>
      <Typography variant="body1">
        Open the RSVP link from your invitation to find your party.
      </Typography>
      <Divider />
      <Typography variant="h1">OR</Typography>
      <Typography variant="body1">
        Search below by your first and last name for your party.
      </Typography>
      <div></div>
    </main>
  )
}
