// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Define public routes that don't require authentication
// const publicRoutes = [
//   '/',
//   '/pricing',
//   '/about',
//   '/contact',
//   '/cookies',
//   '/privacy',
//   '/terms',
//   '/login',
//   '/api/auth',
//   '/free-trial',
// ];

// export async function middleware(req: NextRequest) {
//   try {
//     // Skip for API routes, public routes and static assets
//     const { pathname } = req.nextUrl;
    
//     // Skip processing for static and public routes
//     if (
//       pathname.startsWith('/_next') ||
//       pathname.startsWith('/api/public') ||
//       pathname === '/favicon.ico' ||
//       pathname.startsWith('/public/') ||
//       publicRoutes.includes(pathname)
//     ) {
//       return NextResponse.next();
//     }

//     // With our tab-specific client-side auth approach, we don't need server-side auth
//     // So we just pass through all requests and let the client handle authentication
//     return NextResponse.next();

//   } catch (error) {
//     console.error('Middleware error:', error);
//     // If there's an error, continue (don't redirect to login)
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: [
//     '/((?!api/public|_next/static|_next/image|favicon.ico|public/).*)',
//   ],
// };


import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type RoleConfig = {
  dashboard?: string;
  overview?: string;
  allowedPaths: string[];
};

type RoleBasedRoutes = {
  [key in 'admin' | 'manager' | 'user']: RoleConfig;
};

const roleBasedRoutes: RoleBasedRoutes = {
  admin: {
    overview: '/overview',
    allowedPaths: [
      '/account',
      '/settings',
      '/users',
      '/clients',
      '/overview',
      '/financials',
      '/analytics',
      '/trainings',
      '/trainings/modules',
      '/trainings/modules/(.*)',
      '/api/trainings',
      '/sessions',
      '/modules',
      '/modules/(.*)'  // This will allow all paths under modules
    ]
  },
  manager: {
    dashboard: '/dashboard',
    allowedPaths: [
      '/dashboard',
      '/modules',
      '/role-based',
      '/account',
      '/settings',
      '/billing',
      '/accounts',
      '/progress',
      '/api/modules',  // Allow access to module APIs
      '/api/role-based'  // Allow access to role-based APIs
    ]
  },
  user: {
    dashboard: '/dashboard',
    allowedPaths: [
      '/dashboard',
      '/modules',
      '/role-based',
      '/account',
      '/settings',
      '/api/modules',  // Allow access to module APIs
      '/api/role-based'  // Allow access to role-based APIs
    ]
  }
};

const publicRoutes = [
  '/',
  '/pricing',
  '/solutions',
  '/services',
  '/about',
  '/contact',
  '/cookies',
  '/privacy',
  '/terms',
  '/login',
  '/api/auth',
  '/free-trial',
  '/try-app',
];

const sharedProtectedRoutes = [
  '/profile',
  '/settings',
  '/account',
  '/dashboard'
];

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { pathname } = req.nextUrl;

    // Skip processing for static and public routes
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api/public') ||
      pathname === '/favicon.ico' ||
      pathname.startsWith('/public/') ||
      publicRoutes.includes(pathname)
    ) {
      return res;
    }

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    // Redirect unauthenticated users to login
    if (!session && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Get user's role from the database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('email', session?.user?.email || '')
      .maybeSingle();

    const userRole = (userData?.role || 'user') as keyof RoleBasedRoutes;

    // Set role header for downstream usage
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-role', userRole);

    // Check access permissions
    const hasAccess = checkRoleAccess(pathname, userRole);
    // console.log('Access check:', {
    //   pathname,
    //   userRole,
    //   hasAccess,
    //   allowedPaths: roleBasedRoutes[userRole].allowedPaths
    // });
    
    if (!hasAccess) {
      const redirectPath = userRole === 'admin' ? '/overview' : '/dashboard';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

function checkRoleAccess(pathname: string, role: keyof RoleBasedRoutes): boolean {
  // Shared protected routes are accessible only to managers and users
  if (role !== 'admin' && sharedProtectedRoutes.some(route => pathname.startsWith(route))) {
    return true;
  }

  // Get allowed paths for the user's role
  const roleConfig = roleBasedRoutes[role];
  if (!roleConfig) return false;

  // Check if the current path is allowed for the role
  return roleConfig.allowedPaths.some(allowedPath => {
    // Exact match
    if (pathname === allowedPath) return true;
    
    // Check if the pathname starts with an allowed path
    // This allows access to all subpaths under allowed directories
    if (pathname.startsWith(`${allowedPath}/`)) return true;
    
    // Special handling for API routes related to modules and role-based content
    if (allowedPath === '/modules' && pathname.startsWith('/api/modules/')) return true;
    if (allowedPath === '/role-based' && pathname.startsWith('/api/role-based/')) return true;
    
    return false;
  });
}

export const config = {
  matcher: [
    '/((?!api/public|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};