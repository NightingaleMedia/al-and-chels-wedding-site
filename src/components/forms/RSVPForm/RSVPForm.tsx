'use client'

import { Button, Typography } from '@mui/material'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import { RSVPFormProvider, useRSVPForm } from '@/context/rsvp/RSVPFormContext'
import Step1SelectGuests from './steps/Step1SelectGuests'
import Step2GuestDetails from './steps/Step2GuestDetails'
import Step3Contact from './steps/Step3Contact'
import Step4Result from './steps/Step4Result'

function Steps() {
  const { step, next, back, formik } = useRSVPForm()

  if (step === 4) return <Step4Result />

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="body2">Step {step} of 3</Typography>

      {step === 1 && <Step1SelectGuests />}
      {step === 2 && <Step2GuestDetails />}
      {step === 3 && <Step3Contact />}

      <div className="flex gap-2">
        <Button variant="outlined" onClick={back} disabled={step === 1 || formik.isSubmitting}>
          Back
        </Button>
        <Button variant="contained" onClick={next} disabled={formik.isSubmitting}>
          {step === 3 ? 'Submit RSVP' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default function RSVPForm({ party }: { party: Party }) {
  return (
    <RSVPFormProvider party={party}>
      <Steps />
    </RSVPFormProvider>
  )
}
