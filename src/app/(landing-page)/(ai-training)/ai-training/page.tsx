'use client'
import React from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { Brain, Zap, Users, BarChart, Target, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: number }> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black p-6 rounded-lg border border-gray-800 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const StatItem: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="text-center"
  >
    <div className="text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-gray-300">{label}</div>
  </motion.div>
);

const AIEnhancedTraining: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow py-24 px-4 relative">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.h1 
              {...fadeInUp}
              className="text-5xl pb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mt-32 mb-6"
            >
              AI Enhanced Training
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
            >
              Revolutionize your cybersecurity awareness with our AI-powered training platform, designed to adapt to emerging threats and personalize learning experiences.
            </motion.p>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <FeatureCard 
              icon={<Brain className="w-8 h-8 text-white" />}
              title="Adaptive Learning Paths"
              description="AI algorithms tailor training content to each employee's skill level and learning pace, ensuring optimal engagement and retention."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-white" />}
              title="Real-time Threat Simulation"
              description="AI-generated scenarios based on the latest cybersecurity trends provide realistic and up-to-date training experiences."
              delay={0.5}
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-white" />}
              title="Behavioral Analysis"
              description="Advanced AI models analyze user behavior to identify high-risk individuals and provide targeted intervention strategies."
              delay={0.6}
            />
            <FeatureCard 
              icon={<BarChart className="w-8 h-8 text-white" />}
              title="Predictive Analytics"
              description="Leverage AI-driven insights to forecast potential vulnerabilities and proactively strengthen your security posture."
              delay={0.7}
            />
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-white" />}
              title="Personalized Assessments"
              description="AI-powered quizzes and tests adapt in real-time, challenging users based on their performance and learning progress."
              delay={0.8}
            />
            <FeatureCard 
              icon={<RefreshCw className="w-8 h-8 text-white" />}
              title="Continuous Learning Loop"
              description="Our AI system constantly updates training materials based on global threat intelligence and user feedback for cutting-edge relevance."
              delay={0.9}
            />
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-black border border-gray-800 p-8 rounded-lg mb-16"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">The XThreat AI Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatItem value="98%" label="Improvement in Threat Detection Skills" delay={1.1} />
              <StatItem value="75%" label="Reduction in Security Incidents" delay={1.2} />
              <StatItem value="5x" label="Faster Adaptation to New Cyber Threats" delay={1.3} />
              <StatItem value="99.5%" label="User Engagement Rate" delay={1.4} />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center mt-36 mb-10"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6">Elevate Your Cybersecurity Awareness with AI</h2>
            <p className="text-xl font-serif italic max-w-3xl mx-auto text-gray-300 mb-8">
              Stay ahead of cyber threats with XThreat's AI-enhanced training platform. Empower your team with adaptive, cutting-edge security awareness.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300"
            >
              <Link href="/pricing">
                Explore our plans
              </Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIEnhancedTraining;
