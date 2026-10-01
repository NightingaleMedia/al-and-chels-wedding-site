import { PingServiceOptions } from '../rsvp/weddingBackend.schemas'

export function createWarmupRequestBody(services?: PingServiceOptions[]) {
  return {
    services,
  }
}
