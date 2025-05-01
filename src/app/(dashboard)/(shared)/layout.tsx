import React from 'react'

type Props = { children: React.ReactNode }

const Layout = ({ children }: Props) => {
  return (
    <div className="border-l-[1px] h-screen 
    border-gray-600/30 overflow-scroll ">
      {children}
    </div>
  )
}

export default Layout