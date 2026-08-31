'use client'

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from '@mui/material'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import type { RSVPFormik } from '../hooks/useFormikRSVP'

interface Step1SelectGuestsProps {
  party: Party
  formik: RSVPFormik
}

/** Step 1 — check off the guests in your party who are attending. */
export default function Step1SelectGuests({ party, formik }: Step1SelectGuestsProps) {
  const selected = formik.values.attendingGuestIds
  const error = formik.errors.attendingGuestIds

  const toggle = (guestId: string) => {
    const next = selected.includes(guestId)
      ? selected.filter((id) => id !== guestId)
      : [...selected, guestId]
    formik.setFieldValue('attendingGuestIds', next)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Typography variant="h2">Who&apos;s coming?</Typography>
        <Typography variant="body2">
          Check off everyone in the {party.partyName} party who will be joining us.
        </Typography>
      </div>

      <FormGroup className="flex flex-col gap-2">
        {party.members.map((member) => (
          <FormControlLabel
            key={member.uuid}
            control={
              <Checkbox
                name={`guest-${member.uuid}`}
                checked={selected.includes(member.uuid)}
                onChange={() => toggle(member.uuid)}
                onBlur={() => formik.setFieldTouched('attendingGuestIds', true)}
              />
            }
            label={member.Name}
          />
        ))}
      </FormGroup>

      {typeof error === 'string' && <FormHelperText error>{error}</FormHelperText>}
    </section>
  )
}
