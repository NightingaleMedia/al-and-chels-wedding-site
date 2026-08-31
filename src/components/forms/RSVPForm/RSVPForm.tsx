'use client'

import { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { setNestedObjectValues, type FormikTouched } from 'formik'
import { submitRsvp } from '@/serverActions/rsvp/submitRsvp'
import { useFormikRSVP } from './hooks/useFormikRSVP'
import { useFormStorage } from './hooks/useFormStorage'
import { useRSVPSteps } from './hooks/useRSVPSteps'
import Step1SelectGuests from './steps/Step1SelectGuests'
import Step2GuestDetails from './steps/Step2GuestDetails'
import Step3Contact from './steps/Step3Contact'
import Step4Result from './steps/Step4Result'
import { LAST_STEP, type RSVPFormProps, type RSVPFormValues, type RSVPStep } from './types'
import { toSubmitRsvpRequest } from './utils/toSubmitRsvpRequest'

type SubmitStatus = 'idle' | 'success' | 'error'

/** The last step the guest can edit; step 4 is the result screen. */
const FINAL_INPUT_STEP: RSVPStep = 3

export default function RSVPForm({
  party,
  onSuccess,
  onError,
  storageKey = 'default',
}: RSVPFormProps) {
  const storage = useFormStorage<RSVPFormValues>(storageKey)
  const steps = useRSVPSteps()
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [submitError, setSubmitError] = useState<Error>()
  const hasRestored = useRef(false)

  const formik = useFormikRSVP({
    party,
    step: steps.step,
    onSubmit: async (values) => {
      try {
        const result = await submitRsvp(toSubmitRsvpRequest(party, values))
        storage.clear()
        setStatus('success')
        onSuccess?.(result)
      } catch (thrown) {
        const error = thrown instanceof Error ? thrown : new Error('Failed to submit RSVP')
        setSubmitError(error)
        setStatus('error')
        onError?.(error)
      }
      steps.goTo(LAST_STEP)
    },
  })

  // Restore a saved draft once, on mount. localStorage is client-only, so this
  // cannot happen during render without breaking hydration.
  useEffect(() => {
    if (hasRestored.current) return
    hasRestored.current = true

    const saved = storage.load()
    if (!saved) return

    formik.setValues(saved.formData)
    if (saved.step < LAST_STEP) steps.goTo(saved.step as RSVPStep)
    // Mount-only restore; re-running on every formik/steps identity change
    // would clobber whatever the guest has typed since.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist on every answer and step change, until the RSVP is safely stored
  // server-side — at which point the draft is deleted rather than rewritten.
  useEffect(() => {
    if (status === 'success' || !hasRestored.current) return
    storage.save({ step: steps.step, formData: formik.values, timestamp: Date.now() })
  }, [formik.values, steps.step, status, storage])

  const handleNext = async () => {
    const errors = await formik.validateForm()
    if (Object.keys(errors).length > 0) {
      // Reveal the errors for fields the guest has not touched yet.
      formik.setTouched(setNestedObjectValues<FormikTouched<RSVPFormValues>>(errors, true))
      return
    }
    if (steps.step === FINAL_INPUT_STEP) {
      await formik.submitForm()
      return
    }
    await steps.goNext()
  }

  const handleRetry = () => {
    setStatus('idle')
    setSubmitError(undefined)
    steps.goTo(FINAL_INPUT_STEP)
  }

  if (steps.step === LAST_STEP) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <Step4Result
          status={status === 'success' ? 'success' : 'error'}
          error={submitError}
          onRetry={status === 'success' ? undefined : handleRetry}
        />
      </div>
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        void handleNext()
      }}
      className="flex flex-col gap-6 p-4"
    >
      <Typography variant="body2">Step {steps.step} of {FINAL_INPUT_STEP}</Typography>

      {steps.step === 1 && <Step1SelectGuests party={party} formik={formik} />}
      {steps.step === 2 && <Step2GuestDetails party={party} formik={formik} />}
      {steps.step === 3 && <Step3Contact formik={formik} />}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outlined"
          onClick={steps.goBack}
          disabled={steps.isFirstStep || formik.isSubmitting}
        >
          Back
        </Button>
        <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
          {steps.step === FINAL_INPUT_STEP ? 'Submit RSVP' : 'Next'}
        </Button>
      </div>
    </form>
  )
}
