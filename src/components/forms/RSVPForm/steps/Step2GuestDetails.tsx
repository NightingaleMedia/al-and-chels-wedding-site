'use client'

import { TextField, Typography } from '@mui/material'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'

/** Step 2 — dietary preference and spirit animal for each attending guest. */
export default function Step2GuestDetails() {
  const { attendingMembers, formik } = useRSVPForm()

  return (
    <section className="flex flex-col gap-6">
      <Typography variant="h6">Tell us about everyone</Typography>

      {attendingMembers.map((member) => (
        <div key={member.uuid} className="flex flex-col gap-3">
          <Typography variant="subtitle1">{member.Name}</Typography>
          <TextField
            name={`guestDetails.${member.uuid}.dietaryPreference`}
            label="Dietary preference"
            value={formik.values.guestDetails[member.uuid].dietaryPreference}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            name={`guestDetails.${member.uuid}.spiritAnimal`}
            label="Spirit animal"
            value={formik.values.guestDetails[member.uuid].spiritAnimal}
            onChange={formik.handleChange}
            fullWidth
          />
        </div>
      ))}
    </section>
  )
}
