import {  clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',            // Dashboard umum/landing page
  '/auth/sign-in(.*)', // Halaman sign-in + child routes
  '/auth/sign-up(.*)', // Halaman sign-up + child routes'
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)){
   await auth.protect()
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