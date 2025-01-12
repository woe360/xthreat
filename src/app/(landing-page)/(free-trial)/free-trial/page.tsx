// 'use client'

// import React, { useState } from 'react';
// import { Shield, Zap, Clock, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Select } from '@/components/ui/select';
// import { motion } from 'framer-motion';
// import { cn } from "@/lib/utils";
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';

// const FreeTrialPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const [formStatus, setFormStatus] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [selectedPlan, setSelectedPlan] = useState<string>(
//     searchParams.get('plan')?.charAt(0).toUpperCase() + searchParams.get('plan')?.slice(1) || 'Essential'
//   );

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSubmitting(true);

//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//     formData.append('plan', selectedPlan);

//     try {
//       const response = await fetch('https://getform.io/f/aroldklb', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         setFormStatus('Success! Check your email to activate your free trial.');
//         form.reset();
//       } else {
//         setFormStatus('Oops! There was a problem starting your trial.');
//       }
//     } catch (error) {
//       setFormStatus('There was an error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const planFeatures = {
//     'Essential': [
//       'Essential cybersecurity modules',
//       'Core analytics and reporting',
//       'Email support',
//       'Role-based training paths'
//     ],
//     'Core': [
//       'All Essential features',
//       'Advanced analytics',
//       'Custom reports',
//       'Risk assessment dashboard'
//     ],
//     'Advanced': [
//       'All Core features',
//       'Custom training development',
//       'Priority support',
//       'Dedicated success manager'
//     ]
//   };

//   return (
//     <div className="min-h-screen font-sans bg-black text-white flex flex-col">
//       <main className="flex-grow flex justify-center items-center px-4 py-12">
//         <div className="max-w-6xl w-full">
//           {/* Trial Progress */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
//               Step 1 of 2: Create Your Account
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//             {/* Form Section (3 columns) */}
//             <div className="lg:col-span-3 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8">
//               <div className="flex items-center justify-between mb-8">
//                 <h1 className="text-2xl font-semibold">Start Your Free Trial</h1>
//                 <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
//                   <Clock className="w-4 h-4 mr-2" />
//                   14 Days Free
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Selected Plan Banner */}
//                 <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-sm text-gray-400">Selected Plan</p>
//                       <p className="text-lg font-medium">{selectedPlan}</p>
//                     </div>
//                     <Link 
//                       href="/pricing" 
//                       className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
//                     >
//                       Change Plan
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First name*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last name*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                 </div>

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Work email*"
//                   className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                   required
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <input
//                     type="text"
//                     name="companyName"
//                     placeholder="Company name*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                   <Select name="numberOfEmployees" required>
//                     <SelectTrigger className={cn(
//                       "w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 border border-gray-800",
//                       "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                     )}>
//                       <SelectValue placeholder="Company size*" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-[#050607] border border-gray-800 text-gray-300">
//                       <SelectItem value="1-50">1-50 employees</SelectItem>
//                       <SelectItem value="51-250">51-250 employees</SelectItem>
//                       <SelectItem value="251-500">251-500 employees</SelectItem>
//                       <SelectItem value="501-1000">501-1000 employees</SelectItem>
//                       <SelectItem value="1000+">1000+ employees</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     name="jobTitle"
//                     placeholder="Job title*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                 </div>

//                 <div className="!mt-8">
//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     whileHover={!isSubmitting ? { scale: 1.02 } : {}}
//                     whileTap={!isSubmitting ? { scale: 0.98 } : {}}
//                     className={`w-full flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors ${
//                       isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {isSubmitting ? 'Starting trial...' : 'Start Free Trial'}
//                     <ArrowRight className="w-5 h-5 ml-2" />
//                   </motion.button>

//                   <p className="text-xs text-gray-400 text-center mt-4">
//                     By creating an account, you agree to our{' '}
//                     <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a> and{' '}
//                     <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
//                   </p>
//                 </div>

//                 {formStatus && (
//                   <div className="text-center mt-4 text-green-400">
//                     {formStatus}
//                   </div>
//                 )}
//               </form>
//             </div>

//             {/* Info Section (2 columns) */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* Plan Features */}
//               <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
//                 <h2 className="text-xl font-medium mb-4">What's Included</h2>
//                 <div className="space-y-3">
//                   {planFeatures[selectedPlan as keyof typeof planFeatures]?.map((feature, index) => (
//                     <div key={index} className="flex items-start">
//                       <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
//                       <span className="text-gray-300">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trust Indicators */}
//               <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
//                 <h2 className="text-xl font-medium mb-4">Trusted Security</h2>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-3">
//                     <Shield className="w-5 h-5 text-blue-400" />
//                     <span className="text-gray-300">SOC 2 Type II Certified</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Shield className="w-5 h-5 text-blue-400" />
//                     <span className="text-gray-300">ISO 27001 Compliant</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Shield className="w-5 h-5 text-blue-400" />
//                     <span className="text-gray-300">GDPR Compliant</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Social Proof */}
//               <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
//                 <h2 className="text-xl font-medium mb-4">Join 5000+ Companies</h2>
//                 <div className="grid grid-cols-3 gap-4">
//                   {/* Replace with actual company logos */}
//                   <div className="h-12 bg-gray-800/50 rounded-lg"></div>
//                   <div className="h-12 bg-gray-800/50 rounded-lg"></div>
//                   <div className="h-12 bg-gray-800/50 rounded-lg"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default FreeTrialPage;



// 'use client'

// import React, { useState } from 'react';
// import { Shield, Zap, Clock, ArrowRight, CheckCircle2, ChevronLeft, Check, ChevronRight } from 'lucide-react';
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Select } from '@/components/ui/select';
// import { motion } from 'framer-motion';
// import { cn } from "@/lib/utils";
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';

// const FreeTrialPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [formStatus, setFormStatus] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [selectedPlan, setSelectedPlan] = useState<string>(
//     searchParams.get('plan')?.charAt(0).toUpperCase() + searchParams.get('plan')?.slice(1) || 'Essential'
//   );

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSubmitting(true);

//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//     formData.append('plan', selectedPlan);

//     try {
//       const response = await fetch('https://getform.io/f/aroldklb', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         setFormStatus('Success! Check your email to activate your free trial.');
//         form.reset();
//       } else {
//         setFormStatus('Oops! There was a problem starting your trial.');
//       }
//     } catch (error) {
//       setFormStatus('There was an error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const planFeatures = {
//     'Essential': [
//       'Essential cybersecurity modules',
//       'Core analytics and reporting',
//       'Email support',
//       'Role-based training paths',
//       'Basic phishing simulations',
//       'Monthly security reports',
//       'Standard templates',
//       'Basic risk assessment',
//       'Up to 3 admin users',
//       'Email notifications',
//       'Standard SLA support'
//     ],
//     'Core': [
//       'Everything in Essential, plus:',
//       'Advanced analytics dashboard',
//       'Custom reports builder',
//       'Risk assessment dashboard',
//       'Advanced phishing campaigns',
//       'Custom training paths',
//       'Compliance training modules',
//       'API access',
//       'Up to 10 admin users',
//       'Priority email support',
//       'Advanced threat simulations'
//     ],
//     'Advanced': [
//       'Everything in Core, plus:',
//       'Custom module development',
//       'White-label options',
//       'Dedicated success manager',
//       'Custom integrations',
//       'Enterprise API access',
//       'Advanced security features',
//       'Custom compliance modules',
//       'Unlimited admin users',
//       '24/7 priority support',
//       'Custom SLA options'
//     ]
//   };

//   return (
//     <div className="min-h-screen font-sans bg-black text-white flex flex-col">
//       {/* Back Button */}
      

//       <main className="flex-grow flex justify-center items-center px-4 py-12">
//         <div className="max-w-6xl w-full">
//           {/* Trial Progress */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
//               Step 1 of 2: Create Your Account
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//             {/* Form Section (3 columns) */}
//             <div className="lg:col-span-3 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8">
//               <div className="flex items-center justify-between mb-8">
//                 <h1 className="text-2xl font-semibold">Start Your Free Trial</h1>
//                 <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
//                   <Clock className="w-4 h-4 mr-2" />
//                   14 Days Free
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Plan Selection Dropdown */}
//                 <div className="mb-6">
//                   <Select 
//                     value={selectedPlan.toLowerCase()} 
//                     onValueChange={(value) => setSelectedPlan(value.charAt(0).toUpperCase() + value.slice(1))}
//                   >
//                     <SelectTrigger className={cn(
//                       "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
//                       "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                     )}>
//                       <SelectValue placeholder="Select your plan" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-neutral-950 border border-gray-800 text-gray-300">
//                       <SelectItem value="essential">Essential Plan</SelectItem>
//                       <SelectItem value="core">Core Plan</SelectItem>
//                       <SelectItem value="advanced">Advanced Plan</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First name*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last name*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                 </div>

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Work email*"
//                   className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                   required
//                 />

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <input
//                     type="text"
//                     name="companyName"
//                     placeholder="Company name*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                   <Select name="numberOfEmployees" required>
//                     <SelectTrigger className={cn(
//                       "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
//                       "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                     )}>
//                       <SelectValue placeholder="Company size*" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-neutral-950 border border-gray-800 text-gray-300">
//                       <SelectItem value="1-50">1-50 employees</SelectItem>
//                       <SelectItem value="51-250">51-250 employees</SelectItem>
//                       <SelectItem value="251-500">251-500 employees</SelectItem>
//                       <SelectItem value="501-1000">501-1000 employees</SelectItem>
//                       <SelectItem value="1000+">1000+ employees</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     name="jobTitle"
//                     placeholder="Job title*"
//                     className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
//                     required
//                   />
//                 </div>

//                 <div className="!mt-8">
//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     whileHover={!isSubmitting ? { scale: 1.02 } : {}}
//                     whileTap={!isSubmitting ? { scale: 0.98 } : {}}
//                     className={`w-full flex items-center justify-center px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors ${
//                       isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {isSubmitting ? 'Starting trial...' : 'Start Free Trial'}
//                     <ChevronRight className="w-5 h-5 ml-2" />
//                   </motion.button>

//                   <p className="text-xs text-gray-400 text-center mt-4">
//                     By creating an account, you agree to our{' '}
//                     <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a> and{' '}
//                     <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
//                   </p>
//                 </div>

//                 {formStatus && (
//                   <div className="text-center mt-4 text-green-400">
//                     {formStatus}
//                   </div>
//                 )}
//               </form>
//             </div>

//             {/* Info Section (2 columns) */}
//             <div className="lg:col-span-2 space-y-8">
//               {/* Plan Features */}
//               <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
//                 <h2 className="text-xl font-medium mb-4">What's Included in {selectedPlan}</h2>
//                 <div className="space-y-3">
//                   {planFeatures[selectedPlan as keyof typeof planFeatures]?.map((feature, index) => (
//                     <div key={index} className="flex items-start">
//                       <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
//                       <span className="text-gray-300">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default FreeTrialPage;

'use client'

import React, { useState } from 'react';
import { Shield, Zap, Clock, ArrowRight, CheckCircle2, ChevronLeft, Check, ChevronRight } from 'lucide-react';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const FreeTrialPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>(
    searchParams.get('plan')?.charAt(0).toUpperCase() + searchParams.get('plan')?.slice(1) || 'Essential'
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('plan', selectedPlan);

    try {
      const response = await fetch('https://getform.io/f/aroldklb', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFormStatus('Success! Check your email to activate your free trial.');
        form.reset();
      } else {
        setFormStatus('Oops! There was a problem starting your trial.');
      }
    } catch (error) {
      setFormStatus('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pricingPlans = {
    'Essential': {
      name: "Essential",
      monthlyPrice: 2.3,
      yearlyPrice: 22.08,
      description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
      features: [
        "14-day free trial with full access",
        "Access to essential cybersecurity awareness training modules",
        "Core analytics and reporting",
        "Email support",
        "1 administrator seat",
        "Role-based training paths",
      ],
    },
    'Core': {
      name: "Core",
      monthlyPrice: 4.5,
      yearlyPrice: 43.20,
      description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
      features: [
        "14-day free trial with full access",
        "Everything in the Essential plan",
        "Advanced analytics and custom reports",
        "3 administrator seats",
        "Risk assessment dashboard",
        "Advanced simulation exercises",
      ],
      highlighted: true
    },
    'Advanced': {
      name: "Advanced",
      monthlyPrice: 6.4,
      yearlyPrice: 61.44,
      description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
      features: [
        "Everything in the Core plan",
        "Custom training module development",
        "Unlimited administrator seats",
        "Priority Email and Phone Support",
        "Custom integration solutions",
        "Dedicated success manager",
      ],
    }
  };

  return (
    <div className="min-h-screen font-sans bg-black text-white flex flex-col">
      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
              Sign up for a free trial, no credit card required.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8">
                <div className="flex items-center justify-center mb-8">
                <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">Create an Account</h1>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                  <Select 
                    value={selectedPlan.toLowerCase()} 
                    onValueChange={(value) => setSelectedPlan(value.charAt(0).toUpperCase() + value.slice(1))}
                  >
                    <SelectTrigger className={cn(
                      "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
                      "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}>
                      <SelectValue placeholder="Select your plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-950 border border-gray-800 text-gray-300">
                      <SelectItem value="essential">Essential Plan</SelectItem>
                      <SelectItem value="core">Core Plan</SelectItem>
                      <SelectItem value="advanced">Advanced Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name*"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name*"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Work email*"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company name*"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                    required
                  />
                  <Select name="numberOfEmployees" required>
                    <SelectTrigger className={cn(
                      "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
                      "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}>
                      <SelectValue placeholder="Company size*" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-950 border border-gray-800 text-gray-300">
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="51-250">51-250 employees</SelectItem>
                      <SelectItem value="251-500">251-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job title*"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/30 text-gray-300 focus:outline-none border border-gray-800"
                    required
                  />
                </div>

                <div className="!mt-8">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Starting trial...' : 'Start Free Trial'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.button>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    By creating an account, you agree to our{' '}
                    <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
                  </p>
                </div>

                {formStatus && (
                  <div className="text-center mt-4 text-green-400">
                    {formStatus}
                  </div>
                )}
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className={`bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border ${
                selectedPlan === 'Core' ? 'border-2 border-gray-800' : 'border border-gray-800'
              } rounded-xl overflow-hidden`}>
                <div className="p-6">
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
                        {pricingPlans[selectedPlan].name}
                      </h3>
                      <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  14 Days Free
                </div>
                    </div>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                        €{pricingPlans[selectedPlan].monthlyPrice}
                      </span>
                      <span className="ml-1 text-2xl font-medium text-gray-500">
                        user/month
                      </span>
                    </div>
                    <p className="mt-3 text-base text-gray-400">{pricingPlans[selectedPlan].description}</p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {pricingPlans[selectedPlan].features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreeTrialPage;