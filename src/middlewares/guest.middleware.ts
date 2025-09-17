import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function guestMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const guestOnlyRoutes = ['/login', '/register'];
  const isGuestRoute = guestOnlyRoutes.some((route) => pathname.startsWith(route));

  if (!isGuestRoute) return null;

  const authCookie = req.cookies.get('authUser')?.value;
  if (!authCookie) return null;

  try {
    const user = JSON.parse(authCookie);

    if (user?.accessToken || user?.token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch {
    return null;
  }

  return null;
}
