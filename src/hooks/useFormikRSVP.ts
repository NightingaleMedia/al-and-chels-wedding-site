'use client'

import { useFormik } from 'formik'
import { ZodError } from 'zod'
import { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import {
  getInitialFormValues,
  RSVPFormSchema,
  RSVPFormValues,
} from '@/components/forms/RSVPForm/types'
export interface UseFormikRSVPOptions {
  party: Party
  initialValues?: Partial<RSVPFormValues>
  onSuccess?: (result: { success: true }) => void
  onError?: (error: Error) => void
}

/**
 * Converts a Zod schema to a Formik validation function.
 * Maps Zod validation errors to Formik's error format.
 */
function createFormikValidationSchema(schema: typeof RSVPFormSchema) {
  return async (values: RSVPFormValues) => {
    try {
      await schema.parseAsync(values)
      return {}
    } catch (error) {
      if (error instanceof ZodError) {
        const formikErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          formikErrors[path] = err.message
        })
        return formikErrors
      }
      throw error
    }
  }
}

/**
 * Formik hook for RSVP form with Zod validation.
 *
 * Initializes Formik with:
 * - Zod schema validation
 * - Hydration-safe initial values
 * - Validation on blur only (not on change)
 * - Optional success and error callbacks
 *
 * @param options - Configuration options including party data and callbacks
 * @returns Formik instance (FormikHelpers & FormikState)
 */
export const useFormikRSVP = (options: UseFormikRSVPOptions) => {
  const { party, initialValues, onSuccess, onError } = options

  return useFormik({
    initialValues: {
      ...getInitialFormValues(),
      ...initialValues,
    },
    validate: createFormikValidationSchema(RSVPFormSchema),
    onSubmit: async (values) => {
      // Stub: will be filled in by RSVPForm.tsx
      console.log('Form submitted with values:', values)
      console.log('Party:', party)

      if (onSuccess) {
        onSuccess({ success: true })
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  })
}
