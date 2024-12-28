'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

const CAL_URL = "https://cal.com/domass/30min?hide_event_type_details=true";

const MobileMenu = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleSolutions = () => {
    setSolutionsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="fixed top-0 right-0 w-full h-full bg-black z-50 lg:hidden mt-[40px] overflow-hidden">
        <div className="flex flex-col w-full h-full p-6 overflow-y-auto items-center justify-between">
          <div className="flex flex-col items-center w-full">
            <div className="mb-4 w-full text-center ">
              <div
                className="flex ml-5 justify-center items-center text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-2 cursor-pointer"
                onClick={toggleSolutions}
              >
                Solutions
                {solutionsOpen ? (
                  <ChevronUp className="mt-1 ml-1 h-6 w-6 text-neutral-300" />
                ) : (
                  <ChevronDown className="mt-1 ml-1 h-6 w-6 text-neutral-300" />
                )}
              </div>

              {solutionsOpen && (
                <div className="text-center">
                  <ul className="mt-3 text-xl text-center space-y-3">
                    {['Phishing Awareness', 'Security Awareness', 'Role-Based Training', 'Weak Points', 'Custom Trainings'].map((item, index) => (
                      <li key={index} className="w-full">
                        <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-gray-300 hover:text-white block py-2">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-full  mb-4">
              <Link href="/pricing" className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
                Pricing
              </Link>
            </div>

            <div className="w-full mb-4">
              <Link href="/about" className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
                Company
              </Link>
            </div>

            <div className="w-full mb-4">
              <Link href="/contact" className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 block text-center py-2">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-auto w-full mb-20">
            <Link
              href="/login"
              className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-transparent text-white hover:bg-white/10 inline-flex items-center justify-center select-none transition ease-in-out duration-200 mb-4 w-full"
            >
              Log In
            </Link>
            <button
              onClick={() => {
                setIsDemoOpen(true);
                setIsLoading(true);
              }}
              className="text-xl h-11 pl-4 pr-4 rounded-xl border border-[#4D4D4D] bg-[#ffffff] hover:bg-white/90 inline-flex items-center justify-center select-none transition ease-in-out duration-200 w-full"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-700 group-hover:from-black group-hover:to-black flex items-center">
                Request Demo <ChevronRight className="ml-1 h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {isDemoOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex px-3 justify-center items-center z-[200]"
          onClick={() => {
            setIsDemoOpen(false);
            setIsLoading(true);
          }}
        >
          <div 
            className="bg-[#101010] rounded-lg shadow-lg p-5 max-w-5xl w-full relative border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#101010] z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
              </div>
            )}
            <div className="relative mb-7" style={{ height: '76vh' }}>
              <iframe
                ref={iframeRef}
                src={CAL_URL}
                className="absolute inset-0 w-full rounded-lg h-full border-none"
                allow="camera; microphone; display-capture"
                onLoad={() => setIsLoading(false)}
                style={{
                  backgroundColor: '#101010',
                  transform: 'scale(1.06)',
                  transformOrigin: 'top',
                  height: '75vh',
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.3s'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;

