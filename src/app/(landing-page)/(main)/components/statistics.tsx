// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// type StatisticItem = {
//   value: number;
//   unit?: string;
//   text: string;
//   specialCount?: boolean;
//   source: string;
// };

// const statisticsData: StatisticItem[] = [
//   {
//     value: 68,
//     unit: '%',
//     text: "of data breaches involve human error",
//     source: "Cybersecurity Ventures, 2024"
//   },
//   {
//     value: 1,
//     unit: '/ 3',
//     text: "Share of breaches that involved shadow data",
//     specialCount: true,
//     source: "Dark Reading Report, 2024"
//   },
//   {
//     value: 62,
//     unit: '%',
//     text: "of cyberattacks happen with stolen credentials",
//     source: "Verizon DBIR, 2024"
//   },
//   {
//     value: 4.46,
//     unit: 'M',
//     text: "the global average cost of a data breach in 2024",
//     specialCount: true,
//     source: "IBM Data Breach Report, 2024"
//   },
// ];

// const useGlitchingCountUp = (end: number, duration: number = 2, specialCount: boolean = false) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number | null = null;
//     let animationFrameId: number;
//     const animationDuration = duration * 1000;

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
//       const percentage = Math.min(progress / animationDuration, 1);
      
//       let currentValue;
//       if (specialCount && end % 1 !== 0) {
//         currentValue = Number((percentage * end).toFixed(2));
//       } else {
//         currentValue = Math.floor(percentage * end);
//       }

//       // Add glitching effect
//       if (Math.random() < 0.1) {
//         currentValue = Math.floor(Math.random() * end);
//       }

//       setCount(currentValue);

//       if (percentage < 1) {
//         animationFrameId = requestAnimationFrame(animate);
//       } else {
//         setCount(end); // Ensure we end up at the exact target value
//       }
//     };

//     animationFrameId = requestAnimationFrame(animate);

//     return () => {
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, [end, duration, specialCount]);

//   return count;
// };

// const StatisticItemContent: React.FC<{
//   stat: StatisticItem;
// }> = ({ stat }) => {
//   const count = useGlitchingCountUp(stat.value, 3, stat.specialCount);
//   const divisorValue = useGlitchingCountUp(3, 3);

//   return (
//     <motion.span
//       variants={{
//         hidden: { opacity: 0 },
//         visible: {
//           opacity: 1,
//           transition: {
//             duration: 1.5,
//             ease: 'easeInOut',
//           },
//         },
//       }}
//       className="text-5xl font-light text-gray-300 flex items-baseline"
//     >
//       {stat.unit === 'M' && <span className="text-3xl mr-1">€</span>}
//       <span>{count}</span>
//       {stat.unit && (
//         <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-5xl' : 'text-3xl'}`}>
//           {stat.unit === '/ 3' ? (
//             <>
//               <span>&nbsp;</span>/
//               <span className="inline-block ml-2">{divisorValue}</span>
//             </>
//           ) : stat.unit}
//         </span>
//       )}
//     </motion.span>
//   );
// };

// const StatisticItem: React.FC<{
//   stat: StatisticItem;
//   index: number;
//   totalItems: number;
// }> = ({ stat, index, totalItems }) => {
//   return (
//     <motion.div
//       variants={{
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0 },
//       }}
//       className={`flex flex-col items-center w-full md:w-1/4 p-6
//                 ${index !== 0 ? 'md:border-l border-gray-800' : ''}
//                 ${index !== totalItems - 1 ? 'border-b md:border-b-0 border-gray-700' : ''}`}
//     >
//       <StatisticItemContent stat={stat} />
//       <p className="text-lg text-gray-400 mt-2">{stat.text}</p>
//       <p className="text-xs text-gray-500 mt-3">{stat.source}</p>
//     </motion.div>
//   );
// };

// const StatisticsHack: React.FC = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start('visible');
//     }
//   }, [controls, inView]);

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0 },
//         visible: {
//           opacity: 1,
//           transition: {
//             staggerChildren: 0.3,
//           },
//         },
//       }}
//       className="max-w-[1152px] mx-auto text-center"
//     >
//       <div className="flex flex-col md:flex-row justify-center items-stretch">
//         {statisticsData.map((stat, index) => (
//           <StatisticItem
//             key={index}
//             stat={stat}
//             index={index}
//             totalItems={statisticsData.length}
//           />
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;


'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variant, Variants } from 'framer-motion';
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

const useGlitchingCountUp = (end: number, duration: number = 2, specialCount: boolean = false): number => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    const animationDuration = duration * 1000;

    const animate = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / animationDuration, 1);
      
      let currentValue: number;
      if (specialCount && end % 1 !== 0) {
        currentValue = Number((percentage * end).toFixed(2));
      } else {
        currentValue = Math.floor(percentage * end);
      }

      // Add glitching effect
      if (Math.random() < 0.1) {
        currentValue = Math.floor(Math.random() * end);
      }

      setCount(currentValue);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end up at the exact target value
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, specialCount]);

  return count;
};

interface StatisticItemContentProps {
  stat: StatisticItem;
}

const StatisticItemContent: React.FC<StatisticItemContentProps> = ({ stat }) => {
  const count = useGlitchingCountUp(stat.value, 3, stat.specialCount);
  const divisorValue = useGlitchingCountUp(3, 3);

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
      className="text-5xl font-light text-gray-300 flex items-baseline"
    >
      {stat.unit === 'M' && <span className="text-3xl mr-1">€</span>}
      <span>{count}</span>
      {stat.unit && (
        <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-5xl' : 'text-3xl'}`}>
          {stat.unit === '/ 3' ? (
            <>
              <span>&nbsp;</span>/
              <span className="inline-block ml-2">{divisorValue}</span>
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
      className={`flex flex-col items-center w-full md:w-1/4 p-6
                ${index !== 0 ? 'md:border-l border-gray-800' : ''}
                ${index !== totalItems - 1 ? 'border-b md:border-b-0 border-gray-700' : ''}`}
    >
      <StatisticItemContent stat={stat} />
      <p className="text-lg text-gray-400 mt-2">{stat.text}</p>
      <p className="text-xs text-gray-500 mt-3">{stat.source}</p>
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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="max-w-[1152px] mx-auto text-center"
    >
      <div className="flex flex-col md:flex-row justify-center items-stretch">
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
  );
};

export default StatisticsHack;