// "use client";

// import React from 'react';

// const MobileMenu = () => {
//   return (
//     <div className="fixed top-[-12px] left-0 w-full h-full bg-black z-50 lg:hidden mt-[5rem]">
//       <div className="flex flex-col w-full h-full p-6 overflow-y-auto">
//         <a
//           className="text-base h-11 pl-4 pr-4 rounded-md gap-2 font-semibold dark:bg-slate-3 border-slate-6 dark:text-slate-11 bg-slate-2 text-slate-12 hover:bg-slate-4 focus-visible:ring-2 focus-visible:ring-slate-7 focus-visible:outline-none focus-visible:bg-slate-4 disabled:hover:bg-slate-4 inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 mb-4 w-full"
//           href="/dashboard"
//         >
//           Sign In
//         </a>
//         <a
//           className="text-base h-11 pl-4 pr-4 rounded-md gap-2 font-semibold bg-black dark:bg-white text-white dark:text-black border-slate-6 hover:bg-black/90 dark:hover:bg-white/90 focus-visible:ring-2 dark:focus-visible:ring-white/40 focus-visible:ring-black/40 focus-visible:outline-none dark:focus-visible:bg-white/90 focus-visible:bg-black/90 disabled:hover:bg-black dark:disabled:hover:bg-white inline-flex items-center border justify-center select-none disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 mb-4 w-full"
//           href="/signup"
//         >
//           Get Started
//         </a>
//         <div>
//           <a
//             className="text-md block w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none hover:text-slate-12"
//             href="/products"
//           >
//             Products
//           </a>
//         </div>
//         <div>
//           <a
//             className="text-md block w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none hover:text-slate-12"
//             href="/pricing"
//           >
//             Pricing
//           </a>
//         </div>
//         <div>
//           <a
//             className="text-md block w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none hover:text-slate-12"
//             href="/resources"
//           >
//             Resources
//           </a>
//         </div>
//         <div>
//           <a
//             className="text-md block w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none hover:text-slate-12"
//             href="/home#"
//           >
//             About
//           </a>
//           <a
//             className="pl-8 text-md block w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none hover:text-slate-12"
//             href="/careers"
//           >
//             Careers
//           </a>
//           <a
//             className="pl-8 text-md block w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none hover:text-slate-12"
//             href="/changelog"
//           >
//             Changelog
//           </a>
//         </div>
//         <div>
//           <a
//             className="text-md block w-full border-b border-slate-6 py-4 font-semibold text-slate-11 transition duration-200 ease-in-out last:border-none hover:text-slate-12"
//             href="/contact"
//           >
//             Contact
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;




// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// const MobileMenu = () => {
//   const [solutionsOpen, setSolutionsOpen] = useState(false);

//   const toggleSolutions = () => {
//     setSolutionsOpen((prevState) => !prevState);
//   };

//   return (
//     <div className="fixed top-0 right-0 w-3/4 h-full bg-black z-50 lg:hidden mt-[4rem] overflow-hidden">
//       <div className="flex flex-col w-full h-full p-6 overflow-y-auto items-center justify-start">
        
//         {/* Company */}
//         <Link href="/about" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 block text-right">
//           Company
//         </Link>

//         {/* Solutions */}
//         <div className="mb-4 text-center">
//           <div
//             className="flex ml-5 justify-center items-center text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-2 cursor-pointer"
//             onClick={toggleSolutions}
//           >
//             Solutions
//             {solutionsOpen ? (
//               <ChevronUp className="ml-2 h-6 w-6 text-neutral-300" />
//             ) : (
//               <ChevronDown className="ml-2 h-6 w-6 text-neutral-300" />
//             )}
//           </div>

//           {solutionsOpen && (
//             <div className="text-center">
//               <ul className="mt-3 text-xl text-center space-y-3">
//                 <li>
//                   <Link href="/phishing-awareness" className="text-gray-300 hover:text-white">
//                     Phishing Awareness
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/security-awareness" className="text-gray-300 hover:text-white">
//                     Security Awareness
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/role-based-training" className="text-gray-300 hover:text-white">
//                     Role-Based Training
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/weak-points" className="text-gray-300 hover:text-white">
//                     Weak Points
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/custom-trainings" className="text-gray-300 hover:text-white">
//                     Custom Trainings
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//                 {/* Pricing */}
//                 <Link href="/pricing" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 block text-right">
//           Pricing
//         </Link>

//         {/* Contact */}
//         <Link href="/contact" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 block text-right">
//           Contact
//         </Link>

//         {/* Sign In and Request Demo */}
//         <Link
//           href="/sign-in"
//           className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-transparent text-white hover:bg-white/10 inline-flex items-center justify-center select-none transition ease-in-out duration-200 mb-4 w-full"
//         >
//           Sign In
//         </Link>
//         <Link
//           href="https://cal.com/xthreat/30min"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-[#ffffff] hover:bg-white/90 inline-flex items-center justify-center select-none transition ease-in-out duration-200 w-full"
//         >
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 group-hover:from-black group-hover:to-black">
//             Request Demo
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;


// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// const MobileMenu = () => {
//   const [solutionsOpen, setSolutionsOpen] = useState(false);

//   const toggleSolutions = () => {
//     setSolutionsOpen((prevState) => !prevState);
//   };

//   return (
//     <div className="fixed top-0 right-0 w-3/4 h-full bg-black/40 backdrop-blur-lg z-50 lg:hidden mt-[4rem] overflow-hidden">
//       <div className="flex flex-col w-full h-full p-6 overflow-y-auto items-center justify-between">
        
//         {/* Main Content */}
//         <div className="flex flex-col items-center border-b border-gray-600 w-full">
//           {/* Company */}
//           <Link href="/about" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 block text-right">
//             Company
//           </Link>

//           {/* Solutions */}
//           <div className="mb-4 border-b border-gray-600 w-full text-center">
//             <div
//               className="flex ml-5 justify-center items-center text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-2 cursor-pointer"
//               onClick={toggleSolutions}
//             >
//               Solutions
//               {solutionsOpen ? (
//                 <ChevronUp className="ml-2 h-6 w-6 text-neutral-300" />
//               ) : (
//                 <ChevronDown className="ml-2 h-6 w-6 text-neutral-300" />
//               )}
//             </div>

//             {solutionsOpen && (
//               <div className="text-center ">
//                 <ul className="mt-3 text-xl text-center   space-y-3">
//                   <li>
//                     <Link href="/phishing-awareness" className="text-gray-300 hover:text-white">
//                       Phishing Awareness
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/security-awareness" className="text-gray-300 hover:text-white">
//                       Security Awareness
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/role-based-training" className="text-gray-300 hover:text-white">
//                       Role-Based Training
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/weak-points" className="text-gray-300 hover:text-white">
//                       Weak Points
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/custom-trainings" className="text-gray-300 hover:text-white">
//                       Custom Trainings
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Pricing */}
//           <Link href="/pricing" className="text-2xl  font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 block text-right">
//             Pricing
//           </Link>

//           {/* Contact */}
//           <Link href="/contact" className="text-2xl  font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 block text-right">
//             Contact
//           </Link>
//         </div>

//         {/* Sign In and Request Demo at the bottom */}
//         <div className="mt-auto w-full mb-20">
//           <Link
//             href="/sign-in"
//             className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-transparent text-white hover:bg-white/10 inline-flex items-center justify-center select-none transition ease-in-out duration-200 mb-4 w-full"
//           >
//             Sign In
//           </Link>
//           <Link
//             href="https://cal.com/xthreat/30min"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-[#ffffff] hover:bg-white/90 inline-flex items-center justify-center select-none transition ease-in-out duration-200 w-full"
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 group-hover:from-black group-hover:to-black">
//               Request Demo
//             </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;



'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MobileMenu = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const toggleSolutions = () => {
    setSolutionsOpen((prevState) => !prevState);
  };

  return (
    <div className="fixed top-0 right-0 w-3/4 h-full bg-black/40 backdrop-blur-lg z-50 lg:hidden mt-[4rem] overflow-hidden">
      <div className="flex flex-col w-full h-full p-6 overflow-y-auto items-center justify-between">
        
        {/* Main Content */}
        <div className="flex flex-col items-center w-full">

          {/* Solutions */}
          <div className="mb-4 w-full text-center border-b border-gray-600">
            <div
              className="flex ml-8 justify-center items-center text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-2 cursor-pointer"
              onClick={toggleSolutions}
            >
              Solutions
              {solutionsOpen ? (
                <ChevronUp className="mt-1 ml-1 h-6 w-6 text-neutral-300" />
              ) : (
                <ChevronDown className="mt-1 ml-1 h-6 w-6 text-neutral-300" />
              )}
            </div>

            {solutionsOpen && (
              <div className="text-center">
                <ul className="mt-3 text-xl text-center space-y-3">
                  {['Phishing Awareness', 'Security Awareness', 'Role-Based Training', 'Weak Points', 'Custom Trainings'].map((item, index) => (
                    <li key={index} className="w-full border-b border-gray-600">
                      <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-300 hover:text-white block py-2">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="w-full border-b border-gray-600 mb-4">
            <Link href="/pricing" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
              Pricing
            </Link>
          </div>

          {/* Company */}
          <div className="w-full border-b border-gray-600 mb-4">
            <Link href="/about" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
              Company
            </Link>
          </div>

          {/* Contact */}
          <div className="w-full border-b border-gray-600 mb-4">
            <Link href="/contact" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
              Contact
            </Link>
          </div>
        </div>

        {/* Sign In and Request Demo at the bottom */}
        <div className="mt-auto w-full mb-20">
          <Link
            href="/log-in"
            className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-transparent text-white hover:bg-white/10 inline-flex items-center justify-center select-none transition ease-in-out duration-200 mb-4 w-full"
          >
            Log In
          </Link>
          <Link
            href="https://cal.com/xthreat/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-[#ffffff] hover:bg-white/90 inline-flex items-center justify-center select-none transition ease-in-out duration-200 w-full"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 group-hover:from-black group-hover:to-black">
              Request Demo
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
