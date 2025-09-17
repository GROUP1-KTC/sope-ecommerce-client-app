import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function roleMiddleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const sessionCookie = req.cookies.get('session')?.value;
    let userRole: string | null = null;

    if (sessionCookie) {
        try {
            const session = JSON.parse(sessionCookie);
            userRole = session.role ?? null;
        } catch {
            userRole = null;
        }
    }

    if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
        return NextResponse.redirect('/error?code=403');
    }

    if (pathname.startsWith('/seller') && userRole !== 'SELLER') {
        return NextResponse.redirect('/error?code=403');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/seller/:path*'],
};
