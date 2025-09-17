import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/account', '/admin', '/seller', '/create-shop'];
  const requiresAuth = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!requiresAuth) return NextResponse.next();

  const authCookie = req.cookies.get('authUser')?.value;
  let token: string | null = null;

  if (authCookie) {
    try {
      const user = JSON.parse(authCookie);
      token = user.accessToken ?? user.token ?? null;
    } catch {
      token = null;
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return null;
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/seller/:path*', '/create-shop/:path*'],
};
