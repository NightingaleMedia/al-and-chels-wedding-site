import { GoogleAuth } from 'google-auth-library'

const auth = new GoogleAuth()

/**
 * Mints a Google OIDC identity token for the notion-sync backend.
 *
 * The audience must be the bare Cloud Run service URL with no path — it has to
 * match what the backend derives from the request host in `requireAdminToken`,
 * and what Cloud Scheduler is configured with (`--oidc-token-audience`).
 *
 * Server-side only. On GCP the token comes from the metadata server using the
 * runtime service account; locally it falls back to ADC
 * (`gcloud auth application-default login`).
 */
export async function getCloudToken(): Promise<string> {
  const audience = process.env.WEDDING_BACKEND
  if (!audience) {
    throw new Error('WEDDING_BACKEND is not set; cannot mint an identity token')
  }

  const client = await auth.getIdTokenClient(audience)
  const token = await client.idTokenProvider.fetchIdToken(audience)
  console.log(`[getCloudToken] minted ID token for audience ${audience}`)
  return token
}

export const runtime = 'nodejs'
