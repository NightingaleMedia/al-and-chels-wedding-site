import { getCloudToken } from './token/getCloudToken'

// Not a server action: exposing a generic fetch to the browser would let any
// caller hit any backend path. Import it from the actions that need it.

/** fetch against WEDDING_BACKEND, authenticated outside local dev. */
export async function backendClient(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const method = init.method ?? 'GET'
  const token = await getCloudToken()

  const url = new URL(`/api/v1${path}`, process.env.WEDDING_BACKEND)
  console.log(`[backend] → ${method} ${url}${token ? ' (auth)' : ''}`)
  const started = Date.now()
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
    cache: 'no-store',
  })
  console.log(
    `[backend] ← ${method} ${url} ${res.status} ${res.statusText} ${Date.now() - started}ms`,
  )
  return res
}
