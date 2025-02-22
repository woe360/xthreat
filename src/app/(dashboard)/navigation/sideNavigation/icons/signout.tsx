// import clsx from 'clsx';
// import React from 'react';

// type Props = {
//   selected: boolean;
// };

// const Signout = ({ selected }: Props) => {
//   return (
//     <button className="group">
//       <svg
//         width="25"
//         height="25"
//         viewBox="0 0 27 27"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M15 3H9C7.34315 3 6 4.34315 6 6V18C6 19.6569 7.34315 21 9 21H15"
//           className={clsx(
//             'stroke-current stroke-2 dark:group-hover:stroke-[#FFF8C7] transition-all dark:stroke-[#353346] group-hover:stroke-[#FFD700]',
//             { 'dark:!stroke-[#FFF8C7] stroke-[#FFD700]': selected }
//           )}
//         />
//         <path
//           d="M10 12H21M17 8L21 12L17 16"
//           className={clsx(
//             'stroke-current stroke-2 dark:group-hover:stroke-[#FFEC8B] transition-all dark:stroke-[#C0BFC4] group-hover:stroke-[#FFFACD]',
//             { 'dark:!stroke-[#FFD700] stroke-[#FFFACD]': selected }
//           )}
//         />
//       </svg>
//     </button>
//   );
// };

// export default Signout;

import clsx from 'clsx';
import React from 'react';

type Props = {
  selected: boolean;
};

const Signout = ({ selected }: Props) => {
  return (
    <button className="group">
      <svg
        width="24"
        height="24"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 3H9C7.34315 3 6 4.34315 6 6V18C6 19.6569 7.34315 21 9 21H15"
          className={clsx(
            'stroke-gray-500 transition-all group-hover:stroke-white stroke-2', // Gray by default, white on hover
            { 'stroke-white': selected } // If selected, stays white
          )}
        />
        <path
          d="M10 12H21M17 8L21 12L17 16"
          className={clsx(
            'stroke-gray-500 transition-all group-hover:stroke-white stroke-2', // Gray by default, white on hover
            { 'stroke-white': selected } // If selected, stays white
          )}
        />
      </svg>
    </button>
  );
};

export default Signout;
