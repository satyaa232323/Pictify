import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',   
  '/pins',         // Dashboard umum/landing page
  '/auth/sign-in(.*)', // Halaman sign-in + child routes
  '/auth/sign-up(.*)', // Halaman sign-up + child routes
  '/api/pins(.*)',    // semua route di bawah /api/pins jadi public
  '/api/searchPins(.*)'
])

const isProtectedRoute = createRouteMatcher([
  '/pins/(.+)',       // Pin detail pages require auth
  '/profile(.*)',     // Profile pages require auth
  '/create(.*)',      // Create pages require auth
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;

  // Protect specific routes
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // Protect all non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // Auto-redirect kalau user sudah login
  if (
    userId &&
    (path.startsWith('/auth/sign-in') || path.startsWith('/auth/sign-up'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};