import React from 'react'
import clsx from 'clsx'

type Props = {
  selected: boolean
}

const ChatAssistant = ({ selected }: Props) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* User chat bubble */}
      <path
        d="M6 9H11L13 11V13L11 15H6L4 13V11L6 9Z"
        className={clsx(
          'dark:group-hover:fill-[#64636b] transition-all dark:fill-[#64636b] fill-[#9f9fa4] group-hover:fill-[#64636b]',
          { 'dark:!fill-[#9d9d9f] !fill-[#83838a]': selected }
        )}
      />

      {/* Assistant chat bubble */}
      <path
        d="M13 10H18L20 12V14L18 16H13L11 14V12L13 10Z"
        className={clsx(
          'dark:group-hover:fill-[#a19f9f] transition-all dark:fill-[#a19f9f] fill-[#C0BFC4] group-hover:fill-[#a19f9f]',
          { 'dark:!fill-[#d3d3d4] !fill-[#9f9fa4]': selected }
        )}
      />

      {/* Connection dots */}
      <circle
        cx="8.5"
        cy="12"
        r="0.75"
        fill="black"
        className={clsx(
          'dark:group-hover:fill-black transition-all',
          { 'dark:fill-black fill-black': selected }
        )}
      />
      <circle
        cx="15.5"
        cy="13"
        r="0.75"
        fill="black"
        className={clsx(
          'dark:group-hover:fill-black transition-all',
          { 'dark:fill-black fill-black': selected }
        )}
      />
    </svg>
  )
}

export default ChatAssistant