import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function roleMiddleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const role = request.cookies.get('role')?.value;

    if (pathname.startsWith('/seller') && role !== 'seller') {
        return NextResponse.redirect(new URL('/error?code=403', request.url));
    }

    return null;
}
