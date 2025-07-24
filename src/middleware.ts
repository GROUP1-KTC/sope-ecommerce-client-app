// import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// import { authMiddleware } from '~/middlewares/auth.middleware'
// import { guestMiddleware } from '~/middlewares/guest.middleware'
// import { roleMiddleware } from '~/middlewares/role.middlware'

export function middleware() {
    return (
        // guestMiddleware(request) ||
        // authMiddleware(request) ||
        // roleMiddleware(request) ||
        NextResponse.next()
    );
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/checkout',
        '/admin/:path*',
        '/login',
        '/register',
        '/seller/:path*',
    ],
};
