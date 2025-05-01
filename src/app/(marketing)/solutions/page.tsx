// src/app/(landing-page)/(solutions)/solutions/page.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/(marketing)/navigation/navbar';
import Footer from '@/app/(marketing)/navigation/footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Users, Briefcase, Target, Shield, LineChart } from 'lucide-react';
import { AnimatedSolutionSection } from '@/app/(marketing)/components/AnimatedSolutionSection';
import { FeaturesSection } from './components/display-cards-demo';

// Define solution products
const products = [
  {
    title: "Phishing Awareness",
    description: "Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense.",
    icon: <Shield size={64} className="text-blue-500" />,
    imagePosition: "left" as const,
    link: "/phishing-awareness"
  },
  {
    title: "Security Awareness",
    description: "Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors.",
    icon: <LineChart size={64} className="text-blue-500" />,
    imagePosition: "right" as const,
    link: "/security-awareness"
  },
  {
    title: "Role Based Training",
    description: "Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences.",
    icon: <Briefcase size={64} className="text-blue-500" />,
    imagePosition: "left" as const,
    link: "/role-based-training"
  },
  {
    title: "Weak Points",
    description: "Identify and address vulnerabilities in your organization's security practices, strengthening your overall defense strategy.",
    icon: <Target size={64} className="text-blue-500" />,
    imagePosition: "right" as const,
    link: "/weak-points"
  },
  {
    title: "Custom Trainings",
    description: "Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals.",
    icon: <Users size={64} className="text-blue-500" />,
    imagePosition: "left" as const,
    link: "/custom-trainings"
  }
];

export default function SolutionsPage() {
  return (
    <main className="relative">
      <div className="absolute inset-0 min-h-screen w-full bg-[#0b0b0b] [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)] z-[-1]"></div>
      <Navbar />

      <section className="min-h-[70vh] flex flex-col relative z-20 justify-center pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4 mb-16"
        >
          <h1 className="text-5xl font-normal">
            Solutions
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Discover how our cybersecurity training solutions transform your organization's security posture
          </p>
        </motion.div>

        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="space-y-28 sm:space-y-40">
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
      <div className="py-24 px-6 sm:px-6 lg:px-8 mb-32 text-center">
        <div className="border-t border-gray-800 pt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-light mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Take the first step toward a more secure organization
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/pricing"
              className="px-7 bg-white text-black py-3 rounded-full font-medium hover:bg-white/90 transition-colors inline-flex items-center"
            >
              View Plans <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/try-app"
              className="px-7 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors inline-flex items-center"
            >
              Try App <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}