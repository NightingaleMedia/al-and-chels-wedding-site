'use client'

import { Button, Link, Typography } from '@mui/material'
import { SUPPORT_EMAIL } from '@/constants'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'
import { ErrorPanel } from '../errorPanel'

/** Step 4 — the result of the submission. */
export default function Step4Result() {
  const { status, errorMessage, retry } = useRSVPForm()

  if (status === 'success') {
    return (
      <section className="flex flex-col gap-3">
        <Typography variant="h6">You&apos;re all set!</Typography>
        <Typography variant="body1">
          Thanks for RSVPing. Need to change something? Email{' '}
          <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
        </Typography>
      </section>
    )
  }

  return (
    <ErrorPanel errorMessage={errorMessage}>
      <Button variant="contained" onClick={retry}>
        Try again
      </Button>
    </ErrorPanel>
  )
}
