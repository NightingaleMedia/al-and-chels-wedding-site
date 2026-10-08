'use client'
import RSVPForm from '@/components/forms/RSVPForm/RSVPForm'
import { LoadingPageComponents } from '@/components/pageComponents/LoadingPageComponents'
import { getPartyByPartyId } from '@/serverActions/rsvp/getPartyByPartyId'
import type { Party } from '@/serverActions/rsvp/weddingBackend.schemas'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

const initialPartyState = { loading: true, error: false, party: undefined }

export default function PartyRSVPPage(props: PageProps<'/rsvp/[partyId]'>) {
  const { partyId } = use(props.params)
  const router = useRouter()

  const [partyState, setPartyState] = useState<{
    loading: boolean
    error: boolean
    party?: Party
  }>(initialPartyState)

  useEffect(() => {
    getPartyByPartyId(partyId)
      .then((party) => setPartyState({ loading: false, error: false, party }))
      .catch(() => {
        setPartyState({ loading: false, error: true, party: undefined })
      })
  }, [partyId])

  useEffect(() => {
    if (partyState.error) {
      router.replace('/rsvp')
    }
  }, [partyState.error, router])

  return partyState.loading || !partyState.party ? (
    <LoadingPageComponents />
  ) : (
    <Box className="mx-auto flex w-full max-w-xl flex-col px-4 pb-8">
      <RSVPForm party={partyState.party} />
    </Box>
  )
}
