// 'use client'
// import CyberSecurityGrid from "@/app/(landing-page)/(main)/components/CyberSecurityGrid";
// import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
// import Footer from "@/app/(landing-page)/navigation/footer";
// import Navbar from "@/app/(landing-page)/navigation/navbar";
// import { clients } from "@/lib/constant";
// import { CheckIcon, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import React, { useState, createContext } from 'react';
// import Link from 'next/link';
// import WhatsNewCta from "@/components/global/ui/whatsNewCta";
// import { motion } from 'framer-motion';
// import { ContainerScroll } from "./components/container-scroll-animation";
// import { Products } from "./components/Products";
// import { BentoGridThirdDemo } from "./components/bentosas";
// import StatisticsHack from "./components/statistics";
// import { Button } from "@/components/global/ui/button";

// import { Shield, CheckCircle, Users, Brain, Trophy, Briefcase, Target, Mail, Lock } from 'lucide-react';

// const FeatureSection = ({ icon, title, description }) => (
//   <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="text-gray-300 mb-4">{icon}</div>
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// const SolutionSection = ({ title, description, icon, imagePosition }) => (
//   <div className={`flex items-center my-16 ${imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
//     <div className="w-1/2 p-8">
//       <h2 className="text-3xl font-bold mb-4">{title}</h2>
//       <p className="text-xl text-gray-300 mb-6">{description}</p>
//       <a href="#" className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
//         Learn more
//       </a>
//     </div>
//     <div className="w-1/2 flex justify-center">
//       <div className="relative">
//         <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-xl"></div>
//         <div className="relative bg-gray-800 p-8 rounded-full">
//           {icon}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default function Home() {
//   // via-[#333348]

//   return (
//     <main className="relative">
//       <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via-[#34344e] to-[#000] z-[-1]"></div>
//       <Navbar />
//       <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
//         <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_70%)]"></div>
//         <div className="flex flex-col md:pt-0 w-full items-center">
//           <ContainerScroll
//             titleComponent={
//               <div className="flex items-center flex-col w-full">
//                 <motion.button
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-sans font-normal leading-6 text-white inline-block"
//                 >
//                   <span className="absolute inset-0 overflow-hidden rounded-full">
//                     <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//                   </span>
//                   {/* <WhatsNewCta /> */}
//                   <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-30" />
//                 </motion.button>
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold"
//                 >
//                   Evade cyber attacks beforehand
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.4 }}
//                   className="text-xl md:text-2xl text-center text-neutral-400 mt-4"
//                 >
//                   Interactive cybersecurity awareness training platform, designed to ensure real world application & retention
//                 </motion.p>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.6 }}
//                   className="flex justify-center gap-4 mt-8 mb-12"
//                 >
//                   <Link href="/tryQuiz" passHref>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-4 py-2 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                     >
//                       <span className="bg-clip-text inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                         Try quiz <ChevronRight className="mt-1 ml-1" color="black"/>
//                       </span>
//                     </motion.button>
//                   </Link>
//                   {/* <Button
//                     size={'lg'}
//                     className="p-6 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                   >
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//                       See Demo ↓
//                     </span>
//                   </Button> */}
//                 </motion.div>
//               </div>
//             }
//           />
//         </div>
//       </section>

//       <section className="flex flex-col relative z-20 mt-[100px] m-auto flex-wrap items-center justify-center">
//         <div>
//           <StatisticsHack />
//         </div>
//       </section>
      
//       <section className="flex flex-col relative z-20 mt-[120px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Products
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <SolutionSection
//             title="Phishing Awareness"
//             description="Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense."
//             icon={<Mail size={64} className="text-blue-500" />}
//             imagePosition="left"
//           />
//           <SolutionSection
//             title="Security Awareness"
//             description="Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors."
//             icon={<Lock size={64} className="text-blue-500" />}
//             imagePosition="right"
//           />
//           <SolutionSection
//             title="Role-based Training"
//             description="Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences."
//             icon={<Briefcase size={64} className="text-blue-500" />}
//             imagePosition="left"
//           />
//           <SolutionSection
//             title="Weak Points"
//             description="Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals."
//             icon={<Target size={64} className="text-blue-500" />}
//             imagePosition="right"
//           />
//           <SolutionSection
//             title="Custom Trainings"
//             description="Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals."
//             icon={<Target size={64} className="text-blue-500" />}
//             imagePosition="left"
//           />
//         {/* <div className="w-full px-4 sm:px-6 lg:px-8">
//           <Products />
//         </div> */}
//       </section>

//       <section className="flex flex-col relative z-20 mt-[150px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Features
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <BentoGridThirdDemo />
//         </div>
//       </section>        

//       <section className="mt-[5rem] mb-[5rem]">
//         <h2 className="text-4xl md:text-5xl mb-[2rem] pt-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Prepare for tomorrow
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Before its too late
//         </h3>
//         <div className="flex justify-center gap-4 mt-8 mb-12 ml-6 mr-6"> 
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#fff] hover:bg-transparent group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-600 duration-500"
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-white goup-hover:to-black">
//               Get Started
//             </span>
//           </Button>
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 sm:w-fit h-9 text-2xl w-full rounded-xl bg-transparent border-t-2 hover:bg-zinc-800 text-white "
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//               Contact
//             </span>
//           </Button>
//         </div>
//       </section>
//       <Footer />
//     </main>
//   );
// }




// 'use client'
// import CyberSecurityGrid from "@/app/(landing-page)/(main)/components/CyberSecurityGrid";
// import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
// import Footer from "@/app/(landing-page)/navigation/footer";
// import Navbar from "@/app/(landing-page)/navigation/navbar";
// import { clients } from "@/lib/constant";
// import { CheckIcon, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import React, { useState, createContext } from 'react';
// import Link from 'next/link';
// import WhatsNewCta from "@/components/global/ui/whatsNewCta";
// import { motion } from 'framer-motion';
// import { ContainerScroll } from "./components/container-scroll-animation";
// import { Products } from "./components/Products";
// import { BentoGridThirdDemo } from "./components/bentosas";
// import StatisticsHack from "./components/statistics";
// import { Button } from "@/components/global/ui/button";

// import { Shield, CheckCircle, Users, Brain, Trophy, Briefcase, Target, Mail, Lock } from 'lucide-react';

// const FeatureSection = ({ icon, title, description }) => (
//   <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="text-gray-300 mb-4">{icon}</div>
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// const SolutionSection = ({ title, description, icon, imagePosition, link }) => (
//   <div className={`flex items-center my-16 ${imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
//     <div className="w-1/2 p-8">
//       <h2 className="text-3xl font-bold mb-4">{title}</h2>
//       <p className="text-xl text-gray-300 mb-6">{description}</p>
//       <Link href={link} className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
//         Learn more
//       </Link>
//     </div>
//     <div className="w-1/2 flex justify-center">
//       <div className="relative">
//         <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-xl"></div>
//         <div className="relative bg-gray-800 p-8 rounded-full">
//           {icon}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default function Home() {

//   return (
//     <main className="relative">
//       <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via-[#34344e] to-[#000] z-[-1]"></div>
//       <Navbar />
//       <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
//         <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_70%)]"></div>
//         <div className="flex flex-col md:pt-0 w-full items-center">
//           <ContainerScroll
//             titleComponent={
//               <div className="flex items-center flex-col w-full">
//                 <motion.button
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-sans font-normal leading-6 text-white inline-block"
//                 >
//                   <span className="absolute inset-0 overflow-hidden rounded-full">
//                     <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//                   </span>
//                   {/* <WhatsNewCta /> */}
//                   <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-30" />
//                 </motion.button>
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold"
//                 >
//                   Evade cyber attacks beforehand
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.4 }}
//                   className="text-xl md:text-2xl text-center text-neutral-400 mt-4"
//                 >
//                   Interactive cybersecurity awareness training platform, designed to ensure real world application & retention
//                 </motion.p>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.6 }}
//                   className="flex justify-center gap-4 mt-8 mb-12"
//                 >
//                   <Link href="/tryQuiz" passHref>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-4 py-2 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                     >
//                       <span className="bg-clip-text inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                         Try quiz <ChevronRight className="mt-1 ml-1" color="black"/>
//                       </span>
//                     </motion.button>
//                   </Link>
//                   {/* <Button
//                     size={'lg'}
//                     className="p-6 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                   >
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//                       See Demo ↓
//                     </span>
//                   </Button> */}
//                 </motion.div>
//               </div>
//             }
//           />
//         </div>
//       </section>

//       <section className="flex flex-col relative z-20 mt-[100px] m-auto flex-wrap items-center justify-center">
//         <div>
//           <StatisticsHack />
//         </div>
//       </section>
      
//       <section className="flex flex-col relative z-20 mt-[120px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Products
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <SolutionSection
//             title="Phishing Awareness"
//             description="Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense."
//             icon={<Mail size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/phishing-awareness"
//           />
//           <SolutionSection
//             title="Security Awareness"
//             description="Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors."
//             icon={<Lock size={64} className="text-blue-500" />}
//             imagePosition="right"
//             link="/security-awareness"
//           />
//           <SolutionSection
//             title="Role-based Training"
//             description="Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences."
//             icon={<Briefcase size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/role-based-training"
//           />
//           <SolutionSection
//             title="Weak Points"
//             description="Identify and address vulnerabilities in your organization's security practices, strengthening your overall defense strategy."
//             icon={<Target size={64} className="text-blue-500" />}
//             imagePosition="right"
//             link="/weak-points"
//           />
//           <SolutionSection
//             title="Custom Trainings"
//             description="Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals."
//             icon={<Users size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/custom-trainings"
//           />
//         </div>
//       </section>

//       <section className="flex flex-col relative z-20 mt-[150px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Features
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <BentoGridThirdDemo />
//         </div>
//       </section>        

//       <section className="mt-[5rem] mb-[5rem]">
//         <h2 className="text-4xl md:text-5xl mb-[2rem] pt-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Prepare for tomorrow
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Before its too late
//         </h3>
//         <div className="flex justify-center gap-4 mt-8 mb-12 ml-6 mr-6"> 
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#fff] hover:bg-transparent group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-600 duration-500"
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-white goup-hover:to-black">
//               Get Started
//             </span>
//           </Button>
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 sm:w-fit h-9 text-2xl w-full rounded-xl bg-transparent border-t-2 hover:bg-zinc-800 text-white "
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//               Contact
//             </span>
//           </Button>
//         </div>
//       </section>
//       <Footer />
//     </main>
//   );
// }



// 'use client'
// import CyberSecurityGrid from "@/app/(landing-page)/(main)/components/CyberSecurityGrid";
// import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
// import Footer from "@/app/(landing-page)/navigation/footer";
// import Navbar from "@/app/(landing-page)/navigation/navbar";
// import { clients } from "@/lib/constant";
// import { CheckIcon, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import React, { useState, createContext } from 'react';
// import Link from 'next/link';
// import WhatsNewCta from "@/components/global/ui/whatsNewCta";
// import { motion } from 'framer-motion';
// import { ContainerScroll } from "./components/container-scroll-animation";
// import { Products } from "./components/Products";
// import { BentoGridThirdDemo } from "./components/bentosas";
// import StatisticsHack from "./components/statistics";
// import { Button } from "@/components/global/ui/button";

// import { Shield, CheckCircle, Users, Brain, Trophy, Briefcase, Target, Mail, Lock } from 'lucide-react';

// const FeatureSection = ({ icon, title, description }) => (
//   <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="text-gray-300 mb-4">{icon}</div>
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// const SolutionSection = ({ title, description, icon, imagePosition, link }) => (
//   <div className={`flex items-center my-8 bg-black border border-gray-800 rounded-xl p-8 ${imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
//     <div className="w-1/2 p-8">
//       <h2 className="text-3xl font-bold mb-4">{title}</h2>
//       <p className="text-xl text-gray-300 mb-6">{description}</p>
//       <Link href={link} className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
//         Learn more
//       </Link>
//     </div>
//     <div className="w-1/2 flex justify-center">
//       <div className="relative">
//         <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-xl"></div>
//         <div className="relative bg-gray-800 p-8 rounded-full">
//           {icon}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default function Home() {

//   return (
//     <main className="relative">
//       <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via-[#34344e] to-[#000] z-[-1]"></div>
//       <Navbar />
//       <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
//         <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_70%)]"></div>
//         <div className="flex flex-col md:pt-0 w-full items-center">
//           <ContainerScroll
//             titleComponent={
//               <div className="flex items-center flex-col w-full">
//                 <motion.button
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-sans font-normal leading-6 text-white inline-block"
//                 >
//                   <span className="absolute inset-0 overflow-hidden rounded-full">
//                     <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//                   </span>
//                   {/* <WhatsNewCta /> */}
//                   <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-30" />
//                 </motion.button>
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold"
//                 >
//                   Evade cyber attacks beforehand
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.4 }}
//                   className="text-xl md:text-2xl text-center text-neutral-400 mt-4"
//                 >
//                   Interactive cybersecurity awareness training platform, designed to ensure real world application & retention
//                 </motion.p>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.6 }}
//                   className="flex justify-center gap-4 mt-8 mb-12"
//                 >
//                   <Link href="/tryQuiz" passHref>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-4 py-2 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                     >
//                       <span className="bg-clip-text inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                         Try quiz <ChevronRight className="mt-1 ml-1" color="black"/>
//                       </span>
//                     </motion.button>
//                   </Link>
//                 </motion.div>
//               </div>
//             }
//           />
//         </div>
//       </section>

//       <section className="flex flex-col relative z-20 mt-[100px] m-auto flex-wrap items-center justify-center">
//         <div>
//           <StatisticsHack />
//         </div>
//       </section>
      
//       <section className="flex flex-col relative z-20 mt-[120px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Products
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
//           <SolutionSection
//             title="Phishing Awareness"
//             description="Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense."
//             icon={<Mail size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/phishing-awareness"
//           />
//           <SolutionSection
//             title="Security Awareness"
//             description="Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors."
//             icon={<Lock size={64} className="text-blue-500" />}
//             imagePosition="right"
//             link="/security-awareness"
//           />
//           <SolutionSection
//             title="Role-based Training"
//             description="Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences."
//             icon={<Briefcase size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/role-based-training"
//           />
//           <SolutionSection
//             title="Weak Points"
//             description="Identify and address vulnerabilities in your organization's security practices, strengthening your overall defense strategy."
//             icon={<Target size={64} className="text-blue-500" />}
//             imagePosition="right"
//             link="/weak-points"
//           />
//           <SolutionSection
//             title="Custom Trainings"
//             description="Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals."
//             icon={<Users size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/custom-trainings"
//           />
//         </div>
//       </section>

//       <section className="flex flex-col relative z-20 mt-[150px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Features
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <BentoGridThirdDemo />
//         </div>
//       </section>        

//       <section className="mt-[5rem] mb-[5rem]">
//         <h2 className="text-4xl md:text-5xl mb-[2rem] pt-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Prepare for tomorrow
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Before its too late
//         </h3>
//         <div className="flex justify-center gap-4 mt-8 mb-12 ml-6 mr-6"> 
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#fff] hover:bg-transparent group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-600 duration-500"
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-white goup-hover:to-black">
//               Get Started
//             </span>
//           </Button>
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 sm:w-fit h-9 text-2xl w-full rounded-xl bg-transparent border-t-2 hover:bg-zinc-800 text-white "
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//               Contact
//             </span>
//           </Button>
//         </div>
//       </section>
//       <Footer />
//     </main>
//   );
// }



// 'use client'
// import CyberSecurityGrid from "@/app/(landing-page)/(main)/components/CyberSecurityGrid";
// import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
// import Footer from "@/app/(landing-page)/navigation/footer";
// import Navbar from "@/app/(landing-page)/navigation/navbar";
// import { clients } from "@/lib/constant";
// import { CheckIcon, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import React, { useState, createContext } from 'react';
// import Link from 'next/link';
// import WhatsNewCta from "@/components/global/ui/whatsNewCta";
// import { motion } from 'framer-motion';
// import { ContainerScroll } from "./components/container-scroll-animation";
// import { Products } from "./components/Products";
// import { BentoGridThirdDemo } from "./components/bentosas";
// import StatisticsHack from "./components/statistics";
// import { Button } from "@/components/global/ui/button";

// import { Shield, CheckCircle, Users, Brain, Trophy, Briefcase, Target, Mail, Lock } from 'lucide-react';

// const FeatureSection = ({ icon, title, description }) => (
//   <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="text-gray-300 mb-4">{icon}</div>
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// const SolutionSection = ({ title, description, icon, imagePosition, link }) => (
//   <div className={`flex items-center my-8 bg-black border border-gray-800 rounded-xl p-8 ${imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
//     <div className="w-1/2 p-8">
//       <h2 className="text-3xl font-bold mb-4">{title}</h2>
//       <p className="text-xl text-gray-300 mb-6">{description}</p>
//       <Link href={link} className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
//         Learn more
//       </Link>
//     </div>
//     <div className="w-1/2 flex justify-center">
//       <div className="relative">
//         <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-xl"></div>
//         <div className="relative bg-gray-800 p-8 rounded-full">
//           {icon}
//         </div>
//       </div>
//     </div>
//   </div>
// );


// export default function Home() {
//   return (
//     <main className="relative">
//       <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#051028] via--[#0D2B1D] to-[#000000] z-[-1]"></div>
//       <Navbar />
//       <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
//         <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#1113_70%)]"></div>
//         <div className="flex flex-col md:pt-0 w-full items-center">
//           <ContainerScroll
//             titleComponent={
//               <div className="flex items-center flex-col w-full">
//                 <motion.button
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-sans font-normal leading-6 text-white inline-block"
//                 >
//                   <span className="absolute inset-0 overflow-hidden rounded-full">
//                     <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//                   </span>
//                   <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-30" />
//                 </motion.button>
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold"
//                 >
//                   Evade cyber attacks beforehand
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.4 }}
//                   className="text-xl md:text-2xl text-center text-neutral-400 mt-4"
//                 >
//                   Interactive cybersecurity awareness training platform, designed to ensure real world application & retention
//                 </motion.p>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.6 }}
//                   className="flex justify-center gap-4 mt-8 mb-12"
//                 >
//                   <Link href="/tryQuiz" passHref>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-4 py-2 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                     >
//                       <span className="bg-clip-text ml-[4px] inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                         Try quiz <ChevronRight className="mt-[6px]" color="black"/>
//                       </span>
//                     </motion.button>
//                   </Link>
//                 </motion.div>
//               </div>
//             }
//           />
//         </div>
//       </section>

//       <section className="flex flex-col relative z-20 mt-[100px] m-auto flex-wrap items-center justify-center">
//         <div>
//           <StatisticsHack />
//         </div>
//       </section>
      
//       <section className="flex flex-col relative z-20 mt-[120px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Products
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
//           <SolutionSection
//             title="Phishing Awareness"
//             description="Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense."
//             icon={<Mail size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/phishing-awareness"
//           />
//           <SolutionSection
//             title="Security Awareness"
//             description="Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors."
//             icon={<Lock size={64} className="text-blue-500" />}
//             imagePosition="right"
//             link="/security-awareness"
//           />
//           <SolutionSection
//             title="Role-based Training"
//             description="Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences."
//             icon={<Briefcase size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/role-based-training"
//           />
//           <SolutionSection
//             title="Weak Points"
//             description="Identify and address vulnerabilities in your organization's security practices, strengthening your overall defense strategy."
//             icon={<Target size={64} className="text-blue-500" />}
//             imagePosition="right"
//             link="/weak-points"
//           />
//           <SolutionSection
//             title="Custom Trainings"
//             description="Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals."
//             icon={<Users size={64} className="text-blue-500" />}
//             imagePosition="left"
//             link="/custom-trainings"
//           />
//         </div>
//       </section>

//       <section className="flex flex-col relative z-20 mt-[150px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-5xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Features
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Explore the Core Features and Advantages of Our Security Training Solutions
//         </h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <BentoGridThirdDemo />
//         </div>
//       </section>        

//       <section className="mt-[5rem] mb-[5rem]">
//         <h2 className="text-4xl md:text-5xl mb-[2rem] pt-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//           Prepare for tomorrow
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//           Before its too late
//         </h3>
//         <div className="flex justify-center gap-4 mt-8 mb-12 ml-6 mr-6"> 
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#fff] hover:bg-transparent group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-600 duration-500"
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-white goup-hover:to-black">
//               Get Started
//             </span>
//           </Button>
//           <Button
//             size={'lg'}
//             className="p-6 mb-8 md:mb-10 sm:w-fit h-9 text-2xl w-full rounded-xl bg-transparent border-t-2 hover:bg-zinc-800 text-white "
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//               Contact
//             </span>
//           </Button>
//         </div>
//       </section>
//       <Footer />
//     </main>
//   );
// }



'use client'
import CyberSecurityGrid from "@/app/(landing-page)/(main)/components/CyberSecurityGrid";
import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
import Footer from "@/app/(landing-page)/navigation/footer";
import Navbar from "@/app/(landing-page)/navigation/navbar";
import { clients } from "@/lib/constant";
import { CheckIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, createContext, useRef, useEffect } from 'react';
import Link from 'next/link';
import WhatsNewCta from "@/components/ui/whatsNewCta";
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ContainerScroll } from "./components/container-scroll-animation";
import { Products } from "./components/Products";
import { BentoGridThirdDemo } from "./components/bentosas";
import StatisticsHack from "./components/statistics";
import { Button } from "@/components/ui/button";

import { Shield, CheckCircle, Users, Brain, Trophy, Briefcase, Target, Mail, Lock } from 'lucide-react';
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedListDemo } from "./components/AnimatedListDemo";
import { AnimatedBeamDemo } from "./components/AnimatedBeamDemo";
import { MarqueeDemo } from "./components/MarqueeDemo";
import { OrbitingCirclesDemo } from "./components/OrbitingCirclesDemo";
import { GlobeDemo } from "./components/GlobeDemo";

const FeatureSection = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="text-gray-300 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// const AnimatedSolutionSection = ({ title, description, icon, imagePosition, link, index }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   });

//   const isEven = index % 2 === 0;
//   const x = useTransform(scrollYProgress, [0.7, 1], ["0%", isEven ? "-100%" : "100%"]);
//   const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{
//         x: useSpring(x, { stiffness: 300, damping: 30 }),
//         opacity: useSpring(opacity, { stiffness: 300, damping: 30 }),
//         scale: useSpring(scale, { stiffness: 300, damping: 30 }),
//       }}
//       className={`flex flex-col md:flex-row items-center bg-black border border-gray-800 rounded-xl p-4 md:p-8 w-full max-w-4xl mx-auto mb-8`}
//     >
//       <div className="w-full md:w-1/2 p-4 md:p-8 order-2 md:order-1">
//         <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{title}</h2>
//         <p className="text-lg md:text-xl text-gray-300 mb-6">{description}</p>
//         {/* <Link href={link} className="inline-block bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded transition duration-300">
//           Learn more
//         </Link> */}
//         <Link href={link} className="inline-block bg-gray-300 hover:bg-gray-200 font-bold py-2 px-4 rounded transition duration-300">
//         <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-800">
//           Learn more
//         </span>
//       </Link>
//       </div>

//       <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mb-4 md:mb-0 overflow-hidden">
//         {title === "Phishing Awareness" ? (
//           <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
//             <AnimatedListDemo className="w-full h-full" />
//           </div>
//         ) : title === "Security Awareness" ? (
//           <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
//             <AnimatedBeamDemo />
//           </div>
//         ) : (
//           <div className="relative">
//             <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-xl"></div>
//             <div className="relative bg-gray-800 p-6 md:p-8 rounded-full">
//               {icon}
//             </div>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

const AnimatedSolutionSection = ({ title, description, icon, imagePosition, link, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  const x = useTransform(scrollYProgress, [0.7, 1], ["0%", isEven ? "-100%" : "100%"]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);

  const renderVisual = (title, icon) => {
    if (title === "Phishing Awareness") {
      return (
        <div className="w-full h-[300px] md:h-[310px] overflow-hidden">
          <AnimatedListDemo className="w-full h-full" />
        </div>
      );
    } else if (title === "Security Awareness") {
      return (
        <div className="w-full h-[300px] md:h-[300px] overflow-hidden">
          <AnimatedBeamDemo />
        </div>
      );
    } else if (title === "Role Based Training") {
      return (
        <div className="w-full h-[300px] md:h-[300px] overflow-hidden">
          <MarqueeDemo />
        </div>
      );
    } else if (title === "Weak Points") {
      return (
        <div className="w-full h-[300px] md:h-[300px] overflow-hidden">
          <OrbitingCirclesDemo />
        </div>
      );
    } else if (title === "Custom Trainings") {
      return (
        <div className="w-full h-[300px] md:h-[300px] overflow-hidden">
          <GlobeDemo />
        </div>
      );
    } else {
      return (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-xl"></div>
          <div className="relative bg-gray-800 p-6 md:p-8 rounded-full">
            {icon}
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x: useSpring(x, { stiffness: 300, damping: 30 }),
        opacity: useSpring(opacity, { stiffness: 300, damping: 30 }),
        scale: useSpring(scale, { stiffness: 300, damping: 30 }),
      }}
      className={`flex flex-col md:flex-row items-center bg-black border border-gray-800 rounded-xl p-4 md:p-8 w-full max-w-6xl mx-auto mb-8`}
    >
      {isEven ? (
        <>
          <div className="w-full md:w-1/2 p-4 md:p-8 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">{title}</h2>
            <p className="text-lg md:text-lg text-gray-400 mb-6">{description}</p>
            <Link href={link} className="inline-block bg-gray-300 hover:bg-gray-200 font-bold py-2 px-4 rounded transition duration-300">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-800">
                Learn more
              </span>
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mb-4 md:mb-0 overflow-hidden">
            {renderVisual(title, icon)}
          </div>
        </>
      ) : (
        <>
          <div className="w-full md:w-1/2 flex justify-center order-1 mb-4 md:mb-0 overflow-hidden">
            {renderVisual(title, icon)}
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-8 order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">{title}</h2>
            <p className="text-lg md:text-lg text-gray-400 mb-6">{description}</p>
            <Link href={link} className="inline-block bg-gray-300 hover:bg-gray-200 font-bold py-2 px-4 rounded transition duration-300">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-800">
                Learn more
              </span>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default function Home() {
  const products = [
    {
      title: "Phishing Awareness",
      description: "Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense.",
      imagePosition: "left",
      link: "/phishing-awareness"
    },
    {
      title: "Security Awareness",
      description: "Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors.",
      imagePosition: "right",
      link: "/security-awareness"
    },
    {
      title: "Role Based Training",
      description: "Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences.",
      icon: <Briefcase size={64} className="text-blue-500" />,
      imagePosition: "left",
      link: "/role-based-training"
    },
    {
      title: "Weak Points",
      description: "Identify and address vulnerabilities in your organization's security practices, strengthening your overall defense strategy.",
      icon: <Target size={64} className="text-blue-500" />,
      imagePosition: "right",
      link: "/weak-points"
    },
    {
      title: "Custom Trainings",
      description: "Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals.",
      icon: <Users size={64} className="text-blue-500" />,
      imagePosition: "left",
      link: "/custom-trainings"
    }
  ];

  return (
    <main className="relative">
                    {/* Left gradient */}
                    <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        {/* Right gradient */}
        <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via--[#000] to-[#000000] z-[-1]"></div>
      <Navbar />
      <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#000_70%)]"></div>
        <div className="flex flex-col md:pt-0 w-full items-center">
                        {/* Left gradient */}
                        <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        {/* Right gradient */}
        <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col w-full">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-sans font-normal leading-6 text-white inline-block"
                >
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-30" />
                </motion.button>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-b pb-2 from-white to-neutral-600 font-sans font-bold text-center"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-b pb-2 from-white to-neutral-600">Evade</span> <span className="whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b pb-2 from-white to-neutral-600">cyber attacks </span> <span className="italic font-light font-serif">beforehand</span> 
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl text-center text-neutral-400 mt-4 mx-3"
                >
                  Interactive cybersecurity awareness training platform, designed to ensure real world application & retention
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-center gap-4 mt-8 mb-12"
                >
                  <Link href="/tryQuiz" passHref>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 mb-8 md:mb-10 text-xl sm:text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                    >
                      <span className="bg-clip-text ml-[4px] font-serif italic inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                        Try quiz <ChevronRight className="mt-[6px]" color="black"/>
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            }
          />
        </div>
      </section>

      {/* <section className="flex flex-col border max-w-6xl rounded-xl border-gray-800 relative z-20 mt-[100px] m-auto flex-wrap items-center justify-center">
        <div>
        <h2 className="text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
        Why we exist
      </h2>
      <p className="text-xl mb-8 mx-10 font-serif italic text-gray-400">
        Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
      </p>
          <StatisticsHack />
        </div>
      </section> */}

        <section className="flex flex-col max-w-6xl relative z-20 md:mt-[30px] lg:mt-[32px] mb-10 mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl mb-2 pb-1 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
              Why we exist
            </h2>
            <p className="text-xl mb-14 mx-10 text-center font-serif italic text-gray-400">
              Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
            </p>
            <div className="border rounded-xl mx-8 border-gray-800 p-9"><StatisticsHack /></div>
            
          </div>
        </section>
      
      {/* <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
            Solutions
          </h2>
          <p className="text-lg sm:text-xl md:text-xl mb-16 text-gray-400 text-center">
          Elevate Your Cyber Defense with Our Targeted Training Solutions
          </p>
          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {products.map((product, index) => (
              <AnimatedSolutionSection
                key={index}
                {...product}
                index={index}
              />
            ))}
          </div>
          <AnimatedListDemo/>
        </div>
      </section> */}

      {/* <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
            Solutions
          </h2>
          <p className="text-lg sm:text-xl md:text-xl mb-16 text-gray-400 text-center">
          Elevate Your Cyber Defense with Our Targeted Training Solutions
          </p>
          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {products.map((product, index) => (
              <AnimatedSolutionSection
                key={index}
                {...product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section> */}

      <section className="pt-28 overflow-hidden">
        <div className="container mx-auto px-8 max-w-6xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
            Solutions
          </h2>
          <p className="text-lg sm:text-xl md:text-xl mb-14 font-serif italic text-gray-400 text-center">
          Elevate Your Cyber Defense with Our Targeted Training Solutions
          </p>
          <div className="space-y-12 sm:space-y-20 md:space-y-25">
            {products.map((product, index) => (
              <AnimatedSolutionSection
                key={index}
                {...product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col relative z-20 mt-[100px] sm:mt-[150px] m-auto flex-wrap items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
          Features
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl mb-14 font-serif italic mx-7 text-gray-400 text-center">
          Core Features and Advantages of Our Security Training Solutions
        </h3>
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <BentoGridThirdDemo />
        </div>
      </section>        


      <section className="py-16 md:py-24 bg-transparent">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl lg:text-5xl mb-2 text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                Prepare for Tomorrow
              </h2>
              <h3 className="text-lg md:text-2xl mb-8 mx-7 font-serif italic text-gray-400 text-center font-light">
              Cyber attacks don’t wait.
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10">
                <Link 
                  href="/pricing" 
                  className="w-2/3 sm:w-auto px-7 py-3 text-lg font-semibold rounded-xl bg-gray-300 text-black hover:bg-black hover:text-white border hover:border-gray-700 transition-all duration-300 text-center"
                >
                  See Our Plans
                </Link>
                <a 
                  href="/contact" 
                  className="w-2/3 sm:w-auto px-8 py-3 text-lg font-semibold rounded-xl border border-gray-700 text-white hover:bg-white hover:text-black transition-all duration-300 text-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
      </section>
      

      <Footer />
    </main>
  );
}



//achuienas gradient: <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
//<div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
//my lovely gradient: [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_70%)]
