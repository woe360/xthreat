// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import MobileMenu from "./(landing-page)/navigation/MobileMenu";

// const font = DM_Sans({ subsets: ["latin"] });

// // export const metadata: Metadata = {
// //   title: "XThreat",
// //   description: "Cyber security awareness training",
// // };

// export const metadata: Metadata = {
//   title: "XThreat",
//   description: "Cyber security training",
//   icons: {
//     icon: [
//       { url: '/XThreat-white.svg', type: 'image/svg+xml' },
//     ],
//   },
// };


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={font.className}>
//         <ThemeProvider
//               attribute="class"
//               defaultTheme="dark"
//               enableSystem
//               disableTransitionOnChange
//             >
//               {children}
//               </ThemeProvider>
//             </body>
//     </html>
//   );
// }



// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import MobileMenu from "./(landing-page)/navigation/MobileMenu";
// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

// const font = DM_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "XThreat",
//   description: "Cyber security training",
//   icons: {
//     icon: [
//       { url: '/XThreat-white.svg', type: 'image/svg+xml' },
//     ],
//   },
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const supabase = createServerComponentClient({ cookies });

//   try {
//     // Get the session server-side
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     return (
//       <html lang="en" suppressHydrationWarning>
//         <body className={font.className}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </body>
//       </html>
//     );
//   } catch (error) {
//     console.error('Error in root layout:', error);
    
//     // Still render the app even if auth check fails
//     return (
//       <html lang="en" suppressHydrationWarning>
//         <body className={font.className}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </body>
//       </html>
//     );
//   }
// }



// // app/layout.tsx
// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import MobileMenu from "./(landing-page)/navigation/MobileMenu";
// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { SessionProvider } from "@/providers/session-provider";

// const font = DM_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "XThreat",
//   description: "Cyber security training",
//   icons: {
//     icon: [
//       { url: '/XThreat-white.svg', type: 'image/svg+xml' },
//     ],
//   },
// };
// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const cookieStore = await cookies()
//   const supabase = createServerComponentClient({ cookies: () => cookieStore });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={font.className}>
//         <SessionProvider initialSession={session}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

// // app/layout.tsx
// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import MobileMenu from "./(landing-page)/navigation/MobileMenu";
// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { SessionProvider } from "@/providers/session-provider";

// export const metadata: Metadata = {
//   title: "XThreat",
//   description: "Cyber security training",
//   icons: {
//     icon: [
//       { url: '/XThreat-white.svg', type: 'image/svg+xml' },
//     ],
//   },
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const cookieStore = await cookies()
//   const supabase = createServerComponentClient({ cookies: () => cookieStore });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link 
//           href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" 
//           rel="stylesheet"
//         />
//       </head>
//       <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         <SessionProvider initialSession={session}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import MobileMenu from "./(landing-page)/navigation/MobileMenu";
// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { SessionProvider } from "@/providers/session-provider";

// export const metadata: Metadata = {
//   title: "XThreat",
//   description: "Cyber security training",
//   icons: {
//     icon: [
//       { url: '/XThreat-white.svg', type: 'image/svg+xml' },
//     ],
//   },
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const cookieStore = await cookies()
//   const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
//   const { 
//     data: { user },
//   } = await supabase.auth.getUser();

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link 
//           href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         <SessionProvider initialSession={user}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }



// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { SessionProvider } from "@/providers/session-provider";

// export const metadata: Metadata = {
//   title: "XThreat",
//   description: "Cyber security training",
//   icons: {
//     icon: [
//       { url: '/XThreat-white.svg', type: 'image/svg+xml' },
//     ],
//   },
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const cookieStore = cookies();
  
//   const supabase = createServerComponentClient({
//     cookies: () => cookieStore,
//   });
  
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   // Create a session-like object from the user data
//   const session = user ? {
//     user,
//     access_token: '', 
//     refresh_token: '', 
//     expires_in: 0,
//     token_type: 'bearer',
//   } : null;

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link 
//           href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         <SessionProvider initialSession={session}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }




// import type { Metadata } from "next";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import { cookies } from 'next/headers';
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { SessionProvider } from "@/providers/session-provider";

// export const metadata: Metadata = {
//   title: "XThreat",
//   description: "Cyber security training",
//   icons: {
//     icon: [
//       { url: '/XThreat-white.svg', type: 'image/svg+xml' },
//     ],
//   },
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const cookieStore = await cookies()
//   const supabase = createServerComponentClient({
//     cookies: () => cookieStore,
//   });
  
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   // Create a session-like object from the user data
//   const session = user ? {
//     user,
//     access_token: '', 
//     refresh_token: '', 
//     expires_in: 0,
//     token_type: 'bearer',
//   } : null;

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link 
//           href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         <SessionProvider initialSession={session}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             {children}
//           </ThemeProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

// RootLayout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

const savass = {
  variable: '--font-savass',
  display: 'swap',
};

export const metadata: Metadata = {
  title: "XThreat",
  description: "Cyber security training",
  icons: {
    icon: [
      { url: '/XThreat_icon_primary_white_to_gradient.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
      </head>
      <body className={cn(
        "min-h-screen bg-neutral-950 text-white antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}