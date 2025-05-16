'use client'

import React, { useState, useEffect } from 'react';
import { Clock, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Select } from '@/components/select';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

const pricingPlans = {
  essential: {
    name: "Essential",
    monthlyPrice: 3.9,
    description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
    features: [
      "14-day free trial with full access",
      "Access to essential cybersecurity awareness training modules",
      "Core analytics and reporting",
      "Email support",
      "1 administrator seat",
      "Role-based training paths"
    ]
  },
  core: {
    name: "Core",
    monthlyPrice: 6.9,
    description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
    features: [
      "14-day free trial with full access",
      "Everything in the Essential plan",
      "Advanced analytics and custom reports",
      "3 administrator seats",
      "Risk assessment dashboard",
      "Advanced simulation exercises"
    ]
  },
  advanced: {
    name: "Advanced",
    monthlyPrice: 9.9,
    description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
    features: [
      "Everything in the Core plan",
      "Custom training module development",
      "Unlimited administrator seats",
      "Priority Email and Phone Support",
      "Custom integration solutions",
      "Dedicated success manager"
    ]
  }
};

export default function FreeTrial() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  type PlanType = 'essential' | 'core' | 'advanced';
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(() => {
    // Get the plan from URL
    const urlPlan = searchParams.get('plan')?.toLowerCase();
    // Check if the URL plan is valid, if not return 'core' as default
    return (urlPlan && ['essential', 'core', 'advanced'].includes(urlPlan)) 
      ? urlPlan as PlanType 
      : 'core';
  });

  const supabase = createClientComponentClient<Database>()

  const currentPlan = pricingPlans[selectedPlan];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;

    try {
      // First check if user exists in our database
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email);

      if (checkError) {
        console.error('Error checking existing user:', checkError);
        throw new Error(`Failed to check existing user: ${checkError.message}`);
      }

      if (existingUsers && existingUsers.length > 0) {
        setFormStatus('This email is already registered. Please try logging in.');
        setIsSubmitting(false);
        return;
      }

      // Create user in the database first
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          email: email,
          first_name: formData.get('firstName'),
          last_name: formData.get('lastName'),
          company_name: formData.get('companyName'),
          company_size: formData.get('numberOfEmployees'),
          job_title: formData.get('jobTitle'),
          selected_plan: selectedPlan,
          is_active: false,
          role: 'user', // Add this line to set the default role
          metadata: {
            signup_source: 'free_trial',
            initial_plan: selectedPlan,
            signup_date: new Date().toISOString()
          }
        });

      if (insertError) {
        console.error('Insert Error:', insertError);
        throw new Error(`Failed to create user profile: ${insertError.message}`);
      }

      // Send magic link/OTP email
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: formData.get('firstName'),
            selected_plan: selectedPlan,
            role: 'user' // Add this line to include role in auth metadata
          }
        }
      });

      if (signInError) {
        console.error('SignIn Error:', signInError);
        throw new Error('Failed to send verification email');
      }

      setFormStatus('Success! Check your email for a verification code.');
      setShowSuccess(true);
      form.reset();

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setFormStatus(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-black text-white flex flex-col">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-black border-b border-white/20 p-12 max-w-xl w-full text-center"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-normal mb-8"
              >
                Success!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-neutral-400 mb-12"
              >
                Log in to your account and start your free trial!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full border border-white/40 py-3 px-8 hover:bg-white/5 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex justify-center items-center px-4 py-32">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-20">
            <h1 className="text-6xl font-normal mb-6">
              Free Trial
            </h1>
            <p className="text-xl text-neutral-400">
              Sign up for a 14-day trial, no credit card required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
            <div className="lg:col-span-3">
              <button 
                onClick={() => router.back()}
                className="flex text-sm items-center mb-10 text-neutral-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="mr-1" size={16}/> Back
              </button>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {isSubmitting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <motion.div
                        animate={{
                          rotate: 360,
                          transition: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                        className="w-16 h-16 border-4 border-gray-800 border-t-white rounded-full mb-4 mx-auto"
                      />
                      <p className="text-neutral-400">Starting your trial...</p>
                    </div>
                  </motion.div>
                )}

                <div className="mb-10">
                  <Select 
                    value={selectedPlan}
                    onValueChange={(value: PlanType) => {
                      setSelectedPlan(value);
                      // Create new URLSearchParams object from current params
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('plan', value);
                      // Use replace instead of push to avoid adding to browser history
                      router.replace(`/free-trial?${params.toString()}`);
                    }}
                  >
                    <SelectTrigger className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full">
                      <span className="text-start w-full">{currentPlan.name} Plan</span>
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-white/20">
                      <SelectItem value="essential">Essential Plan</SelectItem>
                      <SelectItem value="core">Core Plan</SelectItem>
                      <SelectItem value="advanced">Advanced Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="bg-black border-b border-white/20 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="bg-black border-b border-white/20 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                    required
                  />
                </div>

                <div className="mt-10">
                  <input
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    className="bg-black border-b border-white/20 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    className="bg-black border-b border-white/20 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                    required
                  />
                  <Select name="numberOfEmployees" required>
                    <SelectTrigger className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full">
                      <span className="text-start w-full">Company Size</span>
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-white/20">
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="51-250">51-250 employees</SelectItem>
                      <SelectItem value="251-500">251-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-10">
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    className="bg-black border-b border-white/20 rounded-none px-0 py-4 h-auto text-xl font-normal focus:outline-none w-full"
                    required
                  />
                </div>

                {formStatus && (
                  <div className={`p-4 ${formStatus.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
                    {formStatus}
                  </div>
                )}

                <div className="!mt-16">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`rounded-full border border-white/40 py-3 px-8 hover:bg-white/5 transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Starting trial...' : 'Start Free Trial'}
                  </motion.button>

                  <p className="text-sm text-neutral-400 mt-6">
                    By creating an account, you agree to our{' '}
                    <Link href="/terms" className="text-white underline hover:no-underline">Terms of Service</Link> and{' '}
                    <Link href="/privacy" className="text-white underline hover:no-underline">Privacy Policy</Link>
                  </p>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="border-b border-white/20 pt-8 pb-12">
                <h2 className="text-2xl font-normal mb-6">
                  {currentPlan.name}
                </h2>
                
                <div className="mb-6">
                  <div className="text-7xl font-light">
                    €{currentPlan.monthlyPrice.toFixed(1)}
                  </div>
                  <div className="text-neutral-400 mt-1">
                    Per user / month
                  </div>
                </div>
                
                <p className="text-neutral-400 mb-10">
                  {currentPlan.description}
                </p>
                
                <div className="flex items-center text-sm text-white bg-white/5 rounded-full px-4 py-2 w-fit mb-8">
                  <Clock className="w-4 h-4 mr-2" />
                  14-day free trial
                </div>
                
                <ul className="space-y-4">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-neutral-400">
                      <Check className="h-5 w-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}