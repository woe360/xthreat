'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navigation/navbar';
import Footer from '../navigation/footer';

interface PrivacySection {
  title: string;
  content: string | string[] | { text: string; list?: string[] };
}

const LAST_UPDATED_DATE = '2024-09-19';

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: 'Information We Collect',
    content: {
      text: 'We may collect the following types of information:',
      list: [
        'Personal Information: Name, email address, phone number, and other contact details you provide.',
        'Account Information: Login credentials and preferences associated with your account.',
        'Usage Data: Information about how you use our services, including IP address, browser type, pages visited, and time spent on our website.',
        'Technical Data: Information about your device, operating system, and network.'
      ]
    }
  },
  {
    title: 'How We Use Your Information',
    content: {
      text: 'We use the collected information for various purposes, including:',
      list: [
        'Providing and maintaining our services',
        'Improving and personalizing user experience',
        'Communicating with you about our services, updates, and promotional offers',
        'Analyzing usage patterns and trends to enhance our services',
        'Detecting, preventing, and addressing technical issues or fraudulent activities'
      ]
    }
  },
  {
    title: 'Data Sharing and Disclosure',
    content: {
      text: 'We may share your information in the following circumstances:',
      list: [
        'With your consent',
        'To comply with legal obligations',
        'To protect our rights, privacy, safety, or property',
        'In connection with a merger, acquisition, or sale of assets',
        'With service providers who assist us in operating our business (subject to confidentiality agreements)'
      ]
    }
  },
  {
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'
  },
  {
    title: 'Your Rights and Choices',
    content: {
      text: 'You have certain rights regarding your personal information, including:',
      list: [
        'Accessing, correcting, or deleting your personal information',
        'Withdrawing your consent at any time',
        'Opting out of marketing communications',
        'Requesting a copy of your personal data'
      ]
    }
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: 'We use cookies and similar tracking technologies to collect and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.'
  },
  {
    title: "Children's Privacy",
    content: 'Our services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers.'
  },
  {
    title: 'Changes to This Privacy Policy',
    content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.'
  }
];

const PolicySection = ({ index, section }: { index: number; section: PrivacySection }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <h2 className="text-2xl font-semibold text-white mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
      {`${index + 1}. ${section.title}`}
    </h2>
    {typeof section.content === 'string' ? (
      <p className="text-gray-300 mb-8">{section.content}</p>
    ) : 'text' in section.content ? (
      <>
        <p className="text-gray-300 mb-4">{section.content.text}</p>
        <ul className="list-disc pl-5 mb-8 text-gray-300">
          {section.content.list?.map((item, i) => (
            <li key={i} className="mb-2">{item}</li>
          ))}
        </ul>
      </>
    ) : (
      section.content.map((paragraph, i) => (
        <p key={i} className="text-gray-300 mb-4">
          {paragraph}
        </p>
      ))
    )}
  </motion.div>
);

export default function PrivacyPolicy() {
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
          Privacy Policy
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
            At XThreat, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            services or visit our website. By using our services, you consent to the data practices described in this policy.
          </p>
          {PRIVACY_SECTIONS.map((section, index) => (
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