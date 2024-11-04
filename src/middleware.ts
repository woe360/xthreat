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
// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const publicRoutes = [
//   '/auth/signin',
//   '/auth/signup',
//   '/auth/forgot-password',
//   '/api/auth',
//   '/',
// ];

// const protectedRoutes = [
//   '/dashboard',
//   '/settings',
//   '/profile',
// ];

// export async function middleware(req: NextRequest) {
//   try {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     const { pathname } = req.nextUrl;

//     // Always try to refresh the session first
//     const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError) {
//       console.error('Session error:', sessionError);
//       // Clear any invalid session data
//       await supabase.auth.signOut();
//       const redirectUrl = new URL('/auth/signin', req.url);
//       redirectUrl.searchParams.set('error', 'session_error');
//       return NextResponse.redirect(redirectUrl);
//     }

//     const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
//     const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//     // Additional security check for protected routes
//     if (isProtectedRoute) {
//       if (!session) {
//         console.log('No session found for protected route:', pathname);
//         const redirectUrl = new URL('/auth/signin', req.url);
//         redirectUrl.searchParams.set('redirect_to', pathname);
//         return NextResponse.redirect(redirectUrl);
//       }

//       // Verify session is not expired
//       const sessionExp = session?.expires_at || 0;
//       const now = Math.floor(Date.now() / 1000);
      
//       if (sessionExp < now) {
//         console.log('Session expired');
//         await supabase.auth.signOut();
//         const redirectUrl = new URL('/auth/signin', req.url);
//         redirectUrl.searchParams.set('error', 'session_expired');
//         return NextResponse.redirect(redirectUrl);
//       }

//       // Add auth header to the request
//       const requestHeaders = new Headers(req.headers);
//       requestHeaders.set('x-user-id', session.user.id);
      
//       return NextResponse.next({
//         request: {
//           headers: requestHeaders,
//         },
//       });
//     }

//     // Handle authenticated users trying to access auth pages
//     if (session && pathname.startsWith('/auth')) {
//       return NextResponse.redirect(new URL('/dashboard', req.url));
//     }

//     return res;
//   } catch (error) {
//     console.error('Middleware error:', error);
//     // Fail safe to auth page
//     return NextResponse.redirect(new URL('/auth/signin', req.url));
//   }
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!_next/static|_next/image|favicon.ico|public/|api/public/).*)',
//   ],
// };



// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const publicRoutes = [
//   // Marketing/Public pages
//   '/',
//   '/about',
//   '/contact',
//   '/pricing',
//   '/blog',
//   '/privacy-policy',
//   '/terms-of-service',
//   // Public API routes if any
//   '/api/public',
// ];

// const protectedRoutes = [
//   // Core app routes
//   '/account',
//   '/accounts',
//   '/billing',
//   '/dashboard',
//   '/modules',
//   '/practice',
//   '/progress',
//   '/progress',
//   '/settings',

//   '/profile',
//   '/settings',
//   // Feature routes
//   '/projects',
//   '/reports',
//   '/analytics',
//   '/tasks',
//   '/messages',
//   '/notifications',
//   '/team',
//   '/customers',
//   // Admin routes
//   '/admin',
//   // Protected API routes
//   '/api/user',
//   '/api/data',
// ];

// // Internal auth routes - not directly accessible
// const internalAuthRoutes = ['/login'];

// export async function middleware(req: NextRequest) {
//   try {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     const { pathname } = req.nextUrl;

//      // Check if the route exists in any of our defined routes
//      const routeExists = [...publicRoutes, ...protectedRoutes, ...internalAuthRoutes]
//      .some(route => pathname.startsWith(route));

//    // If route doesn't exist, redirect to landing page
//    // This prevents exposure of which routes exist and which don't
//    if (!routeExists) {
//      return NextResponse.redirect(new URL('/', req.url));
//    }

//     const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError) {
//       console.error('Session error:', sessionError);
//       await supabase.auth.signOut();
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
//     const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
//     const isInternalAuthRoute = internalAuthRoutes.some(route => pathname.startsWith(route));

//     // If trying to access auth routes directly, redirect to home
//     if (isInternalAuthRoute) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     // Handle protected routes
//     const requiresAuth = isProtectedRoute || (!isPublicRoute && !isInternalAuthRoute);
//     if (requiresAuth) {
//       if (!session) {
//         // Always redirect to landing page if not authenticated
//         return NextResponse.redirect(new URL('/', req.url));
//       }

//       const sessionExp = session?.expires_at || 0;
//       const now = Math.floor(Date.now() / 1000);
      
//       if (sessionExp < now) {
//         console.log('Session expired');
//         await supabase.auth.signOut();
//         return NextResponse.redirect(new URL('/', req.url));
//       }

//       // Add auth headers for protected routes
//       const requestHeaders = new Headers(req.headers);
//       requestHeaders.set('x-user-id', session.user.id);
//       if (session.user.email) {
//         requestHeaders.set('x-user-email', session.user.email);
//       }
      
//       return NextResponse.next({
//         request: {
//           headers: requestHeaders,
//         },
//       });
//     }

//     // Add security headers to all responses
//     const response = NextResponse.next({
//       request: {
//         headers: new Headers(req.headers),
//       },
//     });

//     response.headers.set('X-Frame-Options', 'DENY');
//     response.headers.set('X-Content-Type-Options', 'nosniff');
//     response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
//     response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
//     // Add CSP header for additional security
//     response.headers.set(
//       'Content-Security-Policy',
//       "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
//     );

//     return response;

//   } catch (error) {
//     console.error('Middleware error:', error);
//     // Always redirect to landing page on error
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      * - api/public (public API routes)
//      */
//     '/((?!_next/static|_next/image|favicon.ico|public/|api/public/).*)',
//   ],
// };



// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const publicRoutes = [
//   // Marketing/Public pages
//   '/',
//   '/phishing-awareness',
//   '/security-awareness',
//   '/role-based-training',
//   '/weak-points',
//   '/custom-trainings',
//   '/pricing',
//   '/about',
//   '/contact',
//   '/cookies',
//   '/privacy',
//   '/terms',
//   '/login',
// ];

// const protectedRoutes = [
//   // Core app routes
//   '/account',
//   '/accounts',
//   '/billing',
//   '/dashboard',
//   '/modules',
//   '/practice',
//   '/progress',
//   '/settings',
//   '/profile',
//   // Admin routes
//   '/admin',
//   // Protected API routes
//   '/api/user',
//   '/api/data',
// ];

// // Internal auth routes - not directly accessible
// const internalAuthRoutes = ['/login'];

// export async function middleware(req: NextRequest) {
//   try {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     const { pathname } = req.nextUrl;

//     // First, check if it's a Next.js internal route that should be allowed
//     if (
//       pathname.startsWith('/_next') ||
//       pathname.startsWith('/api/public') ||
//       pathname === '/favicon.ico' ||
//       pathname.startsWith('/public/')
//     ) {
//       return res;
//     }

//     const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//     if (sessionError) {
//       console.error('Session error:', sessionError);
//       await supabase.auth.signOut();
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
//     const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
//     const isInternalAuthRoute = internalAuthRoutes.some(route => pathname.startsWith(route));

//     // If the route is not in any of our defined routes, redirect to home
//     if (!isPublicRoute && !isProtectedRoute && !isInternalAuthRoute) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     // If trying to access auth routes directly, redirect to home
//     if (isInternalAuthRoute) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     // Handle protected routes
//     if (isProtectedRoute) {
//       if (!session) {
//         return NextResponse.redirect(new URL('/', req.url));
//       }

//       const sessionExp = session?.expires_at || 0;
//       const now = Math.floor(Date.now() / 1000);
      
//       if (sessionExp < now) {
//         console.log('Session expired');
//         await supabase.auth.signOut();
//         return NextResponse.redirect(new URL('/', req.url));
//       }

//       const requestHeaders = new Headers(req.headers);
//       requestHeaders.set('x-user-id', session.user.id);
//       if (session.user.email) {
//         requestHeaders.set('x-user-email', session.user.email);
//       }
      
//       return NextResponse.next({
//         request: {
//           headers: requestHeaders,
//         },
//       });
//     }

//     // For public routes or if we somehow get here
//     const response = NextResponse.next({
//       request: {
//         headers: new Headers(req.headers),
//       },
//     });

//     // Add security headers
//     response.headers.set('X-Frame-Options', 'DENY');
//     response.headers.set('X-Content-Type-Options', 'nosniff');
//     response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
//     response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
//     response.headers.set(
//       'Content-Security-Policy',
//       "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
//     );

//     return response;

//   } catch (error) {
//     console.error('Middleware error:', error);
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// }

// export const config = {
//   matcher: [
//     '/(.*)', // Match ALL routes
//     // exclude some paths
//     '/((?!_next/static|_next/image|favicon.ico).*)',
//   ],
// };


import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  // Marketing/Public pages
  '/',
  '/phishing-awareness',
  '/security-awareness',
  '/role-based-training',
  '/weak-points',
  '/custom-trainings',
  '/pricing',
  '/about',
  '/contact',
  '/cookies',
  '/privacy',
  '/terms',
  '/login',  // This should be public for OTP login
  '/auth',   // Add this if you have auth callback routes
  '/api/auth' // Add this if you have auth API routes
];

const protectedRoutes = [
  // Core app routes
  '/account',
  '/accounts',
  '/billing',
  '/dashboard',
  '/modules',
  '/practice',
  '/progress',
  '/settings',
  '/profile',
  // Admin routes
  '/admin',
  // Protected API routes
  '/api/user',
  '/api/data',
];

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { pathname } = req.nextUrl;

    // Allow all Next.js internal routes and static files
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api/public') ||
      pathname === '/favicon.ico' ||
      pathname.startsWith('/public/')
    ) {
      return res;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Handle protected routes
    if (isProtectedRoute && !session) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // All other routes proceed normally
    return res;

  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};