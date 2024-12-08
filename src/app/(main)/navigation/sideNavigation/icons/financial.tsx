import React from 'react'
import clsx from 'clsx'

type Props = {
  selected: boolean
}

const Financial = ({ selected }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bill base */}
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="1"
        className={clsx(
          'dark:group-hover:fill-[#C0BFC4] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFD700]',
          { 'dark:!fill-[#5c5b62] fill-[#FFD700]': selected }
        )}
      />
      
      {/* Center circle */}
      <circle
        cx="12"
        cy="12"
        r="3"
        className={clsx(
          'dark:group-hover:fill-[#353346] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
          { 'dark:!fill-[#C0BFC4] fill-[#FFFACD]': selected }
        )}
      />

      {/* Decorative lines */}
      <rect
        x="4"
        y="8"
        width="4"
        height="1"
        className={clsx(
          'dark:group-hover:fill-[#353346] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
          { 'dark:!fill-[#C0BFC4] fill-[#FFFACD]': selected }
        )}
      />
      <rect
        x="16"
        y="8"
        width="4"
        height="1"
        className={clsx(
          'dark:group-hover:fill-[#353346] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
          { 'dark:!fill-[#C0BFC4] fill-[#FFFACD]': selected }
        )}
      />
      <rect
        x="4"
        y="15"
        width="4"
        height="1"
        className={clsx(
          'dark:group-hover:fill-[#353346] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
          { 'dark:!fill-[#C0BFC4] fill-[#FFFACD]': selected }
        )}
      />
      <rect
        x="16"
        y="15"
        width="4"
        height="1"
        className={clsx(
          'dark:group-hover:fill-[#353346] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
          { 'dark:!fill-[#C0BFC4] fill-[#FFFACD]': selected }
        )}
      />
    </svg>
  )
}

export default Financial