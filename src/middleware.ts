// // middleware.ts
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Define public routes that don't require authentication
// const publicRoutes = [
//   '/auth/signin',
//   '/auth/signup',
//   '/auth/forgot-password',
//   '/api/auth',
//   '/',  // Landing page
// ];

// // Define protected routes
// const protectedRoutes = [
//   '/dashboard',
//   '/settings',
//   '/profile',
//   // Add other protected routes here
// ];

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   const { pathname } = req.nextUrl;

//   // Refresh session if expired
//   const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//   // Check if the route is public
//   const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//   // Allow public routes and static assets
//   if (isPublicRoute) {
//     return res;
//   }

//   // Redirect to login if accessing protected route without session
//   if (isProtectedRoute && !session) {
//     const redirectUrl = new URL('/auth/signin', req.url);
//     redirectUrl.searchParams.set('redirect_to', pathname);
//     return NextResponse.redirect(redirectUrl);
//   }

//   // Redirect authenticated users away from auth pages
//   if (session && pathname.startsWith('/auth')) {
//     return NextResponse.redirect(new URL('/dashboard', req.url));
//   }

//   return res;
// }

// export const config = {
//   matcher: [
//     // Auth routes
//     '/auth/:path*',
//     // Protected routes
//     '/dashboard/:path*',
//     '/settings/:path*',
//     '/profile/:path*',
//     // Add other protected routes here
//   ]
// };

// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/forgot-password',
  '/api/auth',
  '/',
];

const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/profile',
];

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { pathname } = req.nextUrl;

    // Always try to refresh the session first
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Session error:', sessionError);
      // Clear any invalid session data
      await supabase.auth.signOut();
      const redirectUrl = new URL('/auth/signin', req.url);
      redirectUrl.searchParams.set('error', 'session_error');
      return NextResponse.redirect(redirectUrl);
    }

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Additional security check for protected routes
    if (isProtectedRoute) {
      if (!session) {
        console.log('No session found for protected route:', pathname);
        const redirectUrl = new URL('/auth/signin', req.url);
        redirectUrl.searchParams.set('redirect_to', pathname);
        return NextResponse.redirect(redirectUrl);
      }

      // Verify session is not expired
      const sessionExp = session?.expires_at || 0;
      const now = Math.floor(Date.now() / 1000);
      
      if (sessionExp < now) {
        console.log('Session expired');
        await supabase.auth.signOut();
        const redirectUrl = new URL('/auth/signin', req.url);
        redirectUrl.searchParams.set('error', 'session_expired');
        return NextResponse.redirect(redirectUrl);
      }

      // Add auth header to the request
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-user-id', session.user.id);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // Handle authenticated users trying to access auth pages
    if (session && pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // Fail safe to auth page
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/public/).*)',
  ],
};