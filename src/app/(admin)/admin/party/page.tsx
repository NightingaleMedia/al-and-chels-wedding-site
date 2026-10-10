import {
  PartyInfoGallery,
  PartyDataGallery,
  MobileCollapsible,
} from '@/components/admin/adminPartyComponents'

export default function PartyPage() {
  return (
    <div className="lg:p-3 p-0 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Parties!</h1>
      <MobileCollapsible title="Charts">
        <PartyDataGallery />
      </MobileCollapsible>
      <PartyInfoGallery />
    </div>
  )
}
