'use client'

import { Button, Link, Typography } from '@mui/material'

export const SUPPORT_EMAIL = 'chelsandalsigman@gmail.com'

interface Step4ResultProps {
  status: 'success' | 'error'
  error?: Error
  onRetry?: () => void
}

/** Step 4 — terminal screen: submission succeeded, or it did not. */
export default function Step4Result({ status, error, onRetry }: Step4ResultProps) {
  if (status === 'success') {
    return (
      <section className="flex flex-col gap-3">
        <Typography variant="h2">You&apos;re all set!</Typography>
        <Typography variant="body1">
          Thanks for RSVPing — we can&apos;t wait to see you.
        </Typography>
        <Typography variant="body2">
          Need to change something? Email{' '}
          <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
        </Typography>
      </section>
    )
  }

  return (
    <section className="flex flex-col items-start gap-3">
      <Typography variant="h2">Something went wrong</Typography>
      <Typography variant="body1">
        We couldn&apos;t save your RSVP. Your answers are still here, so you can try
        again.
      </Typography>
      {error?.message && <Typography variant="body2">{error.message}</Typography>}
      <Typography variant="body2">
        Still stuck? Email <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
      </Typography>
      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          Try again
        </Button>
      )}
    </section>
  )
}
