'use client'

import { setIn, useFormik, type FormikHelpers } from 'formik'
import { ZodError } from 'zod'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import {
  getInitialFormValues,
  stepSchemas,
  type RSVPFormValues,
  type RSVPStep,
} from '../types'

export interface UseFormikRSVPOptions {
  party: Party
  /** The step currently on screen — only its fields are validated. */
  step: RSVPStep
  initialValues?: Partial<RSVPFormValues>
  onSubmit: (
    values: RSVPFormValues,
    helpers: FormikHelpers<RSVPFormValues>,
  ) => void | Promise<void>
}

/**
 * Runs the schema for the active step and reshapes Zod issues into Formik's
 * nested error object. `setIn` is used so `guestDetails.<id>.spiritAnimal`
 * resolves through `getFieldMeta`, which a flat dotted key would not.
 */
const validateStep = (step: RSVPStep) => async (values: RSVPFormValues) => {
  try {
    await stepSchemas[step].parseAsync(values)
    return {}
  } catch (error) {
    if (!(error instanceof ZodError)) throw error
    return error.issues.reduce(
      (errors, issue) => setIn(errors, issue.path.join('.'), issue.message),
      {},
    )
  }
}

/**
 * Formik instance for the RSVP form, validated against the current step's
 * schema. Validation runs on blur and on submit only, so a guest is not shouted
 * at mid-keystroke.
 */
export const useFormikRSVP = ({
  party,
  step,
  initialValues,
  onSubmit,
}: UseFormikRSVPOptions) =>
  useFormik<RSVPFormValues>({
    initialValues: { ...getInitialFormValues(party), ...initialValues },
    enableReinitialize: false,
    validate: validateStep(step),
    onSubmit,
    validateOnChange: false,
    validateOnBlur: true,
  })

/** Shared prop type for the step components. */
export type RSVPFormik = ReturnType<typeof useFormikRSVP>
