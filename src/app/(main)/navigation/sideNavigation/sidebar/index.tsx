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


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { menuOptions } from '@/lib/constant';
import clsx from 'clsx';
import { Separator } from '@/components/ui/separator';
import Signout from '../icons/signout';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import Logo from '@/app/(landing-page)/assets/XThreat_icon_primary_white_to_gradient.svg'
import Xlogo from '../icons/xlogo';


type Props = {};

const MenuOptions = (props: Props) => {
  const pathName = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className={clsx(
          "fixed top-4 left-4 z-[60] p-2 bg-black/50 rounded-md transition-all duration-300",
          isCollapsed ? "translate-x-0" : "translate-x-48"
        )}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ArrowRightToLine className="text-white" />
        ) : (
          <ArrowLeftToLine className="text-white" />
        )}
      </button>

      {/* Navigation sidebar */}
      <nav className={clsx(
        "dark:bg-black h-screen flex flex-col sticky justify-between py-6 transition-all duration-200 ease-in-out",
        isCollapsed ? "w-16" : "w-48"
      )}>
        {/* Logo */}
        <div className="px-2 mb-6 h-19">
          <Xlogo width={30} height={30} className="mx-auto"/>
        </div>

        {/* Main menu in the center */}
        <div className="flex flex-col z-1000 items-start justify-start flex-grow gap-2 px-2">
          {menuOptions.map((menuItem) => (
            <Link
              key={menuItem.name}
              href={menuItem.href}
              className={clsx(
                'group h-10 flex items-center rounded-lg py-2 px-3 cursor-pointer transition-colors duration-200 w-full',
                {
                  'dark:bg-[#e2e2e2] text-black':
                    pathName === menuItem.href,
                  'hover:bg-neutral-900': pathName !== menuItem.href,
                }
              )}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <menuItem.Component
                  selected={pathName === menuItem.href}
                />
              </div>
              {!isCollapsed && (
                <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
                  {menuItem.name}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Bottom items */}
        <div className="flex flex-col items-start gap-4 w-full px-2">
          <Separator />
          <Link
            className={clsx(
              "flex font-bold w-full items-center rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-900 transition-colors duration-200"
            )}
            href="/"
          >
            <div className="w-7 h-3 flex items-center justify-center">
              <Signout selected={false} />
            </div>
            {!isCollapsed && <span className="font-light ml-3">Sign out</span>}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MenuOptions;