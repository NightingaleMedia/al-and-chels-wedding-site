'use server'
import { GoogleAuth } from 'google-auth-library'

const auth = new GoogleAuth()
const BACKEND_URL = process.env.WEDDING_BACKEND!

// Cache the client — it handles token refresh and caching internally.

export async function getCloudToken() {
  const client = await auth.getIdTokenClient(BACKEND_URL)
  return client
}
