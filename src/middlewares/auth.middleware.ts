import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const authHeader = req.headers.get('Authorization'); 
  const token = authHeader?.split(' ')[1]; 

  const protectedRoutes = ['/account', '/admin', '/seller', '/create-shop'];
  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (requiresAuth && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/seller/:path*', '/create-shop/:path*'],
};

