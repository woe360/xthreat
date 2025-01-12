// 'use client';

// import Link from 'next/link';
// import Navbar from './(landing-page)/navigation/navbar';
// import { ChevronRight } from 'lucide-react';
// import Footer from './(landing-page)/navigation/footer';

// export default function NotFound() {
//   return (
//     <main className="relative flex min-h-screen flex-col items-center justify-center bg-black p-4">
//       <Navbar />
//       <div className="absolute inset-0 flex items-center justify-center">
//         <h1 className="text-[400px] font-sans font-base">
//           <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">4</span>
//           <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-400">0</span>
//           <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-500">4</span>
//         </h1>
//       </div>

//       <div className="relative z-10 mt-72 bg-black/50 backdrop-blur-lg rounded-xl p-6 text-center shadow-lg max-w-md">
//         <h2 className="mb-4 text-4xl font-sans text-white">
//           Oops, page not found
//         </h2>

//         <p className="mb-8 text-gray-400">
//           Lorem ipsum dolor sit amet consectetur adipiscing elit arcu
//           cras posuere gravida neque felis a ullamcorper interdum.
//         </p>

//         <Link 
//           href="/"
//           className="inline-flex items-center rounded-full bg-gray-700 px-6 py-3 text-white transition-colors hover:bg-gray-600"
//         >
//           Back to homepage
//           <ChevronRight className="w-4 h-4 ml-1 mt-1px" size={16} />
//         </Link>
//       </div>
//       <Footer />
//     </main>
//   );
// }



// 'use client';

// import Link from 'next/link';
// import Navbar from './(landing-page)/navigation/navbar';
// import { ChevronRight } from 'lucide-react';
// import Footer from './(landing-page)/navigation/footer';

// export default function NotFound() {
//   return (
//     <main className="relative flex min-h-[150vh] flex-col bg-black">
//       <Navbar />
//       <div className="flex flex-grow flex-col items-center justify-center px-4 overflow-hidden">
//         <div className="flex items-center mt-28 justify-center">
//           <h1 className="text-[00px] md:text-[400px] font-sans font-normal">
//             <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">4</span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-400">0</span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-500">4</span>
//           </h1>
//         </div>

//         <div className="relative z-10 -mt-12 md:-mt-60 bg-black/50 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center shadow-lg max-w-md w-full">
//           <h2 className="mb-4 text-2xl md:text-4xl font-sans text-white">
//             Oops, page not found
//           </h2>

//           <p className="mb-8 text-sm md:text-base text-gray-400">
//             Lorem ipsum dolor sit amet consectetur adipiscing elit arcu
//             cras posuere gravida neque felis a ullamcorper interdum.
//           </p>

//           <Link 
//             href="/"
//             className="inline-flex items-center rounded-md bg-white px-4 py-2 md:px-6 md:py-3 text-black transition-colors hover:bg-gray-600"
//           >
//             Homepage
//             {/* <ChevronRight className="w-4 h-4 ml-1 mt-[1px]" size={16} /> */}
//           </Link>
//         </div>
//       </div>
//       <Footer/>
//     </main>
//   );
// }



// 'use client';

// import Link from 'next/link';
// import Navbar from './(landing-page)/navigation/navbar';
// import { ChevronRight } from 'lucide-react';
// import Footer from './(landing-page)/navigation/footer';

// export default function NotFound() {
//   return (
//     <main className="relative flex font-sans min-h-[150vh] flex-col bg-black">
//       <Navbar />
//       <div className="flex flex-grow flex-col items-center justify-center px-4 overflow-hidden">
//         <div className="flex items-center mt-28 justify-center">
//           <h1 className="text-[150px] md:text-[400px] font-sans font-normal">
//             <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">4</span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-400">0</span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-500">4</span>
//           </h1>
//         </div>

//         <div className="relative z-10 -mt-12 md:-mt-60 bg-black/50 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center shadow-lg max-w-md w-full">
//           <h2 className="mb-4 text-2xl md:text-4xl font-sans text-white">
//             Oops, page not found
//           </h2>

//           <p className="mb-8 text-sm md:text-base text-gray-400">
//             Lorem ipsum dolor sit amet consectetur adipiscing elit arcu
//             cras posuere gravida neque felis a ullamcorper interdum.
//           </p>

//           <Link 
//             href="/"
//             className="inline-flex items-center rounded-xl bg-white px-4 py-2 md:px-6 md:py-3 text-black transition-colors hover:bg-gray-600"
//           >
//             Homepage
//           </Link>
//         </div>
//       </div>
//       <Footer />
//     </main>
//   );
// }

'use client';

import Link from 'next/link';
import Navbar from './(landing-page)/navigation/navbar';
import { ChevronRight } from 'lucide-react';
import Footer from './(landing-page)/navigation/footer';

export default function NotFound() {
  return (
    <main className="relative flex min-h-[150vh] font-sans flex-col bg-black">
      <Navbar />
      <div className="flex flex-grow flex-col items-center justify-center px-4 overflow-hidden">
        <div className="flex items-center mt-28 justify-center">
          <h1 className="text-[150px] md:text-[400px] font-sans font-normal">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">4</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">0</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-700">4</span>
          </h1>
        </div>

        <div className="relative z-10 -mt-20 md:-mt-60 bg-black/50 backdrop-blur-lg rounded-xl p-4 md:p-6 text-center shadow-lg max-w-md w-full">
          <h2 className="mb-4 text-2xl md:text-4xl font-sans text-white">
            Page not found
          </h2>

          <p className="mb-8 text-sm md:text-base text-gray-400">
          The page you are looking for might have been moved, deleted, or perhaps it never existed. Please check the URL or return to the homepage.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 md:px-6 md:py-3 text-black transition-colors hover:bg-gray-200"
          >
            Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
