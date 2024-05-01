import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export const config = {
  matcher: '/:path*',
}

export async function middleware(request: NextRequest) {
  return NextResponse.next()
}
