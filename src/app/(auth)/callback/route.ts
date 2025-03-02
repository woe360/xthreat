// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { generateToken } from '@/lib/utils/jwt';


// // callback/route.ts
// export async function GET(request: Request) {
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get('code');

//   if (code) {
//     const supabase = createRouteHandlerClient({ cookies });
//     try {
//       await supabase.auth.exchangeCodeForSession(code);
      
//       // Verify that the session was actually created
//       const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
//       if (sessionError) {
//         console.error('Session verification error:', sessionError);
//         return NextResponse.redirect(`${requestUrl.origin}/login?error=session_verification`);
//       }
      
//       if (!session) {
//         console.error('No session found after code exchange');
//         return NextResponse.redirect(`${requestUrl.origin}/login?error=no_session`);
//       }
      
//       // Session is verified, safe to redirect to dashboard
//       const response = NextResponse.redirect(`${requestUrl.origin}/dashboard`);
//       response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//       return response;
//     } catch (error) {
//       console.error('Code exchange error:', error);
//       return NextResponse.redirect(`${requestUrl.origin}/login?error=code_exchange`);
//     }
//   }

//   // If no code, redirect to dashboard if already logged in
//   const supabase = createRouteHandlerClient({ cookies });
//   const { data: { session } } = await supabase.auth.getSession();
//   if (session) {
//     return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
//   }

//   return NextResponse.redirect(requestUrl.origin);
// }

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const supabase = createRouteHandlerClient({ cookies });
  const isDevelopment = process.env.NODE_ENV === 'development';
  const baseUrl = isDevelopment ? requestUrl.origin : 'https://xthreat.eu';
  const appBaseUrl = isDevelopment ? requestUrl.origin : 'https://app.xthreat.eu';

  if (code) {
    try {
      // Exchange code for session
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError);
        return NextResponse.redirect(`${baseUrl}/login?error=code_exchange`);
      }

      // Verify session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        return NextResponse.redirect(`${baseUrl}/login?error=session_error`);
      }

      // Check if user exists in your users table
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('id, email, role')
        .eq('email', session.user.email)
        .single();

      if (dbError || !dbUser) {
        console.error('User not found in database:', dbError);
        await supabase.auth.signOut();
        return NextResponse.redirect(`${baseUrl}/login?error=unauthorized&message=Account+not+found`);
      }

      // Determine redirect path based on user role
      const redirectPath = dbUser.role === 'admin' ? '/overview' : '/dashboard';
      const response = NextResponse.redirect(`${appBaseUrl}${redirectPath}`);
      response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      return response;

    } catch (error) {
      console.error('Auth error:', error);
      await supabase.auth.signOut();
      return NextResponse.redirect(`${baseUrl}/login?error=auth_failed`);
    }
  }

  // Check existing session
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    // Check user role for redirection
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('email', session.user.email)
      .single();

    if (userError || !userData) {
      await supabase.auth.signOut();
      return NextResponse.redirect(`${baseUrl}/login?error=unauthorized`);
    }

    const redirectPath = userData.role === 'admin' ? '/overview' : '/dashboard';
    return NextResponse.redirect(`${appBaseUrl}${redirectPath}`);
  }

  return NextResponse.redirect(`${baseUrl}/login`);
}