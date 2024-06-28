import { NextRequest, NextResponse } from 'next/server';

import { KEYS_COOKIES, ROUTES } from '@/paths';

const authenticatedRoutes = Object.values(ROUTES.AUTHENTICATED);
const withoutAuthenticatedRoutes = Object.values(ROUTES.WITHOUT_AUTH);

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(KEYS_COOKIES.USER_SESSIONS)?.value ?? '';

  if (!session && authenticatedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(
      ROUTES.WITHOUT_AUTH.SIGN_IN,
      request.nextUrl.origin
    );

    return NextResponse.redirect(absoluteURL.toString());
  }

  if (
    session &&
    withoutAuthenticatedRoutes.includes(request.nextUrl.pathname)
  ) {
    const absoluteURL = new URL(
      ROUTES.AUTHENTICATED.HOME,
      request.nextUrl.origin
    );
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|image/).*)'],
};
