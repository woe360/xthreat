'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/(marketing)/navigation/navbar';
import Footer from '@/app/(marketing)/navigation/footer';

interface TermSection {
  title: string;
  content: string | string[];
}

const LAST_UPDATED_DATE = '2024-09-19';

const TERMS_SECTIONS: TermSection[] = [
  {
    title: 'Use of Our Services',
    content: 'You must be at least 18 years old to use our services. By using our services, you warrant that you are at least 18 years of age and you are legally capable of entering into binding contracts. If you are accessing and using our services on behalf of a business or entity, you represent and warrant that you have the authority to bind that business or entity to these Terms.'
  },
  {
    title: 'User Accounts',
    content: [
      'When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.',
      'You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.'
    ]
  },
  {
    title: 'Intellectual Property',
    content: 'The service and its original content, features, and functionality are and will remain the exclusive property of XThreat and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of XThreat.'
  },
  {
    title: 'User Content',
    content: [
      'Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the service, including its legality, reliability, and appropriateness.',
      'By posting User Content on or through the service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such User Content on and through the service. You retain any and all of your rights to any User Content you submit, post or display on or through the service and you are responsible for protecting those rights.'
    ]
  },
  {
    title: 'Termination',
    content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.'
  },
  {
    title: 'Limitation of Liability',
    content: 'In no event shall XThreat, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.'
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.'
  }
];

const PolicySection = ({ index, section }: { index: number; section: TermSection }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <h2 className="text-2xl font-semibold text-white mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
      {`${index + 1}. ${section.title}`}
    </h2>
    {Array.isArray(section.content) ? (
      section.content.map((paragraph, i) => (
        <p key={i} className="text-gray-300 mb-4">
          {paragraph}
        </p>
      ))
    ) : (
      <p className="text-gray-300 mb-8">{section.content}</p>
    )}
  </motion.div>
);

export default function TermsOfService() {
  return (
    <main className="relative">
      <div className="absolute inset-0 min-h-screen w-full bg-[#0b0b0b] [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)] z-[-1]"></div>
      <Navbar/>
      <div className="max-w-[1330px] mx-auto py-12 px-6 sm:px-6 lg:py-16 relative z-10 pt-24">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 sm:text-5xl sm:tracking-tight lg:text-6xl mb-8 pb-4 border-b border-gray-800"
        >
          Terms of Service
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-gray-400 mb-8"
        >
          Last Updated: {LAST_UPDATED_DATE}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-300"
        >
          <p className="mb-8">
            Welcome to XThreat. These Terms of Service ("Terms") govern your use of our website, products, and services. 
            By accessing or using XThreat, you agree to be bound by these Terms. If you disagree with any part of the terms, 
            you may not access our services.
          </p>
          {TERMS_SECTIONS.map((section, index) => (
            <PolicySection 
              key={section.title}
              index={index}
              section={section}
            />
          ))}
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}