import React from 'react'
import clsx from 'clsx'

type Props = {
  selected: boolean
}

const Business = ({ selected }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 22V4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V22H4Z"
        className={clsx(
          'dark:group-hover:fill-[#C0BFC4] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFD700]',
          { 'dark:!fill-[#5c5b62] fill-[#FFD700]': selected }
        )}
      />
      {/* Windows */}
      <path
        d="M7 7H9V9H7V7ZM11 7H13V9H11V7ZM15 7H17V9H15V7ZM7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11ZM7 15H9V17H7V15ZM11 15H13V17H11V15ZM15 15H17V17H15V15Z"
        className={clsx(
          'dark:group-hover:fill-[#353346] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
          { 'dark:!fill-[#C0BFC4] fill-[#FFFACD]': selected }
        )}
      />
    </svg>
  )
}

export default Business