// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';


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

  if (code) {
    try {
      // Exchange code for session
      await supabase.auth.exchangeCodeForSession(code);
      
      // Verify session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        return NextResponse.redirect(`${requestUrl.origin}/login?error=session_error`);
      }

      // Important: Check if user exists in your users table
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('id, email')
        .eq('id', session.user.id)
        .single();

      console.log('User check:', { dbUser, dbError, sessionUser: session.user });

      if (dbError || !dbUser) {
        console.error('User not found in database:', dbError);
        
        // Option 1: Create the user
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: session.user.id,
            email: session.user.email,
            role: 'user' // default role
          });

        if (insertError) {
          console.error('Failed to create user:', insertError);
          await supabase.auth.signOut();
          return NextResponse.redirect(`${requestUrl.origin}/login?error=user_creation_failed`);
        }
      }
      
      const response = NextResponse.redirect(`${requestUrl.origin}/dashboard`);
      response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      return response;

    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
    }
  }

  // Check existing session
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  return NextResponse.redirect(requestUrl.origin);
}