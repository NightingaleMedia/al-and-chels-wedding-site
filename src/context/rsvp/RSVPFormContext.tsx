'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useFormik } from 'formik'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import { submitRsvp } from '@/serverActions/rsvp/submitRsvp'
import {
  getInitialValues,
  stepSchemas,
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
  toggleGuest: (guestId: string) => void
  next: () => void
  back: () => void
  retry: () => void
}

const RSVPFormContext = createContext<RSVPFormContextValue | null>(null)

/** All RSVP form state and behaviour. Step components only read from this. */
export function useRSVPForm(): RSVPFormContextValue {
  const context = useContext(RSVPFormContext)
  if (!context) throw new Error('useRSVPForm must be used inside <RSVPFormProvider>')
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

  const formik = useFormik<RSVPFormValues>({
    initialValues: getInitialValues(party),
    onSubmit: async (values) => {
      try {
        await submitRsvp({
          partyId,
          email: values.email,
          phoneNumber: values.phoneNumber,
          textOptIn: values.textOptIn,
          rsvps: party.members.map((member) => ({
            guestId: member.uuid,
            guestName: member.Name,
            isAttending: values.attendingGuestIds.includes(member.uuid),
            ...values.guestDetails[member.uuid],
          })),
        })
        draftStorage.clear(partyId)
        setStatus('success')
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
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
    if (saved) formik.setValues(saved)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist answers until the RSVP is safely stored server-side.
  useEffect(() => {
    if (!restored.current || status === 'success') return
    draftStorage.save(partyId, formik.values)
  }, [partyId, status, formik.values])

  const next = () => {
    const result = stepSchemas[step].safeParse(formik.values)
    if (!result.success) {
      formik.setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [issue.path.join('.'), issue.message]),
        ),
      )
      return
    }
    formik.setErrors({})
    if (step === 3) formik.handleSubmit()
    else setStep((current) => (current + 1) as RSVPStep)
  }

  const back = () => setStep((current) => (current > 1 ? ((current - 1) as RSVPStep) : current))

  const retry = () => {
    setStatus('editing')
    setErrorMessage(undefined)
    setStep(3)
  }

  const toggleGuest = (guestId: string) =>
    formik.setFieldValue(
      'attendingGuestIds',
      formik.values.attendingGuestIds.includes(guestId)
        ? formik.values.attendingGuestIds.filter((id) => id !== guestId)
        : [...formik.values.attendingGuestIds, guestId],
    )

  const attendingMembers = party.members.filter((member) =>
    formik.values.attendingGuestIds.includes(member.uuid),
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
        toggleGuest,
        next,
        back,
        retry,
      }}
    >
      {children}
    </RSVPFormContext.Provider>
  )
}
