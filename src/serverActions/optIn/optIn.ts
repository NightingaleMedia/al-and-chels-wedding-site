'use server'

import { z } from 'zod'
import { backendClient } from '../backendClient'
import { SubscribeRequest, SubscribeToUpdates } from './optIn.schemas'

/* ------------------------------- actions ------------------------------- */

const SUBSCRIBE_ENDPOINT = '/sms/subscribers'

const subscribeToUpdatesFun = (async (request) => {
  let baseEndpoint = SUBSCRIBE_ENDPOINT
  if ('email' in request) {
    baseEndpoint = baseEndpoint + '/email'
  }
  try {
    const res = await backendClient(baseEndpoint, {
      method: 'POST',
      body: JSON.stringify(request),
    })

    if (!res.ok) {
      const errorBody = await res.text()
      console.error(
        `[subscribeToUpdates] Failed: ${res.status} ${res.statusText}`,
        errorBody,
      )
      return { success: false, error: 'Failed to subscribe. Please try again.' }
    }

    return { success: true }
  } catch (error) {
    console.error('[subscribeToUpdates] Exception:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}) satisfies SubscribeToUpdates

export async function subscribeToUpdates(request: SubscribeRequest) {
  return subscribeToUpdatesFun(request)
}
