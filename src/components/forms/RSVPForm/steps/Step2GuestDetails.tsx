'use client'

import { TextField, Typography } from '@mui/material'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import type { RSVPFormik } from '@/hooks/useFormikRSVP'
import type { GuestDetails } from '../types'
import { normalizeHexColor } from '../utils/colorUtils'

interface Step2GuestDetailsProps {
  party: Party
  formik: RSVPFormik
}

const fieldName = (guestId: string, field: keyof GuestDetails) =>
  `guestDetails.${guestId}.${field}`

/** Step 2 — dietary preference, favorite color and spirit animal, per guest. */
export default function Step2GuestDetails({ party, formik }: Step2GuestDetailsProps) {
  const attending = party.members.filter((member) =>
    formik.values.attendingGuestIds.includes(member.uuid),
  )

  const fieldProps = (guestId: string, field: keyof GuestDetails) => {
    const name = fieldName(guestId, field)
    const meta = formik.getFieldMeta(name)
    return {
      name,
      value: formik.values.guestDetails[guestId]?.[field] ?? '',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: Boolean(meta.touched && meta.error),
      helperText: meta.touched && meta.error ? meta.error : undefined,
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Typography variant="h2">Tell us about everyone</Typography>
        <Typography variant="body2">
          A few details for each guest you checked off.
        </Typography>
      </div>

      {attending.map((member) => {
        const color = formik.values.guestDetails[member.uuid]?.favoriteColor ?? ''
        return (
          <div key={member.uuid} className="flex flex-col gap-3">
            <Typography variant="h3">{member.Name}</Typography>

            <TextField
              {...fieldProps(member.uuid, 'dietaryPreference')}
              label="Dietary preference"
              placeholder="Vegetarian, gluten free, no restrictions…"
              fullWidth
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
              <TextField
                {...fieldProps(member.uuid, 'favoriteColor')}
                type="color"
                label="Favorite color"
                className="w-full sm:w-32"
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Hex"
                value={normalizeHexColor(color)}
                onChange={(event) =>
                  formik.setFieldValue(
                    fieldName(member.uuid, 'favoriteColor'),
                    event.target.value,
                  )
                }
                onBlur={() =>
                  formik.setFieldValue(
                    fieldName(member.uuid, 'favoriteColor'),
                    normalizeHexColor(color),
                  )
                }
                className="w-full sm:flex-1"
              />
            </div>

            <TextField
              {...fieldProps(member.uuid, 'spiritAnimal')}
              label="Spirit animal"
              placeholder="Otter, red panda, bald eagle…"
              fullWidth
            />
          </div>
        )
      })}
    </section>
  )
}
