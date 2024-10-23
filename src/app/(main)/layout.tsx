// 'use client'
// import React, { useEffect } from 'react'
// import { usePathname } from 'next/navigation'
// import Sidebar from '@/app/(main)/navigation/sideNavigation/sidebar'
// import InfoBar from '@/app/(main)/navigation/topNavigation/infobar'

// type Props = {
//   children: React.ReactNode
// }

// const Layout = ({ children }: Props) => {
//   const pathname = usePathname()

//   useEffect(() => {
//     // Reset scroll position when the path changes
//     window.scrollTo(0, 0)
//   }, [pathname])

//   return (
//     <div className="flex bg-black h-screen w-screen">
//       <Sidebar />
//       {/* <div className="w-full flex flex-col"> */}
//         {/* <InfoBar /> */}
//         <main className="flex-1 overflow-auto pt-14">
//           {children}
//         </main>
//       {/* </div> */}
//     </div>
//   )
// }

// export default Layout



// 'use client'
// import React, { useEffect } from 'react'
// import { usePathname } from 'next/navigation'
// import Sidebar from '@/app/(main)/navigation/sideNavigation/sidebar'

// type Props = {
//   children: React.ReactNode
// }

// const Layout = ({ children }: Props) => {
//   const pathname = usePathname()

//   useEffect(() => {
//     // Reset scroll position when the path changes
//     window.scrollTo(0, 0)
//   }, [pathname])

//   return (
//     <div className="flex bg-black h-screen">
//       <Sidebar />
//       <main className="flex-1 overflow-auto">
//         {children}
//       </main>
//     </div>
//   )
// }

// export default Layout



//intergrating Auth.
'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Sidebar from '@/app/(main)/navigation/sideNavigation/sidebar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          // No active session, redirect to login
          router.push('/auth/signin')
          return
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/auth/signin')
      }
    }

    checkAuth()
    
    // Set up real-time auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth/signin')
      }
    })

    // Reset scroll position when the path changes
    window.scrollTo(0, 0)

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [pathname, router, supabase])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    )
  }

  return (
    <div className="flex bg-black h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout