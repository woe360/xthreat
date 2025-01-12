// import React from 'react'
// import clsx from 'clsx'

// type Props = { selected: boolean }

// const RoleBased = ({ selected }: Props) => {
//   return (
//     <svg
//       width="22"
//       height="22"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Graduation cap/role symbol */}
//       <path
//         d="M4 10L12 6L20 10L12 14L4 10Z"
//         className={clsx(
//           'dark:group-hover:fill-[#C0C0C0] transition-all dark:fill-[#696969] fill-[#808080] group-hover:fill-[#D3D3D3]',
//           { 'dark:!fill-[#A9A9A9] fill-[#808080]': selected }
//         )}
//       />
//       <path
//         d="M8 12.5V16.5L12 18.5L16 16.5V12.5"
//         className={clsx(
//           'dark:group-hover:stroke-[#A9A9A9] transition-all dark:stroke-[#808080] stroke-[#696969] group-hover:stroke-[#D3D3D3]',
//           { 'dark:!stroke-[#808080] stroke-[#A9A9A9]': selected }
//         )}
//         strokeWidth="2"
//         fill="none"
//       />
//     </svg>
//   )
// }

// export default RoleBased


// import React from 'react'
// import clsx from 'clsx'

// type Props = {
//   selected: boolean
// }

// const RoleBasedTraining = ({ selected }: Props) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* Shield Background */}
//       <path
//         d="M12 3L4 7V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V7L12 3Z"
//         className={clsx(
//           'dark:group-hover:fill-[#C0C0C0] transition-all dark:fill-[#696969] fill-[#808080] group-hover:fill-[#D3D3D3]',
//           { 'dark:!fill-[#A9A9A9] fill-[#808080]': selected }
//         )}
//         fillOpacity="0.2"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       {/* User Icon */}
//       <path
//         d="M12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8Z"
//         className={clsx(
//           'dark:group-hover:fill-[#A9A9A9] transition-all dark:fill-[#808080] fill-[#696969] group-hover:fill-[#D3D3D3]',
//           { 'dark:!fill-[#808080] fill-[#A9A9A9]': selected }
//         )}
//       />
//       {/* Role Badge */}
//       <path
//         d="M9 14C9 12.8954 10.3431 12 12 12C13.6569 12 15 12.8954 15 14V15.5C15 15.7761 14.7761 16 14.5 16H9.5C9.22386 16 9 15.7761 9 15.5V14Z"
//         className={clsx(
//           'dark:group-hover:fill-[#A9A9A9] transition-all dark:fill-[#808080] fill-[#696969] group-hover:fill-[#D3D3D3]',
//           { 'dark:!fill-[#808080] fill-[#A9A9A9]': selected }
//         )}
//       />
//     </svg>
//   )
// }

// export default RoleBasedTraining

import React from 'react'
import clsx from 'clsx'

type Props = {
  selected: boolean
}

const RoleBasedTraining = ({ selected }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle - Darkest */}
      <circle
        cx="12"
        cy="12"
        r="9"
        className={clsx(
          'dark:group-hover:fill-[#5c5b62] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#5c5b62]',
          { 'dark:!fill-[#b6b6b8] !fill-[#6e6e73]': selected }
        )}
      />
      {/* Inner Circle (cutout) */}
      <circle
        cx="12"
        cy="12"
        r="6.5"
        fill="black"
        className={clsx(
          'dark:group-hover:fill-black transition-all',
          { 'dark:fill-black fill-black': selected }
        )}
      />
      {/* Middle Circle - Medium */}
      <circle
        cx="12"
        cy="12"
        r="5"
        className={clsx(
          'dark:group-hover:fill-[#64636b] transition-all dark:fill-[#64636b] fill-[#9f9fa4] group-hover:fill-[#64636b]',
          { 'dark:!fill-[#9d9d9f] !fill-[#83838a]': selected }
        )}
      />
      {/* Inner Circle (cutout) */}
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="black"
        className={clsx(
          'dark:group-hover:fill-black transition-all',
          { 'dark:fill-black fill-black': selected }
        )}
      />
      {/* Center Circle - Lightest */}
      <circle
        cx="12"
        cy="12"
        r="2"
        className={clsx(
          'dark:group-hover:fill-[#a19f9f] transition-all dark:fill-[#a19f9f] fill-[#C0BFC4] group-hover:fill-[#a19f9f]',
          { 'dark:!fill-[#d3d3d4] !fill-[#9f9fa4]': selected }
        )}
      />
    </svg>
  )
}

export default RoleBasedTraining