'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { SUPPORT_EMAIL } from '@/constants'
import { searchGuestByName } from '@/serverActions/rsvp/searchGuestByName'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'

/**
 * The backend returns the single closest party, or an error envelope when it
 * has no match — so a rejected search reads as "no match", not as a failure.
 */
type SearchState =
  | { status: 'idle' }
  | { status: 'searching' }
  | { status: 'found'; party: Party }
  | { status: 'noMatch' }

const NotOnHere = ({ onClear }: { onClear: () => void }) => (
  <div className="flex flex-col items-start gap-2 mt-4">
    <Typography variant="body2" className="text-brown-500">
      Not on here? Email us at{' '}
      <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL} </Link> and
      we&apos;ll sort it out.
    </Typography>
  </div>
)

const ResultCard = ({
  party,
  onClear,
}: {
  party: Party
  onClear: () => void
}) => {
  const guest = party.members[0]
  const summary = `${party.guestCount} ${
    party.guestCount === 1 ? 'guest' : 'guests'
  }`

  return (
    <div className="flex flex-col gap-3">
      <Card variant="outlined" className="p-4 flex items-center gap-4">
        <div className="text-2xl">🎉</div>
        <CardActionArea
          component={Link}
          href={`/rsvp/${party.partyId}`}
          className="flex flex-col items-start gap-1 p-4"
        >
          <Typography variant="h6">{party.partyName}</Typography>
          <Typography variant="body2">{summary}</Typography>
        </CardActionArea>
      </Card>
      <NotOnHere onClear={onClear} />
    </div>
  )
}

/** Find your party by name. Standalone — it shares no state with the RSVP form. */
export default function GuestSearch() {
  const [query, setQuery] = useState('')
  const [state, setState] = useState<SearchState>({ status: 'idle' })

  const search = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    setState({ status: 'searching' })
    try {
      const party = await searchGuestByName({ searchQuery: query.trim() })
      setState(
        party.members.length > 0
          ? { status: 'found', party }
          : { status: 'noMatch' },
      )
    } catch {
      setState({ status: 'noMatch' })
    }
  }

  const clear = () => {
    setQuery('')
    setState({ status: 'idle' })
  }

  return (
    <section className="flex w-full flex-col gap-4">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={search}>
        <TextField
          label="First and last name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={state.status === 'searching'}
          fullWidth
        />
        <div className="flex w-full gap-3">
          <Button
            type="submit"
            variant="contained"
            className="flex-1"
            disabled={!query.trim() || state.status === 'searching'}
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outlined"
            className="flex-1"
            disabled={!query.trim() || state.status === 'searching'}
            onClick={clear}
          >
            Clear
          </Button>
        </div>
      </form>

      {state.status === 'searching' && <CircularProgress size={24} />}

      {/* The closest match: the first member of the party the backend returned. */}
      {state.status === 'found' && (
        <ResultCard party={state.party} onClear={clear} />
      )}

      {state.status === 'noMatch' && (
        <div className="flex flex-col gap-2">
          <Typography variant="body1">
            We couldn&apos;t find anyone by that name.
          </Typography>
          <NotOnHere onClear={clear} />
        </div>
      )}
    </section>
  )
}
