// "use client";
// import { cn } from '@/lib/utils'
// import React from "react";
// import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
// import { useEffect, useRef, useState} from "react";

// import {
//   IconBoxAlignRightFilled,
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";
// import { motion, useScroll, useTransform, useAnimation} from "framer-motion";
// import Image from "next/image";

// export function Products() {
//   return (
//     <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
//       {items.map((item, i) => (
//         <BentoGridItem
//           key={i}
//         //   title={item.title}
//         title={<span className="text-2xl font-bold">{item.title}</span>}
//           description={item.description}
//           header={item.header}
//           className={cn("[&>p:text-lg]", item.className)}
//           icon={item.icon}
//         />
//       ))}
//     </BentoGrid>
//   );
// }
// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
// );


// const SkeletonOne = () => {
//   const variants = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: 10,
//       rotate: 5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };
//   const variantsSecond = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: -10,
//       rotate: -5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       initial="initial"
//       whileHover="animate"
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
//     >
//       <motion.div
//         variants={variants}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
//       >
//         <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//         <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//       </motion.div>
//       <motion.div
//         variants={variantsSecond}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
//       >
//         <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//         <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//       </motion.div>
//       <motion.div
//         variants={variants}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
//       >
//         <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//         <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//       </motion.div>
//     </motion.div>
//   );
// };


// const words = ["Effectiveness", "Participation", "Weak Spots", "Retention", "Application"];

// const SkeletonTwo = () => {
//   const controls = useAnimation();
//   const ref = useRef(null);

//   const createVariants = () => ({
//     initial: {
//       width: "10%",
//     },
//     animate: {
//       width: [
//         `${Math.random() * (80 - 20) + 20}%`,
//         `${Math.random() * (80 - 20) + 20}%`,
//         `${Math.random() * (80 - 20) + 20}%`,
//       ],
//       transition: {
//         duration: 8,
//         ease: "easeOut",
//         repeat: Infinity,
//         repeatType: "mirror",
//       },
//     },
//   });

//   useEffect(() => {
//     controls.start("animate");
//   }, [controls]);

//   return (
//     <motion.div
//       ref={ref}
//       initial="initial"
//       animate="animate"
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 overflow-hidden"
//     >
//       {words.map((word, i) => {
//         const wordVariants = createVariants();
//         return (
//           <div
//             key={"skeleton-two" + i}
//             className="relative flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2 items-center bg-neutral-100 dark:bg-black w-full h-8 overflow-hidden"
//           >
//             <span className="absolute left-2 text-black dark:text-white text-s z-10">{word}</span>
//             <motion.div
//               className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-emerald-400/90 z-0 rounded-sm"
//               variants={wordVariants}
//               initial="initial"
//               animate="animate"
//             ></motion.div>
//           </div>
//         );
//       })}
//     </motion.div>
//   );
// };

// const SkeletonThree = () => {
//   const variants = {
//     initial: {
//       backgroundPosition: "0 50%",
//     },
//     animate: {
//       backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
//     },
//   };
//   return (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       variants={variants}
//       transition={{
//         duration: 5,
//         repeat: Infinity,
//         repeatType: "reverse",
//       }}
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
//       style={{
//         background:
//           "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
//         backgroundSize: "400% 400%",
//       }}
//     >
//       <motion.div className="h-full w-full rounded-lg"></motion.div>
//     </motion.div>
//   );
// };

// const SkeletonFour = () => {
//   const { scrollYProgress } = useScroll();
//   const x = useTransform(scrollYProgress, [0, 1], [120, -80]);
//   const xSecond = useTransform(scrollYProgress, [0, 1], [-120, 80]);
//   const scale = useTransform(scrollYProgress, [0, 0.7], [0.9, 1.1]);

//   return (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       className="flex flex-1 w-full h-full min-h-[7rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
//     >
//       <motion.div
//         style={{ x }}
//         className="h-full w-1/3 md:w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
//       >
//         <Image
//           src=""
//           alt="avatar"
//           height="100"
//           width="100"
//           className="rounded-full h-10 w-10"
//         />
//         <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
//           Identifying Social Engineering Tactics
//         </p>
//         <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
//           Important
//         </p>
//       </motion.div>
      
//       <motion.div
//         style={{ x: 0, scale }}
//         className="h-full relative z-20 w-2/4 md:w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
//       >
//         <Image
//           src=""
//           alt="avatar"
//           height="100"
//           width="100"
//           className="rounded-full h-10 w-10"
//         />
//         <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
//           Best Practices for Remote Work Security
//         </p>
//         <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
//           Essential
//         </p>
//       </motion.div>
      
//       <motion.div
//         style={{ x: xSecond }}
//         className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
//       >
//         <Image
//           src=""
//           alt="avatar"
//           height="100"
//           width="100"
//           className="rounded-full h-10 w-10"
//         />
//         <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
//           Recognizing Ransomware Attacks
//         </p>
//         <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
//           Critical
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// };

// const SkeletonFive = () => {
//   const controlsFirst = useAnimation();
//   const controlsSecond = useAnimation();
//   const ref = useRef(null);

//   const variantsFirst = {
//     initial: {
//       x: '-100vw',
//       opacity: 0,
//     },
//     animate: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         type: 'spring',
//         stiffness: 50,
//       },
//     },
//   };

//   const variantsSecond = {
//     initial: {
//       x: '100vw',
//       opacity: 0,
//     },
//     animate: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.2,
//         type: 'spring',
//         stiffness: 55,
//       },
//     },
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           controlsFirst.start("animate");
//           controlsSecond.start("animate");
//         } else {
//           controlsFirst.start("initial");
//           controlsSecond.start("initial");
//         }
//       },
//       {
//         threshold: 0.9,
//       }
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current);
//       }
//     };
//   }, [controlsFirst, controlsSecond]);

//   return (
//     <motion.div
//       ref={ref}
//       initial="initial"
//       animate="initial"
//       className="flex flex-1 w-full !overflow-hidden h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
//     >
//       <motion.div
//         variants={variantsFirst}
//         animate={controlsFirst}
//         className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-1.5 bg-white dark:bg-black w-full items-start"
//       >
//         <div className="h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-white-500 flex-shrink-0 mr-2" />
//         <p className="text-xs text-neutral-500 flex-1">
//           URGENT: Your email has been compromised. Verify your account by logging in here: [outtlook.com]
//         </p>
//       </motion.div>
//       <motion.div
//         variants={variantsSecond}
//         animate={controlsSecond}
//         className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-1.5 bg-white dark:bg-black w-full items-start"
//       >
//         <p className="text-xs text-neutral-500 flex-1 mr-2">
//           Sure, I'll verify it right after I report this phishing attempt to IT department
//         </p>
//         <div className="h-5 w-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex-shrink-0" />
//       </motion.div>
//     </motion.div>
//   );
// };


// const SkeletonSix = () => {
//     const variants = {
//       initial: {
//         x: 0,
//       },
//       animate: {
//         x: 10,
//         rotate: 5,
//         transition: {
//           duration: 0.2,
//         },
//       },
//     };
//     const variantsSecond = {
//       initial: {
//         x: 0,
//       },
//       animate: {
//         x: -10,
//         rotate: -5,
//         transition: {
//           duration: 0.2,
//         },
//       },
//     };
  
//     return (
//       <motion.div
//         initial="initial"
//         whileHover="animate"
//         className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
//       >
//         <motion.div
//           variants={variants}
//           className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
//         >
//           <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//           <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//         </motion.div>
//         <motion.div
//           variants={variantsSecond}
//           className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
//         >
//           <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//           <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//         </motion.div>
//         <motion.div
//           variants={variants}
//           className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
//         >
//           <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//           <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//         </motion.div>
//       </motion.div>
//     );
//   };


// const items = [
//   {
//     title: "Phishing Simulation and Training",
//     description: (
//       <span className="text-sm">
//         Learn to recognize and respond to phishing attempts through realistic simulations. Covers phishing awareness, password management, and social engineering defenses.      </span>
//     ),
//     // header: <SkeletonFour />,
//     className: "md:col-span-1",
//   },
//   {
//     title: "Security Awareness Courses",
//     description: (
//       <span className="text-sm">
//         Interactive courses on phishing simulations, ransomware response, and incident handling. Equip your team with essential cybersecurity knowledge.
//       </span>
//     ),
//     // header: <SkeletonFive />,
//     className: "md:col-span-1",
//   },
//   {
//     title: "Role based Training",
//     description: (
//       <span className="text-sm">
//         Personalized learning paths for different roles within your organization. Tailored training for general staff, IT professionals, and executives.
//       </span>
//     ),
//     // header: <SkeletonOne />,
//     className: "md:col-span-1",
//   },
//   {
//     title: "Dora Compliance",
//     description: (
//       <span className="text-sm">
//         Meet Digital Operational Resilience Act (DORA) standards with our comprehensive training on regulatory requirements and best practices.
//       </span>
//     ),
//     // header: <SkeletonTwo />,
//     className: "md:col-span-1",
//   },
//   {
//     title: "Incident Response Training",
//     description: (
//       <span className="text-sm">
//         Prepare to manage and respond to cybersecurity incidents effectively. Covers incident management from detection to resolution.
//       </span>
//     ),
//     // header: <SkeletonThree />,
//     className: "md:col-span-1",
//   },
//   {
//     title: "Elimination of Weak Points",
//     description: (
//       <span className="text-sm">
//         Identify and address vulnerabilities in your security defenses. Targeted training to fortify your organization and reduce breach risks.
//       </span>
//     ),
//     // header: <SkeletonSix />,
//     className: "md:col-span-1",
//   },
// ];


"use client";
import { cn } from '@/lib/utils'
import React from "react";
import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
import { useEffect, useRef, useState} from "react";

import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion, useScroll, useTransform, useAnimation} from "framer-motion";
import Image from "next/image";

export function Products() {
  return (
    <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={<span className="text-2xl font-bold">{item.title}</span>}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};

const words = ["Effectiveness", "Participation", "Weak Spots", "Retention", "Application"];

const SkeletonTwo = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  const createVariants = () => ({
    initial: {
      width: "10%",
    },
    animate: {
      width: [
        `${Math.random() * (80 - 20) + 20}%`,
        `${Math.random() * (80 - 20) + 20}%`,
        `${Math.random() * (80 - 20) + 20}%`,
      ],
      transition: {
        duration: 8,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  });

  useEffect(() => {
    const currentRef = ref.current;
    controls.start("animate");

    return () => {
      if (currentRef) {
        controls.stop();
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 overflow-hidden"
    >
      {words.map((word, i) => {
        const wordVariants = createVariants();
        return (
          <div
            key={"skeleton-two" + i}
            className="relative flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2 items-center bg-neutral-100 dark:bg-black w-full h-8 overflow-hidden"
          >
            <span className="absolute left-2 text-black dark:text-white text-s z-10">{word}</span>
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-emerald-400/90 z-0 rounded-sm"
              variants={wordVariants}
              initial="initial"
              animate="animate"
            ></motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const xSecond = useTransform(scrollYProgress, [0, 1], [-120, 80]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.9, 1.1]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="flex flex-1 w-full h-full min-h-[7rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        style={{ x }}
        className="h-full w-1/3 md:w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src=""
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Identifying Social Engineering Tactics
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Important
        </p>
      </motion.div>
      
      <motion.div
        style={{ x: 0, scale }}
        className="h-full relative z-20 w-2/4 md:w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src=""
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Best Practices for Remote Work Security
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Essential
        </p>
      </motion.div>
      
      <motion.div
        style={{ x: xSecond }}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src=""
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Recognizing Ransomware Attacks
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Critical
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const controlsFirst = useAnimation();
  const controlsSecond = useAnimation();
  const ref = useRef(null);

  const variantsFirst = {
    initial: {
      x: '-100vw',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 50,
      },
    },
  };

  const variantsSecond = {
    initial: {
      x: '100vw',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        stiffness: 55,
      },
    },
  };

  useEffect(() => {
    const currentRef = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controlsFirst.start("animate");
          controlsSecond.start("animate");
        } else {
          controlsFirst.start("initial");
          controlsSecond.start("initial");
        }
      },
      {
        threshold: 0.9,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controlsFirst, controlsSecond]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="initial"
      className="flex flex-1 w-full !overflow-hidden h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variantsFirst}
        animate={controlsFirst}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-1.5 bg-white dark:bg-black w-full items-start"
      >
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-white-500 flex-shrink-0 mr-2" />
        <p className="text-xs text-neutral-500 flex-1">
          URGENT: Your email has been compromised. Verify your account by logging in here: [outtlook.com]
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        animate={controlsSecond}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-1.5 bg-white dark:bg-black w-full items-start"
      >
        <p className="text-xs text-neutral-500 flex-1 mr-2">
          Sure, I'll verify it right after I report this phishing attempt to IT department
        </p>
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonSix = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
      >
        <motion.div
          variants={variants}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        </motion.div>
        <motion.div
          variants={variantsSecond}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
        >
          <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        </motion.div>
        <motion.div
          variants={variants}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        </motion.div>
      </motion.div>
    );
  };
  
  const items = [
    {
      title: "Phishing Simulation and Training",
      description: (
        <span className="text-sm">
          Learn to recognize and respond to phishing attempts through realistic simulations. Covers phishing awareness, password management, and social engineering defenses.
        </span>
      ),
      header: <SkeletonFour />,
      className: "md:col-span-1",
    },
    {
      title: "Security Awareness Courses",
      description: (
        <span className="text-sm">
          Interactive courses on phishing simulations, ransomware response, and incident handling. Equip your team with essential cybersecurity knowledge.
        </span>
      ),
      header: <SkeletonFive />,
      className: "md:col-span-1",
    },
    {
      title: "Role based Training",
      description: (
        <span className="text-sm">
          Personalized learning paths for different roles within your organization. Tailored training for general staff, IT professionals, and executives.
        </span>
      ),
      header: <SkeletonOne />,
      className: "md:col-span-1",
    },
    {
      title: "Dora Compliance",
      description: (
        <span className="text-sm">
          Meet Digital Operational Resilience Act (DORA) standards with our comprehensive training on regulatory requirements and best practices.
        </span>
      ),
      header: <SkeletonTwo />,
      className: "md:col-span-1",
    },
    {
      title: "Incident Response Training",
      description: (
        <span className="text-sm">
          Prepare to manage and respond to cybersecurity incidents effectively. Covers incident management from detection to resolution.
        </span>
      ),
      header: <SkeletonThree />,
      className: "md:col-span-1",
    },
    {
      title: "Elimination of Weak Points",
      description: (
        <span className="text-sm">
          Identify and address vulnerabilities in your security defenses. Targeted training to fortify your organization and reduce breach risks.
        </span>
      ),
      header: <SkeletonSix />,
      className: "md:col-span-1",
    },
  ];
  
  export default Products;