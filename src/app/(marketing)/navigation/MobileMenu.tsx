'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CalEmbed from '@/components/CalEmbed';

const CAL_URL = "https://cal.com/domass/30min?hide_event_type_details=true";

const MobileMenu = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleSolutions = () => {
    setSolutionsOpen((prevState) => !prevState);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 right-0 w-full h-full bg-[#0b0b0b] z-[200] lg:hidden mt-[64px] overflow-hidden"
    >
      <motion.div 
        className="flex flex-col w-full h-full p-6 overflow-y-auto items-center justify-between"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center w-full">
          <motion.div className="w-full mb-4" variants={itemVariants}>
            <Link href="/solutions" className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
              Solutions
            </Link>
          </motion.div>

          <motion.div className="w-full mb-4" variants={itemVariants}>
            <Link href="/pricing" className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
              Pricing
            </Link>
          </motion.div>

          <motion.div className="w-full mb-4" variants={itemVariants}>
            <Link href="/about" className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
              Company
            </Link>
          </motion.div>

          <motion.div className="w-full mb-4" variants={itemVariants}>
            <Link href="/contact" className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
              Contact
            </Link>
          </motion.div>
        </div>

        <motion.div className="mt-auto w-full mb-20" variants={itemVariants}>
          <Link
            href="/login"
            className="text-xl h-11 pl-4 pr-4 rounded-full border border-white/10 bg-transparent text-white hover:bg-white/10 inline-flex items-center justify-center select-none transition ease-in-out duration-200 mb-4 w-full"
          >
            Log In
          </Link>
          <CalEmbed />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;

