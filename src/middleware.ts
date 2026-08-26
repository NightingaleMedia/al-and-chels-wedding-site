import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { FEATURES } from '@/features'

export function middleware(request: NextRequest) {
  if (
    FEATURES.onlySaveTheDate &&
    !request.nextUrl.pathname.startsWith('/save-the-date')
  ) {
    return NextResponse.redirect(new URL('/save-the-date', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico)).*)',
  ],
}
