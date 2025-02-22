'use client'

import React, { useState } from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { Check } from 'lucide-react';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Select } from '@/components/select';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  delay: number;
}

interface FormData {
  firstName: string;
  email: string;
  companyName: string;
  numberOfEmployees: string;
  reason: string;
  additionalDetails?: string;
}

interface AnimationProps {
  initial: { opacity: number; y?: number; scale?: number };
  animate: { opacity: number; y?: number; scale?: number };
  transition: { delay?: number; duration: number };
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, delay }) => (
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

const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://getform.io/f/aroldklb', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFormStatus('Thank you! Your submission has been received.');
        form.reset();
      } else {
        setFormStatus('Oops! There was a problem with your submission.');
      }
    } catch (error) {
      setFormStatus('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp: AnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen font-sans bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-52 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
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
              className="text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold"
            >
              Maximize Your Defense
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg font-serif italic text-gray-300"
            >
              Revolutionize your security awareness and phishing training with our cutting-edge, automated solutions.
            </motion.p>
            <div className="space-y-4">
              <FeatureItem 
                icon={<Check className="w-4 h-4 text-gray-200" />}
                text="Tailored, hands-on training for enhanced learning"
                delay={0.3}
              />
              <FeatureItem 
                icon={<Check className="w-4 h-4 text-gray-200" />}
                text="Gamified real-world scenarios for increased engagement"
                delay={0.4}
              />
              <FeatureItem 
                icon={<Check className="w-4 h-4 text-gray-200" />}
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
            className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 p-8 rounded-lg"
          >
            <motion.h1 
              {...fadeInUp}
              className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-8 text-center"
            >
              Contact
            </motion.h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                    required
                  />
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Work email*"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                    required
                  />
                </motion.div>
              </div>
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Company name*"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                  required
                />
              </motion.div>

              {/* Select inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                  <Select name="numberOfEmployees" required>
                    <SelectTrigger className={cn(
                      "w-full px-5 py-6 rounded-lg text-base bg-neutral-900/30  text-gray-400 border border-gray-800",
                      "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}>
                      <SelectValue placeholder="Company size*" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-950 border border-gray-800 text-gray-300">
                      <SelectItem value="1-50" className="hover:bg-neutral-800">1-50</SelectItem>
                      <SelectItem value="51-250" className="hover:bg-neutral-800">51-250</SelectItem>
                      <SelectItem value="251-500" className="hover:bg-neutral-800">251-500</SelectItem>
                      <SelectItem value="501-1000" className="hover:bg-neutral-800">501-1000</SelectItem>
                      <SelectItem value="1000+" className="hover:bg-neutral-800">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                  <Select name="reason" required>
                    <SelectTrigger className={cn(
                      "w-full px-4 py-6 rounded-lg text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
                      "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}>
                      <SelectValue placeholder="Select your reason*" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-950 border border-gray-800 text-gray-300">
                      <SelectItem value="Get a Quote" className="hover:bg-neutral-800">Get a custom quote</SelectItem>
                      <SelectItem value="More information about the products" className="hover:bg-neutral-800">To know more about products</SelectItem>
                      <SelectItem value="General Inquiry" className="hover:bg-neutral-800">General inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
                <textarea
                  id="additional"
                  name="additionalDetails"
                  placeholder="Any additional details you'd like to share with us?"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800 h-24"
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
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  className={`bg-gray-200 hover:bg-gray-300 text-black px-10 py-3 rounded-xl font-normal transition duration-300 ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              </motion.div>
            </form>

            {formStatus && (
              <div className="text-center mt-4 text-base text-green-500">
                {formStatus}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;