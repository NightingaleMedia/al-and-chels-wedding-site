'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material'
import { z } from 'zod'
import { addStory } from '@/serverActions/firebase/stories'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

const storyValidationSchema = z.object({
  storyMessage: z.string().min(1, 'Please share your story'),
  author: z.string().min(1, 'Please enter your name'),
})

export const StoryForm = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>()

  const formik = useFormik({
    initialValues: {
      storyMessage: '',
      author: '',
    },
    validate: (values) => {
      const result = storyValidationSchema.safeParse(values)
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

      const result = await addStory(values.storyMessage, values.author)

      if (result.success) {
        setStatus('success')
        resetForm()
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Failed to submit story. Please try again.')
      }
    },
  })

  return (
    <Box>
      <Paper variant="form" className="flex flex-col gap-6 outline-1 p-2">
        <Box>
          <Typography variant="h5" sx={{ lineHeight: 0.85, mt: 2 }}>
            Share Your Story
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Tell us a favorite memory or story about the couple!
          </Typography>
        </Box>

        {status === 'success' && (
          <Alert severity="success">
            Thank you for sharing your story!
          </Alert>
        )}

        {status === 'error' && errorMessage && (
          <Alert severity="error">{errorMessage}</Alert>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextField
            name="author"
            label="Your Name"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
            required
            fullWidth
          />
          <TextField
            name="storyMessage"
            label="Your Story"
            value={formik.values.storyMessage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.storyMessage && Boolean(formik.errors.storyMessage)}
            helperText={formik.touched.storyMessage && formik.errors.storyMessage}
            required
            fullWidth
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Share Story'}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
