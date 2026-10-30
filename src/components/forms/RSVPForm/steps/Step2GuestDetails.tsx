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
    <section className="flex flex-col gap-4">
      {attendingMembers.map((member) => {
        const field = `guestDetails.${member.uuid}.dietaryPreference`
        const dietaryLabelId = `dietary-preference-${member.uuid}`
        const value = formik.values.guestDetails[member.uuid].dietaryPreference
        const isPreset = isDietaryPreset(value)

        return (
          <div key={member.uuid} className="flex flex-col gap-3">
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {member.Name}
            </Typography>

            <FormControl className="gap-2">
              <FormLabel id={dietaryLabelId} className="font-bold">
                dietary preference
              </FormLabel>
              <RadioGroup
                aria-labelledby={dietaryLabelId}
                className="ml-4"
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
                    slotProps={{ typography: { variant: 'body2' } }}
                  />
                ))}
                <FormControlLabel
                  value={CUSTOM}
                  control={<Radio />}
                  label={
                    <span>
                      something else
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ display: 'block', fontStyle: 'italic' }}
                      >
                        (select to type)
                      </Typography>
                    </span>
                  }
                  slotProps={{ typography: { variant: 'body2' } }}
                />
              </RadioGroup>
            </FormControl>

            {!isPreset && (
              <TextField
                name={field}
                slotProps={{
                  input: { sx: { fontSize: '12px' } },
                  formHelperText: { sx: { fontSize: '12px' } },
                }}
                label="your preference"
                value={value}
                onChange={formik.handleChange}
                fullWidth
              />
            )}
            <FormLabel className="font-bold" sx={{ mt: 2 }}>
              extra questions (optional)
            </FormLabel>
            <TextField
              name={`guestDetails.${member.uuid}.spiritAnimal`}
              value={formik.values.guestDetails[member.uuid].spiritAnimal}
              onChange={formik.handleChange}
              fullWidth
              label="spirit animal 🦉"
              variant="filled"
              helperText="eg: owl, panda, slow loris"
            />
            <Divider />
          </div>
        )
      })}
    </section>
  )
}
