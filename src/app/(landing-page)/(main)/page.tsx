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
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ContainerScroll } from "./components/container-scroll-animation";
import { Products } from "./components/Products";
import { BentoGridThirdDemo } from "./components/bentosas";
import StatisticsHack from "./components/statistics";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

import { Shield, CheckCircle, Users, Brain, Trophy, Briefcase, Target, Mail, Lock } from 'lucide-react';
import { AnimatedList } from "@/components/ui/animated-list";
import { AnimatedListDemo } from "./components/AnimatedListDemo";
import { AnimatedBeamDemo } from "./components/AnimatedBeamDemo";
import { MarqueeDemo } from "./components/MarqueeDemo";
import { OrbitingCirclesDemo } from "./components/OrbitingCirclesDemo";
import { GlobeDemo } from "./components/GlobeDemo";
import { CardDemo } from "./components/CardDemo";
import { FeaturesSectionDemo } from "./components/FeaturesSectionDemo";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How is the training content updated to reflect the latest cybersecurity threats?",
      answer: "We continuously monitor the cybersecurity landscape and update our training modules regularly to ensure your team is learning the latest techniques to prevent emerging threats."
    },
    {
      question: "Can we track the progress of our employees?",
      answer: "Yes, our platform provides detailed reporting and analytics that allow you to track employee progress, assess learning outcomes, and identify areas for improvement."
    },
    {
      question: "Is the platform customizable for different roles within our company?",
      answer: "Absolutely! Our training can be customized to fit different roles and departments, ensuring each employee receives relevant training based on their responsibilities."
    },
    {
      question: "How secure is your platform?",
      answer: "Security is our top priority. We follow industry best practices, including encryption and regular security audits, to protect your data and ensure the platform is secure."
    },
    {
      question: "Do you provide support during the implementation process?",
      answer: "Yes, we offer full support during implementation, including onboarding assistance and ongoing technical support to ensure a smooth transition and high engagement."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl lg:text-5xl mb-2 text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
          Frequently Asked Questions
        </h2>
        <h3 className="text-lg md:text-2xl mb-12 mx-7 font-serif italic text-gray-400 text-center font-light">
          Get answers to common questions about our cybersecurity training solutions
        </h3>
        <div className="flex justify-center">
          <div className="max-w-5xl lg:w-4/5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-5"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-900/20 border border-gray-800 rounded-lg overflow-hidden"
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-white" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFAQ === index && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <motion.div
                          variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
                          transition={{ duration: 0.2 }}
                          className="p-4 pt-0 text-gray-400"
                        >
                          {faq.answer}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
      </div>
    </section>
  );
};


const FeatureSection = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="text-gray-300 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);


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
          <CardDemo/>
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
                    {/* Left gradient
                    <div className="absolute top-0 left-0 w-1/5 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        Right gradient
        <div className="absolute top-0 right-0 w-1/5 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
         */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#000000] via--[#000] to-[#000000] z-[-1]"></div>
      <Navbar />
      <section className="min-h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#000_70%)]"></div>
        <div className="flex flex-col md:pt-0 w-full items-center">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col w-full">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/0 via-red-500/90 to-red-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                        <Link className="flex flex-row"
                          href="/ai-training">
                          AI enhanced training <ChevronRight className="mt-[7px] ml-1" size={12}/>
                        </Link>
                    </div>
                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-orange-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-40" />
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

        <section className="flex flex-col max-w-6xl relative z-20 md:mt-[30px] lg:mt-[32px] mb-10 mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl mb-2 pb-1 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
              Why we exist
            </h2>
            <p className="text-xl mb-14 mx-10 text-center font-serif italic text-gray-400">
              Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
            </p>
            <div className="border bg-gray-900/30 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-xl mx-8 border-gray-800 p-9"><StatisticsHack /></div>
            
          </div>
        </section>

        <section className="flex flex-col relative z-20 mt-[100px] sm:mt-[150px] m-auto flex-wrap items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
          Features
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl mb-14 font-serif italic mx-7 text-gray-400 text-center">
          Core Features and Advantages of Our Security Training Solutions
        </h3>
        <div className="w-full px-4 h-2/3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <FeaturesSectionDemo />
        </div>
      </section>        


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

      {/* <section className="flex flex-col relative z-20 mt-[100px] sm:mt-[150px] m-auto flex-wrap items-center justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
          Features
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl mb-14 font-serif italic mx-7 text-gray-400 text-center">
          Core Features and Advantages of Our Security Training Solutions
        </h3>
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <BentoGridThirdDemo />
        </div>
      </section>      */}

      <FAQSection/>  


      <section className="py-16 md:py-24 mb-10 bg-transparent">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl lg:text-5xl mb-2 text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                Prepare for Tomorrow
              </h2>
              <h3 className="text-lg md:text-2xl mb-8 mx-7 font-serif italic text-gray-400 text-center font-light">
              Every 39 seconds, a business is attacked.
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
