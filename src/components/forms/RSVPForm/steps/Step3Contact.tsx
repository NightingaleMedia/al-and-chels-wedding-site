'use client'

import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import type { RSVPFormik } from '@/hooks/useFormikRSVP'
import type { Contact } from '../types'

interface Step3ContactProps {
  formik: RSVPFormik
}

/** Step 3 — how we reach the party, plus the optional text-update opt in. */
export default function Step3Contact({ formik }: Step3ContactProps) {
  const fieldProps = (field: keyof Contact) => {
    const name = `contact.${field}`
    const meta = formik.getFieldMeta(name)
    return {
      name,
      value: formik.values.contact[field] as string,
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: Boolean(meta.touched && meta.error),
      helperText: meta.touched && meta.error ? meta.error : undefined,
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Typography variant="h2">How can we reach you?</Typography>
        <Typography variant="body2">
          One contact for the whole party is plenty.
        </Typography>
      </div>

      <TextField {...fieldProps('email')} type="email" label="Email address" fullWidth />
      <TextField {...fieldProps('phoneNumber')} type="tel" label="Phone number" fullWidth />

      <FormControlLabel
        control={
          <Checkbox
            name="contact.textOptIn"
            checked={formik.values.contact.textOptIn}
            onChange={formik.handleChange}
          />
        }
        label="Text me wedding updates — highly recommended!"
      />
    </section>
  )
}
