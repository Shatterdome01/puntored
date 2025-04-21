import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development';
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/references');

  if (isProtected && !isDev) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
