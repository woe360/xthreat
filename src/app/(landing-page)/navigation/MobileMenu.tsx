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

'use client';

import React from 'react';
import Link from 'next/link';

const MobileMenu = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-50 lg:hidden mt-[5rem] overflow-hidden">
      <div className="flex flex-col w-full h-full p-6 overflow-y-auto">
        {/* Products */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Products</h3>
          <Link href="/training-platform" className="block text-gray-400 hover:text-white py-2">
            Training platform
          </Link>
          <Link href="/simulations" className="block text-gray-400 hover:text-white py-2">
            Simulations
          </Link>
          <Link href="/weak-points" className="block text-gray-400 hover:text-white py-2">
            Weak points
          </Link>
          <Link href="/escape-rooms" className="block text-gray-400 hover:text-white py-2">
            Escape Rooms
          </Link>
        </div>

        {/* Pricing */}
        <Link href="/pricing" className="text-lg font-semibold text-white mb-4 block">
          Pricing
        </Link>

        {/* Resources */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
          <Link href="/blog" className="block text-gray-400 hover:text-white py-2">
            Blog
          </Link>
          <Link href="/case-studies" className="block text-gray-400 hover:text-white py-2">
            Case Studies
          </Link>
          <Link href="/changelog" className="block text-gray-400 hover:text-white py-2">
            Changelog
          </Link>
        </div>

        {/* Company */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
          <Link href="/about" className="block text-gray-400 hover:text-white py-2">
            About XThreat
          </Link>
          <Link href="/careers" className="block text-gray-400 hover:text-white py-2">
            Careers
          </Link>
          <Link href="/customers" className="block text-gray-400 hover:text-white py-2">
            Customers
          </Link>
        </div>

        {/* Contact */}
        <Link href="/contact" className="text-lg font-semibold text-white mb-4 block">
          Contact
        </Link>

        {/* Sign In and Request Demo */}
        <Link href="/dashboard" className="text-base h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-transparent text-white hover:bg-white/10 inline-flex items-center justify-center select-none transition ease-in-out duration-200 mb-4 w-full">
          Sign In
        </Link>
        <Link href="https://cal.com/xthreat/30min" target="_blank" rel="noopener noreferrer" className="text-base h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-[#ffffff] hover:bg-white/90 inline-flex items-center justify-center select-none transition ease-in-out duration-200 w-full">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 group-hover:from-black group-hover:to-black">
            Request Demo
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;



// 'use client';

// import React from 'react';
// import Link from 'next/link';

// const MobileMenu = () => {
//   return (
//     <div className="fixed min-w-min top-[-12px] left-0 w-full h-full bg-black z-50 lg:hidden mt-[5rem]">
//       <div className="flex flex-col w-full h-full p-6 overflow-y-auto">
//         {/* Products */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-white mb-2">Products</h3>
//           <Link href="/training-platform" className="block text-gray-400 hover:text-white py-2">
//             Training platform
//           </Link>
//           <Link href="/simulations" className="block text-gray-400 hover:text-white py-2">
//             Simulations
//           </Link>
//           <Link href="/weak-points" className="block text-gray-400 hover:text-white py-2">
//             Weak points
//           </Link>
//           <Link href="/escape-rooms" className="block text-gray-400 hover:text-white py-2">
//             Escape Rooms
//           </Link>
//         </div>

//         {/* Pricing */}
//         <Link href="/pricing" className="text-lg font-semibold text-white mb-4 block">
//           Pricing
//         </Link>

//         {/* Resources */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
//           <Link href="/blog" className="block text-gray-400 hover:text-white py-2">
//             Blog
//           </Link>
//           <Link href="/case-studies" className="block text-gray-400 hover:text-white py-2">
//             Case Studies
//           </Link>
//           <Link href="/changelog" className="block text-gray-400 hover:text-white py-2">
//             Changelog
//           </Link>
//         </div>

//         {/* Company */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
//           <Link href="/about" className="block text-gray-400 hover:text-white py-2">
//             About XThreat
//           </Link>
//           <Link href="/careers" className="block text-gray-400 hover:text-white py-2">
//             Careers
//           </Link>
//           <Link href="/customers" className="block text-gray-400 hover:text-white py-2">
//             Customers
//           </Link>
//         </div>

//         {/* Contact */}
//         <Link href="/contact" className="text-lg font-semibold text-white mb-4 block">
//           Contact
//         </Link>

//         {/* Sign In and Request Demo */}
//         <Link href="/dashboard" className="text-base h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-transparent text-white hover:bg-white/10 inline-flex items-center justify-center select-none transition ease-in-out duration-200 mb-4 w-full">
//           Sign In
//         </Link>
//         <Link href="https://cal.com/xthreat/30min" target="_blank" rel="noopener noreferrer" className="text-base h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-[#ffffff] hover:bg-white/90 inline-flex items-center justify-center select-none transition ease-in-out duration-200 w-full">
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 group-hover:from-black group-hover:to-black">
//             Request Demo
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default MobileMenu;