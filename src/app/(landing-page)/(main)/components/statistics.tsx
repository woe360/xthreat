// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// type Props = {};

// const statisticsData = [
//   {
//     percentage: 74,
//     text: "of data breaches involve human error",
//   },
//   {
//     percentage: 80,
//     text: "of cyberattacks happen with stolen credentials",
//   }, //1 in 3
//   // Share of breaches that involved shadow data, showing the proliferation of data is making it harder to track and safeguard.
//   {
//     percentage: 95,
//     text: "of cybersecurity breaches are due to human mistakes",
//   },
//   {
//     percentage: 95,
//     text: "of cybersecurity breaches are due to human mistakes",
//   },
//   // 4.45M
//   // The global average cost of a data breach in 2024—a 10% increase over last year and the highest total ever.
// ];

// const useCountUp = (end: number, duration: number = 2) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const step = end / (duration * 60);

//     const counting = () => {
//       start += step;
//       if (start >= end) {
//         setCount(end);
//         return;
//       }
//       setCount(Math.ceil(start));
//       requestAnimationFrame(counting);
//     };

//     requestAnimationFrame(counting);
//   }, [end, duration]);

//   return count;
// };

// const StatisticsHack: React.FC<Props> = (props: Props) => {
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const percentageVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       className="max-w-5xl mx-auto text-center"
//     >
//       <h2 className="text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//             Why we exist
//       </h2>
//       <p className="text-xl mb-8  mx-10 font-serif italic text-gray-400">
//       Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
//       </p>
//       <div className="flex flex-col mx-9 font-sans md:flex-row justify-center items-stretch md:gap-x-8 gap-y-4">
//         {statisticsData.map((stat, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="flex flex-col items-center md:w-1/3 h-full"
//           >
//             <motion.span
//               variants={percentageVariants}
//               className="text-6xl font-light text-gray-300"
//             >
//               {useCountUp(stat.percentage)}%
//             </motion.span>
//             <p className="text-md text-gray-400 mt-2">{stat.text}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// type StatisticItem = {
//   value: number;
//   unit?: string;
//   text: string;
// };

// const statisticsData: StatisticItem[] = [
//   {
//     value: 74,
//     unit: '%',
//     text: "of data breaches involve human error",
//   },
//   {
//     value: 1,
//     unit: 'in 3',
//     text: "Share of breaches that involved shadow data",
//   },
//   {
//     value: 80,
//     unit: '%',
//     text: "of cyberattacks happen with stolen credentials",
//   },
//   {
//     value: 4.88,
//     unit: 'M',
//     text: "The global average cost of a data breach in 2024",
//   },
// ];

// const useCountUp = (end: number, duration: number = 2) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const step = end / (duration * 60);

//     const counting = () => {
//       start += step;
//       if (start >= end) {
//         setCount(end);
//         return;
//       }
//       setCount(Math.ceil(start));
//       requestAnimationFrame(counting);
//     };

//     requestAnimationFrame(counting);
//   }, [end, duration]);

//   return count;
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const valueVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       className="max-w-5xl mx-auto text-center"
//     >
//       <h2 className="text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//         Why we exist
//       </h2>
//       <p className="text-xl mb-8 mx-10 font-serif italic text-gray-400">
//         Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
//       </p>
//       <div className="flex flex-wrap justify-center items-stretch gap-8">
//         {statisticsData.map((stat, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
//           >
//             <motion.span
//               variants={valueVariants}
//               className="text-5xl font-light text-gray-300 flex items-baseline"
//             >
//               <span>{useCountUp(stat.value)}</span>
//               {stat.unit && <span className="text-3xl ml-1">{stat.unit}</span>}
//             </motion.span>
//             <p className="text-md text-gray-400 mt-2">{stat.text}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// type StatisticItem = {
//   value: number;
//   unit?: string;
//   text: string;
//   specialCount?: boolean;
// };

// const statisticsData: StatisticItem[] = [
//   {
//     value: 74,
//     unit: '%',
//     text: "of data breaches involve human error",
//   },
//   {
//     value: 1,
//     unit: 'in 3',
//     text: "Share of breaches that involved shadow data",
//     specialCount: true,
//   },
//   {
//     value: 80,
//     unit: '%',
//     text: "of cyberattacks happen with stolen credentials",
//   },
//   {
//     value: 4.88,
//     unit: 'M',
//     text: "The global average cost of a data breach in 2024",
//     specialCount: true,
//   },
// ];

// const useCountUp = (end: number, duration: number = 2, specialCount: boolean = false) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number | null = null;
//     const animationDuration = duration * 1000; // Convert to milliseconds

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
//       const percentage = Math.min(progress / animationDuration, 1);
      
//       let currentValue;
//       if (specialCount && end % 1 !== 0) {
//         // For decimal values, use toFixed(2) to keep two decimal places
//         currentValue = Number((percentage * end).toFixed(2));
//       } else {
//         currentValue = Math.floor(percentage * end);
//       }

//       setCount(currentValue);

//       if (percentage < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [end, duration, specialCount]);

//   return count;
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const valueVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       className="max-w-5xl mx-auto text-center"
//     >
//       <h2 className="text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//         Why we exist
//       </h2>
//       <p className="text-xl mb-8 mx-10 font-serif italic text-gray-400">
//         Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
//       </p>
//       <div className="flex flex-wrap justify-center items-stretch gap-8">
//         {statisticsData.map((stat, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
//           >
//             <motion.span
//               variants={valueVariants}
//               className="text-5xl font-light text-gray-300 flex items-baseline"
//             >
//               <span>{useCountUp(stat.value, 2, stat.specialCount)}</span>
//               {stat.unit && (
//                 <span className={`ml-1 ${stat.unit === 'in 3' ? 'text-5xl' : 'text-3xl'}`}>
//                   {stat.unit === 'in 3' ? (
//                     <>in <span className="inline-block">{useCountUp(3, 2)}</span></>
//                   ) : stat.unit}
//                 </span>
//               )}
//             </motion.span>
//             <p className="text-md text-gray-400 mt-2">{stat.text}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// type StatisticItem = {
//   value: number;
//   unit?: string;
//   text: string;
//   specialCount?: boolean;
// };

// const statisticsData: StatisticItem[] = [
//   {
//     value: 74,
//     unit: '%',
//     text: "of data breaches involve human error",
//   },
//   {
//     value: 1,
//     unit: '/ 3',
//     text: "Share of breaches that involved shadow data",
//     specialCount: true,
//   },
//   {
//     value: 80,
//     unit: '%',
//     text: "of cyberattacks happen with stolen credentials",
//   },
//   {
//     value: 4.88,
//     unit: 'M',
//     text: "The global average cost of a data breach in 2024",
//     specialCount: true,
//   },
// ];

// const useCountUp = (end: number, duration: number = 2, specialCount: boolean = false) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number | null = null;
//     const animationDuration = duration * 1000; // Convert to milliseconds

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
//       const percentage = Math.min(progress / animationDuration, 1);
      
//       let currentValue;
//       if (specialCount && end % 1 !== 0) {
//         // For decimal values, use toFixed(2) to keep two decimal places
//         currentValue = Number((percentage * end).toFixed(2));
//       } else {
//         currentValue = Math.floor(percentage * end);
//       }

//       setCount(currentValue);

//       if (percentage < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [end, duration, specialCount]);

//   return count;
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const valueVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       className="max-w-5xl mx-auto text-center"
//     >
//       <h2 className="text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//         Why we exist
//       </h2>
//       <p className="text-xl mb-8 mx-10 font-serif italic text-gray-400">
//         Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
//       </p>
//       <div className="flex flex-wrap justify-center items-stretch gap-8">
//         {statisticsData.map((stat, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
//           >
//             <motion.span
//               variants={valueVariants}
//               className="text-5xl font-light text-gray-300 flex items-baseline"
//             >
//               <span>{useCountUp(stat.value, 2, stat.specialCount)}</span>
//               {stat.unit && (
//                 <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-5xl' : 'text-3xl'}`}>
//                   {stat.unit === '/ 3' ? (
//                     <> / <span className="inline-block">{useCountUp(3, 2)}</span></>
//                   ) : stat.unit}
//                 </span>
//               )}
//             </motion.span>
//             <p className="text-md text-gray-400 mt-2">{stat.text}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// type StatisticItem = {
//   value: number;
//   unit?: string;
//   text: string;
//   specialCount?: boolean;
// };

// const statisticsData: StatisticItem[] = [
//   {
//     value: 74,
//     unit: '%',
//     text: "of data breaches involve human error",
//   },
//   {
//     value: 1,
//     unit: '/ 3',
//     text: "share of breaches that involved shadow data",
//     specialCount: true,
//   },
//   {
//     value: 80,
//     unit: '%',
//     text: "of cyberattacks happen with stolen credentials",
//   },
//   {
//     value: 4.46,
//     unit: 'M',
//     text: "the global average cost of a data breach in 2024",
//     specialCount: true,
//   },
// ];

// const useCountUp = (end: number, duration: number = 2, specialCount: boolean = false) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number | null = null;
//     const animationDuration = duration * 1000; // Convert to milliseconds

//     const animate = (timestamp: number) => {
//       if (!startTime) startTime = timestamp;
//       const progress = timestamp - startTime;
//       const percentage = Math.min(progress / animationDuration, 1);
      
//       let currentValue;
//       if (specialCount && end % 1 !== 0) {
//         // For decimal values, use toFixed(2) to keep two decimal places
//         currentValue = Number((percentage * end).toFixed(2));
//       } else {
//         currentValue = Math.floor(percentage * end);
//       }

//       setCount(currentValue);

//       if (percentage < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [end, duration, specialCount]);

//   return count;
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const valueVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       className="max-w-5xl mx-auto text-center"
//     >
//       <h2 className="text-4xl md:text-5xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-semibold">
//         Why we exist
//       </h2>
//       <p className="text-xl mb-8 mx-10 font-serif italic text-gray-400">
//         Human error is the leading cause of cyber attacks, and malicious actors exploit this vulnerability
//       </p>
//       <div className="flex flex-wrap justify-center items-stretch gap-8">
//         {statisticsData.map((stat, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
//           >
//             <motion.span
//               variants={valueVariants}
//               className="text-5xl font-light text-gray-300 flex items-baseline"
//             >
//               <span>{useCountUp(stat.value, 2, stat.specialCount)}</span>
//               {stat.unit && (
//                 <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-5xl' : 'text-3xl'}`}>
//                   {stat.unit === '/ 3' ? (
//                     <>
//                       <span >&nbsp;</span>/
//                       <span className="inline-block ml-2">{useCountUp(3, 2)}</span>
//                     </>
//                   ) : stat.unit}
//                 </span>
//               )}
//             </motion.span>
//             <p className="text-md text-gray-400 mt-2">{stat.text}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;



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

// const useCountUp = (end: number, duration: number = 2, specialCount: boolean = false) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number | null = null;
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

//       setCount(currentValue);

//       if (percentage < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [end, duration, specialCount]);

//   return count;
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const valueVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       className="max-w-5xl mx-auto text-center"
//     >
//       <div className="flex flex-wrap justify-center items-stretch gap-8">
//         {statisticsData.map((stat, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
//           >
//             <motion.span
//               variants={valueVariants}
//               className="text-5xl font-light text-gray-300 flex items-baseline"
//             >
//               {stat.unit === 'M' && <span className="text-3xl mr-1">€</span>}
//               <span>{useCountUp(stat.value, 2, stat.specialCount)}</span>
//               {stat.unit && (
//                 <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-5xl' : 'text-3xl'}`}>
//                   {stat.unit === '/ 3' ? (
//                     <>
//                       <span>&nbsp;</span>/
//                       <span className="inline-block ml-2">{useCountUp(3, 2)}</span>
//                     </>
//                   ) : stat.unit}
//                 </span>
//               )}
//             </motion.span>
//             <p className="text-md text-gray-400 mt-2">{stat.text}</p>
//             <p className="text-xs text-gray-500 mt-3">{stat.source}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;





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

// const useCountUp = (end: number, duration: number = 2, specialCount: boolean = false) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number | null = null;
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

//       setCount(currentValue);

//       if (percentage < 1) {
//         requestAnimationFrame(animate);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [end, duration, specialCount]);

//   return count;
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

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const valueVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={containerVariants}
//       className="max-w-6xl mx-auto text-center"
//     >
//       <div className="flex flex-col sm:flex-row md:flex-row justify-center items-stretch">
//         {statisticsData.map((stat, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className={`flex flex-col items-center w-full sm:w-1/2 md:w-1/4 p-6
//                         ${index !== 0 ? 'sm:border-l border-gray-800' : ''}
//                         ${index !== statisticsData.length - 1 ? 'border-b sm:border-b-0 border-gray-700' : ''}`}
//           >
//             <motion.span
//               variants={valueVariants}
//               className="text-5xl font-light text-gray-300 flex items-baseline"
//             >
//               {stat.unit === 'M' && <span className="text-3xl mr-1">€</span>}
//               <span>{useCountUp(stat.value, 2, stat.specialCount)}</span>
//               {stat.unit && (
//                 <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-5xl' : 'text-3xl'}`}>
//                   {stat.unit === '/ 3' ? (
//                     <>
//                       <span>&nbsp;</span>/
//                       <span className="inline-block ml-2">{useCountUp(3, 2)}</span>
//                     </>
//                   ) : stat.unit}
//                 </span>
//               )}
//             </motion.span>
//             <p className="text-lg text-gray-400 mt-2">{stat.text}</p>
//             <p className="text-xs text-gray-500 mt-3">{stat.source}</p>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default StatisticsHack;

'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type StatisticItem = {
  value: number;
  unit?: string;
  text: string;
  specialCount?: boolean;
  source: string;
};

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

const useGlitchingCountUp = (end: number, duration: number = 2, specialCount: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animationDuration = duration * 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / animationDuration, 1);
      
      let currentValue;
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
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, specialCount]);

  return count;
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

  const valueVariants = {
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
      className="max-w-[1152px] mx-auto text-center"
    >
      <div className="flex flex-col md:flex-row justify-center items-stretch">
        {statisticsData.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`flex flex-col items-center w-full md:w-1/4 p-6
                        ${index !== 0 ? 'md:border-l border-gray-800' : ''}
                        ${index !== statisticsData.length - 1 ? 'border-b md:border-b-0 border-gray-700' : ''}`}
          >
            <motion.span
              variants={valueVariants}
              className="text-5xl font-light text-gray-300 flex items-baseline"
            >
              {stat.unit === 'M' && <span className="text-3xl mr-1">€</span>}
              <span>{useGlitchingCountUp(stat.value, 3, stat.specialCount)}</span>
              {stat.unit && (
                <span className={`ml-1 ${stat.unit === '/ 3' ? 'text-5xl' : 'text-3xl'}`}>
                  {stat.unit === '/ 3' ? (
                    <>
                      <span>&nbsp;</span>/
                      <span className="inline-block ml-2">{useGlitchingCountUp(3, 3)}</span>
                    </>
                  ) : stat.unit}
                </span>
              )}
            </motion.span>
            <p className="text-lg text-gray-400 mt-2">{stat.text}</p>
            <p className="text-xs text-gray-500 mt-3">{stat.source}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatisticsHack;