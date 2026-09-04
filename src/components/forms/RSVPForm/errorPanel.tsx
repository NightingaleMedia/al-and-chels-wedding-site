import { SUPPORT_EMAIL } from '@/constants'
import { Typography, Button } from '@mui/material'
import Link from 'next/link'

export const ErrorPanel = ({
  children,
  errorMessage,
}: {
  children: React.ReactNode
  errorMessage?: string
}) => (
  <section className="flex flex-col items-start gap-3">
    <Typography variant="h6">Something went wrong</Typography>
    <Typography variant="body1">
      We couldn&apos;t find your RSVP{errorMessage ? `: ${errorMessage}` : ''}.
      Your answers are still here. Still stuck? Email{' '}
      <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
    </Typography>
    {children}
  </section>
)
