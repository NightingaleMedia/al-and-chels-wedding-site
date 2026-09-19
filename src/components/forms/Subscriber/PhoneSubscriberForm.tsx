'use client'
import { useState } from 'react'
import { useFormik } from 'formik'
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material'
import { z } from 'zod'
import { subscribeToUpdates } from '@/serverActions/optIn/optIn'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

// Validation schema matching RSVP form pattern
const phoneValidationSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[0-9\s\-()]{10,}$/, 'Enter a valid phone number'),
})

export const PhoneSubscriberForm = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>()

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
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
          <Typography variant="h1" sx={{ lineHeight: 0.85, mt: 2 }}>
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
