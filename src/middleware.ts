// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// type RoleConfig = {
//   dashboard: string;
//   allowedPaths: string[];
// };

// type RoleBasedRoutes = {
//   [key in 'admin' | 'manager' | 'user']: RoleConfig;
// };

// // Define route access by role and their corresponding dashboard routes
// const roleBasedRoutes: RoleBasedRoutes = {
//   admin: {
//     dashboard: '/dashboard',
//     allowedPaths: ['/dashboard', '/admin', '/manager']
//   },
//   manager: {
//     dashboard: '/dashboard',
//     allowedPaths: ['/dashboard', '/manager']
//   },
//   user: {
//     dashboard: '/dashboard',
//     allowedPaths: ['/dashboard', '/modules', '/settings', '/role-based', '/account']
//   }
// };

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

// // Shared routes that all authenticated users can access
// const sharedProtectedRoutes = [
//   '/profile',
//   '/settings',
//   '/account',
//   '/dashboard'
// ];

// export async function middleware(req: NextRequest) {
//   try {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     const { pathname } = req.nextUrl;

//     console.log('Middleware processing path:', pathname);

//     // Skip auth for static and public routes
//     if (
//       pathname.startsWith('/_next') ||
//       pathname.startsWith('/api/public') ||
//       pathname === '/favicon.ico' ||
//       pathname.startsWith('/public/') ||
//       publicRoutes.includes(pathname)
//     ) {
//       return res;
//     }

//     // Check authentication
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     // Handle login page
//     if (pathname === '/login') {
//       if (session) {
//         // Check if user exists in our database
//         const { data: dbUser, error: dbError } = await supabase
//           .from('users')
//           .select('id, email, role')
//           .eq('id', session.user.id)
//           .single();

//         console.log('Login middleware check:', { dbUser, dbError });

//         if (dbError || !dbUser) {
//           // If user doesn't exist in our database, sign them out
//           await supabase.auth.signOut();
//           return NextResponse.redirect(new URL('/login', req.url));
//         }

//         // User exists, redirect to dashboard
//         return NextResponse.redirect(new URL('/dashboard', req.url));
//       }
//       return res;
//     }

//     // Redirect unauthenticated users to login
//     if (!session) {
//       const loginUrl = new URL('/login', req.url);
//       loginUrl.searchParams.set('redirect_to', pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     // Get user's role from the database
//     const { data: userData, error: userError } = await supabase
//       .from('users')
//       .select('role')
//       .eq('id', session.user.id)
//       .single();

//     console.log('Middleware user check:', { userData, userError, sessionUserId: session.user.id });

//     const userRole = (userData.role || 'user') as keyof RoleBasedRoutes;

//     // Add role to request headers for the dashboard to use
//     const requestHeaders = new Headers(req.headers);
//     requestHeaders.set('x-user-role', userRole);

//     // Check access permissions
//     const hasAccess = checkRoleAccess(pathname, userRole);
//     console.log('Access check:', {
//       pathname,
//       userRole,
//       hasAccess,
//       allowedPaths: roleBasedRoutes[userRole].allowedPaths
//     });
    
//     if (!hasAccess) {
//       console.log('Access denied, redirecting to dashboard');
//       return NextResponse.redirect(new URL('/dashboard', req.url));
//     }

//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });

//   } catch (error) {
//     console.error('Middleware error:', error);
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }

// function checkRoleAccess(pathname: string, role: keyof RoleBasedRoutes): boolean {
//   // Check shared protected routes first
//   if (sharedProtectedRoutes.some(route => pathname.startsWith(route))) {
//     return true;
//   }

//   // Get allowed paths for the user's role
//   const roleConfig = roleBasedRoutes[role];
//   if (!roleConfig) return false;

//   // Check if the path is allowed for the role
//   return roleConfig.allowedPaths.some(allowedPath => 
//     pathname === allowedPath || pathname.startsWith(`${allowedPath}/`)
//   );
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api/public (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public (public files)
//      */
//     '/((?!api/public|_next/static|_next/image|favicon.ico|public/).*)',
//   ],
// };




// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// type RoleConfig = {
//   dashboard: string;
//   allowedPaths: string[];
// };

// type RoleBasedRoutes = {
//   [key in 'admin' | 'manager' | 'user']: RoleConfig;
// };

// const roleBasedRoutes: RoleBasedRoutes = {
//   admin: {
//     dashboard: '/dashboard',
//     allowedPaths: [
//       '/dashboard',
//       '/modules',
//       '/role-based',
//       '/account',
//       '/settings',
//       '/clients',
//       '/overview',
//       '/financials',
//       '/statistics',
//       '/trainings'
//     ]
//   },
//   manager: {
//     dashboard: '/dashboard',
//     allowedPaths: [
//       '/dashboard',
//       '/modules',
//       '/role-based',
//       '/account',
//       '/settings',
//       '/billing',
//       '/accounts',
//       '/progress'
//     ]
//   },
//   user: {
//     dashboard: '/dashboard',
//     allowedPaths: [
//       '/dashboard',
//       '/modules',
//       '/role-based',
//       '/account',
//       '/settings'
//     ]
//   }
// };

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

// const sharedProtectedRoutes = [
//   '/profile',
//   '/settings',
//   '/account',
//   '/dashboard'
// ];

// export async function middleware(req: NextRequest) {
//   try {
//     const res = NextResponse.next();
//     const supabase = createMiddlewareClient({ req, res });
//     const { pathname } = req.nextUrl;

//     console.log('Middleware processing path:', pathname);

//     // Skip processing for static and public routes.
//     if (
//       pathname.startsWith('/_next') ||
//       pathname.startsWith('/api/public') ||
//       pathname === '/favicon.ico' ||
//       pathname.startsWith('/public/') ||
//       publicRoutes.includes(pathname)
//     ) {
//       return res;
//     }

//     // Get the current session
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     // Handle the login page:
//     // If a session exists, just redirect to dashboard without checking the DB.
//     if (pathname === '/login') {
//       if (session) {
//         return NextResponse.redirect(new URL('/dashboard', req.url));
//       }
//       return res;
//     }

//     // Redirect unauthenticated users to login.
//     if (!session) {
//       const loginUrl = new URL('/login', req.url);
//       loginUrl.searchParams.set('redirect_to', pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     // Get user's role from the database using maybeSingle().
//     // If no row is found, default to 'user'.
//     const { data: userData, error: userError } = await supabase
//       .from('users')
//       .select('role')
//       .eq('id', session.user.id)
//       .maybeSingle();

//     console.log('Middleware user check:', { userData, userError, sessionUserId: session.user.id });

//     const userRole = (userData?.role || 'user') as keyof RoleBasedRoutes;

//     // Set role header for downstream usage.
//     const requestHeaders = new Headers(req.headers);
//     requestHeaders.set('x-user-role', userRole);

//     // Check access permissions based on the role.
//     const hasAccess = checkRoleAccess(pathname, userRole);
//     console.log('Access check:', {
//       pathname,
//       userRole,
//       hasAccess,
//       allowedPaths: roleBasedRoutes[userRole].allowedPaths
//     });
    
//     if (!hasAccess) {
//       console.log('Access denied, redirecting to dashboard');
//       return NextResponse.redirect(new URL('/dashboard', req.url));
//     }

//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });

//   } catch (error) {
//     console.error('Middleware error:', error);
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }

// function checkRoleAccess(pathname: string, role: keyof RoleBasedRoutes): boolean {
//   // Shared protected routes are accessible to all authenticated users.
//   if (sharedProtectedRoutes.some(route => pathname.startsWith(route))) {
//     return true;
//   }

//   // Get allowed paths for the user's role.
//   const roleConfig = roleBasedRoutes[role];
//   if (!roleConfig) return false;

//   // Check if the current path is allowed for the role.
//   return roleConfig.allowedPaths.some(allowedPath => 
//     pathname === allowedPath || pathname.startsWith(`${allowedPath}/`)
//   );
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
      '/companies',
      '/clients',
      '/overview',
      '/financials',
      '/statistics',
      '/trainings'
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
  '/about',
  '/contact',
  '/cookies',
  '/privacy',
  '/terms',
  '/login',
  '/api/auth',
  '/free-trial',
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

    console.log('Middleware processing path:', pathname);

    // Skip processing for static and public routes.
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
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Handle login page and root
    if (pathname === '/login' || pathname === '/') {
      if (session) {
        // Check user role for redirection
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        // Redirect admin to overview, others to dashboard
        const redirectPath = userData?.role === 'admin' ? '/overview' : '/dashboard';
        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
      return res;
    }

    // Redirect unauthenticated users to login
    if (!session) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect_to', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Get user's role from the database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('email', session.user.email)
      .maybeSingle();

    console.log('Middleware user check:', { userData, userError, userEmail: session.user.email });

    const userRole = (userData?.role || 'user') as keyof RoleBasedRoutes;

    // Set role header for downstream usage
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-role', userRole);

    // Check access permissions
    const hasAccess = checkRoleAccess(pathname, userRole);
    console.log('Access check:', {
      pathname,
      userRole,
      hasAccess,
      allowedPaths: roleBasedRoutes[userRole].allowedPaths
    });
    
    if (!hasAccess) {
      console.log('Access denied, redirecting to appropriate page');
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
