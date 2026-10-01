import { connection } from 'next/server'
import { pingBackend } from '@/serverActions/warmup/pingBackend'

/**
 * Fires a backend warm-up ping at request time (never during prerender).
 *
 * Render inside a <Suspense> boundary so the surrounding page can still
 * prerender a static shell. `connection()` forces this subtree to run at
 * request time, keeping the non-deterministic auth/token work out of the
 * prerendered output (required under Cache Components).
 */
export async function BackendWarmup() {
  await connection()
  await pingBackend()
  return null
}
