'use client'

import { Checkbox, FormControlLabel, FormGroup, FormHelperText, Typography } from '@mui/material'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'

/** Step 1 — check off who is coming. */
export default function Step1SelectGuests() {
  const { party, formik, toggleGuest } = useRSVPForm()

  return (
    <section className="flex flex-col gap-3">
      <Typography variant="h6">Who&apos;s coming?</Typography>

      <FormGroup>
        {party.members.map((member) => (
          <FormControlLabel
            key={member.uuid}
            label={member.Name}
            control={
              <Checkbox
                checked={formik.values.attendingGuestIds.includes(member.uuid)}
                onChange={() => toggleGuest(member.uuid)}
              />
            }
          />
        ))}
      </FormGroup>

      {formik.errors.attendingGuestIds && (
        <FormHelperText error>{String(formik.errors.attendingGuestIds)}</FormHelperText>
      )}
    </section>
  )
}
