import React from 'react'
import clsx from 'clsx'

type Props = {
  selected: boolean
}

const Statistics = ({ selected }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Curved line connecting dots */}
      <path
        d="M4 18C6 18 6.5 13 9 13C11.5 13 11.5 16 14 16C16.5 16 17 11 20 11"
        strokeWidth="2"
        strokeLinecap="round"
        className={clsx(
          'dark:group-hover:stroke-[#d4d3d8] transition-all dark:stroke-[#353346] stroke-[#BABABB] group-hover:stroke-[#ffeeb3]',
          { 'dark:!stroke-[#8c8b92] stroke-[#ffe480]': selected }
        )}
      />
      
      {/* Data points */}
      <circle
        cx="9"
        cy="13"
        r="2"
        className={clsx(
          'dark:group-hover:fill-[#d4d3d8] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#ffeeb3]',
          { 'dark:!fill-[#8c8b92] fill-[#ffe480]': selected }
        )}
      />
      <circle
        cx="14"
        cy="16"
        r="2"
        className={clsx(
          'dark:group-hover:fill-[#d4d3d8] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#ffeeb3]',
          { 'dark:!fill-[#8c8b92] fill-[#ffe480]': selected }
        )}
      />
      <circle
        cx="20"
        cy="11"
        r="2"
        className={clsx(
          'dark:group-hover:fill-[#d4d3d8] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#ffeeb3]',
          { 'dark:!fill-[#8c8b92] fill-[#ffe480]': selected }
        )}
      />

      {/* Mini pulse animations around data points */}
      <circle
        cx="9"
        cy="13"
        r="3"
        strokeWidth="1"
        className={clsx(
          'dark:group-hover:stroke-[#d4d3d8] transition-all dark:stroke-[#353346] stroke-[#BABABB] group-hover:stroke-[#ffeeb3] opacity-50',
          { 'dark:!stroke-[#8c8b92] stroke-[#ffe480]': selected }
        )}
      />
      <circle
        cx="14"
        cy="16"
        r="3"
        strokeWidth="1"
        className={clsx(
          'dark:group-hover:stroke-[#d4d3d8] transition-all dark:stroke-[#353346] stroke-[#BABABB] group-hover:stroke-[#ffeeb3] opacity-50',
          { 'dark:!stroke-[#8c8b92] stroke-[#ffe480]': selected }
        )}
      />
      <circle
        cx="20"
        cy="11"
        r="3"
        strokeWidth="1"
        className={clsx(
          'dark:group-hover:stroke-[#d4d3d8] transition-all dark:stroke-[#353346] stroke-[#BABABB] group-hover:stroke-[#ffeeb3] opacity-50',
          { 'dark:!stroke-[#8c8b92] stroke-[#ffe480]': selected }
        )}
      />
    </svg>
  )
}

export default Statistics