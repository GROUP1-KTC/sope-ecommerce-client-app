import { NextRequest, NextResponse } from 'next/server'

export function guestMiddleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value
    const guestOnlyRoutes = ['/login', '/register']
    const pathname = request.nextUrl.pathname

    if (token && guestOnlyRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return null
}
