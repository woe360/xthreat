// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React from 'react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { ModeToggle } from '../../../../../components/unused/mode-toggle';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();

//   return (
//     <nav className="dark:bg-black h-screen flex flex-col sticky justify-between py-6 px-2">
//       {/* Main menu in the center */}
//       <div className="flex flex-col z-1000 items-center justify-center flex-grow gap-8">
//         <TooltipProvider>
//           {menuOptions.map((menuItem) => (
//             <ul key={menuItem.name}>
//               <Tooltip delayDuration={0}>
//                 <TooltipTrigger>
//                   <li>
//                     <Link
//                       href={menuItem.href}
//                       className={clsx(
//                         'group h-8 w-8 ml-3 mr-3 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer',
//                         {
//                           'dark:bg-[#e2e2e2] bg-[#ffffff]':
//                             pathName === menuItem.href,
//                         }
//                       )}
//                     >
//                       <menuItem.Component
//                         selected={pathName === menuItem.href}
//                       />
//                     </Link>
//                   </li>
//                 </TooltipTrigger>
//                 <TooltipContent
//                   side="right"
//                   className="bg-black/10 backdrop-blur-xl"
//                 >
//                   <p>{menuItem.name}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </ul>
//           ))}
//         </TooltipProvider>
//       </div>
//       {/* Separator and bottom items */}
//       <div className="flex flex-col items-center gap-8">
//         {/* <Separator /> */}
//         <TooltipProvider>
//           {/* <ModeToggle /> */}
//           {/* <Tooltip delayDuration={0}>
//             <TooltipTrigger>
//               <Link
//                 className="flex font-bold h-8 w-8 ml-3 mr-3 items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer"
//                 href="/"
//               >
//                 <Signout selected={false} />
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent
//               side="right"
//               className="bg-black/10 backdrop-blur-xl"
//             >
//               <p>Sign out</p>
//             </TooltipContent>
//           </Tooltip> */}
//         </TooltipProvider>
//       </div>
//     </nav>
//   );
// };

// export default MenuOptions;



// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { Menu } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isMinimized, setIsMinimized] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMinimized(window.innerWidth <= 768); // Adjust this value as needed
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <>
//       {/* Burger menu for minimized view */}
//       {isMinimized && (
//         <button
//           className="fixed top-4 left-4 z-50 p-2 bg-black/50 rounded-md"
//           onClick={() => setIsMinimized(false)}
//         >
//           <Menu className="text-white" />
//         </button>
//       )}

//       {/* Navigation sidebar */}
//       <nav className={clsx(
//         "dark:bg-black h-screen flex flex-col sticky justify-between py-6 px-2 transition-all duration-300 ease-in-out",
//         isMinimized ? "hidden" : "block"
//       )}>
//         {/* Main menu in the center */}
//         <div className="flex flex-col z-1000 items-center justify-center flex-grow gap-8">
//           <TooltipProvider>
//             {menuOptions.map((menuItem) => (
//               <ul key={menuItem.name}>
//                 <Tooltip delayDuration={0}>
//                   <TooltipTrigger>
//                     <li>
//                       <Link
//                         href={menuItem.href}
//                         className={clsx(
//                           'group h-8 w-8 ml-3 mr-3 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer',
//                           {
//                             'dark:bg-[#e2e2e2] bg-[#ffffff]':
//                               pathName === menuItem.href,
//                           }
//                         )}
//                       >
//                         <menuItem.Component
//                           selected={pathName === menuItem.href}
//                         />
//                       </Link>
//                     </li>
//                   </TooltipTrigger>
//                   <TooltipContent
//                     side="right"
//                     className="bg-black/10 backdrop-blur-xl"
//                   >
//                     <p>{menuItem.name}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </ul>
//             ))}
//           </TooltipProvider>
//         </div>

//         {/* Bottom items */}
//         <div className="flex flex-col items-center gap-8">
//           <Separator />
//           <TooltipProvider>
//             <Tooltip delayDuration={0}>
//               <TooltipTrigger>
//                 <Link
//                   className="flex font-bold h-8 w-8 ml-3 mr-3 items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer"
//                   href="/"
//                 >
//                   <Signout selected={false} />
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent
//                 side="right"
//                 className="bg-black/10 backdrop-blur-xl"
//               >
//                 <p>Sign out</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MenuOptions;




// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { ArrowLeftToLine, ArrowRightToLine, ArrowRightToLineIcon, Menu } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isMinimized, setIsMinimized] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMinimized(window.innerWidth <= 768); // Adjust this value as needed
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <>
//       {/* Burger menu for minimized view */}
//       <button
//         className={clsx(
//           "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-opacity duration-300",
//           isMinimized ? "opacity-100" : "opacity-0 pointer-events-none"
//         )}
//         onClick={() => setIsMinimized(false)}
//       >
//         <ArrowRightToLine className="text-white" />
//       </button>
//       <button
//         className={clsx(
//           "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-opacity duration-300",
//           isMinimized ? "opacity-100" : "opacity-0 pointer-events-none"
//         )}
//         onClick={() => setIsMinimized(true)}
//       >
//         <ArrowLeftToLine className="text-white" />
//       </button>

//       {/* Navigation sidebar */}
//       <nav className={clsx(
//         "dark:bg-black h-screen flex flex-col sticky justify-between py-6 px-2 transition-all duration-300 ease-in-out",
//         isMinimized ? "hidden" : "block"
//       )}>
//         {/* Main menu in the center */}
//         <div className="flex flex-col z-1000 items-center justify-center flex-grow gap-8">
//           <TooltipProvider>
//             {menuOptions.map((menuItem) => (
//               <ul key={menuItem.name}>
//                 <Tooltip delayDuration={0}>
//                   <TooltipTrigger>
//                     <li>
//                       <Link
//                         href={menuItem.href}
//                         className={clsx(
//                           'group h-8 w-8 ml-3 mr-3 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer',
//                           {
//                             'dark:bg-[#e2e2e2] bg-[#ffffff]':
//                               pathName === menuItem.href,
//                           }
//                         )}
//                       >
//                         <menuItem.Component
//                           selected={pathName === menuItem.href}
//                         />
//                       </Link>
//                     </li>
//                   </TooltipTrigger>
//                   <TooltipContent
//                     side="right"
//                     className="bg-black/10 backdrop-blur-xl"
//                   >
//                     <p>{menuItem.name}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </ul>
//             ))}
//           </TooltipProvider>
//         </div>

//         {/* Bottom items */}
//         <div className="flex flex-col items-center gap-8">
//           <Separator />
//           <TooltipProvider>
//             <Tooltip delayDuration={0}>
//               <TooltipTrigger>
//                 <Link
//                   className="flex font-bold h-8 w-8 ml-3 mr-3 items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer"
//                   href="/"
//                 >
//                   <Signout selected={false} />
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent
//                 side="right"
//                 className="bg-black/10 backdrop-blur-xl"
//               >
//                 <p>Sign out</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MenuOptions;



// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       {/* Toggle button */}
//       <button
//         className={clsx(
//           "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-all duration-300",
//           isCollapsed ? "translate-x-0" : "translate-x-48"
//         )}
//         onClick={toggleSidebar}
//       >
//         {isCollapsed ? (
//           <ArrowRightToLine className="text-white" />
//         ) : (
//           <ArrowLeftToLine className="text-white" />
//         )}
//       </button>

//       {/* Navigation sidebar */}
//       <nav className={clsx(
//         "dark:bg-black h-screen flex flex-col sticky justify-between py-6 px-2 transition-all duration-200 ease-in-out",
//         isCollapsed ? "w-16" : "w-48"
//       )}>
//         {/* Main menu in the center */}
//         <div className="flex flex-col z-1000 items-center justify-center flex-grow gap-5">
//           <TooltipProvider>
//             {menuOptions.map((menuItem) => (
//               <ul key={menuItem.name}>
//                 <Tooltip delayDuration={0}>
//                   <TooltipTrigger>
//                     <li>
//                       <Link
//                         href={menuItem.href}
//                         className={clsx(
//                           'group h-8 w-full flex items-start justify-start rounded-lg p-2 cursor-pointer',
//                           {
//                             'dark:bg-[#e2e2e2] bg-[#ffffff]':
//                               pathName === menuItem.href,
//                           }
//                         )}
//                       >
//                         <menuItem.Component
//                           selected={pathName === menuItem.href}
//                         />
//                         {!isCollapsed && (
//                           <span className="ml-3">{menuItem.name}</span>
//                         )}
//                       </Link>
//                     </li>
//                   </TooltipTrigger>
//                   {isCollapsed && (
//                     <TooltipContent
//                       side="right"
//                       className="bg-black/10 backdrop-blur-xl"
//                     >
//                       <p>{menuItem.name}</p>
//                     </TooltipContent>
//                   )}
//                 </Tooltip>
//               </ul>
//             ))}
//           </TooltipProvider>
//         </div>

//         {/* Bottom items */}
//         <div className="flex flex-col items-center gap-8">
//           <Separator />
//           <TooltipProvider>
//             <Tooltip delayDuration={0}>
//               <TooltipTrigger>
//                 <Link
//                   className={clsx(
//                     "flex font-bold h-8 w-full items-center justify-start rounded-lg p-2 cursor-pointer",
//                     isCollapsed ? "justify-center" : "justify-start"
//                   )}
//                   href="/"
//                 >
//                   <Signout selected={false} />
//                   {!isCollapsed && <span className="ml-3">Sign out</span>}
//                 </Link>
//               </TooltipTrigger>
//               {isCollapsed && (
//                 <TooltipContent
//                   side="right"
//                   className="bg-black/10 backdrop-blur-xl"
//                 >
//                   <p>Sign out</p>
//                 </TooltipContent>
//               )}
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MenuOptions;




// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       {/* Toggle button */}
//       <button
//         className={clsx(
//           "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-all duration-300",
//           isCollapsed ? "translate-x-0" : "translate-x-48"
//         )}
//         onClick={toggleSidebar}
//       >
//         {isCollapsed ? (
//           <ArrowRightToLine className="text-white" />
//         ) : (
//           <ArrowLeftToLine className="text-white" />
//         )}
//       </button>

//       {/* Navigation sidebar */}
//       <nav className={clsx(
//         "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-all duration-200 ease-in-out",
//         isCollapsed ? "w-16" : "w-48"
//       )}>
//         {/* Main menu in the center */}
//         <div className="flex flex-col z-1000 items-start justify-center flex-grow gap-5">
//           <TooltipProvider>
//             {menuOptions.map((menuItem) => (
//               <ul key={menuItem.name} className="w-full">
//                 <Tooltip delayDuration={0}>
//                   <TooltipTrigger asChild>
//                     <li>
//                       <Link
//                         href={menuItem.href}
//                         className={clsx(
//                           'group h-8 flex items-center rounded-lg py-2 px-4 mr-3  cursor-pointer',
//                           {

//                             'dark:bg-[#e2e2e2] text-black':
//                               pathName === menuItem.href,
                            
//                           }
//                         )}
//                       >
//                         <div className="w-6 h-6 flex items-center justify-center">
//                           <menuItem.Component
//                             selected={pathName === menuItem.href}
//                           />
//                         </div>
//                         {!isCollapsed && (
//                           <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
//                             {menuItem.name}
//                           </span>
//                         )}
//                       </Link>
//                     </li>
//                   </TooltipTrigger>
//                   {isCollapsed && (
//                     <TooltipContent
//                       side="right"
//                       className="bg-black/10 backdrop-blur-xl"
//                     >
//                       <p>{menuItem.name}</p>
//                     </TooltipContent>
//                   )}
//                 </Tooltip>
//               </ul>
//             ))}
//           </TooltipProvider>
//         </div>

//         {/* Bottom items */}
//         <div className="flex flex-col items-start gap-8 w-full">
//           <Separator />
//           <TooltipProvider>
//             <Tooltip delayDuration={0}>
//               <TooltipTrigger asChild>
//                 <Link
//                   className={clsx(
//                     "flex font-bold h-8 w-full items-center rounded-lg py-2 px-4 cursor-pointer"
//                   )}
//                   href="/"
//                 >
//                   <div className="w-6 h-6 flex items-center justify-center">
//                     <Signout selected={false} />
//                   </div>
//                   {!isCollapsed && <span className="ml-3">Sign out</span>}
//                 </Link>
//               </TooltipTrigger>
//               {isCollapsed && (
//                 <TooltipContent
//                   side="right"
//                   className="bg-black/10 backdrop-blur-xl"
//                 >
//                   <p>Sign out</p>
//                 </TooltipContent>
//               )}
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MenuOptions;



// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       {/* Toggle button */}
//       <button
//         className={clsx(
//           "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-all duration-300",
//           isCollapsed ? "translate-x-0" : "translate-x-48"
//         )}
//         onClick={toggleSidebar}
//       >
//         {isCollapsed ? (
//           <ArrowRightToLine className="text-white" />
//         ) : (
//           <ArrowLeftToLine className="text-white" />
//         )}
//       </button>

//       {/* Navigation sidebar */}
//       <nav className={clsx(
//         "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-all duration-200 ease-in-out",
//         isCollapsed ? "w-16" : "w-52"
//       )}>
//         {/* Main menu in the center */}
//         <div className="flex flex-col z-1000 mt-10 items-start justify-start flex-grow gap-3 px-2">
//           <TooltipProvider>
//             {menuOptions.map((menuItem) => (
//               <ul key={menuItem.name} className="w-full">
//                 <Tooltip delayDuration={0}>
//                   <TooltipTrigger asChild>
//                     <li>
//                       <Link
//                         href={menuItem.href}
//                         className={clsx(
//                           'group h-10 flex items-center rounded-lg py-2 px-3 cursor-pointer transition-colors duration-200',
//                           {
//                             'dark:bg-[#e2e2e2] text-black':
//                               pathName === menuItem.href,
//                             'hover:bg-neutral-900': pathName !== menuItem.href,
//                           }
//                         )}
//                       >
//                         <div className="w-7 h-7 flex items-center justify-center">
//                           <menuItem.Component
//                             selected={pathName === menuItem.href}
//                           />
//                         </div>
//                         {!isCollapsed && (
//                           <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
//                             {menuItem.name}
//                           </span>
//                         )}
//                       </Link>
//                     </li>
//                   </TooltipTrigger>
//                   {isCollapsed && (
//                     <TooltipContent
//                       side="right"
//                       className="bg-black/10 backdrop-blur-xl"
//                     >
//                       <p>{menuItem.name}</p>
//                     </TooltipContent>
//                   )}
//                 </Tooltip>
//               </ul>
//             ))}
//           </TooltipProvider>
//         </div>

//         {/* Bottom items */}
//         <div className="flex flex-col items-start gap-8 w-full px-2">
//           <Separator />
//           <TooltipProvider>
//             <Tooltip delayDuration={0}>
//               <TooltipTrigger asChild>
//                 <Link
//                   className={clsx(
//                     "flex font-bold h-10 w-full items-center rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-900 transition-colors duration-200"
//                   )}
//                   href="/"
//                 >
//                   <div className="w-7 h-7 flex items-center justify-center">
//                     <Signout selected={false} />
//                   </div>
//                   {!isCollapsed && <span className="font-light ml-3">Sign out</span>}
//                 </Link>
//               </TooltipTrigger>
//               {isCollapsed && (
//                 <TooltipContent
//                   side="right"
//                   className="bg-black/10 backdrop-blur-xl"
//                 >
//                   <p>Sign out</p>
//                 </TooltipContent>
//               )}
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MenuOptions;





//SUPER VISKAS VEIKIA
// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       {/* Toggle button */}
//       <button
//         className={clsx(
//           "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-all duration-300",
//           isCollapsed ? "translate-x-0" : "translate-x-48"
//         )}
//         onClick={toggleSidebar}
//       >
//         {isCollapsed ? (
//           <ArrowRightToLine className="text-white" />
//         ) : (
//           <ArrowLeftToLine className="text-white" />
//         )}
//       </button>

//       {/* Navigation sidebar */}
//       <nav className={clsx(
//         "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-all duration-200 ease-in-out",
//         isCollapsed ? "w-16" : "w-52"
//       )}>
//         {/* Main menu in the center */}
//         <div className="flex flex-col z-1000 mt-10 items-start justify-start flex-grow gap-3 px-2">
//           {menuOptions.map((menuItem) => (
//             <Link
//               key={menuItem.name}
//               href={menuItem.href}
//               className={clsx(
//                 'group h-10 flex items-center rounded-lg py-2 px-3 cursor-pointer transition-colors duration-200 w-full',
//                 {
//                   'dark:bg-[#e2e2e2] text-black':
//                     pathName === menuItem.href,
//                   'hover:bg-neutral-900': pathName !== menuItem.href,
//                 }
//               )}
//             >
//               <div className="w-7 h-7 flex items-center justify-center">
//                 <menuItem.Component
//                   selected={pathName === menuItem.href}
//                 />
//               </div>
//               {!isCollapsed && (
//                 <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
//                   {menuItem.name}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Bottom items */}
//         <div className="flex flex-col items-start gap-8 w-full px-2">
//           <Separator />
//           <Link
//             className={clsx(
//               "flex font-bold h-10 w-full items-center rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-900 transition-colors duration-200"
//             )}
//             href="/"
//           >
//             <div className="w-7 h-7 flex items-center justify-center">
//               <Signout selected={false} />
//             </div>
//             {!isCollapsed && <span className="font-light ml-3">Sign out</span>}
//           </Link>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MenuOptions;




// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { ArrowLeftToLine, ArrowRightToLine, ChevronFirst, ChevronLast, PanelLeft } from 'lucide-react';


// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
      

//       {/* Navigation sidebar */}
//       <nav className={clsx(
//         "dark:bg-black h-screen flex flex-col sticky mt-10 justify-between py-6 transition-all duration-200 ease-in-out",
//         isCollapsed ? "w-16" : "w-48"
//       )}>

//         {/* Main menu in the center */}
//         <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-2 px-2">
//           {menuOptions.map((menuItem) => (
//             <Link
//               key={menuItem.name}
//               href={menuItem.href}
//               className={clsx(
//                 'group h-10 flex items-center rounded-lg py-2 px-3 cursor-pointer transition-colors duration-200 w-full',
//                 {
//                   'dark:bg-neutral-800 text-white':
//                     pathName === menuItem.href,
//                   'hover:bg-neutral-800': pathName !== menuItem.href,
//                 }
//               )}
//             >
//               <div className="w-7 h-7 flex items-center justify-center">
//                 <menuItem.Component
//                   selected={pathName === menuItem.href}
//                 />
//               </div>
//               {!isCollapsed && (
//                 <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
//                   {menuItem.name}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Bottom items */}
//         <div className="flex flex-col items-start mb-10 gap-4 w-full px-2">
//           <div>
//             {/* Toggle button */}
//             <button
//               className={clsx(
//                 "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-all duration-300",
//                 isCollapsed ? "translate-x-0" : "translate-x-48"
//               )}
//               onClick={toggleSidebar}
//             >
//               {isCollapsed ? (
//                 <PanelLeft className="text-white" />
//               ) : (
//                 <PanelLeft className="text-gray-300" />
//               )}
//             </button>
//           </div>
//           <Separator />
//           <Link
//             className={clsx(
//               "flex font-bold w-full items-center rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-900 transition-colors duration-100"
//             )}
//             href="/"
//           >
//             <div className="w-7 h-3 flex items-center justify-center">
//               <Signout selected={false} />
//             </div>
//             {!isCollapsed && <span className="font-light ml-3">Log out</span>}
//           </Link>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default MenuOptions;




// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { PanelLeft } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <nav className={clsx(
//       "dark:bg-black h-screen flex flex-col sticky mt-10 justify-between py-6 transition-all duration-200 ease-in-out",
//       isCollapsed ? "w-16" : "w-48"
//     )}>
//       {/* Main menu in the center */}
//       <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-2 px-2">
//         {menuOptions.map((menuItem) => (
//           <Link
//             key={menuItem.name}
//             href={menuItem.href}
//             className={clsx(
//               'group h-10 flex items-center rounded-lg py-2 px-3 cursor-pointer transition-colors duration-200 w-full',
//               {
//                 'dark:bg-neutral-800 text-white': pathName === menuItem.href,
//                 'hover:bg-neutral-800': pathName !== menuItem.href,
//               }
//             )}
//           >
//             <div className="w-7 h-7 flex items-center justify-center">
//               <menuItem.Component selected={pathName === menuItem.href} />
//             </div>
//             {!isCollapsed && (
//               <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
//                 {menuItem.name}
//               </span>
//             )}
//           </Link>
//         ))}
//       </div>

//       {/* Bottom items */}
//       <div className="flex flex-col items-start mt-auto gap-4 w-full px-2 mb-10">
//         <Separator />
//         {/* Toggle button */}
//         <button
//           className="flex items-center justify-center w-full p-2 px-3 rounded-lg hover:bg-neutral-800 transition-colors duration-200"
//           onClick={toggleSidebar}
//         >
//           <PanelLeft className={isCollapsed ? "text-white" : "text-gray-300"} />
//           {!isCollapsed && <span className="font-light ml-3">Sidebar</span>}
//         </button>
//         <Link
//           className={clsx(
//             "flex font-bold w-full items-center rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-900 transition-colors duration-100"
//           )}
//           href="/"
//         >
//           <div className="w-7 h-3 flex items-center justify-center">
//             <Signout selected={false} />
//           </div>
//           {!isCollapsed && <span className="font-light ml-3">Log out</span>}
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default MenuOptions;


// dar pajuda sidebar 2px i desine puse

// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { PanelLeft } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <nav className={clsx(
//       "dark:bg-black h-screen flex flex-col sticky mt-10 justify-between py-6 transition-all duration-200 ease-in-out",
//       isCollapsed ? "w-16" : "w-48"
//     )}>
//       {/* Main menu in the center */}
//       <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-2 px-2">
//         {menuOptions.map((menuItem) => (
//           <Link
//             key={menuItem.name}
//             href={menuItem.href}
//             className={clsx(
//               'group h-10 flex items-center rounded-lg py-2 px-3 cursor-pointer transition-colors duration-200 w-full',
//               {
//                 'dark:bg-neutral-900 text-white': pathName === menuItem.href,
//                 'hover:bg-neutral-900': pathName !== menuItem.href,
//               }
//             )}
//           >
//             <div className="w-7 h-7 flex items-center justify-center">
//               <menuItem.Component selected={pathName === menuItem.href} />
//             </div>
//             {!isCollapsed && (
//               <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
//                 {menuItem.name}
//               </span>
//             )}
//           </Link>
//         ))}
//       </div>

//       {/* Bottom items */}
//       <div className="flex flex-col items-start mt-auto gap-4 w-full px-2 mb-10">
//         {/* Toggle button */}
//         <button
//           className="flex items-center w-full rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-900 transition-colors duration-200"
//           onClick={toggleSidebar}
//         >
//           <div className="w-7 h-7 flex items-center justify-center">
//             <PanelLeft className="text-gray-500" />
//           </div>
//           {!isCollapsed && <span className="font-light ml-3">Sidebar</span>}
//         </button>
//         <Separator />
//         <Link
//           className="flex items-center w-full rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-900 transition-colors duration-100"
//           href="/"
//         >
//           <div className="w-7 h-7 flex items-center justify-center">
//             <Signout selected={false} />
//           </div>
//           {!isCollapsed && <span className="font-light ml-3">Logout</span>}
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default MenuOptions;



//puikiai veikia

// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import Signout from '../icons/signout';
// import { LogOut, PanelLeft } from 'lucide-react';

// type Props = {};

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <nav className={clsx(
//       "dark:bg-black h-screen flex flex-col sticky mt-10 justify-between py-6 transition-all duration-200 ease-in-out",
//       isCollapsed ? "w-16" : "w-48"
//     )}>
//       {/* Main menu in the center */}
//       <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-1 px-2">
//         {menuOptions.map((menuItem) => (
//           <Link
//             key={menuItem.name}
//             href={menuItem.href}
//             className={clsx(
//               'group h-10 flex text-[15px] items-center rounded-lg py-2 px-[10px] cursor-pointer transition-colors duration-200 w-full',
//               {
//                 'dark:bg-gray-900/70 text-gray-200': pathName === menuItem.href,
//                 'hover:bg-gray-900/70 text-gray-400': pathName !== menuItem.href,
//               }
//             )}
//           >
//             <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//               <menuItem.Component selected={pathName === menuItem.href} />
//             </div>
//             <span className={clsx("ml-1 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200", 
//               isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//               {menuItem.name}
//             </span>
//           </Link>
//         ))}
//       </div>

//       {/* Bottom items */}
//       <div className="flex flex-col items-start mt-auto gap-4 w-full px-2 mb-10">
//         {/* Toggle button */}
//         <button
//           className="flex items-center w-full rounded-lg py-2 px-[10px] text-gray-400 hover:text-gray-200 cursor-pointer hover:bg-gray-900/50 transition-colors duration-200"
//           onClick={toggleSidebar}
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             <PanelLeft className="text-gray-500" size={20} />
//           </div>
//           <span className={clsx("font-light text-[15px] ml-3 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Sidebar
//           </span>
//         </button>

//         <Separator />

//         <Link
//           className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100"
//           href="/"
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             {/* <Signout selected={false} /> */}
//             <LogOut className="text-gray-500" size={20} />
//           </div>
//           <span className={clsx("font-light  text-[15px] ml-3 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Log out
//           </span>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default MenuOptions;

//pridedu bugreport i sidebar. 
// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import { LogOut, PanelLeft, Bug } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Upload } from 'lucide-react';

// const BugReportModal = ({ isOpen, onClose }) => {
//   const [issueType, setIssueType] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ issueType, description, image, url });
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[425px] text-white [&>button]:hidden" 
//         style={{
//           background: '#0D1018',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-sans text-center font-semibold">Report a Bug</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="issue-type">Issue Type</Label>
//             <Select value={issueType} onValueChange={setIssueType}>
//               <SelectTrigger id="issue-type" className="w-full bg-gray-700 focus:outline-none border-none">
//                 <SelectValue placeholder="Select an issue type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700">
//                 <SelectItem value="ui">UI Problem</SelectItem>
//                 <SelectItem value="functionality">Functionality Issue</SelectItem>
//                 <SelectItem value="performance">Performance Problem</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="image">Attach Image (optional)</Label>
//             <div className="flex items-center mt-2">
//               <input
//                 type="file"
//                 id="image"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="hidden"
//               />
//               <Button
//                 type="button"
//                 className="w-full bg-gray-700 hover:bg-gray-600 text-white border-none focus:outline-none"
//                 onClick={() => document.getElementById('image').click()}
//               >
//                 <Upload className="mr-2 h-4 w-4" /> Upload Image
//               </Button>
//             </div>
//             {image && <span className="text-sm mt-1 block">{image.name}</span>}
//           </div>

//           <div>
//             <Label htmlFor="url">URL</Label>
//             <Input
//               id="url"
//               type="url"
//               placeholder="Enter the URL where the issue occurred"
//               value={url}
//               required
//               onChange={(e) => setUrl(e.target.value)}
//               className="bg-gray-700 text-white border-none focus:outline-none"
//             />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               placeholder="Describe the issue in detail"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="h-32 bg-gray-700 text-white border-none focus:outline-none resize-none"
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="ghost" className="hover:bg-gray-600" onClick={onClose}>Cancel</Button>
//             <Button type="submit" className="bg-gray-300 hover:bg-gray-100">Submit Report</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const MenuOptions = (props: Props) => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isBugReportOpen, setIsBugReportOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <nav className={clsx(
//       "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-all duration-200 ease-in-out",
//       isCollapsed ? "w-16" : "w-48"
//     )}>
//       {/* Main menu in the center */}
//       <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-1 px-2">
//         {menuOptions.map((menuItem) => (
//           <Link
//             key={menuItem.name}
//             href={menuItem.href}
//             className={clsx(
//               'group h-10 flex text-[15px] items-center rounded-lg py-2 px-[10px] cursor-pointer transition-colors duration-200 w-full',
//               {
//                 'dark:bg-gray-900/70 text-gray-200': pathName === menuItem.href,
//                 'hover:bg-gray-900/70 text-gray-400': pathName !== menuItem.href,
//               }
//             )}
//           >
//             <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//               <menuItem.Component selected={pathName === menuItem.href} />
//             </div>
//             <span className={clsx("ml-1 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200", 
//               isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//               {menuItem.name}
//             </span>
//           </Link>
//         ))}
//       </div>

//       {/* Bottom items */}
//       <div className="flex flex-col items-start mt-auto gap-2  w-full px-2">
//         {/* Bug Report Button */}
//         <button
//           onClick={() => setIsBugReportOpen(true)}
//           className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100"
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             <Bug className="text-gray-500  " size={20} />
//           </div>
//           <span className={clsx("font-light text-[15px] ml-1 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Report Bug
//           </span>
//         </button>

//         {/* Toggle button */}
//         <button
//           className="flex items-center w-full rounded-lg py-2 px-[10px] text-gray-400 hover:text-gray-200 cursor-pointer hover:bg-gray-900/50 transition-colors duration-200"
//           onClick={toggleSidebar}
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             <PanelLeft className="text-gray-500" size={20} />
//           </div>
//           <span className={clsx("font-light text-[15px] ml-1 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Sidebar
//           </span>
//         </button>

//         <Separator />

//         <Link
//           className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100"
//           href="/"
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             <LogOut className="text-gray-500" size={20} />
//           </div>
//           <span className={clsx("font-light text-[15px] ml-1 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Log out
//           </span>
//         </Link>
//       </div>

//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />
//     </nav>
//   );
// };

// export default MenuOptions;


//taisau image upload



// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React, { useState, useEffect } from 'react';
// import { menuOptions } from '@/lib/constant';
// import clsx from 'clsx';
// import { Separator } from '@/components/ui/separator';
// import { LogOut, PanelLeft, Bug } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Upload } from 'lucide-react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// const BugReportModal = ({ isOpen, onClose }) => {
//   const [issueType, setIssueType] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState('');
//   const supabase = createClientComponentClient();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Get the authenticated user using the secure method
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
      
//       if (userError) throw userError;

//       // Process the bug report with authenticated user
//       console.log({ 
//         userId: user?.id,
//         issueType, 
//         description, 
//         image, 
//         url 
//       });
      
//       onClose();
//     } catch (error) {
//       console.error('Error submitting bug report:', error);
//       // Handle error appropriately - you might want to show an error message to the user
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent 
//         className="sm:max-w-[425px] text-white [&>button]:hidden" 
//         style={{
//           background: '#0D1018',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-sans text-center font-semibold">Report a Bug</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="issue-type">Issue Type</Label>
//             <Select value={issueType} onValueChange={setIssueType}>
//               <SelectTrigger id="issue-type" className="w-full bg-gray-700 focus:outline-none border-none">
//                 <SelectValue placeholder="Select an issue type" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-700">
//                 <SelectItem value="ui">UI Problem</SelectItem>
//                 <SelectItem value="functionality">Functionality Issue</SelectItem>
//                 <SelectItem value="performance">Performance Problem</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="image">Attach Image (optional)</Label>
//             <div className="flex items-center mt-2">
//               <input
//                 type="file"
//                 id="image"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="hidden"
//               />
//               <Button
//                 type="button"
//                 className="w-full bg-gray-700 hover:bg-gray-600 text-white border-none focus:outline-none"
//                 onClick={() => document.getElementById('image').click()}
//               >
//                 <Upload className="mr-2 h-4 w-4" /> Upload Image
//               </Button>
//             </div>
//             {image && <span className="text-sm mt-1 block">{image.name}</span>}
//           </div>

//           <div>
//             <Label htmlFor="url">URL</Label>
//             <Input
//               id="url"
//               type="url"
//               placeholder="Enter the URL where the issue occurred"
//               value={url}
//               required
//               onChange={(e) => setUrl(e.target.value)}
//               className="bg-gray-700 text-white border-none focus:outline-none"
//             />
//           </div>

//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               placeholder="Describe the issue in detail"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="h-32 bg-gray-700 text-white border-none focus:outline-none resize-none"
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="ghost" className="hover:bg-gray-600" onClick={onClose}>Cancel</Button>
//             <Button type="submit" className="bg-gray-300 hover:bg-gray-100">Submit Report</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const MenuOptions = () => {
//   const pathName = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isBugReportOpen, setIsBugReportOpen] = useState(false);
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsCollapsed(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check on initial load

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       // Handle successful logout - redirect or update UI
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <nav className={clsx(
//       "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-all duration-200 ease-in-out",
//       isCollapsed ? "w-16" : "w-38"
//     )}>
//       {/* Main menu in the center */}
//       <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-1 px-2">
//         {menuOptions.map((menuItem) => (
//           <Link
//             key={menuItem.name}
//             href={menuItem.href}
//             className={clsx(
//               'group h-10 flex text-[15px] items-center rounded-lg py-2 px-[10px] cursor-pointer transition-colors duration-200 w-full',
//               {
//                 'dark:bg-gray-900/70 text-gray-200': pathName === menuItem.href,
//                 'hover:bg-gray-900/70 text-gray-400': pathName !== menuItem.href,
//               }
//             )}
//           >
//             <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//               <menuItem.Component selected={pathName === menuItem.href} />
//             </div>
//             <span className={clsx("ml-1 whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200", 
//               isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//               {menuItem.name}
//             </span>
//           </Link>
//         ))}
//       </div>

//       {/* Bottom items */}
//       <div className="flex flex-col items-start mt-auto gap-2 w-full px-2">
//         <button
//           onClick={() => setIsBugReportOpen(true)}
//           className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100"
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             <Bug className="text-gray-500" size={20} />
//           </div>
//           <span className={clsx("font-light text-[15px] ml-1 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Report Bug
//           </span>
//         </button>

//         <button
//           className="flex items-center w-full rounded-lg py-2 px-[10px] text-gray-400 hover:text-gray-200 cursor-pointer hover:bg-gray-900/50 transition-colors duration-200"
//           onClick={toggleSidebar}
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             <PanelLeft className="text-gray-500" size={20} />
//           </div>
//           <span className={clsx("font-light text-[15px] ml-1 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Sidebar
//           </span>
//         </button>

//         <Separator />

//         <button
//           onClick={handleLogout}
//           className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100"
//         >
//           <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
//             <LogOut className="text-gray-500" size={20} />
//           </div>
//           <span className={clsx("font-light text-[15px] ml-1 whitespace-nowrap overflow-hidden transition-all duration-200", 
//             isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
//             Log out
//           </span>
//         </button>
//       </div>

//       <BugReportModal
//         isOpen={isBugReportOpen}
//         onClose={() => setIsBugReportOpen(false)}
//       />
//     </nav>
//   );
// };

// export default MenuOptions;



'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { menuOptions } from '@/lib/constant';
import clsx from 'clsx';
import { Separator } from '@/components/ui/separator';
import { LogOut, PanelLeft, Bug } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const BugReportModal = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const supabase = createClientComponentClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;

      console.log({ 
        userId: user?.id,
        issueType, 
        description, 
        image, 
        url 
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting bug report:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[425px] text-white [&>button]:hidden" 
        style={{
          background: '#050607',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-sans text-center font-base">Report a Bug</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
  {/* <Label htmlFor="issue-type">Issue Type</Label> */}
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger 
                id="issue-type" 
                className="w-full bg-gray-700/30 focus:outline-none border-none"
              >
                <div className="flex items-center text-neutral-400 justify-center w-full gap-2">
                  <SelectValue placeholder="Select an issue type" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#050607]">
                <SelectItem value="ui" className="text-center">UI Problem</SelectItem>
                <SelectItem value="functionality" className="text-center">Functionality Issue</SelectItem>
                <SelectItem value="performance" className="text-center">Performance Problem</SelectItem>
                <SelectItem value="other" className="text-center">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            {/* <Label htmlFor="image">Attach Image (optional)</Label> */}
            <div className="flex items-start mt-2">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
              <Button
                type="button"
                className="w-full bg-gray-700/30 hover:bg-gray-600/30 text-neutral-400 border-none focus:outline-none"
                onClick={() => document.getElementById('image').click()}
              >
                <Upload className="mr-2 h-4 w-4 text-neutral-400"  /> Upload Image
              </Button>
            </div>
            {image && <span className="text-sm mt-1 block">{image.name}</span>}
          </div>

          <div>
            {/* <Label htmlFor="url">URL</Label> */}
            <Input
              id="url"
              type="url"
              placeholder="Enter the URL where the issue occurred"
              value={url}
              required
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-700/30 text-white border-none focus:outline-none"
            />
          </div>

          <div>
            {/* <Label htmlFor="description">Description</Label> */}
            <Textarea
              id="description"
              placeholder="Describe the issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 bg-gray-700/30 text-white border-none focus:outline-none resize-none"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" className="bg-transparent hover:bg-transparent hover:border mr-1 hover:border-gray-500" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-gray-300 hover:bg-gray-100">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const MenuOptions = () => {
  const pathName = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebarCollapsed');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 768;
      setIsCollapsed(shouldCollapse);
      localStorage.setItem('sidebarCollapsed', JSON.stringify(shouldCollapse));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // After successful logout, redirect to login page
      router.push('/');  // Use Next.js router
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  return (
    <nav className={clsx(
      "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-[width] duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-[145px]"
    )}>
      <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-1 px-2 overflow-hidden">
        {menuOptions.map((menuItem) => (
          <Link
            key={menuItem.name}
            href={menuItem.href}
            className={clsx(
              'group h-10 flex text-[15px] items-center rounded-lg py-2 px-[10px] cursor-pointer transition-colors duration-200 w-full',
              {
                'dark:bg-gray-900/90 text-gray-200': pathName === menuItem.href,
                'hover:bg-gray-900/90 text-gray-400': pathName !== menuItem.href,
              }
            )}
          >
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <menuItem.Component selected={pathName === menuItem.href} />
            </div>
            <span className={clsx(
              "ml-1 whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",
              isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
            )}>
              {menuItem.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-start mt-auto gap-2 w-full px-2 overflow-hidden">
      <button           
        onClick={() => setIsBugReportOpen(true)}           
        className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100"         
      >           
        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">             
          <Bug 
            className={clsx(                 
              "text-gray-500 transition-transform duration-300",                 
              isBugReportOpen ? "rotate-180" : "rotate-0"               
            )}                
            size={20}  
          />           
        </div>           
        <span className={clsx(             
          "ml-1 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",             
          isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"           
        )}>             
          Report           
        </span>         
      </button>          

      <button           
        className="flex items-center w-full rounded-lg py-2 px-[10px] text-gray-400 hover:text-gray-200 cursor-pointer hover:bg-gray-900/50 transition-colors duration-200"           
        onClick={toggleSidebar}         
      >           
        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">             
          <PanelLeft                
            className={clsx(                 
              "text-gray-500 transition-transform duration-300",                 
              isCollapsed ? "rotate-180" : "rotate-0"               
            )}                
            size={20}              
          />           
        </div>           
        <span className={clsx(             
          "ml-1 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",             
          isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"           
        )}>             
          Sidebar           
        </span>         
      </button>

        <Separator />
        
        <button           
          onClick={handleLogout}           
          className="flex items-center w-full text-gray-400 hover:text-gray-200 rounded-lg py-2 px-[10px] cursor-pointer hover:bg-gray-900/50 transition-colors duration-100 group"         
        >           
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 relative">             
            <LogOut 
              className="text-gray-500 transition-transform duration-200 transform group-active:translate-x-1" 
              size={20} 
            />           
          </div>           
          <span className={clsx(             
            "ml-1 font-light text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 max-w-[160px]",             
            isCollapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"           
          )}>             
            Log out           
          </span>         
        </button>
      </div>

      <BugReportModal
        isOpen={isBugReportOpen}
        onClose={() => setIsBugReportOpen(false)}
      />
    </nav>
  );
};

export default MenuOptions;