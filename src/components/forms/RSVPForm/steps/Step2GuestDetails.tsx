'use client'

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { useRSVPForm } from '@/context/rsvp/RSVPFormContext'
import { DIETARY_PRESETS } from '../types'

const CUSTOM = 'custom'

/** Step 2 — dietary preference and spirit animal for each attending guest. */
export default function Step2GuestDetails() {
  const { attendingMembers, formik } = useRSVPForm()

  return (
    <section className="flex flex-col gap-6">
      <Typography variant="h6">Tell us about everyone</Typography>

      {attendingMembers.map((member) => {
        const field = `guestDetails.${member.uuid}.dietaryPreference`
        const value = formik.values.guestDetails[member.uuid].dietaryPreference
        const isPreset = DIETARY_PRESETS.some((preset) => preset === value)

        return (
          <div key={member.uuid} className="flex flex-col gap-3">
            <Typography variant="subtitle1">{member.Name}</Typography>

            <FormControl>
              <FormLabel>Dietary preference</FormLabel>
              <RadioGroup
                value={isPreset ? value : CUSTOM}
                onChange={(event) =>
                  formik.setFieldValue(
                    field,
                    event.target.value === CUSTOM ? '' : event.target.value,
                  )
                }
              >
                {DIETARY_PRESETS.map((preset) => (
                  <FormControlLabel
                    key={preset}
                    value={preset}
                    control={<Radio />}
                    label={preset}
                  />
                ))}
                <FormControlLabel value={CUSTOM} control={<Radio />} label="Something else" />
              </RadioGroup>
            </FormControl>

            {!isPreset && (
              <TextField
                name={field}
                label="Tell us more"
                value={value}
                onChange={formik.handleChange}
                fullWidth
              />
            )}

            <TextField
              name={`guestDetails.${member.uuid}.spiritAnimal`}
              label="Spirit animal"
              value={formik.values.guestDetails[member.uuid].spiritAnimal}
              onChange={formik.handleChange}
              fullWidth
            />
          </div>
        )
      })}
    </section>
  )
}
