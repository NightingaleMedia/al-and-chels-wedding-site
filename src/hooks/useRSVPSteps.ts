'use client'

import { useState } from 'react'
import { FIRST_STEP, LAST_STEP, type RSVPStep } from '@/components/forms/RSVPForm/types'

export interface UseRSVPStepsOptions {
  initialStep?: RSVPStep
  /** Guard run before advancing; return false to stay on the current step. */
  onValidateStep?: (step: RSVPStep) => boolean | Promise<boolean>
}

export interface UseRSVPStepsReturn {
  step: RSVPStep
  isFirstStep: boolean
  isLastStep: boolean
  goNext: () => Promise<void>
  goBack: () => void
  goTo: (step: RSVPStep) => void
}

const clamp = (step: number): RSVPStep =>
  Math.min(Math.max(step, FIRST_STEP), LAST_STEP) as RSVPStep

/**
 * Step position lives here rather than in Formik values: it is navigation
 * state, not answers, and keeping it out means the submitted payload and the
 * step schemas never have to ignore a stray field.
 */
export const useRSVPSteps = ({
  initialStep = FIRST_STEP,
  onValidateStep,
}: UseRSVPStepsOptions = {}): UseRSVPStepsReturn => {
  const [step, setStep] = useState<RSVPStep>(initialStep)

  const goNext = async () => {
    if (onValidateStep && !(await onValidateStep(step))) return
    setStep((current) => clamp(current + 1))
  }

  return {
    step,
    isFirstStep: step === FIRST_STEP,
    isLastStep: step === LAST_STEP,
    goNext,
    goBack: () => setStep((current) => clamp(current - 1)),
    goTo: (next: RSVPStep) => setStep(clamp(next)),
  }
}
