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

// app/layout.tsx
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import MobileMenu from "./(landing-page)/navigation/MobileMenu";
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionProvider } from "@/providers/session-provider";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XThreat",
  description: "Cyber security training",
  icons: {
    icon: [
      { url: '/XThreat-white.svg', type: 'image/svg+xml' },
    ],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <SessionProvider initialSession={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}