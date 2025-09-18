import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authMiddleware } from '~/middlewares/auth.middleware';
import { roleMiddleware } from './middlewares/role.middlware';
import { guestMiddleware } from './middlewares/guest.middleware';

export function middleware(req: NextRequest) {
    const guest = guestMiddleware(req);
    if (guest) return guest;

    const auth = authMiddleware(req);
    if (auth) return auth;

    const role = roleMiddleware(req);
    if (role) return role;

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/checkout',
        '/admin/:path*',
        '/login',
        '/register',
        '/seller/:path*',
        '/account/:path*',
        '/create-shop/:path*',
    ],
};
