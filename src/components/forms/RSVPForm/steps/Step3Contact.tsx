'use client'
import Link from 'next/link'
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'

/** Step 3 — how we reach you. */
export default function Step3Contact() {
  const { formik } = useRSVPForm()

  return (
    <section className="flex flex-col gap-4">
      <Typography variant="h6">How can we reach you?</Typography>

      <TextField
        name="email"
        type="email"
        label="Email address"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.email)}
        helperText={formik.errors.email}
        required
        fullWidth
      />
      <TextField
        name="phone"
        type="tel"
        label="Phone number (optional)"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={Boolean(formik.errors.phone)}
        helperText={formik.errors.phone}
        fullWidth
      />
      <FormControlLabel
        label="Text me wedding updates — highly recommended!"
        control={
          <Checkbox
            name="textOptIn"
            checked={formik.values.textOptIn}
            onChange={formik.handleChange}
            disabled={!formik.values.phone}
          />
        }
      />
      <Typography variant="body2" sx={{ mt: 1, fontSize: '10px' }}>
        By checking this box, you agree to receive text messages from Al and
        Chelsea for wedding updates. Msg & data rates may apply.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, fontSize: '10px' }}>
        * Reply STOP to unsubscribe. HELP for help. Msg frequency varies; fewer
        than 10 messages total. Read our{' '}
        <Link href="/privacy-policy">Privacy Policy</Link> or{' '}
        <Link href="/terms-and-conditions">Terms and Conditions</Link> for more
        information.
      </Typography>
    </section>
  )
}
