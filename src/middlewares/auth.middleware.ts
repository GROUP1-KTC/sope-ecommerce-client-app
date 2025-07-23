import { NextRequest, NextResponse } from 'next/server'

export function authMiddleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value
    const { pathname } = request.nextUrl

    const protectedRoutes = ['/dashboard', '/cart', '/checkout']
    const requiredAuth = protectedRoutes.some((route) => pathname.startsWith(route))

    if (requiredAuth && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
