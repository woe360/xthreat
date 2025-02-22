


// import clsx from 'clsx'
// import React from 'react'

// type Props = {
//   selected: boolean
// }

// const Progress = ({ selected }: Props) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* <rect
//         x="2"
//         y="4"
//         width="20"
//         height="16"
//         rx="3"
//         className={clsx(
//           'dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#7540A9]',
//           { 'dark:!fill-[#C8C7FF] fill-[#7540A9] ': selected }
//         )}
//       /> */}
//       <rect
//         x="4"
//         y="14"
//         width="5"
//         height="6"
//         rx="1"
//         className={clsx(
//           'dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF]',
//           { 'dark:!fill-[#7540A9] fill-[#BD8AFF] ': selected }
//         )}
//       />
//       <rect
//         x="10"
//         y="10"
//         width="5"
//         height="10"
//         rx="1"
//         className={clsx(
//           'dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF]',
//           { 'dark:!fill-[#7540A9] fill-[#BD8AFF] ': selected }
//         )}
//       />
//       <rect
//         x="16"
//         y="6"
//         width="5"
//         height="14"
//         rx="1"
//         className={clsx(
//           'dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF]',
//           { 'dark:!fill-[#7540A9] fill-[#BD8AFF] ': selected }
//         )}
//       />
//     </svg>
//   )
// }

// export default Progress


// import clsx from 'clsx'
// import React from 'react'

// type Props = {
//   selected: boolean
// }

// const Progress = ({ selected }: Props) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {/* <rect
//         x="2"
//         y="4"
//         width="20"
//         height="16"
//         rx="3"
//         className={clsx(
//           'dark:group-hover:fill-[#FFF8C7] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFD700]',
//           { 'dark:!fill-[#FFF8C7] fill-[#FFD700] ': selected }
//         )}
//       /> */}
//       <rect
//         x="4"
//         y="14"
//         width="5"
//         height="6"
//         rx="1"
//         className={clsx(
//           'dark:group-hover:fill-[#FFEC8B] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
//           { 'dark:!fill-[#FFD700] fill-[#FFFACD] ': selected }
//         )}
//       />
//       <rect
//         x="10"
//         y="10"
//         width="5"
//         height="10"
//         rx="1"
//         className={clsx(
//           'dark:group-hover:fill-[#FFEC8B] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
//           { 'dark:!fill-[#FFD700] fill-[#FFFACD] ': selected }
//         )}
//       />
//       <rect
//         x="16"
//         y="6"
//         width="5"
//         height="14"
//         rx="1"
//         className={clsx(
//           'dark:group-hover:fill-[#FFEC8B] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#FFFACD]',
//           { 'dark:!fill-[#FFD700] fill-[#FFFACD] ': selected }
//         )}
//       />
//     </svg>
//   )
// }

// export default Progress

import clsx from 'clsx';
import React from 'react';

type Props = {
  selected: boolean;
};

const Progress = ({ selected }: Props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="14"
        width="5"
        height="6"
        rx="1"
        className={clsx(
          'dark:group-hover:fill-[#A0A0A0] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#E0E0E0]',
          { 'dark:!fill-[#6e6e73] fill-[#E0E0E0]': selected }
        )}
      />
      <rect
        x="10"
        y="10"
        width="5"
        height="10"
        rx="1"
        className={clsx(
          'dark:group-hover:fill-[#A0A0A0] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#E0E0E0]',
          { 'dark:!fill-[#6e6e73] fill-[#E0E0E0]': selected }
        )}
      />
      <rect
        x="16"
        y="6"
        width="5"
        height="14"
        rx="1"
        className={clsx(
          'dark:group-hover:fill-[#A0A0A0] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#E0E0E0]',
          { 'dark:!fill-[#6e6e73] fill-[#E0E0E0]': selected }
        )}
      />
    </svg>
  );
};

export default Progress;
