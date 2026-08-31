'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useFormik } from 'formik'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import { submitRsvp } from '@/serverActions/rsvp/submitRsvp'
import {
  getInitialValues,
  getStepSchemas,
  splitMembers,
  toFormikErrors,
  toSubmitRequest,
} from './helpers'
import type {
  RSVPFormContextValue,
  RSVPFormValues,
  RSVPStatus,
  RSVPStep,
} from './types'

const RSVPFormContext = createContext<RSVPFormContextValue | null>(null)

/** All RSVP form state and behaviour. Step components only read from this. */
export function useRSVPForm(): RSVPFormContextValue {
  const context = useContext(RSVPFormContext)
  if (!context)
    throw new Error('useRSVPForm must be used inside <RSVPFormProvider>')
  return context
}

export function RSVPFormProvider({
  party,
  children,
}: {
  party: Party
  children: ReactNode
}) {
  const partyId = party.partyId ?? party.partyName
  const [step, setStep] = useState<RSVPStep>(1)
  const [status, setStatus] = useState<RSVPStatus>('editing')
  const [errorMessage, setErrorMessage] = useState<string>()

  const { editableMembers, lockedMembers } = splitMembers(party)

  const formik = useFormik<RSVPFormValues>({
    initialValues: getInitialValues(party),
    onSubmit: async (values) => {
      try {
        await submitRsvp(toSubmitRequest(partyId, editableMembers, values))
        setStatus('success')
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Something went wrong',
        )
        setStatus('error')
      }
      setStep(4)
    },
    validateOnChange: false,
    validateOnBlur: false,
  })

  const next = () => {
    const schemas = getStepSchemas(editableMembers.map((m) => m.uuid))
    const result = schemas[step].safeParse(formik.values)
    if (!result.success) {
      formik.setErrors(toFormikErrors(result.error))
      return
    }
    formik.setErrors({})
    if (step === 3) formik.handleSubmit()
    else setStep((current) => (current + 1) as RSVPStep)
  }

  const back = () =>
    setStep((current) => (current > 1 ? ((current - 1) as RSVPStep) : current))

  const retry = () => {
    setStatus('editing')
    setErrorMessage(undefined)
    setStep(3)
  }

  const setResponse = (guestId: string, isAttending: boolean) =>
    formik.setFieldValue('responses', {
      ...formik.values.responses,
      [guestId]: isAttending,
    })

  const attendingMembers = editableMembers.filter(
    (member) => formik.values.responses[member.uuid] === true,
  )

  return (
    <RSVPFormContext.Provider
      value={{
        party,
        formik,
        step,
        status,
        errorMessage,
        attendingMembers,
        editableMembers,
        lockedMembers,
        setResponse,
        next,
        back,
        retry,
      }}
    >
      {children}
    </RSVPFormContext.Provider>
  )
}
