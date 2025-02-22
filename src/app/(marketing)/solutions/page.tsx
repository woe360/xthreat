// src/app/(landing-page)/(solutions)/solutions/page.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSolutionSection, products } from '../../(main)/components/AnimatedSolutionSection';
import Navbar from '@/app/(marketing)/navigation/navbar';
import Footer from '@/app/(marketing)/navigation/footer';
import { FeaturesSection } from './components/display-cards-demo';
import Link from 'next/link';

export default function SolutionsPage() {
  return (
    <div className="min-h-screen font-sans bg-black text-white relative overflow-hidden">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-56">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mx-10"
        >
          <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl">
            Solutions
          </h2>
          <p className="mt-4 text-xl font-serif italic text-gray-400">
            Discover how our cyber security training solutions transform your business
          </p>
        </motion.div>

        {/* Solutions Section */}
        <section className="pt-28 font-sans overflow-hidden">
          <div className="max-w-7xl mx-auto">
              <div className="space-y-12 sm:space-y-20 md:space-y-25">
                {products.map((product, index) => (
                  <AnimatedSolutionSection
                    key={index}
                    {...product}
                    index={index}
                  />
                ))}
              </div>
          </div>
        </section>


        {/* Features Section */}
        <div className="flex items-center justify-center">
          <FeaturesSection />
        </div>
        

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 mb-72 text-center mx-6"
        >
          <div className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-12 max-w-7xl mx-auto">
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              See plans or try it yourself!
            </p>
            <div className="flex justify-center items-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center px-5 bg-white text-black py-3 border border-white/20 rounded-xl font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                View Plans
              </Link>
              <Link 
                href="/try-app"
                className="inline-flex items-center px-8 py-3 border border-white/20 rounded-xl font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                Try App
              </Link>
            </div>
          </div>
        </motion.div>
        <Footer />
      </div>
    </div>
  );
}