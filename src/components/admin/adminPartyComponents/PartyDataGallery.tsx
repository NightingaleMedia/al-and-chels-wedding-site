'use client'

import { Card, CardContent, CircularProgress, Alert } from '@mui/material'
import { useGuestsByParty } from '@/hooks/useGuestsByParty'
import BrideGroomDonut from './charts/BrideGroomDonut'
import ResponseRateGauge from './charts/ResponseRateGauge'
import RsvpStatusPolar from './charts/RsvpStatusPolar'

export default function PartyDataGallery() {
  const { data: parties, loading, error } = useGuestsByParty()

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card variant="outlined">
        <CardContent className="flex justify-center">
          <BrideGroomDonut parties={parties} />
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent className="flex justify-center">
          <ResponseRateGauge parties={parties} />
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent className="flex justify-center">
          <RsvpStatusPolar parties={parties} />
        </CardContent>
      </Card>
    </div>
  )
}
