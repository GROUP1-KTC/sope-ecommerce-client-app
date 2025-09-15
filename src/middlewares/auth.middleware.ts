import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/account', '/admin', '/seller', '/create-shop'];
  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!requiresAuth) {
    return NextResponse.next(); 
  }

  const sessionCookie = req.cookies.get('session')?.value;
  let token: string | null = null;

  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie);
      token = session.token ?? null; 
    } catch {
      token = null;
    }
  }

  if (!token) {
    return NextResponse.redirect('/login'); 
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/seller/:path*', '/create-shop/:path*'],
};
