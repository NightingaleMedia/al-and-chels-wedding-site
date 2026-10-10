// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.

import { ComingSoonPage } from '@/components/pageComponents/ComingSoonPageComponents'

// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false

export default function RegistryPage() {
  return <ComingSoonPage />
}
