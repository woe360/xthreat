// 'use client' 
// import React from 'react'
// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'
// import { BrowserRouter } from 'react-router-dom';

// type Props = { children: React.ReactNode }

// const Layout = (props: Props) => {
//   return (
//     <BrowserRouter>
//       <div className="flex bg-black overflow-hidden h-screen">
//         <Sidebar />
//         <div className="w-full">
//         <InfoBar />
//           {props.children}
//         </div>
//       </div>
//     </BrowserRouter>
//   )
// }

// export default Layout



'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/app/(main)/navigation/sideNavigation/sidebar'
import InfoBar from '@/app/(main)/navigation/topNavigation/infobar'
// import InfoBar from '@/components/topNavigation/infobar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname()

  useEffect(() => {
    // Reset scroll position when the path changes
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex bg-black h-screen">
      <Sidebar />
      <div className="w-full flex flex-col">
        <InfoBar />
        <main className="flex-1 overflow-auto pt-14"> {/* Adjust pt-14 based on your InfoBar height */}
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

// 'use client'

// import React from 'react'
// import Sidebar from '@/components/sidebar'
// import InfoBar from '@/components/infobar'

// type Props = {
//   children: React.ReactNode
// }

// const Layout = ({ children }: Props) => {
//   return (
//     <div className="flex bg-black overflow-hidden h-screen">
//       <Sidebar />
//       <div className="w-full mt-14">
//         <InfoBar />
//         <main className="flex-1 overflow-auto"> {/* Adjust pt-16 based on your InfoBar height */}
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Layout
