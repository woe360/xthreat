'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { AnimatedBeamDemo } from './AnimatedBeamDemo';
import { AnimatedListDemo } from './AnimatedListDemo';
import { MarqueeDemo } from './MarqueeDemo';
import { OrbitingCirclesDemo } from './OrbitingCirclesDemo';
import { CardDemo } from './CardDemo';

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
  const x = useTransform(scrollYProgress, [0.7, 1], ["0%", isEven ? "-100%" : "100%"]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);

  return (
    <div className="flex justify-center w-full">
      <motion.div
        ref={ref}
        style={{
          x: useSpring(x, { stiffness: 300, damping: 30 }),
          opacity: useSpring(opacity, { stiffness: 300, damping: 30 }),
          scale: useSpring(scale, { stiffness: 300, damping: 30 }),
        }}
        className="flex flex-col md:flex-row items-center border-gray-800 rounded-xl p-4 md:p-8 max-w-[1400px] w-full mb-8"
      >
        {isEven ? (
          <>
            <div className="w-full md:w-1/2 p-4 md:p-8 order-2 md:order-1">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl text-right font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">{title}</h2>
                <p className="text-lg md:text-lg text-gray-400 text-right mb-6">{description}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-start items-center order-1 md:order-2 mb-4 md:mb-0">
              {renderVisual(title, icon)}
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 flex justify-end items-center order-1 mb-4 md:mb-0">
              {renderVisual(title, icon)}
            </div>
            <div className="w-full md:w-1/2 p-4 md:p-8 order-2">
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl text-left font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">{title}</h2>
                <p className="text-lg md:text-lg text-left text-gray-400 mb-6">{description}</p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};