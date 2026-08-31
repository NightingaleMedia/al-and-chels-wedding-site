import { Alert, Typography } from '@mui/material'
import { RSVPForm } from '@/components/forms/RSVPForm'
import { getPartyByPartyId } from '@/serverActions/rsvp/getPartyByPartyId'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import { DEMO_PARTY } from './demoParty'

type LoadResult = { party: Party; notice?: string }

const loadParty = async (partyId?: string): Promise<LoadResult> => {
  if (!partyId) {
    return {
      party: DEMO_PARTY,
      notice: 'Showing a demo party — open /rsvp?partyId=your-party-id to load a real one.',
    }
  }

  try {
    return { party: await getPartyByPartyId(partyId) }
  } catch (error) {
    return {
      party: DEMO_PARTY,
      notice: `Could not load party "${partyId}" (${
        error instanceof Error ? error.message : 'unknown error'
      }). Showing a demo party instead.`,
    }
  }
}

export default async function RSVPPage(props: PageProps<'/rsvp'>) {
  const { partyId } = await props.searchParams
  const { party, notice } = await loadParty(
    typeof partyId === 'string' ? partyId : undefined,
  )

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <Typography variant="h1">RSVP</Typography>
      {notice && <Alert severity="info">{notice}</Alert>}
      <RSVPForm party={party} storageKey={party.partyId ?? 'default'} />
    </main>
  )
}
