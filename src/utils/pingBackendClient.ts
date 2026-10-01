import { PingServiceOptions } from '@/serverActions/rsvp/weddingBackend.schemas'
import { createWarmupRequestBody } from '@/serverActions/warmup/warmupRequest'

export async function pingBackendClient(
  services?: PingServiceOptions[],
): Promise<void> {
  const body = createWarmupRequestBody(services)

  const url = `${process.env.NEXT_PUBLIC_WEDDING_BACKEND}/api/v1/warmup`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Warmup failed: ${res.status} ${res.statusText}`)
  }
}
