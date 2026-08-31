import { GoogleAuth } from 'google-auth-library'

// Not a server action: this mints a credential, so keep it out of the browser.
const auth = new GoogleAuth()

/** Google-signed ID token for calling the wedding backend on Cloud Run. */
export async function getCloudToken(): Promise<string> {
  // The audience is the service URL without a path — WEDDING_BACKEND has one.
  const audience = new URL(process.env.WEDDING_BACKEND!).origin
  const client = await auth.getIdTokenClient(audience)
  const headers = await client.getRequestHeaders()
  return headers.get('authorization')!.replace('Bearer ', '')
}
