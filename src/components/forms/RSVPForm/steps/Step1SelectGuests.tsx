'use client'

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import type { Member } from '@/serverActions/rsvp/weddingBackend.schemas'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'

const YES = 'yes'
const NO = 'no'

function GuestResponse({
  member,
  value,
  disabled,
  onChange,
}: {
  member: Member
  value: string
  disabled?: boolean
  onChange?: (isAttending: boolean) => void
}) {
  return (
    <FormControl
      disabled={disabled}
      sx={{ flexDirection: 'unset' }}
      className="flex-row flex-wrap items-center gap-8"
    >
      <FormLabel className="font-bold">{member.Name}</FormLabel>
      <RadioGroup
        row
        className="gap-1"
        value={value}
        onChange={(event) => onChange?.(event.target.value === YES)}
      >
        <FormControlLabel value={YES} control={<Radio />} label="Yes" />
        <FormControlLabel value={NO} control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  )
}

/** Step 1 — a yes/no answer per guest, unanswered until they pick one. */
export default function Step1SelectGuests() {
  const { formik, editableMembers, lockedMembers, setResponse } = useRSVPForm()
  const { responses } = formik.values

  return (
    <section className="flex flex-col gap-5 items-start">
      <Typography variant="h6">Who&apos;s coming?</Typography>

      {editableMembers.map((member) => (
        <GuestResponse
          key={member.uuid}
          member={member}
          // No default: an unanswered guest maps to no selected radio.
          value={
            responses[member.uuid] === undefined
              ? ''
              : responses[member.uuid]
                ? YES
                : NO
          }
          onChange={(isAttending) => setResponse(member.uuid, isAttending)}
        />
      ))}

      {/* Already responded — shown for context, greyed out and not resubmitted. */}
      {lockedMembers.map((member) => (
        <GuestResponse
          key={member.uuid}
          member={member}
          value={member.rsvp === 'Attending' ? YES : NO}
          disabled
        />
      ))}

      {editableMembers.length === 0 && (
        <Typography variant="body2">
          Everyone in your party has already responded. Contact us if you need
          to change an answer.
        </Typography>
      )}

      {formik.errors.responses && (
        <FormHelperText error>{String(formik.errors.responses)}</FormHelperText>
      )}
    </section>
  )
}
