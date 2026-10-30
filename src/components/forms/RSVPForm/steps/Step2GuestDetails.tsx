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
import { isDietaryPreset } from '@/context/rsvp/helpers'
import { DIETARY_PRESETS } from '@/context/rsvp/types'

const CUSTOM = 'custom'

/** Step 2 — dietary preference and spirit animal for each attending guest. */
export default function Step2GuestDetails() {
  const { attendingMembers, formik } = useRSVPForm()

  return (
    <section className="flex flex-col gap-6">
      {attendingMembers.map((member) => {
        const field = `guestDetails.${member.uuid}.dietaryPreference`
        const value = formik.values.guestDetails[member.uuid].dietaryPreference
        const isPreset = isDietaryPreset(value)

        return (
          <div key={member.uuid} className="flex flex-col gap-3">
            <Typography variant="body1" sx={{ fontWeight: 800 }}>
              {member.Name}
            </Typography>

            <FormControl>
              <div className="flex flex-col gap-2">
                <div>
                  <FormLabel className="font-bold text-bold">
                    dietary preference:
                  </FormLabel>{' '}
                </div>

                <RadioGroup
                  className="mt-2 ml-4 py-0"
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
                      control={<Radio sx={{ p: '5px' }} />}
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
                    control={<Radio sx={{ p: '5px' }} />}
                    label={
                      <Typography sx={{ mt: 1, fontSize: '14px' }}>
                        something else{' '}
                        <Typography
                          sx={{
                            fontStyle: 'italic',
                            display: 'block',
                            fontSize: '12px',
                          }}
                          component={'span'}
                        >
                          (select to type)
                        </Typography>
                      </Typography>
                    }
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
            <div>
              <FormLabel className="font-bold text-bold">
                extra (optional) questions:
              </FormLabel>
            </div>

            <div className="flex flex-col gap-2 mt-0 ml-4 pr-8">
              <TextField
                name={`guestDetails.${member.uuid}.spiritAnimal`}
                value={formik.values.guestDetails[member.uuid].spiritAnimal}
                onChange={formik.handleChange}
                fullWidth
                label="spirit animal 🦉"
                variant="filled"
                helperText="eg: owl, panda, slow loris"
              />
            </div>
            <Divider />
          </div>
        )
      })}
    </section>
  )
}
