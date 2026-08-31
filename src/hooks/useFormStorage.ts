'use client'

import { useMemo } from 'react'
import { formStorage, type FormStorageValue } from '@/components/forms/RSVPForm/utils/formStorage'

export interface UseFormStorageReturn<T> {
  save: (data: FormStorageValue<T>) => void
  load: () => FormStorageValue<T> | null
  clear: () => void
}

/**
 * Imperative localStorage access for the RSVP form, scoped to `storageKey`.
 *
 * Deliberately holds no React state: the saved snapshot is read once, on mount,
 * by the caller that owns the form values. Mirroring it into state here would
 * mean a set-state-in-effect on every mount and a second source of truth for
 * data Formik already owns. Every call is a no-op when `localStorage` is
 * unavailable (SSR, private mode, storage disabled).
 */
export const useFormStorage = <T,>(storageKey = 'default'): UseFormStorageReturn<T> =>
  useMemo(
    () => ({
      save: (data: FormStorageValue<T>) => formStorage.save(storageKey, data),
      load: () => formStorage.load<T>(storageKey),
      clear: () => formStorage.clear(storageKey),
    }),
    [storageKey],
  )
