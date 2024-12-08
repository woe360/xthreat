import React from 'react'
import clsx from 'clsx'

type Props = { selected: boolean }

const RoleBased = ({ selected }: Props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation cap/role symbol */}
      <path
        d="M4 10L12 6L20 10L12 14L4 10Z"
        className={clsx(
          'dark:group-hover:fill-[#C0C0C0] transition-all dark:fill-[#696969] fill-[#808080] group-hover:fill-[#D3D3D3]',
          { 'dark:!fill-[#A9A9A9] fill-[#808080]': selected }
        )}
      />
      <path
        d="M8 12.5V16.5L12 18.5L16 16.5V12.5"
        className={clsx(
          'dark:group-hover:stroke-[#A9A9A9] transition-all dark:stroke-[#808080] stroke-[#696969] group-hover:stroke-[#D3D3D3]',
          { 'dark:!stroke-[#808080] stroke-[#A9A9A9]': selected }
        )}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}

export default RoleBased