import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function roleMiddleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    console.log('--- roleMiddleware ---');
    console.log('Request pathname:', pathname);

    const authCookie = req.cookies.get('authUser')?.value;
    let roles: string[] = [];

    if (authCookie) {
        try {
            const user = JSON.parse(authCookie);
            roles = Array.isArray(user.roles) ? user.roles : [];
            console.log('Parsed user:', user);
            console.log('Roles array:', roles);
        } catch (err) {
            console.log('Failed to parse authUser cookie', err);
            roles = [];
        }
    } else {
        console.log('No authUser cookie found');
    }

    const isAdminRoute = pathname.startsWith('/admin');
    const isSellerRoute = pathname.startsWith('/seller');

    if (isAdminRoute && !roles.includes('ADMIN')) {
        console.log('Access denied: ADMIN role required');
        return NextResponse.redirect(new URL('/error?code=403', req.url));
    }

    if (isSellerRoute && !roles.includes('SELLER')) {
        console.log('Access denied: SELLER role required');
        return NextResponse.redirect(new URL('/error?code=403', req.url));
    }

    console.log('Role check passed, continue');
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/seller/:path*'],
};
