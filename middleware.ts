import { NextResponse } from 'next/server';

export function middleware(req) {
  const auth = req.headers.get('authorization');
  const username = 'besarmatis';
  const password = '2tintoPrasau';

  if (auth) {
    const [basic, credentials] = auth.split(' ');
    const [user, pass] = atob(credentials).split(':');
    
    if (user === username && pass === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}

export const config = {
  matcher: '/:path*',
};