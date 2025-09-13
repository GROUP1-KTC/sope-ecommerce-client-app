import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function roleMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get('session')?.value; 
  const userRole = session ? JSON.parse(session).role : null;

  if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/error?code=403', req.url));
  }

  if (pathname.startsWith('/seller') && userRole !== 'SELLER') {
    return NextResponse.redirect(new URL('/error?code=403', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'],
};
