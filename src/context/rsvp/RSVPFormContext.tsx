'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useFormik } from 'formik'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import { submitRsvp } from '@/serverActions/rsvp/submitRsvp'
import {
  getInitialValues,
  getStepSchemas,
  type RSVPFormValues,
  type RSVPStep,
} from '@/components/forms/RSVPForm/types'
import { draftStorage } from './formStorage'

type Status = 'editing' | 'success' | 'error'

interface RSVPFormContextValue {
  party: Party
  formik: ReturnType<typeof useFormik<RSVPFormValues>>
  step: RSVPStep
  status: Status
  errorMessage?: string
  attendingMembers: Party['members']
  editableMembers: Party['members']
  lockedMembers: Party['members']
  setResponse: (guestId: string, isAttending: boolean) => void
  next: () => void
  back: () => void
  retry: () => void
}

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
  const [status, setStatus] = useState<Status>('editing')
  const [errorMessage, setErrorMessage] = useState<string>()
  const restored = useRef(false)

  // A guest who already responded is read-only: we show what they said and
  // leave their answer — and their existing food/spirit answers — untouched.
  const editableMembers = party.members.filter(
    (m) => m.rsvp === 'Not Responded',
  )
  const lockedMembers = party.members.filter((m) => m.rsvp !== 'Not Responded')

  const formik = useFormik<RSVPFormValues>({
    initialValues: getInitialValues(party),
    onSubmit: async (values) => {
      try {
        await submitRsvp({
          partyId,
          email: values.email,
          phone: values.phone,
          textOptIn: values.textOptIn,
          rsvps: editableMembers.map((member) => ({
            guestId: member.uuid,
            guestName: member.Name,
            isAttending: values.responses[member.uuid] ?? false,

            ...values.guestDetails[member.uuid],
          })),
        })
        draftStorage.clear(partyId)
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

  // Restore saved answers once, on mount — localStorage is client-only, so this
  // cannot happen during render without breaking hydration.
  useEffect(() => {
    if (restored.current) return
    restored.current = true
    const saved = draftStorage.load(partyId)
    if (!saved) return
    // Guest ids come from the party, not the draft, so a draft saved before the
    // party changed cannot leave a member without a details entry.
    const initial = getInitialValues(party)
    formik.setValues({
      ...saved,
      guestDetails: { ...initial.guestDetails, ...saved.guestDetails },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist answers until the RSVP is safely stored server-side.
  useEffect(() => {
    if (!restored.current || status === 'success') return
    draftStorage.save(partyId, formik.values)
  }, [partyId, status, formik.values])

  const next = () => {
    const schemas = getStepSchemas(editableMembers.map((m) => m.uuid))
    const result = schemas[step].safeParse(formik.values)
    if (!result.success) {
      formik.setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [
            issue.path.join('.'),
            issue.message,
          ]),
        ),
      )
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
