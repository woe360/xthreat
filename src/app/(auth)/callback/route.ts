import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
//   const requestUrl = new URL(request.url)
//   const code = requestUrl.searchParams.get('code')

//   if (code) {
//     const supabase = createRouteHandlerClient({ cookies })
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   return NextResponse.redirect(requestUrl.origin)
// }


// callback/route.ts
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    try {
      await supabase.auth.exchangeCodeForSession(code);
      // Add cache headers
      const response = NextResponse.redirect(requestUrl.origin);
      response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      return response;
    } catch (error) {
      console.error('Session exchange error:', error);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=session`);
    }
  }

  return NextResponse.redirect(requestUrl.origin);
}