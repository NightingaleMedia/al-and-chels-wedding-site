export function register() {
  console.log(
    '[startup] backend URL:',
    process.env.WEDDING_BACKEND ?? process.env.NEXT_PUBLIC_WEDDING_BACKEND,
  )
  console.log('[startup] app environment:', process.env.NEXT_PUBLIC_APP_ENV)
}
