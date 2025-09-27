import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function roleMiddleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const authCookie = req.cookies.get('authUser')?.value;
    let roles: string[] = [];

    if (authCookie) {
        try {
            const user = JSON.parse(authCookie);
            roles = Array.isArray(user.roles) ? user.roles : [];
            console.log('User roles from cookie:', roles);
        } catch (_err) {
            roles = [];
        }
    } else {
        console.log('No authUser cookie found');
    }

    const isAdminRoute = pathname.startsWith('/admin');
    const isSellerRoute = pathname.startsWith('/seller');
    const isShipperRoute = pathname.startsWith('/shipper');

    if (roles.includes('ADMIN') && !isAdminRoute) {
        return NextResponse.redirect(new URL('/admin', req.url));
    }

    if (roles.includes('SHIPPER') && !isShipperRoute) {
        return NextResponse.redirect(new URL('/shipper', req.url));
    }

    if (isAdminRoute && !roles.includes('ADMIN')) {
        return NextResponse.redirect(new URL('/error?code=403', req.url));
    }

    if (isSellerRoute && !roles.includes('SELLER')) {
        return NextResponse.redirect(new URL('/error?code=403', req.url));
    }

    if (isShipperRoute && !roles.includes('SHIPPER')) {
        return NextResponse.redirect(new URL('/error?code=403', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/seller/:path*', '/shipper/:path*'],
};
