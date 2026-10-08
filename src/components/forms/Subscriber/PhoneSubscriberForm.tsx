'use client'
import { useState } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { z } from 'zod'
import { subscribeToUpdates } from '@/serverActions/optIn/optIn'
import Link from 'next/link'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

// Validation schema matching RSVP form pattern
const phoneValidationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[0-9\s\-()]{10,}$/, 'Enter a valid phone number'),
  consent: z.boolean().optional(),
})

export const PhoneSubscriberForm = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>()

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      consent: false,
    },
    validate: (values) => {
      const result = phoneValidationSchema.safeParse(values)
      if (!result.success) {
        const errors: Record<string, string> = {}
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message
          }
        })
        return errors
      }
      return {}
    },
    onSubmit: async (values, { resetForm }) => {
      setStatus('submitting')
      setErrorMessage(undefined)

      const result = await subscribeToUpdates({
        phoneNumber: values.phoneNumber,
        consent: values.consent,
      })

      if (result.success) {
        setStatus('success')
        resetForm()
      } else {
        setStatus('error')
        setErrorMessage(
          result.error || 'Failed to subscribe. Please try again.',
        )
      }
    },
  })

  return (
    <Box>
      <Paper variant="form" className="flex flex-col gap-6 outline-1 p-2">
        <Box>
          <Typography variant="h5" sx={{ lineHeight: 0.85, mt: 2 }}>
            Text Updates
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Subscribe to receive wedding updates via text message.
          </Typography>
        </Box>

        {status === 'success' && (
          <Alert severity="success">
            Successfully subscribed! You'll receive wedding updates via text
            message.
          </Alert>
        )}

        {status === 'error' && errorMessage && (
          <Alert severity="error">{errorMessage}</Alert>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextField
            name="phoneNumber"
            type="tel"
            label="Phone number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            required
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox name="consent" checked={formik.values.consent} />
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            slotProps={{
              typography: {
                style: {
                  fontSize: '10px',
                },
              },
            }}
            label="I agree to receive text messages from Al and Chelsea for wedding updates. Msg & data rates may apply."
          />
          <Typography variant="body2" sx={{ mt: 1, fontSize: '8px' }}>
            * Reply STOP to unsubscribe. HELP for help. Msg frequency varies;
            fewer than 10 messages total. Read our{' '}
            <Link href="/privacy-policy">Privacy Policy</Link> or{' '}
            <Link href="/terms-and-conditions">Terms and Conditions</Link> for
            more information.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              formik.isSubmitting ||
              !formik.values.phoneNumber ||
              !formik.isValid
            }
          >
            {formik.isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
