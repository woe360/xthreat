import clsx from 'clsx'
import React from 'react'

type Props = { selected: boolean }

function Dashboard({ selected }: Props) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#C0BFC4] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFD700]',
          { 'dark:!fill-[#5c5b62] fill-[#FFD700] ': selected }
        )}
      />
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#C0BFC4] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFD700]',
          { 'dark:!fill-[#5c5b62] fill-[#FFD700] ': selected }
        )}
      />
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#C0BFC4] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFD700]',
          { 'dark:!fill-[#5c5b62] fill-[#FFD700] ': selected }
        )}
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#353346] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
          { 'dark:!fill-[#C0BFC4] fill-[#FFFACD] ': selected }
        )}
      />
    </svg>
  )
}

export default Dashboard

