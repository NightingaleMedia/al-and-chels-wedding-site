import { GoogleAuth, type IdTokenClient } from 'google-auth-library'

// Not a server action: this mints a credential for the wedding backend, so it
// must never be callable from the browser. Import it from server code only.

const auth = new GoogleAuth()

/**
 * The audience of a Cloud Run ID token is the receiving service's URL, without
 * any path — `WEDDING_BACKEND` may include one (e.g. `/api/v1`).
 */
const audience = (): string => {
  const backend = process.env.WEDDING_BACKEND
  if (!backend) throw new Error('WEDDING_BACKEND is not set')
  return new URL(backend).origin
}

// Cache the client — it handles token refresh and caching internally.
let clientPromise: Promise<IdTokenClient> | undefined

const getClient = (): Promise<IdTokenClient> => {
  clientPromise ??= auth.getIdTokenClient(audience()).catch((error) => {
    clientPromise = undefined // let the next call retry
    throw error
  })
  return clientPromise
}

/** Google-signed ID token for calling the wedding backend on Cloud Run. */
export async function getCloudToken(): Promise<string> {
  const client = await getClient()
  // v11 returns a fetch `Headers`, so read it with `.get()`.
  const headers = await client.getRequestHeaders()
  const authorization = headers.get('authorization')
  if (!authorization) throw new Error('Google auth returned no Authorization header')
  return authorization.replace(/^Bearer /i, '')
}
