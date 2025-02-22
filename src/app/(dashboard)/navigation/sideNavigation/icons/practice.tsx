// import clsx from 'clsx';
// import React from 'react';

// type Props = { selected: boolean };

// const Practice = ({ selected }: Props) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="group"
//     >
//       <rect
//         width="8"
//         height="8"
//         x="3"
//         y="3"
//         rx="2"
//         className={clsx(
//           'stroke-current stroke-2 dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#7540A9]',
//           { 'dark:!fill-[#C8C7FF] fill-[#7540A9]': selected }
//         )}
//       />
//       <path
//         d="M7 11v4a2 2 0 0 0 2 2h4"
//         className={clsx(
//           'stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round dark:group-hover:stroke-[#C8C7FF] transition-all dark:stroke-[#353346] group-hover:stroke-[#7540A9]',
//           { 'dark:!stroke-[#C8C7FF] stroke-[#7540A9]': selected }
//         )}
//       />
//       <rect
//         width="8"
//         height="8"
//         x="13"
//         y="13"
//         rx="2"
//         className={clsx(
//           'stroke-current stroke-2 dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#7540A9]',
//           { 'dark:!fill-[#C8C7FF] fill-[#7540A9]': selected }
//         )}
//       />
//     </svg>
//   );
// };

// export default Practice;



// import clsx from 'clsx';
// import React from 'react';

// type Props = { selected: boolean };

// const Practice = ({ selected }: Props) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="group"
//     >
//       <rect
//         width="8"
//         height="8"
//         x="3"
//         y="3"
//         rx="2"
//         className={clsx(
//           'stroke-current stroke-2 dark:group-hover:fill-[#5c5b62] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#A0A0A0]',
//           { 'dark:!fill-[#6e6e73] fill-[#A0A0A0]': selected }
//         )}
//       />
//       <path
//         d="M7 11v4a2 2 0 0 0 2 2h4"
//         className={clsx(
//           'stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round dark:group-hover:stroke-[#C0BFC4] transition-all dark:stroke-[#353346] group-hover:stroke-[#A0A0A0]',
//           { 'dark:!stroke-[#6e6e73] stroke-[#A0A0A0]': selected }
//         )}
//       />
//       <rect
//         width="8"
//         height="8"
//         x="13"
//         y="13"
//         rx="2"
//         className={clsx(
//           'stroke-current stroke-2 dark:group-hover:fill-[#5c5b62] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#A0A0A0]',
//           { 'dark:!fill-[#6e6e73] fill-[#A0A0A0]': selected }
//         )}
//       />
//     </svg>
//   );
// };

// export default Practice;

import clsx from 'clsx';
import React from 'react';

type Props = { selected: boolean };

const Practice = ({ selected }: Props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <rect
        width="8"
        height="8"
        x="3"
        y="3"
        rx="2"
        className={clsx(
          'transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#414040]',
          { 'dark:fill-[#acacb5] fill-[#A0A0A0]': selected }
        )}
        stroke={selected ? '#808080' : '#acacb5'} 
        strokeWidth="2"
      />
      <path
        d="M7 11v4a2 2 0 0 0 2 2h4"
        className={clsx(
          'stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round dark:group-hover:stroke-[#C0BFC4] transition-all dark:stroke-[#353346] group-hover:stroke-[#A0A0A0]',
          { 'dark:stroke-[#6e6e73] stroke-[#A0A0A0]': selected }
        )}
      />
      <rect
        width="8"
        height="8"
        x="13"
        y="13"
        rx="2"
        className={clsx(
          'transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#414040]',
          { 'dark:fill-[#acacb5] fill-[#A0A0A0]': selected }
        )}
        stroke={selected ? '#808080' : '#acacb5'} 
        strokeWidth="2"
      />
    </svg>
  );
};

export default Practice;


// import clsx from 'clsx';
// import React from 'react';

// type Props = { selected: boolean };

// const Practice = ({ selected }: Props) => {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="group"
//     >
//       <rect
//         width="8"
//         height="8"
//         x="3"
//         y="3"
//         rx="2"
//         className={clsx(
//           'stroke-current stroke-2 dark:group-hover:fill-[#9f9128] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#a48e11]',
//           { 'dark:!fill-[#dec718] fill-[#FFD700]': selected }
//         )}
//       />
//       <path
//         d="M7 11v4a2 2 0 0 0 2 2h4"
//         className={clsx(
//           'stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round dark:group-hover:stroke-[#FFF8C7] transition-all dark:stroke-[#353346] group-hover:stroke-[#FFD700]',
//           { 'dark:!stroke-[#000000] stroke-[#FFD700]': selected }
//         )}
//       />
//       <rect
//         width="8"
//         height="8"
//         x="13"
//         y="13"
//         rx="2"
//         className={clsx(
//           'stroke-current stroke-2 dark:group-hover:fill-[#867916] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFD700]',
//           { 'dark:!fill-[#dec718] fill-[#FFD700]': selected }
//         )}
//       />
//     </svg>
//   );
// };

// export default Practice;
