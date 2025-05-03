'use client'

import React, { useState } from 'react';
import Footer from '@/app/(marketing)/navigation/footer';
import Navbar from '@/app/(marketing)/navigation/navbar';
import { Check } from 'lucide-react';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Select } from '@/components/select';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FeatureItemProps {
  text: string;
}

interface FormData {
  firstName: string;
  email: string;
  companyName: string;
  numberOfEmployees: string;
  reason: string;
  additionalDetails?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <div className="flex items-start">
    <Check className="h-5 w-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
    <span className="text-neutral-400">{text}</span>
  </div>
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

  return (
    <div className="min-h-screen font-sans text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center items-center py-32 mt-28 px-4 relative">
        <div className="absolute inset-0  pointer-events-none" />
        <div className="max-w-7xl w-full relative flex flex-col items-center">
          
          <div className="w-full max-w-3xl text-center mb-16">
            <h1 className="text-5xl font-normal mb-6">
              Contact
            </h1>
          </div>

          <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-around gap-10 mb-20 px-4">
              <div className="flex-1 p-6 border-white/10 text-center transition-all group">
                 <div className="h-10 w-10 mb-4 inline-block">
                   <svg viewBox="0 0 24 24" className="w-full h-full fill-current opacity-60 group-hover:opacity-100 transition-opacity">
                     <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                     <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                   </svg>
                 </div>
                 <h3 className="text-lg  font-normal mb-2">Technical Support</h3>
                 <p className="text-sm text-neutral-400 mb-4">Technical issues & product related questions.</p>
                 <Link 
                   href="mailto:support@xthreat.com"
                   className="inline-flex items-center px-6 py-2.5 border border-white/20 rounded-full hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all"
                 >
                   Email Support
                 </Link>
              </div>

              <div className="flex-1 p-6  border-white/10 text-center transition-all group">
                <div className="h-10 w-10 mb-4 inline-block">
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-current opacity-60 group-hover:opacity-100 transition-opacity">
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-normal mb-2">Sales Inquiries</h3>
                <p className="text-sm text-neutral-400 mb-4">How our solutions fit your business needs.</p>
                <div className="flex gap-3 items-center justify-center">
                  <Link 
                    href="mailto:sales@xthreat.com"
                    className="inline-flex items-center px-6 py-2.5 border border-white/20 rounded-full hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all"
                  >
                    Email Sales
                  </Link>
                </div>
              </div>
          </div>

          <div className="w-full max-w-3xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="bg-transparent border-b border-white/10 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                  required
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Work Email"
                  className="bg-transparent border-b border-white/10 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                  required
                />
              </div>

              <div className="mt-10">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Company Name"
                  className="bg-transparent border-b border-white/10 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
                <Select name="numberOfEmployees" required>
                  <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full">
                    <span className="text-start w-full text-neutral-500">Company Size</span>
                  </SelectTrigger>
                  <SelectContent className="bg-black border border-white/20">
                    <SelectItem value="1-50">1-50 employees</SelectItem>
                    <SelectItem value="51-250">51-250 employees</SelectItem>
                    <SelectItem value="251-500">251-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>

                <Select name="reason" required>
                  <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full">
                    <span className="text-start w-full text-neutral-500">Reason for Contact</span>
                  </SelectTrigger>
                  <SelectContent className="bg-black border border-white/20">
                    <SelectItem value="Get a Quote">Get a custom quote</SelectItem>
                    <SelectItem value="More information about the products">Learn more about our products</SelectItem>
                    <SelectItem value="General Inquiry">General inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-10">
                <textarea
                  id="additional"
                  name="additionalDetails"
                  placeholder="Additional Details"
                  className="bg-transparent border-b border-white/10 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full min-h-32 resize-none"
                />
              </div>

              <p className="text-neutral-400 text-center text-sm">
                By submitting this form, you agree to our{' '}
                <Link href="/privacy" className="text-white underline hover:no-underline">Privacy Policy</Link>.
              </p>

              {formStatus && (
                <div className={`mt-4 text-center ${formStatus.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                  {formStatus}
                </div>
              )}

              <div className="!mt-12 flex flex-col items-center space-y-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`rounded-full border border-white/40 py-3 px-8 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;