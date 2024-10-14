'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/app/(main)/navigation/sideNavigation/sidebar'
import InfoBar from '@/app/(main)/navigation/topNavigation/infobar'
import { Sidebaras } from './navigation/sideNavigation/sidebaras'

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
      {/* <Sidebaras/> */}
      <div className="w-full flex flex-col">
        <InfoBar />
        <main className="flex-1 overflow-auto pt-14">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

