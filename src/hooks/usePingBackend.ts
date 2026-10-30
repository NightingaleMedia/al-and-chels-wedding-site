'use client'

import { useEffect, useState } from 'react'
import { pingBackendClient } from '@/utils/pingBackendClient'
import { PingServiceOptions } from '@/serverActions/rsvp/weddingBackend.schemas'

export function usePingBackend(isRsvp: boolean = false) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // If its not RSVP we just need to warmup the db
    const services: PingServiceOptions[] = isRsvp ? ['db', 'sheets'] : ['db']
    let cancelled = false

    pingBackendClient(services)
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isRsvp])

  return { loading, error }
}
