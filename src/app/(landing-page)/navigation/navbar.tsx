"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import MobileMenu from "./MobileMenu";
// import { Button } from "../../../components/ui/button";
import MobileMenu from "./MobileMenu";

type Props = {};

const Navbar = (props: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
        setMenuOpen(false); 
      } else {
        setIsDesktop(false);
      }
    };

    
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed right-0 font-sans left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 md:gap-4">
            <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
              <Link href="/">XThreat</Link>
            </p>
          </div>

          {isDesktop ? (
            <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex items-center gap-8 list-none">
                <li>
                  <Link href="/solutions" className="text-gray-400 hover:text-white">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                {/* <li>
                  <Link href="/resources" className="text-gray-400 hover:text-white">
                    Resources
                  </Link>
                </li> */}
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <button
              onClick={toggleMenu}
              className="ml-auto"
              aria-label="Open mobile menu"
            >
              <MenuIcon />
            </button>
          )}

          {isDesktop && (
            <div className="flex items-center gap-8 ml-auto">
              <Link href="/sign-in" className="text-gray-400 hover:text-white">
                Sign In
              </Link>
              {/* <Link href="/contact">
                <Button className="p-4 h-9 text-base w-full sm:w-fit rounded-xl border-[#4D4D4D] bg-[#ffffff] hover:bg-white group transition-all flex items-center justify-center gap-4 ">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                    Book a Demo
                  </span>
                </Button>
              </Link> */}
              <Link
                href="https://cal.com/xthreat/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 h-9 text-base w-full sm:w-fit rounded-xl border-[#4D4D4D] bg-[#ffffff] hover:bg-white group transition-all flex items-center justify-center gap-4"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                  Book a Demo
                </span>
              </Link>
            </div>
          )}
        </div>
      </header>
      {!isDesktop && menuOpen && <MobileMenu />}
    </>
  );
};

export default Navbar;




// 'use client'


// import { MenuIcon } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";
// import { Menu, MenuItem, ProductItem, HoveredLink } from "../global/navbarMenu";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [active, setActive] = useState<string | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setIsDesktop(true);
//         setMenuOpen(false); 
//       } else {
//         setIsDesktop(false);
//       }
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   const handleMouseEnter = (item: string) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setActive(item);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActive(null);
//     }, 300); // Adjust the delay (in milliseconds) as needed
//   };

//   return (
//     <>
//       <header className="fixed right-0 left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
//           <div className="flex items-center gap-2 md:gap-4">
//             <p className="text-3xl font-bold">
//               <Link href="/">XThreat</Link>
//             </p>
//           </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center gap-8 list-none">
//                 <li
//                   onMouseEnter={() => handleMouseEnter("Products")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div className="text-gray-400 hover:text-white cursor-pointer">
//                     Products
//                   </div>
//                   {active === "Products" && (
//                     <div className="absolute ml-10 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//                     style={{ marginLeft: '-55px' }}
//                     >
//                       <Menu setActive={setActive}>
//                         <div className="flex flex-col space-y-4 text-sm">
//                           <HoveredLink href="/training-platform">Training platform</HoveredLink>
//                           <HoveredLink href="/simulations">Simulations</HoveredLink>
//                           <HoveredLink href="/weak-points">Weak points</HoveredLink>
//                           <HoveredLink href="/escape-rooms">Escape Rooms</HoveredLink>
//                         </div>
//                       </Menu>
//                     </div>
//                   )}
//                 </li>
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>

//                 {/* Resources Dropdown */}
//                 {/* <li
//                   onMouseEnter={() => handleMouseEnter("Resources")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div className="text-gray-400 hover:text-white cursor-pointer">
//                     Resources
//                   </div>
//                   {active === "Resources" && (
//                     <div className="absolute left-0 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//                     style={{ marginLeft: '-35px' }}
//                     >
//                       <Menu setActive={setActive}>
//                         <div className="flex flex-col space-y-4 text-sm">
//                           <HoveredLink href="/blog">Blog</HoveredLink>
//                           <HoveredLink href="/case-studies">Case Studies</HoveredLink>
//                           <HoveredLink href="/changelog">Changelog</HoveredLink>
//                         </div>
//                       </Menu>
//                     </div>
//                   )}
//                 </li> */}

//                 {/* Company Dropdown */}

                
//                 <li
//                   onMouseEnter={() => handleMouseEnter("Company")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div className="text-gray-400 hover:text-white cursor-pointer">
//                     Company
//                   </div>
//                   {active === "Company" && (
//                     <div className="absolute left-0 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//                     style={{ marginLeft: '-25px' }}
//                     >
//                       <Menu setActive={setActive}>
//                         <div className="flex flex-col space-y-4 text-sm">
//                           <HoveredLink href="/about">About XThreat</HoveredLink>
//                           <HoveredLink href="/careers">Careers</HoveredLink>
//                           {/* <HoveredLink href="/news">News</HoveredLink> */}
//                           <HoveredLink href="/customers">Customers</HoveredLink>
//                         </div>
//                       </Menu>
//                     </div>
//                   )}
//                 </li>

//                 <li>
//                   <Link href="/about" className="text-gray-400 hover:text-white">
//                     Company
//                   </Link>
//                 </li>

//                 <li>
//                   <Link href="/contact" className="text-gray-400 hover:text-white">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           ) : (
//             <button
//               onClick={toggleMenu}
//               className="ml-auto"
//               aria-label="Open mobile menu"
//             >
//               <MenuIcon />
//             </button>
//           )}

//           {isDesktop && (
//             <div className="flex items-center gap-8 ml-auto">
//               <Link href="/dashboard" className="text-gray-400 hover:text-white">
//                 Sign In
//               </Link>
//               <Link
//                 href="https://cal.com/xthreat/15min"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-4 h-9 text-base w-full sm:w-fit rounded-xl border-[#4D4D4D] bg-[#ffffff] hover:bg-white group transition-all flex items-center justify-center gap-4"
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                   Request Demo
//                 </span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </header>
//       {!isDesktop && menuOpen && <MobileMenu />}
//     </>
//   );
// };

// export default Navbar;


// "use client";

// import { MenuIcon } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";
// import { Menu, MenuItem, ProductItem, HoveredLink } from "../global/navbarMenu";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [active, setActive] = useState<string | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setIsDesktop(true);
//         setMenuOpen(false); 
//       } else {
//         setIsDesktop(false);
//       }
//     };

//     handleResize();

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   // const handleMouseEnter = (item: string) => {
//   //   setActive(item);
//   // };

//   // const handleMouseLeave = () => {
//   //   setActive(null);
//   // };

//   const handleMouseEnter = (item: string) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setActive(item);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActive(null);
//     }, 300); // Adjust the delay (in milliseconds) as needed
//   };

//   return (
//     <>
//       <header className="fixed right-0 left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
//           <div className="flex items-center gap-2 md:gap-4">
//             <p className="text-3xl font-bold">
//               <Link href="/">XThreat</Link>
//             </p>
//           </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center gap-8 list-none">
//                 <li
//                   onMouseEnter={() => handleMouseEnter("Products")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div className="text-gray-400 hover:text-white cursor-pointer">
//                     Products
//                   </div>
//                   {active === "Products" && (
//                     <div className="absolute ml-10 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//                     style={{ marginLeft: '-55px' }}
//                     >
//                       <Menu setActive={setActive}>
//                         <div className="flex flex-col space-y-4 text-sm">
//                           <HoveredLink href="/training-platform">Training platform</HoveredLink>
//                           <HoveredLink href="/simulations">Simulations</HoveredLink>
//                           <HoveredLink href="/weak-points">Weak points</HoveredLink>
//                           <HoveredLink href="/escape-rooms">Escape Rooms</HoveredLink>
//                         </div>
//                       </Menu>
//                     </div>
//                   )}
//                 </li>
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>

//                 {/* Resources Dropdown */}
//                 <li
//                   onMouseEnter={() => handleMouseEnter("Resources")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div className="text-gray-400 hover:text-white cursor-pointer">
//                     Resources
//                   </div>
//                   {active === "Resources" && (
//                     <div className="absolute left-0 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//                     style={{ marginLeft: '-35px' }}
//                     >
//                       <Menu setActive={setActive}>
//                         <div className="flex flex-col space-y-4 text-sm">
//                           <HoveredLink href="/blog">Blog</HoveredLink>
//                           <HoveredLink href="/case-studies">Case Studies</HoveredLink>
//                           <HoveredLink href="/changelog">Changelog</HoveredLink>
//                         </div>
//                       </Menu>
//                     </div>
//                   )}
//                 </li>

//                 {/* Company Dropdown */}
//                 <li
//                   onMouseEnter={() => handleMouseEnter("Company")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div className="text-gray-400 hover:text-white cursor-pointer">
//                     Company
//                   </div>
//                   {active === "Company" && (
//                     <div className="absolute left-0 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//                     style={{ marginLeft: '-25px' }}
//                     >
//                       <Menu setActive={setActive}>
//                         <div className="flex flex-col space-y-4 text-sm">
//                           <HoveredLink href="/about">About XThreat</HoveredLink>
//                           <HoveredLink href="/careers">Careers</HoveredLink>
//                           <HoveredLink href="/news">News</HoveredLink>
//                           <HoveredLink href="/customers">Customers</HoveredLink>
//                         </div>
//                       </Menu>
//                     </div>
//                   )}
//                 </li>

//                 <li>
//                   <Link href="/contact" className="text-gray-400 hover:text-white">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           ) : (
//             <button
//               onClick={toggleMenu}
//               className="ml-auto"
//               aria-label="Open mobile menu"
//             >
//               <MenuIcon />
//             </button>
//           )}

//           {isDesktop && (
//             <div className="flex items-center gap-8 ml-auto">
//               <Link href="/dashboard" className="text-gray-400 hover:text-white">
//                 Sign In
//               </Link>
//               <Link
//                 href="https://cal.com/xthreat/15min"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-4 h-9 text-base w-full sm:w-fit rounded-xl border-[#4D4D4D] bg-[#ffffff] hover:bg-white group transition-all flex items-center justify-center gap-4"
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                   Request Demo
//                 </span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </header>
//       {!isDesktop && menuOpen && <MobileMenu />}
//     </>
//   );
// };

// export default Navbar;





