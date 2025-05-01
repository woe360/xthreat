'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface TimelinePoint {
  date: string;
  month: string;
  year: string;
  title?: string;
  description?: string;
  isActive?: boolean;
}

const timelinePoints: TimelinePoint[] = [
  {
    date: '',
    month: 'Q2',
    year: '2025',
    title: 'Beta Launch',
    description: 'Initial platform release with core phishing simulation features and basic microlearning modules.',
    isActive: false
  },
  {
    date: '',
    month: 'Q3',
    year: '2025',
    title: 'Full Platform Launch',
    description: 'Complete platform rollout with enhanced training modules and advanced threat simulations.',
    isActive: false
  },
  {
    date: '',
    month: 'Q4',
    year: '2025',
    title: 'Enterprise Release',
    description: 'Introducing AI-powered analytics, compliance reporting, and role-based training customization.',
    isActive: false
  }
];

export const RoadmapSection = () => {
  return (
    <section className="relative py-32 w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-12 mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-normal text-white"
          >
            Building the future of security awareness
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            We're developing a next-generation platform that will transform how organizations approach cybersecurity training. Through AI-driven personalization and engaging content, we'll make security awareness an integral part of company culture.
          </motion.p>
        </div>

        <div className="relative mt-24">
          {/* Timeline line that extends beyond the container */}
          <div className="absolute left-[-9999px] right-[-9999px] h-[2px] bg-gray-800/50" style={{ top: '40px' }} />

          {/* Timeline points */}
          <div className="relative flex justify-between items-start w-full">
            {timelinePoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start relative w-[300px]"
              >
                <div className="flex flex-col mb-6">
                  <span className="text-base text-gray-500 font-medium tracking-wide">
                    {point.month} {point.year}
                  </span>
                </div>
                {/* Center the point on the line */}
                <div className="relative flex items-center justify-center" style={{ marginTop: '-1px' }}>
                  <div 
                    className={`w-4 h-4 rounded-full ${
                      point.isActive 
                        ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                        : 'bg-gray-800 border border-gray-700'
                    }`} 
                  />
                </div>
                <div className="mt-8">
                  <h3 className="text-white text-xl font-medium mb-3">{point.title}</h3>
                  <p className="text-gray-400 text-base max-w-[300px]">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 