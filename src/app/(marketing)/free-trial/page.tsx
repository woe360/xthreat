// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Clock, Check, ChevronRight, ChevronLeft } from 'lucide-react';
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Select } from '@/components/ui/select';
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from "@/lib/utils";
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { Database } from '@/types/supabase'

// const pricingPlans = {
//   Essential: {
//     name: "Essential",
//     monthlyPrice: 2.3,
//     description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
//     features: []
//   },
//   Core: {
//     name: "Core",
//     monthlyPrice: 4.5,
//     description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
//     features: []
//   },
//   Advanced: {
//     name: "Advanced",
//     monthlyPrice: 6.4,
//     description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
//     features: []
//   }
// };

// export default function FreeTrial() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [formStatus, setFormStatus] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [showSuccess, setShowSuccess] = useState(false);
  
//   const planFromUrl = searchParams.get('plan')?.toLowerCase() || 'core';
//   const [selectedPlan, setSelectedPlan] = useState<string>(planFromUrl);

//   const supabase = createClientComponentClient<Database>()

//   const getPlanDetails = (planName: string) => {
//     const plan = pricingPlans[planName.charAt(0).toUpperCase() + planName.slice(1)];
//     return {
//       name: plan?.name || "Essential",
//       tag: plan?.tag || "Starter",
//       monthlyPrice: plan?.monthlyPrice || 2.3,
//       description: plan?.description || "Ideal for small teams",
//       features: plan?.features || []
//     };
//   };

//   const currentPlan = getPlanDetails(selectedPlan);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setFormStatus('');

//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const email = formData.get('email') as string;

//     try {
//       // Patikriname ar vartotojas jau egzistuoja
//       const { data: existingUser } = await supabase
//         .from('users')
//         .select('email')
//         .eq('email', email)
//         .single();

//       if (existingUser) {
//         setFormStatus('This email is already registered. Please try logging in.');
//         setIsSubmitting(false);
//         return;
//       }

//       // Bandome išsaugoti vartotojo duomenis
//       const { data: newUser, error: insertError } = await supabase
//         .from('users')
//         .insert({
//           email: email,
//           first_name: formData.get('firstName') as string,
//           last_name: formData.get('lastName') as string,
//           company_name: formData.get('companyName') as string,
//           company_size: formData.get('numberOfEmployees') as string,
//           job_title: formData.get('jobTitle') as string,
//           selected_plan: selectedPlan,
//           is_active: false,
//           metadata: {
//             signup_source: 'free_trial',
//             initial_plan: selectedPlan,
//             signup_date: new Date().toISOString()
//           }
//         })
//         .select()
//         .single();

//       if (insertError) {
//         console.error('Insert Error:', insertError);
//         throw new Error('Failed to create user account');
//       }

//       console.log('User created successfully:', newUser);

//       // Siunčiame magic link
//       const { error: signInError } = await supabase.auth.signInWithOtp({
//         email: email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             first_name: formData.get('firstName') as string,
//             selected_plan: selectedPlan,
//             user_id: newUser.id
//           }
//         }
//       });

//       if (signInError) {
//         console.error('SignIn Error:', signInError);
//         throw new Error('Failed to send verification email');
//       }

//       console.log('Magic link sent successfully');
//       setFormStatus('Success! Check your email to activate your free trial.');
//       setShowSuccess(true);
//       form.reset();

//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       setFormStatus(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
//       setShowSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans bg-black text-white flex flex-col">
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4"
//           >
//             <motion.div
//               initial={{ y: 20 }}
//               animate={{ y: 0 }}
//               className="bg-black/80 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8 max-w-md w-full text-center"
//             >
//               <motion.h2
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
//               >
//                 Success!
//               </motion.h2>
              
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-gray-300 mb-8"
//               >
//                 Check your email to activate your free trial.
//               </motion.p>
              
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <Link href="/">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="inline-flex items-center px-6 py-3 rounded-md bg-white/90 hover:bg-white text-black font-medium transition-colors"
//                   >
//                     Homepage <ChevronRight className="w-4 h-4 ml-1 mt-[2px]" />
//                   </motion.button>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <main className="flex-grow flex justify-center items-center px-4 py-12">
//         <div className="max-w-6xl w-full">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
//               Sign up for a free trial, no credit card required.
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//             <div className="lg:col-span-3 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8">
//             <button 
//               onClick={() => router.back()}>
//               <button className="absolute flex text-sm top-10 left-10 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-neutral-800 transition">
//                 <ChevronLeft className="mr-1 mt-[3px]" size={14} color="white"/> Back
//               </button>
//             </button>
//               <div className="flex items-center justify-center mb-8">
//                 <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">Create an Account</h1>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {isSubmitting && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
//                   >
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//                       <motion.div
//                         animate={{
//                           rotate: 360,
//                           transition: {
//                             duration: 1,
//                             repeat: Infinity,
//                             ease: "linear"
//                           }
//                         }}
//                         className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full mb-4 mx-auto"
//                       />
//                       <p className="text-gray-300">Starting your trial...</p>
//                     </div>
//                   </motion.div>
//                 )}

//                 <div className="mb-6">
//                   <Select 
//                     defaultValue={selectedPlan}
//                     value={selectedPlan}
//                     onValueChange={setSelectedPlan}
//                   >
//                     <SelectTrigger className={cn(
//                       "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
//                       "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                     )}>
//                       <SelectValue>
//                         {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
//                       </SelectValue>
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
//                     className={`w-full flex items-center justify-center px-6 py-3 rounded-md bg-white/90 border border-gray-600 hover:bg-white/80 text-black font-medium transition-colors ${
//                       isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {isSubmitting ? 'Starting trial...' : 'Start Trial'}
//                     <ChevronRight className="w-5 h-5 ml-2" />
//                   </motion.button>

//                   <p className="text-xs text-gray-400 text-center mt-4">
//                     By creating an account, you agree to our{' '}
//                     <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a> and{' '}
//                     <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
//                   </p>
//                 </div>
//               </form>
//             </div>

//             <div className="lg:col-span-2">
//               <div className={`bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border ${
//                 selectedPlan === 'core' ? 'border-2 border-gray-800' : 'border border-gray-800'
//               } rounded-xl overflow-hidden`}>
//                 <div className="p-6">
//                   <div className="flex flex-col">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
//                           {currentPlan.name}
//                         </h3>
//                       </div>
//                       <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
//                         <Clock className="w-4 h-4 mr-2" />
//                         14 Days Free
//                       </div>
//                     </div>
//                     <div className="mt-4 flex items-baseline">
//                       <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                         €{currentPlan.monthlyPrice}
//                       </span>
//                       <span className="ml-1 text-2xl font-medium text-gray-500">
//                         user/month
//                       </span>
//                     </div>
//                     <p className="mt-3 text-base text-gray-400">
//                       {currentPlan.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <div className="space-y-4">
//                     {currentPlan.features.map((feature, index) => (
//                       <div key={index} className="flex items-start">
//                         <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
//                         <span className="text-gray-300">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }





// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Clock, Check, ChevronRight, ChevronLeft } from 'lucide-react';
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Select } from '@/components/ui/select';
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from "@/lib/utils";
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { Database } from '@/types/supabase'

// const pricingPlans = {
//   Essential: {
//     name: "Essential",
//     monthlyPrice: 2.3,
//     description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
//     features: []
//   },
//   Core: {
//     name: "Core",
//     monthlyPrice: 4.5,
//     description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
//     features: []
//   },
//   Advanced: {
//     name: "Advanced",
//     monthlyPrice: 6.4,
//     description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
//     features: []
//   }
// };

// export default function FreeTrial() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [formStatus, setFormStatus] = useState<string>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [showSuccess, setShowSuccess] = useState(false);
  
//   const planFromUrl = searchParams.get('plan')?.toLowerCase() || 'core';
//   const [selectedPlan, setSelectedPlan] = useState<string>(planFromUrl);

//   const supabase = createClientComponentClient<Database>()

//   const getPlanDetails = (planName: string) => {
//     const plan = pricingPlans[planName.charAt(0).toUpperCase() + planName.slice(1)];
//     return {
//       name: plan?.name || "Essential",
//       tag: plan?.tag || "Starter",
//       monthlyPrice: plan?.monthlyPrice || 2.3,
//       description: plan?.description || "Ideal for small teams",
//       features: plan?.features || []
//     };
//   };

//   const currentPlan = getPlanDetails(selectedPlan);

//   // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//   //   event.preventDefault();
//   //   setIsSubmitting(true);
//   //   setFormStatus('');

//   //   const form = event.target as HTMLFormElement;
//   //   const formData = new FormData(form);
//   //   const email = formData.get('email') as string;

//   //   try {
//   //     // Step 1: Create auth user first
//   //     const { data: authData, error: authError } = await supabase.auth.signUp({
//   //       email: email,
//   //       password: Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12),
//   //       options: {
//   //         emailRedirectTo: `${window.location.origin}/auth/callback`
//   //       }
//   //     });

//   //     if (authError) {
//   //       console.error('Auth Error:', authError);
//   //       throw new Error(`Failed to create authentication account: ${authError.message}`);
//   //     }

//   //     if (!authData.user?.id) {
//   //       throw new Error('No user ID returned from authentication');
//   //     }

//   //     // Step 2: Create user profile
//   //     const { error: insertError } = await supabase
//   //       .from('users')
//   //       .insert({
//   //         email: email,
//   //         first_name: formData.get('firstName'),
//   //         last_name: formData.get('lastName'),
//   //         company_name: formData.get('companyName'),
//   //         company_size: formData.get('numberOfEmployees'),
//   //         job_title: formData.get('jobTitle'),
//   //         selected_plan: selectedPlan,
//   //         is_active: false,
//   //         metadata: {
//   //           signup_source: 'free_trial',
//   //           initial_plan: selectedPlan,
//   //           signup_date: new Date().toISOString()
//   //         }
//   //       });

//   //     if (insertError) {
//   //       console.error('Insert Error:', insertError);
//   //       // Log detailed error information
//   //       console.error('Insert Error Details:', {
//   //         code: insertError.code,
//   //         message: insertError.message,
//   //         details: insertError.details,
//   //         hint: insertError.hint
//   //       });
//   //       throw new Error(`Failed to create user profile: ${insertError.message}`);
//   //     }

//   //     setFormStatus('Success! Check your email to verify your account.');
//   //     setShowSuccess(true);
//   //     form.reset();

//   //   } catch (error) {
//   //     console.error('Error in handleSubmit:', error);
//   //     setFormStatus(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
//   //     setShowSuccess(false);
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setFormStatus('');

//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const email = formData.get('email') as string;

//     try {
//       // First check if user exists in our database
//       const { data: existingUsers, error: checkError } = await supabase
//         .from('users')
//         .select('email')
//         .eq('email', email);

//       if (checkError) {
//         console.error('Error checking existing user:', checkError);
//         throw new Error(`Failed to check existing user: ${checkError.message}`);
//       }

//       if (existingUsers && existingUsers.length > 0) {
//         setFormStatus('This email is already registered. Please try logging in.');
//         setIsSubmitting(false);
//         return;
//       }

//       // Create user in the database first
//       const { error: insertError } = await supabase
//         .from('users')
//         .insert({
//           email: email,
//           first_name: formData.get('firstName'),
//           last_name: formData.get('lastName'),
//           company_name: formData.get('companyName'),
//           company_size: formData.get('numberOfEmployees'),
//           job_title: formData.get('jobTitle'),
//           selected_plan: selectedPlan,
//           is_active: false,
//           metadata: {
//             signup_source: 'free_trial',
//             initial_plan: selectedPlan,
//             signup_date: new Date().toISOString()
//           }
//         });

//       if (insertError) {
//         console.error('Insert Error:', insertError);
//         throw new Error(`Failed to create user profile: ${insertError.message}`);
//       }

//       // Send magic link/OTP email
//       const { error: signInError } = await supabase.auth.signInWithOtp({
//         email: email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             first_name: formData.get('firstName'),
//             selected_plan: selectedPlan
//           }
//         }
//       });

//       if (signInError) {
//         console.error('SignIn Error:', signInError);
//         throw new Error('Failed to send verification email');
//       }

//       setFormStatus('Success! Check your email for a verification code.');
//       setShowSuccess(true);
//       form.reset();

//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       setFormStatus(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
//       setShowSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans bg-black text-white flex flex-col">
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4"
//           >
//             <motion.div
//               initial={{ y: 20 }}
//               animate={{ y: 0 }}
//               className="bg-black/80 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8 max-w-md w-full text-center"
//             >
//               <motion.h2
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
//               >
//                 Success!
//               </motion.h2>
              
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-gray-300 mb-8"
//               >
//                 Log in to your account and start your free trial!
//               </motion.p>
              
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <Link href="/login">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="inline-flex items-center px-6 py-3 rounded-md bg-white/90 hover:bg-white text-black font-medium transition-colors"
//                   >
//                     Login
//                   </motion.button>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <main className="flex-grow flex justify-center items-center px-4 py-12">
//         <div className="max-w-6xl w-full">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
//               Sign up for a free trial, no credit card required.
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//             <div className="lg:col-span-3 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8">
//               <button 
//                 onClick={() => router.back()}
//                 className="absolute flex text-sm top-10 left-10 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-neutral-800 transition"
//               >
//                 <ChevronLeft className="mr-1 mt-[3px]" size={14} color="white"/> Back
//               </button>
              
//               <div className="flex items-center justify-center mb-8">
//                 <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">Create an Account</h1>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {isSubmitting && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
//                   >
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//                       <motion.div
//                         animate={{
//                           rotate: 360,
//                           transition: {
//                             duration: 1,
//                             repeat: Infinity,
//                             ease: "linear"
//                           }
//                         }}
//                         className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full mb-4 mx-auto"
//                       />
//                       <p className="text-gray-300">Starting your trial...</p>
//                     </div>
//                   </motion.div>
//                 )}

//                 <div className="mb-6">
//                   <Select 
//                     defaultValue={selectedPlan}
//                     value={selectedPlan}
//                     onValueChange={setSelectedPlan}
//                   >
//                     <SelectTrigger className={cn(
//                       "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
//                       "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                     )}>
//                       <SelectValue>
//                         {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
//                       </SelectValue>
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
//                     className={`w-full flex items-center justify-center px-6 py-3 rounded-md bg-white/90 border border-gray-600 hover:bg-white/80 text-black font-medium transition-colors ${
//                       isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {isSubmitting ? 'Starting trial...' : 'Start Trial'}
//                     <ChevronRight className="w-5 h-5 ml-2" />
//                   </motion.button>

//                   <p className="text-xs text-gray-400 text-center mt-4">
//                     By creating an account, you agree to our{' '}
//                     <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a> and{' '}
//                     <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
//                   </p>
//                 </div>
//               </form>
//             </div>

//             <div className="lg:col-span-2">
//               <div className={`bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border ${
//                 selectedPlan === 'core' ? 'border-2 border-gray-800' : 'border border-gray-800'
//               } rounded-xl overflow-hidden`}>
//                 <div className="p-6">
//                   <div className="flex flex-col">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
//                           {currentPlan.name}
//                         </h3>
//                       </div>
//                       <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
//                         <Clock className="w-4 h-4 mr-2" />
//                         14 Days Free
//                       </div>
//                     </div>
//                     <div className="mt-4 flex items-baseline">
//                       <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                         €{currentPlan.monthlyPrice}
//                       </span>
//                       <span className="ml-1 text-2xl font-medium text-gray-500">
//                         user/month
//                       </span>
//                     </div>
//                     <p className="mt-3 text-base text-gray-400">
//                       {currentPlan.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <div className="space-y-4">
//                     {currentPlan.features.map((feature, index) => (
//                       <div key={index} className="flex items-start">
//                         <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
//                         <span className="text-gray-300">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



// 'use client'

// import React, { useState, useEffect } from 'react';
// import { Clock, Check, ChevronRight, ChevronLeft } from 'lucide-react';
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Select } from '@/components/ui/select';
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from "@/lib/utils";
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { Database } from '@/types/supabase'

// const pricingPlans = {
//   essential: {
//     name: "Essential",
//     monthlyPrice: 2.3,
//     description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
//     features: [
//       "14-day free trial with full access",
//       "Access to essential cybersecurity awareness training modules",
//       "Core analytics and reporting",
//       "Email support",
//       "1 administrator seat",
//       "Role-based training paths"
//     ]
//   },
//   core: {
//     name: "Core",
//     monthlyPrice: 4.5,
//     description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
//     features: [
//       "14-day free trial with full access",
//       "Everything in the Essential plan",
//       "Advanced analytics and custom reports",
//       "3 administrator seats",
//       "Risk assessment dashboard",
//       "Advanced simulation exercises"
//     ]
//   },
//   advanced: {
//     name: "Advanced",
//     monthlyPrice: 6.4,
//     description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
//     features: [
//       "Everything in the Core plan",
//       "Custom training module development",
//       "Unlimited administrator seats",
//       "Priority Email and Phone Support",
//       "Custom integration solutions",
//       "Dedicated success manager"
//     ]
//   }
// };

// export default function FreeTrial() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [formStatus, setFormStatus] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
  
//   const planFromUrl = searchParams.get('plan')?.toLowerCase();
//   const [selectedPlan, setSelectedPlan] = useState(planFromUrl || 'core');

//   useEffect(() => {
//     const urlPlan = searchParams.get('plan')?.toLowerCase();
//     if (urlPlan && Object.keys(pricingPlans).includes(urlPlan)) {
//       setSelectedPlan(urlPlan);
//     }
//   }, [searchParams]);

//   const supabase = createClientComponentClient<Database>();

//   const getPlanDetails = (planName) => {
//     const normalizedPlanName = planName.toLowerCase();
//     return pricingPlans[normalizedPlanName] || pricingPlans.core;
//   };

//   const currentPlan = getPlanDetails(selectedPlan);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setFormStatus('');

//     const form = event.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const email = formData.get('email') as string;

//     try {
//       const { data: existingUsers, error: checkError } = await supabase
//         .from('users')
//         .select('email')
//         .eq('email', email);

//       if (checkError) {
//         throw new Error(`Failed to check existing user: ${checkError.message}`);
//       }

//       if (existingUsers && existingUsers.length > 0) {
//         setFormStatus('This email is already registered. Please try logging in.');
//         return;
//       }

//       const { error: insertError } = await supabase
//         .from('users')
//         .insert({
//           email: email,
//           first_name: formData.get('firstName'),
//           last_name: formData.get('lastName'),
//           company_name: formData.get('companyName'),
//           company_size: formData.get('numberOfEmployees'),
//           job_title: formData.get('jobTitle'),
//           selected_plan: selectedPlan,
//           is_active: false,
//           metadata: {
//             signup_source: 'free_trial',
//             initial_plan: selectedPlan,
//             signup_date: new Date().toISOString()
//           }
//         });

//       if (insertError) {
//         throw new Error(`Failed to create user profile: ${insertError.message}`);
//       }

//       const { error: signInError } = await supabase.auth.signInWithOtp({
//         email: email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           data: {
//             first_name: formData.get('firstName'),
//             selected_plan: selectedPlan
//           }
//         }
//       });

//       if (signInError) {
//         throw new Error('Failed to send verification email');
//       }

//       setFormStatus('Success! Check your email for a verification code.');
//       setShowSuccess(true);
//       form.reset();

//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       setFormStatus(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
//       setShowSuccess(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans bg-black text-white flex flex-col">
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4"
//           >
//             <motion.div
//               initial={{ y: 20 }}
//               animate={{ y: 0 }}
//               className="bg-black/80 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8 max-w-md w-full text-center"
//             >
//               <motion.h2
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
//               >
//                 Success!
//               </motion.h2>
              
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-gray-300 mb-8"
//               >
//                 Log in to your account and start your free trial!
//               </motion.p>
              
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <Link href="/login">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="inline-flex items-center px-6 py-3 rounded-md bg-white/90 hover:bg-white text-black font-medium transition-colors"
//                   >
//                     Login
//                   </motion.button>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <main className="flex-grow flex justify-center items-center px-4 py-12">
//         <div className="max-w-6xl w-full">
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
//               Sign up for a free trial, no credit card required.
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
//             <div className="lg:col-span-3 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8">
//               <button 
//                 onClick={() => router.back()}
//                 className="absolute flex text-sm top-10 left-10 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-neutral-800 transition"
//               >
//                 <ChevronLeft className="mr-1 mt-[3px]" size={14} color="white"/> Back
//               </button>
              
//               <div className="flex items-center justify-center mb-8">
//                 <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">Create an Account</h1>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {isSubmitting && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
//                   >
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//                       <motion.div
//                         animate={{
//                           rotate: 360,
//                           transition: {
//                             duration: 1,
//                             repeat: Infinity,
//                             ease: "linear"
//                           }
//                         }}
//                         className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full mb-4 mx-auto"
//                       />
//                       <p className="text-gray-300">Starting your trial...</p>
//                     </div>
//                   </motion.div>
//                 )}

//                 <div className="mb-6">
//                   <Select 
//                     value={selectedPlan}
//                     onValueChange={(value) => {
//                       setSelectedPlan(value);
//                       const params = new URLSearchParams(searchParams);
//                       params.set('plan', value);
//                       router.push(`/free-trial?${params.toString()}`);
//                     }}
//                   >
//                     <SelectTrigger className={cn(
//                       "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
//                       "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                     )}>
//                       <SelectValue>
//                         {currentPlan.name} Plan
//                       </SelectValue>
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
//                     className={`w-full flex items-center justify-center px-6 py-3 rounded-md bg-white/90 border border-gray-600 hover:bg-white/80 text-black font-medium transition-colors ${
//                       isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {isSubmitting ? 'Starting trial...' : 'Start Trial'}
//                     <ChevronRight className="w-5 h-5 ml-2" />
//                   </motion.button>

//                   <p className="text-xs text-gray-400 text-center mt-4">
//                     By creating an account, you agree to our{' '}
//                     <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a> and{' '}
//                     <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
//                   </p>
//                 </div>
//               </form>
//             </div>

//             <div className="lg:col-span-2">
//               <div className={`bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border ${
//                 selectedPlan === 'core' ? 'border-2 border-gray-800' : 'border border-gray-800'
//               } rounded-xl overflow-hidden`}>
//                 <div className="p-6">
//                   <div className="flex flex-col">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
//                           {currentPlan.name}
//                         </h3>
//                       </div>
//                       <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
//                         <Clock className="w-4 h-4 mr-2" />
//                         14 Days Free
//                       </div>
//                     </div>
//                     <div className="mt-4 flex items-baseline">
//                       <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                         €{currentPlan.monthlyPrice}
//                       </span>
//                       <span className="ml-1 text-2xl font-medium text-gray-500">
//                         user/month
//                       </span>
//                     </div>
//                     <p className="mt-3 text-base text-gray-400">
//                       {currentPlan.description}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <div className="space-y-4">
//                     {currentPlan.features.map((feature, index) => (
//                       <div key={index} className="flex items-start">
//                         <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
//                         <span className="text-gray-300">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

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
    monthlyPrice: 2.3,
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
    monthlyPrice: 4.5,
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
    monthlyPrice: 6.4,
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
              className="bg-black/80 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8 max-w-md w-full text-center"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
              >
                Success!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 mb-8"
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
                    className="inline-flex items-center px-6 py-3 rounded-md bg-white/90 hover:bg-white text-black font-medium transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
              Sign up for a free trial, no credit card required.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-xl p-8">
              <button 
                onClick={() => router.back()}
                className="absolute flex text-sm top-10 left-10 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-neutral-800 transition"
              >
                <ChevronLeft className="mr-1 mt-[3px]" size={14} color="white"/> Back
              </button>
              
              <div className="flex items-center justify-center mb-8">
                <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">Create an Account</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                        className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full mb-4 mx-auto"
                      />
                      <p className="text-gray-300">Starting your trial...</p>
                    </div>
                  </motion.div>
                )}

                <div className="mb-6">
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
                    <SelectTrigger className={cn(
                      "w-full px-4 py-3 rounded-lg h-13 text-base bg-neutral-900/30 text-gray-400 border border-gray-800",
                      "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    )}>
                      <SelectValue>
                        {currentPlan.name} Plan
                      </SelectValue>
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
                    className={`w-full flex items-center justify-center px-6 py-3 rounded-md bg-white/90 border border-gray-600 hover:bg-white/80 text-black font-medium transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Starting trial...' : 'Start Trial'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.button>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    By creating an account, you agree to our{' '}
                    <a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
                  </p>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className={`bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border ${
                selectedPlan === 'core' ? 'border-2 border-gray-800' : 'border border-gray-800'
              } rounded-xl overflow-hidden`}>
                <div className="p-6">
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
                          {currentPlan.name}
                        </h3>
                      </div>
                      <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        14 Days Free
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                        €{currentPlan.monthlyPrice}
                      </span>
                      <span className="ml-1 text-2xl font-medium text-gray-500">
                        user/month
                      </span>
                    </div>
                    <p className="mt-3 text-base text-gray-400">
                      {currentPlan.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    {currentPlan.features.map((feature, index) => (
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
}