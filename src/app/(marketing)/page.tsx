'use client'
import Footer from "@/app/(marketing)/navigation/footer";
import Navbar from "@/app/(marketing)/navigation/navbar";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ContainerScroll } from "./components/container-scroll-animation";
import { BentoGridThirdDemo } from "./components/bentosas";
import StatisticsHack from "./components/statistics";
import { ArrowRightIcon, ChevronDown, ChevronRight, Users, Briefcase, Target } from 'lucide-react';
import { AnimatedSolutionSection } from "./components/AnimatedSolutionSection";
import CookieConsent from '@/app/(marketing)/cookie-consent/CookieConsent';
import DemoSection from './components/DemoSection';
import FAQSection from './components/FAQSection';
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

// Type Definitions
// interface FAQ {
//   question: string;
//   answer: string;
// }

interface Product {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imagePosition: 'left' | 'right';
  link: string;
}


// const FAQSection: React.FC = () => {
//   const [openFAQ, setOpenFAQ] = useState<number | null>(null);
// 
//   const toggleFAQ = (index: number) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };
// 
//   const faqs: FAQ[] = [
//     {
//       question: "How is the training content updated to reflect the latest cybersecurity threats?",
//       answer: "We continuously monitor the cybersecurity landscape and update our training modules regularly to ensure your team is learning the latest techniques to prevent emerging threats."
//     },
//     {
//       question: "Can we track the progress of our employees?",
//       answer: "Yes, our platform provides detailed reporting and analytics that allow you to track employee progress, assess learning outcomes, and identify areas for improvement."
//     },
//     {
//       question: "Is the platform customizable for different roles within our company?",
//       answer: "Absolutely! Our training can be customized to fit different roles and departments, ensuring each employee receives relevant training based on their responsibilities."
//     },
//     {
//       question: "How secure is your platform?",
//       answer: "Security is our top priority. We follow industry best practices, including encryption and regular security audits, to protect your data and ensure the platform is secure."
//     },
//     {
//       question: "Do you provide support during the implementation process?",
//       answer: "Yes, we offer full support during implementation, including onboarding assistance and ongoing technical support to ensure a smooth transition and high engagement."
//     }
//   ];
// 
//   return (
//     <section className="py-16 md:py-24 font-sans bg-transparent px-4">
//       <h2 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-normal">
//         Frequently Asked Questions
//       </h2>
//       <h3 className="text-lg sm:text-xl md:text-xl mb-14 text-gray-400 text-center">
//         Get answers to common questions about our cybersecurity training solutions
//       </h3>
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="space-y-5"
//         >
//           {faqs.map((faq, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="border-t border-gray-800 overflow-hidden"
//             >
//               <button
//                 className="flex justify-between items-center w-full my-1 mt-6 text-left"
//                 onClick={() => toggleFAQ(index)}
//               >
//                 <span className="text-white">{faq.question}</span>
//                 <motion.div
//                   animate={{ rotate: openFAQ === index ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ChevronDown className="h-5 w-5 text-white" />
//                 </motion.div>
//               </button>
//               <AnimatePresence initial={false}>
//                 {openFAQ === index && (
//                   <motion.div
//                     key="content"
//                     initial="collapsed"
//                     animate="open"
//                     exit="collapsed"
//                     variants={{
//                       open: { opacity: 1, height: "auto" },
//                       collapsed: { opacity: 0, height: 0 }
//                     }}
//                     transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
//                   >
//                     <motion.div
//                       variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
//                       transition={{ duration: 0.2 }}
//                       className="pt-5 text-gray-400"
//                     >
//                       {faq.answer}
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };


const Home: React.FC = () => {
  const products: Product[] = [
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

  // Animation variants
  const defaultAnimation = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <main className="relative">
      <div className="absolute inset-0 min-h-screen w-full bg-[#0b0b0b] z-[-1]"></div>
      <Navbar />
      <CookieConsent />
      <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center justify-center antialiased">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 bg-[#0b0b0b] [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)] z-[-1]"></div>
        <div className="flex flex-col md:pt-0 w-full items-center mt-[100px]">
          {/* <ContainerScroll
            titleComponent={ */}
              <div className="flex items-center flex-col w-full">
                <motion.div
                  variants={defaultAnimation}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
                >
                  <Link
                    href="/pricing"
                    className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,theme(colors.neutral.600)_0%,theme(colors.neutral.400)_50%,theme(colors.neutral.600)_100%)]" />
                    <AnimatedShinyText className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-800 px-3 py-1 text-sm font-medium text-neutral-300 backdrop-blur-3xl">
                      <span className="flex font-sans text-black font-normal flex-row items-center">
                        Get 20% off with a yearly plan! <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                      </span>
                    </AnimatedShinyText>
                  </Link>
                </motion.div>
                <motion.h1
                  variants={defaultAnimation}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl mt-8  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-b pb-2 from-white to-neutral-600 font-sans font-bold text-center"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-b pb-2 from-white font-light to-neutral-600">Evade</span> <span className="whitespace-nowrap font-light bg-clip-text text-transparent bg-gradient-to-b pb-2  from-white to-neutral-600">Cyber Attacks </span> <span className="font-light">Beforehand</span>
                </motion.h1>
                <motion.p
                  variants={defaultAnimation}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl text-center text-neutral-400 mt-4 mx-3 max-w-3xl"
                >
                  Interactive cybersecurity awareness training platform, designed to ensure real world application & retention
                </motion.p>

                <motion.div
                  variants={defaultAnimation}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-center gap-4 mt-8 mb-12"
                >
                  <Link href="/try-app" passHref>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-7 py-2 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors mb-8 md:mb-10"
                    >
                      <span className="ml-[4px] font-sans font-normal inline-flex text-white md:text-center ">
                        Try App
                      </span>
                    </motion.button>
                  </Link>
                  <Link href="/pricing" passHref>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-7 bg-white text-black py-2 rounded-full font-medium hover:bg-white/90 transition-colors mb-8 md:mb-10"
                    >
                      <span className="ml-[4px] font-sans font-normal inline-flex text-black md:text-center ">
                        Free Trial
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            {/* } /> */}
        </div>
      </section>

      <section className="min-h-[95vh] flex flex-col relative z-20 justify-center border-b border-white/10">
        
        {/* <div className="w-full px-6 sm:px-6 lg:px-8 max-w-[1400px] mx-auto"> */}
          <StatisticsHack />
        {/* </div> */}
      </section>

      <section className="min-h-[80vh] flex flex-col relative z-20 justify-center border-b border-white/10  py-32">
        <DemoSection />
      </section>

      {/* <DemoSection /> */}

      <section className="min-h-screen flex flex-col relative z-20 justify-center border-b border-white/10 py-32">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 max-w-[1400px]">
          <h2 className="text-5xl text-start px-7 mb-16 bg-clip-text text-white">
            Solutions
          </h2>
          {products.map((product, index) => (
            <AnimatedSolutionSection
              key={index}
              {...product}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* <section className="min-h-screen flex flex-col relative z-20 justify-center py-32">
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
          Features
        </h2>
        <h3 className="text-lg sm:text-xl md:text-xl mb-14 font-serif italic mx-7 text-gray-400 text-center">
          Core Features and Advantages of Our Security Training Solutions
        </h3>
        <div className="w-full px-6 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <BentoGridThirdDemo />
        </div>
      </section>    */}

      <section className="min-h-[80vh] py-32 flex flex-col justify-center font-sans border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-2 max-w-[1400px]">
          <FAQSection />
        </div>
      </section>

      {/* CTA Section */}
      <div className="py-20 px-6 sm:px-6 lg:px-8 mb-40 text-center">
        <div className="pt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-normal mb-6">
            Prepare for Tomorrow
          </h2>
          <p className="text-neutral-400 mb-12 text-lg">
            Every 39 seconds, a business is attacked.
          </p>  
          <div className="space-x-6">
            <Link
              href="/free-trial"
              className="inline-flex items-center px-7 bg-white text-black py-2 rounded-full font-normal hover:bg-white/90 transition-colors"
            >
              Free Trial
            </Link>
            <Link
              href="/try-app"
              className="inline-flex items-center px-7 py-2 border border-white/20 rounded-full font-normal hover:bg-white/10 transition-colors"
            >
              Try App
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Home;