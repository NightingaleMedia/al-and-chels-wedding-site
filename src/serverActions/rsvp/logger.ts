type Severity = 'INFO' | 'WARNING' | 'ERROR'

/**
 * Cloud Run parses single-line JSON on stdout: `severity` and `message` become
 * first-class fields in Cloud Logging and everything else lands in
 * `jsonPayload`, so you can filter with e.g.
 *
 *   jsonPayload.component="rsvp" severity>=ERROR
 *   jsonPayload.action="submitRsvp"
 *
 * Locally it is still readable — one JSON line per event.
 */
export const log = (
  severity: Severity,
  message: string,
  fields: Record<string, unknown> = {},
) => {
  console.log(JSON.stringify({ severity, message, component: 'rsvp', ...fields }))
}
