'use client'
import React, { useState } from 'react';
import { Brain, Zap, Target, ShieldAlert, Settings, Shield, Dot, Lock, UserCheck, TrendingUp, ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';
import Link from 'next/link';

const AboutXThreat = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const approaches = [
    { title: "Interactive Quizzes", desc: "Engage with scenario-based learning" },
    { title: "Adaptive Learning", desc: "Personalized training journeys" },
    { title: "Real-world Simulations", desc: "Prepare for actual threats" },
    { title: "Weak Points Analysis", desc: "Identify vulnerabilities" },
    { title: "Custom Trainings", desc: "Tailored to your needs" },
  ];

  const challenges = [
    "Overwhelming amounts of cybersecurity data",
    "Low engagement with traditional security training methods",
    "The constant evolution of cyber threats",
  ];

  const impacts = [
    { icon: Lock, title: "Enhanced Security Posture", value: "85%", desc: "reduction in successful phishing attempts" },
    { icon: UserCheck, title: "Employee Engagement", value: "93%", desc: "completion rate for training modules" },
    { icon: TrendingUp, title: "ROI on Security", value: "3.5x", desc: "return on investment in cybersecurity training" },
  ];

  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

  return (
    <div className="min-h-min bg-black text-white relative overflow-hidden">
      <Navbar />
  
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-56 mb-21 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl mb-6">
            Empowering Your First Line of Defense
          </h1>
          <p className="mt-4 text-xl font-serif italic text-gray-400 max-w-3xl mx-auto">
            XThreat transforms your employees from potential cybersecurity vulnerabilities into your strongest line of defense.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <section className="mb-20 px-4">
          <motion.h2
            {...fadeInUp}
            className="text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-8 text-center"
          >
            Our Story
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg md:w-1/2 text-gray-300 space-y-6"
            >
              <p>
                At XThreat, we help your employees become an active part of your cybersecurity strategy. Our innovative platform delivers engaging, interactive training that empowers your team to recognize and respond to cyber threats with confidence.
              </p>
              <p>
                We understand the challenges businesses face in today&apos;s complex threat landscape.
              </p>
              <p>
                That&apos;s why we&apos;ve developed a solution that cuts through the noise, delivering clear, practical training that not only educates but transforms how your organization handles cyber threats.
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="md:w-1/2"
            >
              <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-4">
                Challenges We Address
              </h3>
              <div className="bg-black border border-gray-800 rounded-lg p-6 shadow-lg">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    className="mb-4 last:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    
                    <div
                      className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
                        activeChallenge === index ? 'bg-gray-800' : 'hover:bg-gray-900'
                      }`}
                      onClick={() => setActiveChallenge(activeChallenge === index ? null : index)}
                    >
                      <Shield className="h-6 w-6 mr-3 flex-shrink-0 text-white" />
                      <p className="font-medium">{challenge}</p>
                    </div>
                    {activeChallenge === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 ml-9 text-sm text-gray-400"
                      >
                        XThreat provides tailored solutions to address this challenge, ensuring your team stays ahead of potential threats.
                      </motion.div>
                      
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="mb-20">
          <motion.h2 
            {...fadeInUp}
            className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-8 text-center"
          >
            Our Impact
          </motion.h2>
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {impacts.map((impact, index) => (
              <div key={index} className="bg-black border border-gray-800 rounded-lg p-6 text-center">
                <impact.icon className="h-12 w-12 text-white mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">{impact.title}</h3>
                <p className="text-3xl font-bold text-white mb-2">{impact.value}</p>
                <p className="text-sm text-gray-400">{impact.desc}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mt-48 font-semibold pb-1 mb-4">Ready to strengthen your cybersecurity posture?</h2>
          <p className="mb-6 text-gray-400 text-xl font-serif italic max-w-3xl mx-auto">Join us in creating a world where every employee is a cybersecurity champion. Let's turn your team into your most powerful cybersecurity asset.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-xl shadow-sm text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Link
              href="/pricing">
              See Our Plans
            </Link>
          </motion.button>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutXThreat;
