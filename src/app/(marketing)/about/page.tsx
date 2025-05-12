'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Navbar from '@/app/(marketing)/navigation/navbar';
import Footer from '@/app/(marketing)/navigation/footer';
import { RoadmapSection } from '../components/RoadmapSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen font-sans bg-[#0b0b0b] text-white relative overflow-hidden">
      {/* Subtle gradient elements */}
      {/* <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-3/4 left-1/3 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div> */}
      
      <Navbar />
      
      <main className="max-w-[1360px] mx-auto px-4 pt-72 pb-20 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-32"
        >
          <h1 className="text-5xl font-normal mt-24 mb-6">
            Security that People Actually Use
          </h1>
          <p className="text-lg text-neutral-400">
            We're making security training effective by making it engaging. Built for modern teams that value both security and user experience.
          </p>
        </motion.div>

        {/* Key Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-white/20 pt-8"
          >
            <h3 className="text-2xl font-normal mb-6">GDPR Compliant</h3>
            <p className="text-neutral-400">
              Built with European data protection standards at its core. Your data stays in the EU.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border-t border-white/20 pt-8"
          >
            <h3 className="text-2xl font-normal mb-6">Security First</h3>
            <p className="text-neutral-400">
              Built with robust security practices from day one. We prioritize your data protection.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-white/20 pt-8"
          >
            <h3 className="text-2xl font-normal mb-6">Global Support</h3>
            <p className="text-neutral-400">
              24/5 support coverage with dedicated response times for enterprise clients.
            </p>
          </motion.div>
        </div>

        {/* Company Info Section - Now with key metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-32"
        >
          <h2 className="text-4xl font-normal text-center mb-16">
            Why Companies Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-normal mb-6">Employee Engagement</h3>
              <p className="text-neutral-400 mb-8">Interactive microlearning sessions that keep your team engaged.</p>
              <ul className="text-neutral-400 space-y-4">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                  <span>5-minute daily challenges</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                  <span>Gamified learning experience</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                  <span>Mobile-first approach</span>
                </li>
              </ul>
            </div>
            <div className="border-t border-white/20 pt-8">
              <h3 className="text-2xl font-normal mb-6">Measurable Results</h3>
              <p className="text-neutral-400 mb-8">Track your team's security awareness progress with detailed analytics.</p>
              <ul className="text-neutral-400 space-y-4">
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                  <span>Real-time progress tracking</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                  <span>Department-level insights</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-5 h-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                  <span>Risk assessment reports</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center w-full justify-center">
          <RoadmapSection />
        </div>
        
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl font-normal mb-6">
            Start Securing Your Team Today
          </h2>
          <p className="text-xl text-neutral-400 mb-12">
            Get a personalized demo and see how we can help protect your company.
          </p>
          <div className="space-x-6">
            <Link
              href="/pricing"
              className="rounded-full border border-white/40 py-3 px-8 hover:bg-white/5 transition-colors"
            >
              View Plans
            </Link>
            <Link 
              href="/try-app"
              className="rounded-full border border-white/40 py-3 px-8 hover:bg-white/5 transition-colors"
            >
              Try App
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;