// "use client";

// import { MenuIcon } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import MobileMenu from "./MobileMenu";
// import { Button } from "@/components/global/ui/button";

// type Props = {};

// const Navbar = (props: Props) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(false);

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

//   return (
//     <>
//       <header className="fixed right-0 font-sans left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          // <div className="flex items-center gap-2 md:gap-4">
          //   <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
          //     <Link href="/">XThreat</Link>
          //   </p>
          // </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center gap-8 list-none">
//                 <li>
//                   <Link href="/solutions" className="text-gray-400 hover:text-white">
//                     Solutions
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link href="/resources" className="text-gray-400 hover:text-white">
//                     Resources
//                   </Link>
//                 </li> */}
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
//               <Link href="/sign-in" className="text-gray-400 hover:text-white">
//                 Sign In
//               </Link>
//               <Link
//                 href="https://cal.com/xthreat/30min"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-4 h-9 text-base w-full sm:w-fit rounded-xl border-[#4D4D4D] bg-[#ffffff] hover:bg-white group transition-all flex items-center justify-center gap-4"
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                   Book a Demo
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



// 'use client'
// import { MenuIcon } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";
// import { Menu, MenuItem, ProductItem, HoveredLink } from "@/components/global/ui/navbarMenu";

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
//     }, 300);
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
//                   onMouseEnter={() => handleMouseEnter("Solutions")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div className="text-gray-400 hover:text-white cursor-pointer">
//                     Solutions
//                   </div>
//                   {active === "Solutions" && (
//                     <div className="absolute ml-10 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//                     style={{ marginLeft: '-55px' }}
//                     >
//                       <Menu setActive={setActive}>
//                         <div className="flex flex-col space-y-4 text-sm">
//                           <HoveredLink href="/phishing-awareness">Phishing Awareness</HoveredLink>
//                           <HoveredLink href="/security-awareness">Security Awareness</HoveredLink>
//                           <HoveredLink href="/role-based-training">Role Based Training</HoveredLink>
//                           <HoveredLink href="/weak-points">Weak Points</HoveredLink>
//                           <HoveredLink href="/custom-trainings">Custom Trainings</HoveredLink>
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

// 'use client'
// import { MenuIcon, ChevronDown, ChevronUp } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";
// import { Menu, MenuItem, ProductItem, HoveredLink } from "@/components/global/ui/navbarMenu";

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
//     }, 300);
//   };

//   const NavItem = ({ title, items }: { title: string; items: React.ReactNode }) => (
//     <li
//       onMouseEnter={() => handleMouseEnter(title)}
//       onMouseLeave={handleMouseLeave}
//       className="relative"
//     >
//       <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
//         {title}
//         {active === title ? (
//           <ChevronUp className="ml-1 h-4 w-4" />
//         ) : (
//           <ChevronDown className="ml-1 h-4 w-4" />
//         )}
//       </div>
//       {active === title && (
//         <div className="absolute left-0 top-full mt-2 z-50 w-max bg-black p-4 rounded-md shadow-lg"
//         style={{ marginLeft: '-25px' }}
//         >
//           <Menu setActive={setActive}>
//             <div className="flex flex-col space-y-4 text-sm">
//               {items}
//             </div>
//           </Menu>
//         </div>
//       )}
//     </li>
//   );

//   return (
//     <>
//       <header className="fixed right-0 left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
//         <div className="flex items-center gap-2 md:gap-4">
//           <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//             <Link href="/">XThreat</Link>
//           </p>
//         </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center gap-8 list-none">
//                 <NavItem
//                   title="Solutions"
//                   items={
//                     <>
//                       <HoveredLink href="/phishing-awareness">Phishing Awareness</HoveredLink>
//                       <HoveredLink href="/security-awareness">Security Awareness</HoveredLink>
//                       <HoveredLink href="/role-based-training">Role Based Training</HoveredLink>
//                       <HoveredLink href="/weak-points">Weak Points</HoveredLink>
//                       <HoveredLink href="/custom-trainings">Custom Trainings</HoveredLink>
//                     </>
//                   }
//                 />
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>
//                 <NavItem
//                   title="Company"
//                   items={
//                     <>
//                       <HoveredLink href="/about">About</HoveredLink>
//                       <HoveredLink href="/customers">Blog</HoveredLink>
//                       <HoveredLink href="/customers">News</HoveredLink>
//                     </>
//                   }
//                 />
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



//LABAI GERAI
// 'use client'
// import { MenuIcon, ChevronDown, ChevronUp } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";

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
//     }, 300);
//   };

//   const NavItem = ({ title, content }: { title: string; content: React.ReactNode }) => (
//     <li
//       onMouseEnter={() => handleMouseEnter(title)}
//       onMouseLeave={handleMouseLeave}
//       className="relative"
//     >
//       <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
//         {title}
//         {active === title ? (
//           <ChevronUp className="ml-1 h-4 w-4" />
//         ) : (
//           <ChevronDown className="ml-1 h-4 w-4" />
//         )}
//       </div>
//       {active === title && (
//         <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 w-[550px] bg-gray-700/50 p-6 rounded-md shadow-lg">
//           {content}
//         </div>
//       )}
//     </li>
//   );

//   const SolutionsContent = () => (
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <h3 className="text-white font-semibold text-l mb-2">Security Solutions</h3>
//         <ul className="space-y-2">
//           <li><Link href="/phishing-awareness" className="text-gray-400 text-l hover:text-white">Phishing Awareness</Link></li>
//           <li><Link href="/security-awareness" className="text-gray-400 hover:text-white">Security Awareness</Link></li>
//           <li><Link href="/role-based-training" className="text-gray-400 hover:text-white">Role Based Training</Link></li>
//           <li><Link href="/weak-points" className="text-gray-400 hover:text-white">Weak Points</Link></li>
//           <li><Link href="/custom-trainings" className="text-gray-400 hover:text-white">Custom Trainings</Link></li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-white font-semibold mb-2">Featured</h3>
//         <div className="bg-gray-800 p-4 rounded-md">
//           <h4 className="text-white font-semibold mb-2">New: AI-Powered Training</h4>
//           <p className="text-gray-400 text-sm mb-2">Enhance your security with our latest AI-driven training modules.</p>
//           <Link href="/ai-training" className="text-blue-400 hover:text-blue-300 text-sm">Learn more →</Link>
//         </div>
//       </div>
//     </div>
//   );

//   const CompanyContent = () => (
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <h3 className="text-white font-semibold mb-2">About XThreat</h3>
//         <ul className="space-y-2">
//           <li><Link href="/about" className="text-gray-400 hover:text-white">Our Story</Link></li>
//           <li><Link href="/team" className="text-gray-400 hover:text-white">Our Team</Link></li>
//           <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-white font-semibold mb-2">Resources</h3>
//         <ul className="space-y-2">
//           <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
//           <li><Link href="/news" className="text-gray-400 hover:text-white">News</Link></li>
//           <li><Link href="/events" className="text-gray-400 hover:text-white">Changelog</Link></li>
//         </ul>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <header className="fixed right-0 left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
//           <div className="flex items-center gap-2 md:gap-4">
//             <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//               <Link href="/">XThreat</Link>
//             </p>
//           </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center gap-8 list-none">
//                 <NavItem title="Solutions" content={<SolutionsContent />} />
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>
//                 <NavItem title="Company" content={<CompanyContent />} />
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
//               <Link href="/sign-in" className="text-gray-400 hover:text-white">
//                 Sign In
//               </Link>
//               <Link
//                 href="https://cal.com/xthreat/30min"
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

// 'use client'
// import { MenuIcon, ChevronDown, ChevronUp } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";

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
//     }, 300);
//   };

//   const NavItem = ({ title, content }: { title: string; content: React.ReactNode }) => (
//     <li
//       onMouseEnter={() => handleMouseEnter(title)}
//       onMouseLeave={handleMouseLeave}
//       className="relative"
//     >
//       <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
//         {title}
//         {active === title ? (
//           <ChevronUp className="ml-1 h-4 w-4" />
//         ) : (
//           <ChevronDown className="ml-1 h-4 w-4" />
//         )}
//       </div>
//       {active === title && (
//         <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 w-[550px] bg-gray-900 p-6 rounded-md shadow-lg">
//           {content}
//         </div>
//       )}
//     </li>
//   );

//   const SolutionsContent = () => (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="pr-4 border-r border-gray-600">
//         <h3 className="text-white font-semibold text-l mb-2">Security Solutions</h3>
//         <ul className="space-y-2">
//           <li><Link href="/phishing-awareness" className="text-gray-400 text-l hover:text-white">Phishing Awareness</Link></li>
//           <li><Link href="/security-awareness" className="text-gray-400 hover:text-white">Security Awareness</Link></li>
//           <li><Link href="/role-based-training" className="text-gray-400 hover:text-white">Role Based Training</Link></li>
//           <li><Link href="/weak-points" className="text-gray-400 hover:text-white">Weak Points</Link></li>
//           <li><Link href="/custom-trainings" className="text-gray-400 hover:text-white">Custom Trainings</Link></li>
//         </ul>
//       </div>
//       <div className="pl-4">
//         <h3 className="text-white font-semibold mb-2">Featured</h3>
//         <div className="bg-gray-700 p-4 rounded-md">
//           <h4 className="text-white font-semibold mb-2">New: AI-Powered Training</h4>
//           <p className="text-gray-400 text-sm mb-2">Enhance your security with our latest AI-driven training modules.</p>
//           <Link href="/ai-training" className="text-blue-400 hover:text-blue-300 text-sm">Learn more →</Link>
//         </div>
//       </div>
//     </div>
//   );

//   const CompanyContent = () => (
//     <div className="grid grid-cols-2 gap-8">
//       <div>
//         <h3 className="text-white font-semibold mb-2">About XThreat</h3>
//         <ul className="space-y-2">
//           <li><Link href="/about" className="text-gray-400 hover:text-white">Our Story</Link></li>
//           <li><Link href="/team" className="text-gray-400 hover:text-white">Our Team</Link></li>
//           <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-white font-semibold mb-2">Resources</h3>
//         <ul className="space-y-2">
//           <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
//           <li><Link href="/news" className="text-gray-400 hover:text-white">News</Link></li>
//           <li><Link href="/events" className="text-gray-400 hover:text-white">Changelog</Link></li>
//         </ul>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <header className="fixed right-0 left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
//           <div className="flex items-center gap-2 md:gap-4">
//             <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//               <Link href="/">XThreat</Link>
//             </p>
//           </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center gap-8 list-none">
//                 <NavItem title="Solutions" content={<SolutionsContent />} />
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>
//                 <NavItem title="Company" content={<CompanyContent />} />
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
//               <Link href="/sign-in" className="text-gray-400 hover:text-white">
//                 Sign In
//               </Link>
//               <Link
//                 href="https://cal.com/xthreat/30min"
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

// 'use client'
// import { MenuIcon, ChevronDown, ChevronUp, ShieldCheck, Users, BookOpen, Newspaper, FileText } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";

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
//     }, 300);
//   };

//   const NavItem = ({ title, content }: { title: string; content: React.ReactNode }) => (
//     <li
//       onMouseEnter={() => handleMouseEnter(title)}
//       onMouseLeave={handleMouseLeave}
//       className="relative"
//     >
//       <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
//         {title}
//         {active === title ? (
//           <ChevronUp className="ml-1 h-4 w-4" />
//         ) : (
//           <ChevronDown className="ml-1 h-4 w-4" />
//         )}
//       </div>
//       {active === title && (
//         <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 w-[400px] bg-gray-900 p-6 rounded-md shadow-lg">
//           {content}
//         </div>
//       )}
//     </li>
//   );

//   const SolutionsContent = () => (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="pr-4 border-r border-gray-600">
//         <h3 className="text-white font-semibold text-l mb-2">Security Solutions</h3>
//         <ul className="space-y-2">
//           <li><Link href="/phishing-awareness" className="text-gray-400 text-l hover:text-white flex items-center"><ShieldCheck className="mr-2 h-4 w-4" />Phishing Awareness</Link></li>
//           <li><Link href="/security-awareness" className="text-gray-400 hover:text-white flex items-center"><ShieldCheck className="mr-2 h-4 w-4" />Security Awareness</Link></li>
//           <li><Link href="/role-based-training" className="text-gray-400 hover:text-white flex items-center"><Users className="mr-2 h-4 w-4" />Role Based Training</Link></li>
//           <li><Link href="/weak-points" className="text-gray-400 hover:text-white flex items-center"><ShieldCheck className="mr-2 h-4 w-4" />Weak Points</Link></li>
//           <li><Link href="/custom-trainings" className="text-gray-400 hover:text-white flex items-center"><ShieldCheck className="mr-2 h-4 w-4" />Custom Trainings</Link></li>
//         </ul>
//       </div>
//       <div className="pl-4">
//         <h3 className="text-white font-semibold mb-2">Featured</h3>
//         <div className="bg-gray-700 p-4 rounded-md">
//           <h4 className="text-white font-semibold mb-2">New: AI-Powered Training</h4>
//           <p className="text-gray-400 text-sm mb-2">Enhance your security with our latest AI-driven training modules.</p>
//           <Link href="/ai-training" className="text-blue-400 hover:text-blue-300 text-sm">Learn more →</Link>
//         </div>
//       </div>
//     </div>
//   );

//   const CompanyContent = () => (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="pr-4 border-r border-gray-600">
//         <h3 className="text-white font-semibold mb-2">About XThreat</h3>
//         <ul className="space-y-2">
//           <li><Link href="/about" className="text-gray-400 hover:text-white flex items-center"><Users className="mr-2 h-4 w-4" />Our Story</Link></li>
//           <li><Link href="/team" className="text-gray-400 hover:text-white flex items-center"><Users className="mr-2 h-4 w-4" />Our Team</Link></li>
//           <li><Link href="/careers" className="text-gray-400 hover:text-white flex items-center"><Users className="mr-2 h-4 w-4" />Careers</Link></li>
//         </ul>
//       </div>
//       <div className="pl-4">
//         <h3 className="text-white font-semibold mb-2">Resources</h3>
//         <ul className="space-y-2">
//           <li><Link href="/blog" className="text-gray-400 hover:text-white flex items-center"><BookOpen className="mr-2 h-4 w-4" />Blog</Link></li>
//           <li><Link href="/news" className="text-gray-400 hover:text-white flex items-center"><Newspaper className="mr-2 h-4 w-4" />News</Link></li>
//           <li><Link href="/events" className="text-gray-400 hover:text-white flex items-center"><FileText className="mr-2 h-4 w-4" />Changelog</Link></li>
//         </ul>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <header className="fixed right-0 left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
//           <div className="flex items-center gap-2 md:gap-4">
//             <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//               <Link href="/">XThreat</Link>
//             </p>
//           </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center gap-8 list-none">
//                 <NavItem title="Solutions" content={<SolutionsContent />} />
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>
//                 <NavItem title="Company" content={<CompanyContent />} />
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
//               <Link href="/sign-in" className="text-gray-400 hover:text-white">
//                 Sign In
//               </Link>
//               <Link
//                 href="https://cal.com/xthreat/30min"
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



// 'use client'
// import { MenuIcon, ChevronDown, ChevronUp, ShieldCheck, Users, BookOpen, Newspaper, FileText, Target, Brain, Crosshair, Wrench, Lightbulb, Building, GraduationCap, Rss } from "lucide-react";
// import Link from "next/link";
// import Image from 'next/image';
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";
// import { motion, AnimatePresence } from 'framer-motion';
// import XLogo from '../assets/XThreat_icon_primary_white_to_gradient.svg'

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
//     }, 300);
//   };

//   const NavItem = ({ title, content, width }: { title: string; content: React.ReactNode; width: string }) => {
//     const [isHovered, setIsHovered] = React.useState(false);
  
//     return (
//       <li
//         onMouseEnter={() => {
//           handleMouseEnter(title);
//           setIsHovered(true);
//         }}
//         onMouseLeave={() => {
//           handleMouseLeave();
//           setIsHovered(false);
//         }}
//         className="relative"
//       >
//         <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
//           <span className="mr-1">{title}</span>
//           <motion.div
//             animate={{ rotate: isHovered ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <ChevronDown className="h-4 w-4" />
//           </motion.div>
//         </div>
//         {active === title && (
//           <div className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 ${width} bg-gray-900 p-6 rounded-md shadow-lg`}>
//             {content}
//           </div>
//         )}
//       </li>
//     );
//   };
  

//   const SolutionsContent = () => (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="pl-3  border-r border-gray-600">
//         <h3 className="text-white font-semibold text-l mb-2">Security Solutions</h3>
//         <ul className="mt-3 space-y-3">
//           <li><Link href="/phishing-awareness" className="text-gray-400 text-l hover:text-white flex items-center"><Target className="mr-2 h-4 w-4" />Phishing Awareness</Link></li>
//           <li><Link href="/security-awareness" className="text-gray-400 hover:text-white flex items-center"><ShieldCheck className="mr-2 h-4 w-4" />Security Awareness</Link></li>
//           <li><Link href="/role-based-training" className="text-gray-400 hover:text-white flex items-center"><Users className="mr-2 h-4 w-4" />Role Based Training</Link></li>
//           <li><Link href="/weak-points" className="text-gray-400 hover:text-white flex items-center"><Crosshair className="mr-2 h-4 w-4" />Weak Points</Link></li>
//           <li><Link href="/custom-trainings" className="text-gray-400 hover:text-white flex items-center"><Wrench className="mr-2 h-4 w-4" />Custom Trainings</Link></li>
//         </ul>
//       </div>
//       <div className="pr-4">
//         <h3 className="text-white font-semibold mb-2">Featured</h3>
//         <div className="bg-gray-700 p-4 rounded-md">
//           <h4 className="text-white font-semibold mb-2">New: AI-Powered Training</h4>
//           <p className="text-gray-400 text-sm mb-2">Enhance your security with our latest AI-driven training modules.</p>
//           <Link href="/ai-training" className="text-blue-400 hover:text-blue-300 text-sm">Learn more →</Link>
//         </div>
//       </div>
//     </div>
//   );


//   return (
//     <>
//       <header className="fixed right-0 font-sans left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
//         <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
//           <div className="flex items-center gap-1 md:gap-[2px]">
//           <Image
//             src={XLogo}
//             alt="X Logo"
//             width={16}
//             height={16}
//             className="w-7 h-7 md:w-[26px] md:h-[26px]"
            
//           />
//           <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//             <Link href="/">Threat</Link>
//           </p>
//         </div>

//           {isDesktop ? (
//             <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
//               <ul className="flex items-center  gap-8 list-none">
//                 <NavItem title="Solutions" content={<SolutionsContent />} width="w-[550px]" />
//                 <li>
//                   <Link href="/pricing" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
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
//               <Link href="/sign-in" className="text-gray-400 hover:text-white">
//                 Sign In
//               </Link>
//               <Link
//                 href="https://cal.com/xthreat/30min"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-4 h-9 text-base w-full sm:w-fit rounded-xl border-[#4D4D4D] bg-[#ffffff] hover:bg-white group transition-all flex items-center justify-center gap-4"
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                   Book a Demo
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


'use client'
import { MenuIcon, ChevronDown, ChevronUp, ShieldCheck, Users, BookOpen, Newspaper, FileText, Target, Brain, Crosshair, Wrench, Lightbulb, Building, GraduationCap, Rss, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import { motion, AnimatePresence } from 'framer-motion';
import XLogo from '../assets/XThreat_icon_primary_white_to_gradient.svg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleMouseEnter = (item: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActive(item);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(null);
    }, 300);
  };

  const NavItem = ({ title, content, width }: { title: string; content: React.ReactNode; width: string }) => {
    const [isHovered, setIsHovered] = React.useState(false);
  
    return (
      <li
        onMouseEnter={() => {
          handleMouseEnter(title);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          setIsHovered(false);
        }}
        className="relative"
      >
        <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
          <span className="mr-1">{title}</span>
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
        {active === title && (
          // <div className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 ${width} bg-black/90 backdrop-blur-3xl border border-gray-700 p-6 rounded-md shadow-lg`}>
          //   {content}
          // </div>
        <div className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 ${width} bg-black backdrop-blur-lg border border-gray-700 p-6 rounded-md shadow-lg`}>
          {content}
        </div>

        )}
      </li>
    );
  };
  
  const SolutionsContent = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="pl-3 border-r  border-gray-600">
        <h3 className="text-white font-semibold text-l mb-2">Security Solutions</h3>
        <ul className="mt-3 space-y-4">
          <li><Link href="/phishing-awareness" className="text-gray-300 text-l hover:text-white flex items-center"><Target className="mr-2 h-4 w-4" />Phishing Awareness</Link></li>
          <li><Link href="/security-awareness" className="text-gray-300 hover:text-white flex items-center"><ShieldCheck className="mr-2 h-4 w-4" />Security Awareness</Link></li>
          <li><Link href="/role-based-training" className="text-gray-300 hover:text-white flex items-center"><Users className="mr-2 h-4 w-4" />Role Based Training</Link></li>
          <li><Link href="/weak-points" className="text-gray-300 hover:text-white flex items-center"><Crosshair className="mr-2 h-4 w-4" />Weak Points</Link></li>
          <li><Link href="/custom-trainings" className="text-gray-300 hover:text-white flex items-center"><Wrench className="mr-2 h-4 w-4" />Custom Trainings</Link></li>
        </ul>
      </div>
      <div className="pr-4">
        <h3 className="text-white font-semibold mb-2">Featured</h3>
        <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-md">
          <h4 className="text-white font-semibold mb-2">New: AI-Powered Training</h4>
          <p className="text-gray-400 text-sm mb-2">Enhance your security with our latest AI-driven training modules.</p>
          <Link href="/ai-training" className="text-gray-300 hover:text-gray-100 flex flex-row text-base">Learn more <ChevronRight className="h-4 w-4 mt-[5px]"/></Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed right-0 font-sans left-0 top-0 py-4 px-5 bg-black/40 backdrop-blur-lg z-[100]">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          <div className="flex items-center gap-1 md:gap-[2px]">
            <Link href="/">
              <Image
                src={XLogo}
                alt="X Logo"
                width={16}
                height={16}
                className="w-[25px]  h-[25px]  md:w-[25px] md:h-[25px]"
              />
            </Link>
            <p className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
              <Link href="/">Threat</Link>
            </p>
          </div>

          {isDesktop ? (
            <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex items-center gap-8 list-none">
                <NavItem title="Solutions" content={<SolutionsContent />} width="w-[550px]" />
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
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
              <Link href="/log-in" className="text-gray-400 hover:text-white">
                Log in
              </Link>
              <Link
                href="https://cal.com/xthreat/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 h-9 text-base w-full sm:w-fit rounded-xl border-[#4D4D4D] bg-gray-300 hover:bg-gray-100 group transition-all flex items-center justify-center gap-4"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                  Book a demo
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


// "use client";

// import { MenuIcon } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect, useRef } from "react";
// import MobileMenu from "./MobileMenu";
// import { Menu, MenuItem, ProductItem, HoveredLink } from "@/components/global/ui/navbarMenu";

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





