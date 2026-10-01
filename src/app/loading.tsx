import { LoadingPageComponents } from '@/components/pageComponents/LoadingPageComponents'
import { pingBackend } from '@/serverActions/warmup/pingBackend'

export default async function Loading() {
  await pingBackend()
  return <LoadingPageComponents />
}
