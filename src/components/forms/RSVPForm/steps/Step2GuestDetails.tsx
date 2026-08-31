'use client'

import {
  Divider,
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
      <Divider />
      {attendingMembers.map((member) => {
        const field = `guestDetails.${member.uuid}.foodPref`
        const value = formik.values.guestDetails[member.uuid].foodPref
        const isPreset = DIETARY_PRESETS.some((preset) => preset === value)

        return (
          <div key={member.uuid} className="flex flex-col gap-3">
            <Typography variant="body1" sx={{ fontWeight: 800 }}>
              {member.Name}
            </Typography>

            <FormControl>
              <div className="flex flex-col gap-2">
                <div>
                  <FormLabel className="font-bold text-bold">
                    dietary preference
                  </FormLabel>{' '}
                </div>

                <RadioGroup
                  className="my-0 py-0"
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
                      slotProps={{
                        typography: {
                          sx: {
                            fontSize: '14px',
                          },
                        },
                      }}
                    />
                  ))}
                  <FormControlLabel
                    value={CUSTOM}
                    control={<Radio />}
                    label="something else"
                  />
                </RadioGroup>
              </div>
            </FormControl>

            {!isPreset && (
              <TextField
                name={field}
                label="Your preference..."
                value={value}
                onChange={formik.handleChange}
                fullWidth
              />
            )}
            <div className="flex flex-col gap-2">
              <TextField
                name={`guestDetails.${member.uuid}.spiritAnimal`}
                value={formik.values.guestDetails[member.uuid].spiritAnimal}
                onChange={formik.handleChange}
                fullWidth
                label="spirit animal 🦉"
                variant="filled"
                helperText="optional"
              />
            </div>
            <Divider />
          </div>
        )
      })}
    </section>
  )
}
