import { notFound } from 'next/navigation'
import { Typography } from '@mui/material'
import RSVPForm from '@/components/forms/RSVPForm/RSVPForm'
import { getPartyByPartyId } from '@/serverActions/rsvp/getPartyByPartyId'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

export default async function PartyRSVPPage(
  props: PageProps<'/rsvp/[partyId]'>,
) {
  const { partyId } = await props.params

  let party: Party
  try {
    party = await getPartyByPartyId(partyId)
  } catch {
    notFound()
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col px-4 pb-8">
      <Typography variant="h1">{party.partyName}</Typography>
      <RSVPForm party={party} />
    </main>
  )
}
