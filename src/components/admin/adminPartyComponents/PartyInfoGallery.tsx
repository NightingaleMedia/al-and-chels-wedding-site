'use client'

import { useState, useMemo } from 'react'
import { Tabs, Tab, TextField, CircularProgress, Alert } from '@mui/material'
import { useGuestsByParty } from '@/hooks/useGuestsByParty'
import PartyInfoCard from './PartyInfoCard'

export default function PartyInfoGallery() {
  const { data: parties, loading, error } = useGuestsByParty()
  const [tab, setTab] = useState<'bride' | 'groom'>('bride')
  const [search, setSearch] = useState('')

  const filteredParties = useMemo(() => {
    return parties.filter((party) => {
      const matchesTab = party.guests.some((g) => g.brideGroom === tab)
      if (!matchesTab) return false

      if (!search.trim()) return true
      const searchLower = search.toLowerCase()
      const matchesPartyName = party.partyName
        .toLowerCase()
        .includes(searchLower)
      const matchesGuestName = party.guests.some((g) =>
        g.Name.toLowerCase().includes(searchLower),
      )
      return matchesPartyName || matchesGuestName
    })
  }, [parties, tab, search])

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Bride" value="bride" />
        <Tab label="Groom" value="groom" />
      </Tabs>

      <TextField
        placeholder="Search parties or guests..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredParties
          .sort((a, b) => (a.guests[0].rsvp === 'Attending' ? -1 : 1))
          .map((party) => (
            <PartyInfoCard key={party.partyName} party={party} />
          ))}
      </div>

      {filteredParties.length === 0 && (
        <p className="text-center text-gray-500">No parties found.</p>
      )}
    </div>
  )
}
