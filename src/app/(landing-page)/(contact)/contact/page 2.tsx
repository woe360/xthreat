'use client'
import React from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { Shield, Zap, Users } from 'lucide-react';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/global/ui/select";
import { Select } from '@/components/global/ui/select';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon, text, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center space-x-3"
  >
    {icon}
    <p className="text-gray-300">{text}</p>
  </motion.div>
);

const ContactPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-52 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20" />
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.h1 
              {...fadeInUp}
              className="text-4xl font-bold mb-4"
            >
              Experience XThreat's Power
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg text-gray-300"
            >
              Revolutionize your security awareness and phishing training with our cutting-edge, automated solutions.
            </motion.p>
            <div className="space-y-4">
              <FeatureItem 
                icon={<Shield className="w-6 h-6 text-blue-400" />}
                text="Tailored, hands-on training for enhanced learning"
                delay={0.3}
              />
              <FeatureItem 
                icon={<Zap className="w-6 h-6 text-blue-400" />}
                text="Gamified real-world scenarios for increased engagement"
                delay={0.4}
              />
              <FeatureItem 
                icon={<Users className="w-6 h-6 text-blue-400" />}
                text="Continuous, practice-based learning for lasting impact"
                delay={0.5}
              />
            </div>
          </motion.div>
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg backdrop-blur-sm"
          >
            <motion.h1 
              {...fadeInUp}
              className="text-3xl font-bold mb-8 text-center"
            >
              Contact Us
            </motion.h1>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none border border-gray-600"
                  />
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                  <input
                    type="email"
                    id="email"
                    placeholder="Work email*"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none border border-gray-600"
                    required
                  />
                </motion.div>
              </div>
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Company name*"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none border border-gray-600"
                  required
                />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                  <Select required>
                    <SelectTrigger className="w-full px-5 py-6 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <SelectValue placeholder="Select number of employees*" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-600 text-gray-300">
                      <SelectItem value="1-50" className="">1-50</SelectItem>
                      <SelectItem value="51-250" className="">51-250</SelectItem>
                      <SelectItem value="251-500" className="hover:bg-gray-700">251-500</SelectItem>
                      <SelectItem value="501-1000" className="hover:bg-gray-700">501-1000</SelectItem>
                      <SelectItem value="1000+" className="hover:bg-gray-700">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                  <Select required>
                    <SelectTrigger className="w-full px-4 py-6 rounded-lg bg-gray-800 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <SelectValue placeholder="Select your reason*" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-600 text-gray-300">
                      <SelectItem value="Get a Quote" className="hover:bg-gray-700">Get a custom quote</SelectItem>
                      <SelectItem value="More information about the products" className="hover:bg-gray-700">To know more about products</SelectItem>
                      <SelectItem value="General Inquiry" className="hover:bg-gray-700">General inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
              <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
                <textarea
                  id="additional"
                  placeholder="Any additional details you'd like to share"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none border border-gray-600 h-24"
                />
                <p className="text-xs text-gray-400 mt-2 text-center">
                  By submitting this form, you agree to our <a href="/privacy" className="text-gray-200 hover:underline">Privacy Policy</a>.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-200 hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300"
                >
                  Submit
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;


