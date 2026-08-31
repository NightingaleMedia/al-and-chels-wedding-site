'use client'

import { Button, Link, Typography } from '@mui/material'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'

const SUPPORT_EMAIL = 'chelsandalsigman@gmail.com'

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
    <section className="flex flex-col items-start gap-3">
      <Typography variant="h6">Something went wrong</Typography>
      <Typography variant="body1">
        We couldn&apos;t save your RSVP{errorMessage ? `: ${errorMessage}` : ''}. Your
        answers are still here. Still stuck? Email{' '}
        <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
      </Typography>
      <Button variant="contained" onClick={retry}>
        Try again
      </Button>
    </section>
  )
}
