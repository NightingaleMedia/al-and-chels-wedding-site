import { Alert, Typography } from '@mui/material'
import { RSVPForm } from '@/components/forms/RSVPForm'
import { getPartyByPartyId } from '@/serverActions/rsvp/getPartyByPartyId'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

type LoadResult = { party: Party } | { error: string }

const loadParty = async (partyId: string): Promise<LoadResult> => {
  try {
    return { party: await getPartyByPartyId(partyId) }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/** `/rsvp/<partyId>` — the real entry point once a guest's party is known. */
export default async function PartyRSVPPage(props: PageProps<'/rsvp/[partyId]'>) {
  const { partyId } = await props.params
  const result = await loadParty(partyId)

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <Typography variant="h1">RSVP</Typography>
      {'error' in result ? (
        <Alert severity="error">
          We couldn&apos;t find the party &ldquo;{partyId}&rdquo; ({result.error}). Email
          chelsandalsigman@gmail.com and we&apos;ll sort it out.
        </Alert>
      ) : (
        <>
          <Typography variant="body2">{result.party.partyName}</Typography>
          <RSVPForm party={result.party} storageKey={partyId} />
        </>
      )}
    </main>
  )
}
