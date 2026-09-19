'use client'
import { useState } from 'react'
import { useFormik } from 'formik'
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material'
import { z } from 'zod'
import { subscribeToUpdates } from '@/serverActions/optIn/optIn'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

// Validation schema matching RSVP form pattern
const emailValidationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
})

export const EmailSubscriberForm = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      const result = emailValidationSchema.safeParse(values)
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
        email: values.email,
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
            Email Updates
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Subscribe to receive wedding updates via email.
          </Typography>
        </Box>

        {status === 'success' && (
          <Alert severity="success">
            Successfully subscribed! You'll receive wedding updates via email.
          </Alert>
        )}

        {status === 'error' && errorMessage && (
          <Alert severity="error">{errorMessage}</Alert>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextField
            name="email"
            type="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
