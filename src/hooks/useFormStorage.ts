'use client'

import {
  formStorage,
  FormStorageValue,
} from '@/components/forms/RSVPForm/utils/formStorage'
import { useEffect, useState } from 'react'

export interface UseFormStorageReturn {
  savedData: FormStorageValue | null
  save: (data: FormStorageValue) => void
  load: () => FormStorageValue | null
  clear: () => void
}

/**
 * Hook for managing RSVP form data in localStorage with SSR hydration safety.
 *
 * Provides persistent storage of form state across page reloads, with proper
 * handling of SSR environments where localStorage is not available.
 *
 * @param storageKey - Optional key for storing data (default: 'default')
 * @returns Object containing savedData, save, load, and clear methods
 */
export const useFormStorage = (
  storageKey: string = 'default',
): UseFormStorageReturn => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [savedData, setSavedData] = useState<FormStorageValue | null>(null)

  // Hydration safety: only access localStorage after component mounts on client
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)

    // Load data from storage on mount
    if (typeof window !== 'undefined') {
      const data = formStorage.load(storageKey)
      setSavedData(data)
    }
  }, [storageKey])

  const save = (data: FormStorageValue): void => {
    if (!isMounted || typeof window === 'undefined') return

    setSavedData(data)
    formStorage.save(storageKey, data)
  }

  const load = (): FormStorageValue | null => {
    if (!isMounted || typeof window === 'undefined') return null

    const data = formStorage.load(storageKey)
    setSavedData(data)
    return data
  }

  const clear = (): void => {
    if (!isMounted || typeof window === 'undefined') return

    setSavedData(null)
    formStorage.clear(storageKey)
  }

  return {
    savedData: isMounted ? savedData : null,
    save,
    load,
    clear,
  }
}
