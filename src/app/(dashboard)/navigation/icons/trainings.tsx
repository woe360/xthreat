import React from 'react'
import clsx from 'clsx'

type Props = {
  selected: boolean
}

const Trainings = ({ selected }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle
        cx="12"
        cy="12"
        r="8"
        strokeWidth="2"
        className={clsx(
          'dark:group-hover:stroke-[#d4d3d8] transition-all dark:stroke-[#353346] stroke-[#BABABB] group-hover:stroke-[#ffeeb3]',
          { 'dark:!stroke-[#8c8b92] stroke-[#ffe480]': selected }
        )}
      />
      
      {/* Center dot */}
      <circle
        cx="12"
        cy="12"
        r="3"
        className={clsx(
          'dark:group-hover:fill-[#d4d3d8] transition-all dark:fill-[#a1a0a9] fill-[#BABABB] group-hover:fill-[#ffeeb3]',
          { 'dark:!fill-[#8c8b92] fill-[#ffe480]': selected }
        )}
      />
    </svg>
  )
}

export default Trainings