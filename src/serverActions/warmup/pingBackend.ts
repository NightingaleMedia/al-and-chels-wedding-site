'use server'

import { backendClient } from '../backendClient'
import { createWarmupRequestBody } from './warmupRequest'

export async function pingBackend(): Promise<void> {
  const body = createWarmupRequestBody(['db', 'sheets'])

  const res = await backendClient('/warmup', {
    method: 'POST',
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Warmup failed: ${res.status} ${res.statusText}`)
  }
}
