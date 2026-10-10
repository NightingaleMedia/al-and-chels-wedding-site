'use client'

import { useState, useEffect } from 'react'
import { getGuestsByParty } from '@/serverActions/rsvp/getGuestsByParty'
import { ByParty } from '@/serverActions/rsvp/weddingBackend.schemas'

export function useGuestsByParty() {
  const [data, setData] = useState<ByParty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const parties = await getGuestsByParty()
        setData(parties)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch guests'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
