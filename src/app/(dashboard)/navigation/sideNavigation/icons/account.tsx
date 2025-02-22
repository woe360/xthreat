import clsx from 'clsx'
import React from 'react'

type Props = { selected: boolean }

const Accounts = ({ selected }: Props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        className={clsx(
          'dark:group-hover:fill-[#C0C0C0] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#D3D3D3]',
          { 'dark:!fill-[#A9A9A9] fill-[#808080]': selected }
        )}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 19C4 16.2386 9.13401 14 12 14C14.866 14 20 16.2386 20 19V20H4V19Z"
        className={clsx(
          'dark:group-hover:fill-[#A9A9A9] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#D3D3D3]',
          { 'dark:!fill-[#808080] fill-[#A9A9A9]': selected }
        )}
      />
    </svg>
  )
}

export default Accounts
