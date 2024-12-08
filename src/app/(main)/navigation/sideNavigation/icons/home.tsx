// import clsx from 'clsx'
// import React from 'react'

// type Props = { selected: boolean }

// const Home = ({ selected }: Props) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fillRule="evenodd"
//         clipRule="evenodd"
//         d="M2 11.3361C2 10.4857 2.36096 9.67518 2.99311 9.10625L9.9931 2.80625C11.134 1.77943 12.866 1.77943 14.0069 2.80625L21.0069 9.10625C21.639 9.67518 22 10.4857 22 11.3361V19C22 20.6569 20.6569 22 19 22H16L15.9944 22H8.00558L8 22H5C3.34315 22 2 20.6569 2 19V11.3361Z"
//         className={clsx(
//           'dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#C0BFC4] group-hover:fill-[#7540A9]',
//           { 'dark:!fill-[#C8C7FF] !fill-[#a9a040] ': selected }
//         )}
//       />
//       <path
//         d="M9 16C9 14.8954 9.89543 14 11 14H13C14.1046 14 15 14.8954 15 16V22H9V16Z"
//         className={clsx(
//           'dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF] ',
//           { 'dark:!fill-[#9F54FF] fill-[#BD8AFF]': selected }
//         )}
//       />
//     </svg>
//   )
// }

// export default Home

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