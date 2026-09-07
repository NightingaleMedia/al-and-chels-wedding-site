import { ComingSoonPage } from '@/components/pageComponents/ComingSoonPageComponents'
import { FEATURES } from '@/features'
import { getAppEnv } from '@/utils/getAppEnv'

export function pageEnabledOrComingSoon(path: string): React.ReactNode | false {
  const pageFeature = FEATURES.pages[path]

  if (pageFeature && !pageFeature[getAppEnv()]) {
    return <ComingSoonPage />
  }

  return false
}
