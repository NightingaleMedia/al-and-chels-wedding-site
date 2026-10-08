import { MarkdownContent } from '@/components/MarkdownContent'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false

export default function GettingTherePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <MarkdownContent file="gettingThere.md" />
    </div>
  )
}
