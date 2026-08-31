import type { z } from 'zod'
import { log } from './logger'

interface BackendRequestOptions<S extends z.ZodTypeAny> {
  /** Name of the calling server action — logged as `jsonPayload.action`. */
  action: string
  path: string
  method: 'GET' | 'POST'
  /** Envelope schema for the response, e.g. `partyEnvelopeSchema`. */
  envelope: S
  body?: unknown
  /** Safe identifiers to attach to every log line for this call. */
  details?: Record<string, unknown>
}

/**
 * One fetch to the wedding backend, logged end to end: the request, how long it
 * took, the HTTP status, and — when something fails — the response body that
 * caused it. Every failure path throws with a message the caller can surface.
 */
export async function backendRequest<S extends z.ZodTypeAny>({
  action,
  path,
  method,
  envelope,
  body,
  details = {},
}: BackendRequestOptions<S>): Promise<Extract<z.infer<S>, { ok: true }>> {
  const base = process.env.WEDDING_BACKEND
  const context = { action, method, path, ...details }

  if (!base) {
    log('ERROR', `${action}: WEDDING_BACKEND is not set`, context)
    throw new Error('WEDDING_BACKEND is not set')
  }

  const url = `${base}${path}`
  const startedAt = Date.now()
  log('INFO', `${action}: request`, { ...context, url })

  let response: Response
  let text: string
  try {
    response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
    })
    text = await response.text()
  } catch (error) {
    // Almost always DNS, TLS or the backend not being reachable from Cloud Run.
    log('ERROR', `${action}: request failed`, {
      ...context,
      url,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
      // node's fetch reports a bare "fetch failed"; the cause carries the
      // ECONNREFUSED / ENOTFOUND / certificate detail you actually need.
      cause:
        error instanceof Error && error.cause instanceof Error
          ? `${error.cause.name}: ${error.cause.message}`
          : undefined,
    })
    throw new Error(`${action} could not reach the wedding backend`)
  }

  const durationMs = Date.now() - startedAt
  const result = { ...context, url, status: response.status, durationMs }
  // Bodies are small and hold placeholder guest data; the snippet is what makes
  // a bad response debuggable from the logs alone.
  const bodySnippet = text.slice(0, 500)

  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    log('ERROR', `${action}: response was not JSON`, { ...result, body: bodySnippet })
    throw new Error(`${action} got a non-JSON response (status ${response.status})`)
  }

  const parsed = envelope.safeParse(json)
  if (!parsed.success) {
    log('ERROR', `${action}: response did not match the expected shape`, {
      ...result,
      body: bodySnippet,
      issues: parsed.error.issues,
    })
    throw new Error(`${action} got an unexpected response shape`)
  }

  if (!parsed.data.ok) {
    log('WARNING', `${action}: backend returned an error`, {
      ...result,
      error: parsed.data.error,
    })
    throw new Error(parsed.data.error)
  }

  log('INFO', `${action}: ok`, result)
  return parsed.data as Extract<z.infer<S>, { ok: true }>
}
