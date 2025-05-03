'use client';

import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";
import { motion, AnimatePresence } from 'framer-motion';
import XLogo from '../assets/XThreat_icon_primary_white_to_gradient.svg';
import useCalendarPreload from './cal-preloading';

const CAL_URL = "https://cal.com/domass/30min?hide_event_type_details=true";

const Navbar = () => {
  useCalendarPreload(CAL_URL);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const preloadIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Scroll handler
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        // Scrolling up or at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://www.youtube-nocookie.com";
    
    const dnsPrefetch = document.createElement("link");
    dnsPrefetch.rel = "dns-prefetch";
    dnsPrefetch.href = "https://www.youtube-nocookie.com";
    
    document.head.appendChild(preconnect);
    document.head.appendChild(dnsPrefetch);
    
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      
      // Saugiai pašaliname elementus tik jei jie egzistuoja
      if (document.head.contains(preconnect)) {
        document.head.removeChild(preconnect);
      }
      if (document.head.contains(dnsPrefetch)) {
        document.head.removeChild(dnsPrefetch);
      }
      if (preloadIframeRef.current && document.body.contains(preloadIframeRef.current)) {
        document.body.removeChild(preloadIframeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsDemoOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleMouseEnter = (item: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(item);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(null);
    }, 300);
  };

  const NavItem = ({ title, content, width }: { title: string; content: React.ReactNode; width: string }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <li
        onMouseEnter={() => {
          handleMouseEnter(title);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          setIsHovered(false);
        }}
        className="relative"
      >
        <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
          <span className="mr-1">{title}</span>
          <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
        {active === title && (
          <div className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-50 ${width} bg-[#101010] backdrop-blur-lg border border-gray-700 p-6 rounded-md shadow-lg`}>
            {content}
          </div>
        )}
      </li>
    );
  };

  // const SolutionsContent = () => (
  //   <div className="grid grid-cols-2 gap-4">
  //     <div className="pl-3 border-r border-gray-600">
  //       <h3 className="text-white font-semibold text-sm mb-2">Security Solutions</h3>
  //       <ul className="mt-3 space-y-4">
  //         <li><Link href="/phishing-awareness" className="text-gray-300 text-l hover:text-white flex items-center">Phishing Awareness</Link></li>
  //         <li><Link href="/security-awareness" className="text-gray-300 hover:text-white flex items-center">Security Awareness</Link></li>
  //         <li><Link href="/role-based-training" className="text-gray-300 hover:text-white flex items-center">Role Based Training</Link></li>
  //         <li><Link href="/weak-points" className="text-gray-300 hover:text-white flex items-center">Weak Points</Link></li>
  //         <li><Link href="/custom-trainings" className="text-gray-300 hover:text-white flex items-center">Custom Trainings</Link></li>
  //       </ul>
  //     </div>
  //     <div className="pr-4">
  //       <h3 className="text-white font-semibold mb-2">Featured</h3>
  //       <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-md">
  //         <h4 className="text-white font-semibold mb-2">New: AI-Powered Training</h4>
  //         <p className="text-gray-400 text-sm mb-2">Enhance your security with our latest AI-driven training modules.</p>
  //         <Link href="/ai-training" className="text-gray-300 hover:text-gray-100 flex flex-row">Learn more <ChevronRight className="h-4 w-4 mt-[5px]"/></Link>
  //       </div>
  //     </div>
  //   </div>
  // );

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 font-sans text-sm left-0 top-0 py-4 px-5 bg-[#101010]/20 backdrop-blur-lg z-[100]"
          >
            <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
              <div className="flex items-center gap-1 md:gap-[2px]">
                <Link href="/">
                  <div className="w-full relative select-none pointer-events-none flex justify-center">
                    <Image
                      src={XLogo}
                      alt="X Logo"
                      width={30}
                      height={30}
                    />
                  </div>
                </Link>
              </div>

              {isDesktop ? (
                <nav className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                  <ul className="flex items-center gap-8 list-none">
                    {/* <NavItem title="Solutions" content={<SolutionsContent />} width="w-[480px]" /> */}
                    {/* <li><Link href="/solutions" className="text-gray-400 hover:text-white">Solutions</Link></li> */}
                    <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                    <li><Link href="/about" className="text-gray-400 hover:text-white">Company</Link></li>
                    <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  </ul>
                </nav>
              ) : (
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}

              {isDesktop && (
                <div className="flex items-center gap-8 ml-auto">
                  <Link href="/login" className="text-gray-400 hover:text-white">Log in</Link>
                  <button 
                    onClick={() => {
                      setIsDemoOpen(true);
                      setIsLoading(true);
                    }} 
                    className="p-4 h-9 w-full sm:w-fit rounded-full border border-white/70 hover:bg-white/5 group transition-all flex items-center justify-center gap-4"
                  >
                    <span className="text-neutral-400 flex md:text-center">
                      Book a demo <ChevronRight className="text-neutral-400 mt-[3px]" size={15}/>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {isDemoOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex px-10 justify-center items-center z-[200]"
          onClick={() => {
            setIsDemoOpen(false);
            setIsLoading(true);
          }}
        >
          <div 
            className="bg-[#101010] rounded-lg shadow-lg p-10 max-w-5xl w-full relative border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#101010] z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
              </div>
            )}
            <div className="relative" style={{ height: '88vh' }}>
              <iframe
                ref={iframeRef}
                src={CAL_URL}
                className="absolute inset-0 w-full h-full border-none"
                allow="camera; microphone; display-capture"
                onLoad={() => setIsLoading(false)}
                style={{
                  backgroundColor: '#101010',
                  transform: 'scale(1.06)',
                  transformOrigin: 'top',
                  height: '88vh',
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.3s'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {!isDesktop && menuOpen && <MobileMenu />}

      <AnimatePresence>
        {isOpen && <MobileMenu />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


