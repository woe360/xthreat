import { cn } from '@/lib/utils'
import React from "react";
import { BentoGrid, BentoGridItem } from "@/app/(landing-page)/(main)/components/bento-grid";
import { useEffect, useRef} from "react";
import { motion, useScroll, useTransform, useAnimation} from "framer-motion";
import Image from "next/image";

// Define interfaces for type safety
interface BentoItem {
  title: string;
  description: React.ReactNode;
  header: React.ReactNode;
  className: string;
  icon?: React.ReactNode; // Make icon optional
}

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
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
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent border-gray-800 bg-neutral-100 dark:bg-black"></div>
);

// Add TypeScript interfaces for variants
interface AnimationVariants {
  initial: {
    x?: number;
    backgroundPosition?: string;
    width?: string;
    opacity?: number;
  };
  animate: {
    x?: number | number[];
    rotate?: number;
    backgroundPosition?: string[];
    width?: string | string[];
    opacity?: number;
    transition?: {
      duration: number;
      ease?: string;
      repeat?: number;
      repeatType?: "loop" | "reverse" | "mirror";
      type?: string;
      stiffness?: number;
    };
  };
}


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
        className="flex flex-row rounded-full border border-gray-800 p-3  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-gray-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-gray-800 p-3 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-gray-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-gray-800 p-3 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-gray-900" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  // const createVariants = () => ({
  //   initial: {
  //     width: "10%",
  //   },
  //   animate: {
  //     width: [
  //       `${Math.random() * (80 - 20) + 20}%`,
  //       `${Math.random() * (80 - 20) + 20}%`,
  //       `${Math.random() * (80 - 20) + 20}%`,
  //     ],
  //     transition: {
  //       duration: 8,
  //       ease: "easeInOut",
  //       repeat: Infinity,
  //       repeatType: "mirror",
  //     },
  //   },
  // });

  // useEffect(() => {
  //   controls.start("animate");
  // }, [controls]);

  const createVariants = (index: number) => ({
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
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    },
  });

  useEffect(() => {
    const startAnimation = () => {
      controls.start("animate");
    };

    startAnimation();
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 overflow-hidden"
    >
      {words.map((word, i) => {
        const wordVariants = createVariants(i);
        return (
          <div
            key={`skeleton-two-${i}`}
            className="relative flex flex-row rounded-lg border border-gray-800 p-2 items-center bg-neutral-100 dark:bg-black w-full h-8 overflow-hidden"
          >
            <span className="absolute left-2 text-black dark:text-white text-s z-10">{word}</span>
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-900 to-emerald-500/90 z-0 rounded-sm"
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
          "linear-gradient(-45deg, #0c4013, #0c4013, #0c4013, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full bg-[#0c4013] rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [120, -150]);
  const xSecond = useTransform(scrollYProgress, [0, 1], [-120, 150]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.9, 1.1]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="flex flex-1 w-full h-full min-h-[7rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        style={{ x }}
        className="h-full w-1/3 md:w-1/3 rounded-2xl p-4 bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800  flex flex-col items-center justify-center"
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
        className="h-full relative z-20 w-2/4 md:w-1/3 rounded-2xl p-4 bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border-gray-800 border flex flex-col items-center justify-center"
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
        className="h-full w-1/3 rounded-2xl bg-black [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] p-4 border-gray-800 border  flex flex-col items-center justify-center"
      >
        <Image
          src=""
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-base text-sm text-center font-semibold text-neutral-500 mt-4">
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controlsFirst, controlsSecond]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="initial"
      className="flex flex-1 w-full !overflow-hidden h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-1"
    >
      <motion.div
        variants={variantsFirst}
        animate={controlsFirst}
        className="flex flex-row rounded-2xl border border-gray-800 p-1.5 bg-white dark:bg-black w-full items-start"
      >
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-white-500 flex-shrink-0 mr-2" />
        <p className="text-xs text-neutral-500 flex-1">
          URGENT: Your email has been compromised. Verify your account by logging in here: [outtlook.com]
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        animate={controlsSecond}
        className="flex flex-row rounded-2xl border border-gray-800 p-1.5 bg-white dark:bg-black w-full items-start"
      >
        <p className="text-xs text-neutral-500 flex-1 mr-3 ml-3">
          Sure, I'll verify it right after I report this phishing attempt to IT department.
        </p>
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variantsFirst}
        animate={controlsFirst}
        className="flex flex-row rounded-2xl border border-gray-800 p-1.5 bg-white dark:bg-black w-full items-start"
      >
        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-white-500 flex-shrink-0 mr-2" />
        <p className="text-xs text-neutral-500 flex-1">
        There's no need to report this, it's a routine security check authorized by IT.
        </p>
      </motion.div>
    </motion.div>
  );
};

const words = ["Effectiveness", "Participation", "Weak Spots", "Retention", "Application"];

const items: BentoItem[] = [
  {
    title: "Comprehensive Training Modules",
    description: (
      <span className="text-base">
        Training modules on phishing awareness, password management, malware protection & social engineering defenses.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
  },
  {
    title: "Interactive Simulations",
    description: (
      <span className="text-base">
        Hands-on learning experience ensuring real world application.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
  },
  {
    title: "Customized Learning Paths",
    description: (
      <span className="text-base">
        Personalized learning paths for different roles, from general staff to IT professionals.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
  },
  {
    title: "Real-Time Reporting & Analytics",
    description: (
      <span className="text-base">
        Monitor progress, analyse training impact through real-time analytics.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-2",
  },
];


