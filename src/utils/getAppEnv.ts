export type AppEnv = 'preprod' | 'prod'

export function getAppEnv(): AppEnv {
  const href = typeof window === 'undefined' ? undefined : window.location.href

  return href?.includes('https://chels-and-al.com') ? 'prod' : 'preprod'
}
