'use client'

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
        fullWidth
      />
      <TextField
        name="phone"
        type="tel"
        label="Phone number"
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
          />
        }
      />
    </section>
  )
}
