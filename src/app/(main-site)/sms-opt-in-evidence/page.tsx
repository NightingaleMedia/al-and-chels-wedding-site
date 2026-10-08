import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const TitleBlock = ({ title }: { title: string }) => (
  <Typography
    variant="body2"
    color="error"
    sx={{
      textAlign: 'center',
      mt: 1,
      fontWeight: 'bold',
      borderBottom: '1px solid black',
      pb: 1,
    }}
  >
    {title}
  </Typography>
)

export default function SmsOptInEvidencePage() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h1" sx={{ mb: 2 }}>
        SMS Opt-In Evidence
      </Typography>
      <Typography component="p" variant="body1" sx={{ mb: 2 }}>
        This page documents the text-message opt-in experience for Al and
        Chelsea&apos;s wedding, hosted at chels-and-al.com, for A2P 10DLC
        campaign review. Guests can opt in two ways. The first is a public form
        at chels-and-al.com/send-me-updates, which reviewers can open directly.
        The second appears after a guest submits their RSVP.
        <br />
        <br /> That page requires an invitation code and cannot be made public,
        so the screenshots below show the complete consent experience exactly as
        a guest sees it. Both paths use identical consent language. The checkbox
        is unchecked by default and consent is never required to RSVP or use the
        site. Mobile numbers are never purchased, rented, sold, or shared.
        Privacy Policy:{' '}
        <Link className="underline" href="/privacy-policy">
          chels-and-al.com/privacy-policy
        </Link>
        {' · '}Terms and Conditions:{' '}
        <Link className="underline" href="/terms-and-conditions">
          chels-and-al.com/terms-and-conditions
        </Link>
      </Typography>
      <div className="mb-20"></div>
      <Box
        sx={{ border: '1px solid black', maxWidth: '400px', mx: 'auto', mb: 8 }}
      >
        <TitleBlock title="Screenshot 1: RSVP Step 1" />
        <Image
          src="/img/sms-proof/proof-1.png"
          alt="SMS Opt-In Evidence"
          width={600}
          height={400}
        />
      </Box>

      <Box
        sx={{ border: '1px solid black', maxWidth: '400px', mx: 'auto', mb: 8 }}
      >
        <TitleBlock title="Screenshot 2: RSVP Step 2" />
        <Image
          src="/img/sms-proof/proof-2.png"
          alt="SMS Opt-In Evidence"
          width={600}
          height={400}
        />
      </Box>
      <Box
        sx={{ border: '1px solid black', maxWidth: '400px', mx: 'auto', mb: 8 }}
      >
        <TitleBlock title="Screenshot 3: RSVP Step 3" />
        <Image
          src="/img/sms-proof/proof-3.png"
          alt="SMS Opt-In Evidence"
          width={600}
          height={400}
        />
      </Box>
      <Box
        sx={{ border: '1px solid black', maxWidth: '400px', mx: 'auto', mb: 8 }}
      >
        <TitleBlock title="Screenshot 4: RSVP Submission After Opt In" />
        <Image
          src="/img/sms-proof/proof-4.png"
          alt="SMS Opt-In Evidence"
          width={600}
          height={400}
        />
      </Box>
    </div>
  )
}
