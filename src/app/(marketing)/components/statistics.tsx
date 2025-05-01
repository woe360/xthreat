'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatisticItem {
  value: number;
  unit?: string;
  text: string;
  specialCount?: boolean;
  source: string;
}

const statisticsData: StatisticItem[] = [
  {
    value: 68,
    unit: '%',
    text: "of data breaches involve human error",
    source: "Cybersecurity Ventures, 2024"
  },
  {
    value: 1,
    unit: '/ 3',
    text: "Share of breaches that involved shadow data",
    specialCount: true,
    source: "Dark Reading Report, 2024"
  },
  {
    value: 62,
    unit: '%',
    text: "of cyberattacks happen with stolen credentials",
    source: "Verizon DBIR, 2024"
  },
  {
    value: 4.46,
    unit: 'M',
    text: "the global average cost of a data breach in 2024",
    specialCount: true,
    source: "IBM Data Breach Report, 2024"
  },
];

interface StatisticItemContentProps {
  stat: StatisticItem;
}

const StatisticItemContent: React.FC<StatisticItemContentProps> = ({ stat }) => {
  const variants: Variants = {
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
    <motion.span
      variants={variants}
      className="text-7xl font-light text-white flex items-baseline"
    >
      {stat.unit === 'M' && <span className="text-4xl mr-1">€</span>}
      <span>{stat.value}</span>
      {stat.unit && (
        <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-6xl' : 'text-4xl'}`}>
          {stat.unit === '/ 3' ? (
            <>
              <span>&nbsp;</span>/
              <span className="inline-block ml-2">3</span>
            </>
          ) : stat.unit}
        </span>
      )}
    </motion.span>
  );
};

interface StatisticItemProps {
  stat: StatisticItem;
  index: number;
  totalItems: number;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ stat, index, totalItems }) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      className="flex flex-col w-full py-8"
    >
      <div className="text-gray-500 uppercase text-xs tracking-wider mb-6">
        {stat.text === "of data breaches involve human error" && "HUMAN ERROR CAUSED BREACHES"}
        {stat.text === "Share of breaches that involved shadow data" && "SHADOW DATA"}
        {stat.text === "of cyberattacks happen with stolen credentials" && "STOLEN CREDENTIALS"}
        {stat.text === "the global average cost of a data breach in 2024" && "AVERAGE COST OF BREACH"}
      </div>
      <StatisticItemContent stat={stat} />
      <p className="text-xs text-gray-500 mt-4">{stat.source}</p>
    </motion.div>
  );
};

const StatisticsHack: React.FC = () => {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
      <div className="lg:w-2/5 order-1 flex flex-col justify-center">
        <h2 className="text-5xl ml-10 font-sans font-normal mb-6 hidden lg:block">
          Reality
        </h2>
        {/* <p className="text-xl ml-10 text-white/80 mb-6">
          Human error is cybersecurity's greatest vulnerability—we fix that.
        </p> */}
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="flex-1 order-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {statisticsData.map((stat, index) => (
            <StatisticItem
              key={index}
              stat={stat}
              index={index}
              totalItems={statisticsData.length}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsHack;