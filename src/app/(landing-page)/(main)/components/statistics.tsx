'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type Props = {};

const statisticsData = [
  {
    percentage: 74,
    text: "of data breaches involve human error",
  },
  {
    percentage: 80,
    text: "of cyberattacks happen with stolen credentials",
  },
  {
    percentage: 95,
    text: "of cybersecurity breaches are due to human mistakes",
  },
];

const useCountUp = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = end / (duration * 60);

    const counting = () => {
      start += step;
      if (start >= end) {
        setCount(end);
        return;
      }
      setCount(Math.ceil(start));
      requestAnimationFrame(counting);
    };

    requestAnimationFrame(counting);
  }, [end, duration]);

  return count;
};

const StatisticsHack: React.FC<Props> = (props: Props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const percentageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="max-w-5xl mx-auto text-center"
    >
      <h2 className="text-4xl md:text-6xl pb-1 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
            Why we exist
      </h2>
      <p className="text-xl mb-8 text-gray-400">
      Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
      </p>
      <div className="flex flex-col font-sans md:flex-row justify-center items-stretch md:gap-x-8 gap-y-4">
        {statisticsData.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center md:w-1/3 h-full"
          >
            <motion.span
              variants={percentageVariants}
              className="text-6xl font-light text-white-500"
            >
              {useCountUp(stat.percentage)}%
            </motion.span>
            <p className="text-md text-gray-400 mt-2">{stat.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatisticsHack;
