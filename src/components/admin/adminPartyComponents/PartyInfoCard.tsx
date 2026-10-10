'use client'

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  CardHeader,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material'
import { ByParty, Guest } from '@/serverActions/rsvp/weddingBackend.schemas'
import {
  Check,
  CheckBoxOutlineBlank,
  InfoOutlineSharp,
  InfoRounded,
} from '@mui/icons-material'

type RsvpStatus =
  | 'attending ✅'
  | 'not responded 🔔'
  | 'partially responded 😶‍🌫️'
  | 'declined 👎🏽'

function getRsvpStatus(guests: Guest[]): RsvpStatus {
  const allNotResponded = guests.every((g) => g.rsvp === 'Not Responded')
  const allAttending = guests.every((g) => g.rsvp === 'Attending')
  const allDeclined = guests.every((g) => g.rsvp === 'Not Attending')

  if (allNotResponded) return 'not responded 🔔'
  if (allAttending) return 'attending ✅'
  if (allDeclined) return 'declined 👎🏽'
  return 'partially responded 😶‍🌫️'
}

function getRsvpChipColor(
  status: RsvpStatus,
): 'default' | 'success' | 'warning' | 'error' {
  switch (status) {
    case 'attending ✅':
      return 'success'
    case 'not responded 🔔':
      return 'default'
    case 'partially responded 😶‍🌫️':
      return 'warning'
    case 'declined 👎🏽':
      return 'error'
  }
}

function getMajorityType(guests: Guest[]): 'family' | 'friends' {
  const familyCount = guests.filter(
    (g) => g['Family / Friends'] === 'family',
  ).length
  return familyCount > guests.length / 2 ? 'family' : 'friends'
}

function getAddress(guests: Guest[]): boolean {
  return guests.some((g) => g.address !== null)
}

interface PartyInfoCardProps {
  party: ByParty
}

export default function PartyInfoCard({ party }: PartyInfoCardProps) {
  const rsvpStatus = getRsvpStatus(party.guests)
  const majorityType = getMajorityType(party.guests)

  return (
    <Card variant="outlined" elevation={2}>
      <CardContent
        className="flex flex-col justify-between gap-1.5 h-full"
        sx={{ p: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            className="font-bold"
            sx={{ fontWeight: 'bold', fontSize: '1rem' }}
          >
            {party.partyName} ({party.guests.length})
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {getAddress(party.guests) ? (
            <Check color="success" fontSize="small" />
          ) : (
            <Tooltip title="No address yet" sx={{ cursor: 'pointer' }}>
              <span>🤷🏻‍♀️</span>
            </Tooltip>
          )}

          <IconButton href={`/rsvp/${party.partyId}`}>
            <InfoOutlineSharp fontSize="small" />
          </IconButton>
        </Box>
        <Divider />
        <ul className="list-none p-0 m-0">
          {party.guests.map((guest) => (
            <li key={guest.uuid}>
              <Typography variant="body2" color="text.secondary">
                {guest.Name}
              </Typography>
            </li>
          ))}
        </ul>
        <div className="flex-basis-1 flex-grow"></div>
        <div className="flex justify-between flex-wrap">
          <Chip
            label={rsvpStatus}
            size="small"
            variant="outlined"
            color={getRsvpChipColor(rsvpStatus)}
          />
          <Chip
            label={majorityType}
            size="small"
            color={majorityType === 'family' ? 'primary' : 'info'}
          />
        </div>
      </CardContent>
    </Card>
  )
}
