// 'use client'
// import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
// import CyberSecurityGrid from "@/components/global/CyberSecurityGrid";
// import HowWeOperate from "@/components/global/HowWeOperate";
// import { Products } from "@/components/global/Products";
// import { BentoGrid, BentoGridItem } from "@/components/global/bento-grid";
// import { BentoGridThirdDemo } from "@/components/global/bentosas";
// import { ContainerScroll } from "@/components/global/container-scroll-animation";
// import Footer from "@/components/global/footer";
// import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
// import { LampComponent } from "@/components/global/lamp";
// import Navbar from "@/components/global/navbar";
// import StatisticsHack from "@/components/global/statistics";
// import { Button } from "@/components/ui/button";
// import { clients } from "@/lib/constant";
// import { CheckIcon, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import React, { useState, createContext } from 'react';
// import Link from 'next/link';
// import { StickyScroll } from "@/components/ui/StickyScroll";
// import { StickyScrollRevealDemo } from "@/components/global/StickyScrollReveal";
// import WhatsNewCta from "@/components/global/ui/whatsNewCta";
// import { motion } from 'framer-motion';

// export default function Home() {

//   return (
//     <main >
//       <Navbar />
//             <section className="min-h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
//               <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
//               <div className="flex flex-col md:pt-0 w-full items-center">
//                 <ContainerScroll
//                   titleComponent={
//                     <div className="flex items-center flex-col w-full">
//                       <motion.button
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-sans font-normal leading-6 text-white inline-block"
//                       >
//                         <span className="absolute inset-0 overflow-hidden rounded-full">
//                           <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//                         </span>
//                         <WhatsNewCta />
//                         <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-30" />
//                       </motion.button>
//                       <motion.h1
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.2 }}
//                         className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold"
//                       >
//                         Evade cyber attacks beforehand
//                       </motion.h1>
//                       <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.4 }}
//                         className="text-xl md:text-2xl text-center text-neutral-400 mt-4"
//                       >
//                         Interactive cybersecurity awareness training platform, designed to ensure real-world application
//                       </motion.p>
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.6 }}
//                         className="flex justify-center gap-4 mt-8 mb-12"
//                       >
//                         <Link href="/tryQuiz" passHref>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-4 py-2 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                           >
//                             <span className="bg-clip-text inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                               Try quiz <ChevronRight className="mt-1 ml-1" color="black"/>
//                             </span>
//                           </motion.button>
//                         </Link>
//                         {/* <Button
//                           size={'lg'}
//                           className="p-6 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                         >
//                           <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//                             See Demo ↓
//                           </span>
//                         </Button> */}
//                       </motion.div>
//                     </div>
//                   }
//                 />
//               </div>
//             </section>

//       <section className="flex flex-col relative z-20 mt-[100px] m-auto flex-wrap items-center justify-center">
//           <div>
//             <StatisticsHack />
//           </div>
//       </section>
      
//       <section className=" flex flex-col relative z-20 mt-[120px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-6xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//             Products
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//         Explore the Core Features and Advantages of Our Security Training Solutions</h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <Products />
//         </div>
//       </section>

//       <section className=" flex flex-col relative z-20 mt-[120px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-6xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//             How it works
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[3rem] text-gray-400 text-center font-sans ">
//         All we really want is to make CISO happy, this is how we are going to achieve it</h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           {/* <HowWeOperate /> */}
//           <StickyScrollRevealDemo />
//         </div>
//       </section>


//       <section className=" flex flex-col relative z-20 mt-[150px] m-auto flex-wrap items-center justify-center">
//         <h2 className="text-4xl md:text-6xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//             Features
//         </h2>
//         <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
//         Explore the Core Features and Advantages of Our Security Training Solutions</h3>
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <BentoGridThirdDemo />
//         </div>
//       </section>        

//         <section className="mt-[5rem] mb-[5rem]">
//           <h2 className="text-4xl pb-10 md:text-6xl mb-[2rem] pt-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//             Prepare for tomorrow
//           </h2>
//           <div className="flex justify-center gap-4 mt-8 mb-12 ml-6 mr-6"> 
//             <Button
//               size={'lg'}
//               className="p-6 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#fff] hover:bg-transparent group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-600 duration-500"
//               >
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-white goup-hover:to-black">
//                 Get Started
//               </span>
//             </Button>
//             <Button
//               size={'lg'}
//               className="p-6 mb-8 md:mb-10 sm:w-fit h-9 text-2xl w-full rounded-xl bg-transparent border-t-2 hover:bg-zinc-800 text-white "
//               >
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
//                 Contact
//               </span>
//             </Button>
//           </div>
//         </section>
//         <Footer />
//     </main>
//   );
// }


'use client'
import CyberSecurityGrid from "@/app/(landing-page)/(main)/components/CyberSecurityGrid";
// import { Products } from "@/app/(landing-page)/(main)/Products";
import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
// import { BentoGridThirdDemo } from "@/app/(landing-page)/(main)/bentosas";
// import { ContainerScroll } from "@/app/(landing-page)/(main)/container-scroll-animation";
import Footer from "@/app/(landing-page)/navigation/footer";
import Navbar from "@/app/(landing-page)/navigation/navbar";
// import StatisticsHack from "@/app/(landing-page)/(main)/statistics";
// import { Button } from "@/components/ui/button";
import { clients } from "@/lib/constant";
import { CheckIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState, createContext } from 'react';
import Link from 'next/link';
// import { StickyScroll } from "@/components/ui/StickyScroll";
// import { StickyScrollRevealDemo } from "@/components/unused/StickyScrollReveal";
import WhatsNewCta from "@/components/global/ui/whatsNewCta";
import { motion } from 'framer-motion';
import { ContainerScroll } from "./components/container-scroll-animation";
import { Products } from "./components/Products";
import { BentoGridThirdDemo } from "./components/bentosas";
import StatisticsHack from "./components/statistics";
import { Button } from "@/components/global/ui/button";

export default function Home() {
  // via-[#333348]

  return (
    <main className="relative">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via-[#34344e] to-[#000] z-[-1]"></div>
      <Navbar />
      <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_70%)]"></div>
        <div className="flex flex-col md:pt-0 w-full items-center">
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
                  {/* <WhatsNewCta /> */}
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-30" />
                </motion.button>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold"
                >
                  Evade cyber attacks beforehand
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xl md:text-2xl text-center text-neutral-400 mt-4"
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
                      className="px-4 py-2 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                    >
                      <span className="bg-clip-text inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                        Try quiz <ChevronRight className="mt-1 ml-1" color="black"/>
                      </span>
                    </motion.button>
                  </Link>
                  {/* <Button
                    size={'lg'}
                    className="p-6 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                      See Demo ↓
                    </span>
                  </Button> */}
                </motion.div>
              </div>
            }
          />
        </div>
      </section>

      <section className="flex flex-col relative z-20 mt-[100px] m-auto flex-wrap items-center justify-center">
        <div>
          <StatisticsHack />
        </div>
      </section>
      
      <section className="flex flex-col relative z-20 mt-[120px] m-auto flex-wrap items-center justify-center">
        <h2 className="text-4xl md:text-6xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
          Products
        </h2>
        <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
          Explore the Core Features and Advantages of Our Security Training Solutions
        </h3>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Products />
        </div>
      </section>

      <section className="flex flex-col relative z-20 mt-[150px] m-auto flex-wrap items-center justify-center">
        <h2 className="text-4xl md:text-6xl mb-[1rem] text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
          Features
        </h2>
        <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
          Explore the Core Features and Advantages of Our Security Training Solutions
        </h3>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <BentoGridThirdDemo />
        </div>
      </section>        

      <section className="mt-[5rem] mb-[5rem]">
        <h2 className="text-4xl md:text-6xl mb-[2rem] pt-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
          Prepare for tomorrow
        </h2>
        <h3 className="text-xl md:text-2xl mb-[4rem] text-gray-400 text-center font-sans ">
          Before its too late
        </h3>
        <div className="flex justify-center gap-4 mt-8 mb-12 ml-6 mr-6"> 
          <Button
            size={'lg'}
            className="p-6 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#fff] hover:bg-transparent group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-600 duration-500"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-white goup-hover:to-black">
              Get Started
            </span>
          </Button>
          <Button
            size={'lg'}
            className="p-6 mb-8 md:mb-10 sm:w-fit h-9 text-2xl w-full rounded-xl bg-transparent border-t-2 hover:bg-zinc-800 text-white "
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-300  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
              Contact
            </span>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}





//achuienas gradient: <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
//<div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />




// 'use client'

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import Navbar from '@/components/global/navbar';
// import Footer from '@/components/global/footer';
// import { ContainerScroll } from '@/components/global/container-scroll-animation';
// import WhatsNewCta from '@/components/global/ui/whatsNewCta';
// import StatisticsHack from '@/components/global/statistics';
// import { Products } from '@/components/global/Products';
// import { StickyScrollRevealDemo } from '@/components/global/StickyScrollReveal';
// import { BentoGridThirdDemo } from '@/components/global/bentosas';
// import { Accordion } from '@/components/global/ui/accordion';
// import { CardStack } from '@/components/global/ui/cardStack';

// const cybersecurityTips = [
//   { id: 1, tip: 'Use strong, unique passwords for each account' },
//   { id: 2, tip: 'Enable two-factor authentication wherever possible' },
//   { id: 3, tip: 'Keep your software and operating systems up to date' },
//   { id: 4, tip: 'Be cautious of phishing emails and suspicious links' },
//   { id: 5, tip: 'Use a reputable antivirus software and keep it updated' },
// ];

// const frequentlyAskedQuestions = [
//   {
//     question: 'What makes your cybersecurity training unique?',
//     answer: 'Our training combines interactive simulations, real-world scenarios, and adaptive learning to provide a personalized and engaging experience for each participant.',
//   },
//   {
//     question: 'How often should my team undergo cybersecurity training?',
//     answer: 'We recommend conducting training sessions quarterly, with ongoing micro-learning modules in between to reinforce key concepts and address emerging threats.',
//   },
//   {
//     question: 'Can you customize the training content for our specific industry?',
//     answer: 'Absolutely! We tailor our training modules to address the unique challenges and compliance requirements of your industry, ensuring relevance and maximum impact.',
//   },
//   {
//     question: 'How do you measure the effectiveness of the training?',
//     answer: 'We use a combination of pre and post-training assessments, simulated phishing tests, and ongoing performance metrics to gauge improvement and identify areas for further focus.',
//   },
// ];

// export default function Home() {
//   return (
//     <main className="bg-black text-white">
//       <Navbar />
      
//       {/* Hero Section */}
//       <section className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center">
//         <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
//         <ContainerScroll
          // titleComponent={
          //   <div className="flex items-center flex-col w-full z-10">
          //     <motion.div
          //       initial={{ opacity: 0, y: 20 }}
          //       animate={{ opacity: 1, y: 0 }}
          //       transition={{ duration: 0.5 }}
          //     >
          //       <WhatsNewCta />
          //     </motion.div>
          //     <motion.h1
          //       className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mt-8"
          //       initial={{ opacity: 0, y: 20 }}
          //       animate={{ opacity: 1, y: 0 }}
          //       transition={{ duration: 0.5, delay: 0.2 }}
          //     >
          //       Evade cyber attacks beforehand
          //     </motion.h1>
          //     <motion.p
          //       className="text-xl md:text-2xl text-center text-neutral-400 mt-4 max-w-2xl"
          //       initial={{ opacity: 0, y: 20 }}
          //       animate={{ opacity: 1, y: 0 }}
          //       transition={{ duration: 0.5, delay: 0.4 }}
          //     >
          //       Interactive cybersecurity awareness training platform, designed to ensure real-world application for enterprises
          //     </motion.p>
          //     <motion.div
          //       className="flex justify-center gap-4 mt-8"
          //       initial={{ opacity: 0, y: 20 }}
          //       animate={{ opacity: 1, y: 0 }}
          //       transition={{ duration: 0.5, delay: 0.6 }}
          //     >
          //       <Link href="/tryQuiz" passHref>
          //         <Button size="lg" className="bg-white text-black hover:bg-neutral-200 transition-all duration-300">
          //           Try Quiz →
          //         </Button>
          //       </Link>
          //       <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300">
          //         See Demo
          //       </Button>
          //     </motion.div>
          //   </div>
          // }
//         />
//       </section>

//       {/* Statistics Section */}
//       <section className="py-20 bg-neutral-900">
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 font-bold">
//             Cybersecurity by the Numbers
//           </h2>
//           <StatisticsHack />
//         </div>
//       </section>

//       {/* Products Section */}
//       <section className="py-20 bg-neutral-950">
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
//             Our Solutions
//           </h2>
//           <p className="text-xl text-center text-neutral-400 mb-12">
//             Cutting-edge tools to fortify your digital defenses
//           </p>
//           <Products />
//         </div>
//       </section>

//       {/* How it Works Section */}
//       <section className="py-20 bg-neutral-900">
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 font-bold">
//             How It Works
//           </h2>
//           <p className="text-xl text-center text-neutral-400 mb-12">
//             Our proven process for enhancing your organization's security posture
//           </p>
//           <StickyScrollRevealDemo />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-neutral-950">
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 font-bold">
//             Key Features
//           </h2>
//           <p className="text-xl text-center text-neutral-400 mb-12">
//             Explore the advantages that set our security training apart
//           </p>
//           <BentoGridThirdDemo />
//         </div>
//       </section>

//       {/* Cybersecurity Tips Section */}
//       <section className="py-20 bg-neutral-900">
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400 font-bold">
//             Essential Cybersecurity Tips
//           </h2>
//           <CardStack items={cybersecurityTips} />
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-neutral-950">
//         <div className="container mx-auto">
//           <h2 className="text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 font-bold">
//             Frequently Asked Questions
//           </h2>
//           <div className="max-w-2xl mx-auto">
//             <Accordion items={frequentlyAskedQuestions} />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-b from-neutral-900 to-black">
//         <div className="container mx-auto text-center">
//           <h2 className="text-4xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
//             Prepare for Tomorrow's Threats Today
//           </h2>
//           <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
//             Don't wait for a breach to take action. Strengthen your organization's cyber defenses now.
//           </p>
//           <div className="flex justify-center gap-4">
//             <Button size="lg" className="bg-white text-black hover:bg-neutral-200 transition-all duration-300">
//               Get Started
//             </Button>
//             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300">
//               Contact Us
//             </Button>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }