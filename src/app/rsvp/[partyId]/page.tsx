import { notFound } from 'next/navigation'
import { Button, Typography } from '@mui/material'
import RSVPForm from '@/components/forms/RSVPForm/RSVPForm'
import { getPartyByPartyId } from '@/serverActions/rsvp/getPartyByPartyId'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import { ErrorPanel } from '@/components/forms/RSVPForm/errorPanel'

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function PartyRSVPPage(
  props: PageProps<'/rsvp/[partyId]'>,
) {
  const { partyId } = await props.params

  let party: Party
  try {
    party = await getPartyByPartyId(partyId)
  } catch {
    return (
      <main>
        <ErrorPanel>
          <Button variant="contained" href="/rsvp">
            Search for your RSVP
          </Button>
        </ErrorPanel>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col px-4 pb-8">
      <RSVPForm party={party} />
    </main>
  )
}
