'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { AnimatedBeamDemo } from './AnimatedBeamDemo';
import { AnimatedListDemo } from './AnimatedListDemo';
import { MarqueeDemo } from './MarqueeDemo';
import { OrbitingCirclesDemo } from './OrbitingCirclesDemo';
import { CardDemo } from './CardDemo';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface AnimatedSolutionSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imagePosition: 'left' | 'right';
  link: string;
  index: number;
}

export const products = [
  {
    title: "Phishing Awareness",
    description: "Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense.",
    imagePosition: "left" as const,
    link: "/phishing-awareness"
  },
  {
    title: "Security Awareness",
    description: "Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors.",
    imagePosition: "right" as const,
    link: "/security-awareness"
  },
  {
    title: "Role Based Training",
    description: "Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences.",
    imagePosition: "left" as const,
    link: "/role-based-training"
  },
  {
    title: "Weak Points",
    description: "Identify and address vulnerabilities in your organization's security practices, strengthening your overall defense strategy.",
    imagePosition: "right" as const,
    link: "/weak-points"
  },
  {
    title: "Custom Trainings",
    description: "Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals.",
    imagePosition: "left" as const,
    link: "/custom-trainings"
  }
];

const renderVisual = (title: string, icon?: React.ReactNode) => {
  if (title === "Phishing Awareness") {
    return (
      <div className="w-full h-[300px] overflow-hidden flex items-center justify-center">
        <AnimatedListDemo className="w-full h-full" />
      </div>
    );
  } else if (title === "Security Awareness") {
    return (
      <div className="w-full h-[300px] overflow-hidden flex items-center justify-center">
        <AnimatedBeamDemo />
      </div>
    );
  } else if (title === "Role Based Training") {
    return (
      <div className="w-full h-[300px] overflow-hidden flex items-center justify-center">
        <MarqueeDemo />
      </div>
    );
  } else if (title === "Weak Points") {
    return (
      <div className="w-full h-[300px] overflow-hidden flex items-center justify-center">
        <OrbitingCirclesDemo />
      </div>
    );
  } else if (title === "Custom Trainings") {
    return (
      <div className="w-full h-[300px] overflow-hidden flex items-center justify-center">
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

export const AnimatedSolutionSection: React.FC<AnimatedSolutionSectionProps> = ({ 
  title, 
  description, 
  icon, 
  imagePosition, 
  link, 
  index 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  const x = useTransform(scrollYProgress, [0.7, 1], ["0%", isEven ? "-5%" : "5%"]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.95]);

  return (
    <div className="flex justify-center w-full px-4">
      <motion.div
        ref={ref}
        style={{
          x: useSpring(x, { stiffness: 100, damping: 30 }),
          opacity: useSpring(opacity, { stiffness: 100, damping: 30 }),
          scale: useSpring(scale, { stiffness: 100, damping: 30 }),
        }}
        className={`grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl ${index === products.length - 1 ? '' : 'border-gray-600/40 border-b-0'}`}
      >
        {isEven ? (
          <>
            <div className={`p-12 flex flex-col justify-center min-h-[400px] ${index === products.length - 1 ? '' : 'border-b border-gray-600/40'}`}>
              <div>
                <h2 className="text-3xl md:text-4xl font-normal mb-6 text-white">{title}</h2>
                <p className="text-lg text-gray-400 leading-relaxed">{description}</p>
              </div>
              {/* <Link 
                href={link}
                className="inline-flex items-center mt-8 text-white/80 hover:text-white transition-colors group"
              >
                Learn more
                <ChevronRight className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link> */}
            </div>
            <div className={`flex items-center justify-center p-16 min-h-[400px] ${index === products.length - 1 ? '' : 'border-b border-gray-600/40'}`}>
              {renderVisual(title, icon)}
            </div>
          </>
        ) : (
          <>
            <div className={`flex items-center justify-center p-16 min-h-[400px] ${index === products.length - 1 ? '' : 'border-b border-gray-600/40'}`}>
              {renderVisual(title, icon)}
            </div>
            <div className={`p-16 flex flex-col justify-center min-h-[400px] ${index === products.length - 1 ? '' : 'border-b border-gray-600/40'}`}>
              <div>
                <h2 className="text-3xl md:text-4xl font-normal mb-6 text-white">{title}</h2>
                <p className="text-lg text-gray-400 leading-relaxed">{description}</p>
              </div>
              {/* <Link 
                href={link}
                className="inline-flex items-center mt-8 text-white/80 hover:text-white transition-colors group"
              >
                Learn more
                <ChevronRight className="ml-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link> */}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};


