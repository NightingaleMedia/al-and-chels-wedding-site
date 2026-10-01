'use client'

import { useState } from 'react'
import { pingBackendClient } from '@/utils/pingBackendClient'
import { PingServiceOptions } from '@/serverActions/rsvp/weddingBackend.schemas'

export function usePingBackend(isRsvp: boolean = false) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // If its not RSVP we just need to warmup the db
  const services: PingServiceOptions[] = isRsvp ? ['db', 'sheets'] : ['db']
  const ping = async () => {
    setLoading(true)
    setError(null)

    try {
      await pingBackendClient(services)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  return { ping, loading, error }
}
