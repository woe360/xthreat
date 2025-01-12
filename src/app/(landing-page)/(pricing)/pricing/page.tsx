// 'use client'

// import React, { useState } from 'react';
// import { Check, ChevronDown } from 'lucide-react';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { cn } from "@/lib/utils"
// import { Slider } from "@/components/ui/slider"
// import { Metadata } from 'next';

// // export const metadata: Metadata = {
// //   title: 'Pricing - XThreat',
// //   description: 'XThreat Pricing',
// // };

// interface PricingTier {
//   users: number;
//   essentialMonthly: number;
//   essentialYearly: number;
//   coreMonthly: number;
//   coreYearly: number;
//   advancedMonthly: number;
//   advancedYearly: number;
// }

// interface PricingPlan {
//   name: string;
//   monthlyPrice: number | "Custom";
//   yearlyPrice: number | "Custom";
//   description: string;
//   features: string[];
//   cta: string;
//   link: string;
//   highlighted?: boolean;
// }

// interface FAQ {
//   question: string;
//   answer: string;
// }

// interface YearlySavings {
//   amount: string;
//   percentage: string;
// }

// const PricingPage: React.FC = () => {
//   const [isYearly, setIsYearly] = useState<boolean>(false);
//   const [openFAQ, setOpenFAQ] = useState<number | null>(null);
//   const [userCount, setUserCount] = useState<number>(1);
//   const [selectedPlan, setSelectedPlan] = useState<string>('Essential');
//   const router = useRouter();

//   const togglePricing = () => setIsYearly(!isYearly);

//   const toggleFAQ = (index: number) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const handleCTAClick = (link: string, planName?: string) => {
//     if (link === '/checkout' && planName) {
//       router.push(`${link}?plan=${planName.toLowerCase()}`);
//     } else {
//       router.push(link);
//     }
//   };

//   const pricingTiers: PricingTier[] = [
//     { 
//       users: 50, 
//       essentialMonthly: 2.3, 
//       essentialYearly: 22.08, 
//       coreMonthly: 4.5, 
//       coreYearly: 43.20,
//       advancedMonthly: 6.4,
//       advancedYearly: 61.44
//     },
//     { 
//       users: 100, 
//       essentialMonthly: 1.9, 
//       essentialYearly: 18.24, 
//       coreMonthly: 3.9, 
//       coreYearly: 37.44,
//       advancedMonthly: 5.9,
//       advancedYearly: 56.64
//     },
//     { 
//       users: 250, 
//       essentialMonthly: 1.5, 
//       essentialYearly: 14.40, 
//       coreMonthly: 3.2, 
//       coreYearly: 30.72,
//       advancedMonthly: 5.2,
//       advancedYearly: 49.92
//     },
//     { 
//       users: 1000, 
//       essentialMonthly: 1.3, 
//       essentialYearly: 12.48, 
//       coreMonthly: 2.8, 
//       coreYearly: 26.88,
//       advancedMonthly: 4.8,
//       advancedYearly: 46.08
//     },
//     { 
//       users: 2000, 
//       essentialMonthly: 1.2, 
//       essentialYearly: 11.52, 
//       coreMonthly: 2.6, 
//       coreYearly: 24.96,
//       advancedMonthly: 4.6,
//       advancedYearly: 44.16
//     },
//     { 
//       users: 3000, 
//       essentialMonthly: 1.0, 
//       essentialYearly: 9.60, 
//       coreMonthly: 2.3, 
//       coreYearly: 22.08,
//       advancedMonthly: 4.3,
//       advancedYearly: 41.28
//     },
// ];

// const getPrice = (userCount: number, planName: string, isYearly: boolean): number => {
//   const tier = pricingTiers.find(t => userCount <= t.users) || pricingTiers[pricingTiers.length - 1];
  
//   switch(planName.toLowerCase()) {
//       case 'essential':
//           return isYearly ? tier.essentialYearly : tier.essentialMonthly;
//       case 'core':
//           return isYearly ? tier.coreYearly : tier.coreMonthly;
//       case 'advanced':
//           return isYearly ? tier.advancedYearly : tier.advancedMonthly;
//       default:
//           return isYearly ? tier.essentialYearly : tier.essentialMonthly;
//   }
// };

//   const calculatePrice = (): string => {
//     const pricePerUser = getPrice(userCount, selectedPlan, isYearly);
//     return (userCount * pricePerUser).toFixed(2);
// };

// const getPricePerUser = (): string => {
//     return getPrice(userCount, selectedPlan, isYearly).toFixed(2);
// };

//   const pricingPlans: PricingPlan[] = [
//     {
//       name: "Essential",
//       monthlyPrice: 2.3,
//       yearlyPrice: 22.08,
//       description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
//       features: [
//         "14-day free trial with full access",
//         "Access to essential cybersecurity awareness training modules",
//         "Core analytics and reporting",
//         "Email support",
//         "1 administrator seat",
//         "Role-based training paths",
//       ],
//       cta: "Start Free Trial",
//       link: "/free-trial?plan=essential",
//     },
//     {
//       name: "Core",
//       monthlyPrice: 4.5,
//       yearlyPrice: 43.20,
//       description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
//       features: [
//         "14-day free trial with full access",
//         "Everything in the Essential plan",
//         "Advanced analytics and custom reports",
//         "3 administrator seats",
//         "Risk assessment dashboard",
//         "Advanced simulation exercises",
//       ],
//       cta: "Start Free Trial",
//       link: "/free-trial?plan=core",
//       highlighted: true
//     },
//     {
//       name: "Advanced",
//       monthlyPrice: 6.4,
//       yearlyPrice: 61.44,
//       description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
//       features: [
//         "Everything in the Core plan",
//         "Custom training module development",
//         "Unlimited administrator seats",
//         "Priority Email and Phone Support",
//         "Custom integration solutions",
//         "Dedicated success manager",
//       ],
//       cta: "Start Free Trial",
//       link: "/free-trial?plan=advanced",
//     }
// ];


//   const getCalculablePlans = () => pricingPlans.filter(plan => plan.name !== "Tailored");

//   const faqs: FAQ[] = [
//     { 
//       question: "Is there a free trial available?", 
//       answer: "No, but we offer a satisfaction guarantee. If you fully engage with our training for the first month and don't see measurable improvement, we'll work with you to address any concerns or offer a refund." 
//     },
//     { 
//       question: "Is it possible to change the plan later?", 
//       answer: "Yes, you can upgrade or downgrade your plan at any time." 
//     },
//     { 
//       question: "What is your cancellation policy?", 
//       answer: "You only have to inform us 14 days prior cancelation. We do not lock businesses in long-term contracts unless they are happy with our solutions." 
//     },
//     { 
//       question: "How does billing work?", 
//       answer: "We bill monthly or yearly, depending on your chosen plan." 
//     },
//   ];

//   const renderPricingTier = (plan: PricingPlan, isYearly: boolean, index: number) => {
//     const calculateYearlySavings = (): YearlySavings | null => {
//       if (typeof plan.monthlyPrice === "string" || typeof plan.yearlyPrice === "string") {
//         return null;
//       }
//       const monthlyCost = plan.monthlyPrice * 12;
//       const yearlySavings = monthlyCost - plan.yearlyPrice;
//       const savingsPercentage = (yearlySavings / monthlyCost) * 100;
//       return {
//         amount: yearlySavings.toFixed(1),
//         percentage: savingsPercentage.toFixed(0)
//       };
//     };
  
//     const savings = calculateYearlySavings();

//     return (
//       <motion.div
//         key={plan.name}
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: index * 0.1 }}
//         className={`flex flex-col rounded-lg overflow-hidden font-sans bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] ${
//           plan.highlighted ? 'border-2 border-gray-800 lg:scale-105' : 'border border-gray-800 lg:scale-95'
//         }`}
//       >
//         <div className="px-6 py-8 sm:p-10 sm:pb-6">
//           <div>
//             <h3 className="inline-flex px-4 py-1 font-sans rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
//               {plan.name}
//             </h3>
//           </div>
//           <div className="mt-4 flex items-baseline text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//             {typeof plan.monthlyPrice === "string" ? "Custom" : 
//               `€${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`}
//             {typeof plan.monthlyPrice !== "string" && (
//               <span className="ml-1 text-2xl font-medium text-gray-500">
//                 user/{isYearly ? 'year' : 'month'}
//               </span>
//             )}
//           </div>
//           <div className="h-5">
//             {isYearly && savings && (
//               <p className="text-sm text-green-400/80">
//                 Save €{savings.amount}/user/year ({savings.percentage}% off)
//               </p>
//             )}
//           </div>
//           <p className="text-base text-gray-400">{plan.description}</p>
//         </div>
//         <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-2 space-y-6 sm:p-10 sm:pt-2">
//           <ul className="space-y-4">
//             {plan.features.map((feature, index) => (
//               <li key={index} className="flex items-start">
//                 <div className="flex-shrink-0">
//                   <Check className="h-6 w-6 text-green-500/80" />
//                 </div>
//                 <p className="ml-3 text-base text-gray-300">{feature}</p>
//               </li>
//             ))}
//           </ul>
//           <div className="w-full rounded-md shadow">
//             <motion.button
//               onClick={() => handleCTAClick(plan.link, plan.name)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full flex items-center justify-center px-5 py-3 border border-gray-800 text-base font-medium rounded-md text-black bg-gray-200/80 hover:bg-gray-200"
//             >
//               {plan.cta}
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };
  

//   return (
//     <div className="min-h-screen font-sans bg-black text-white relative overflow-hidden">
//       <Navbar />
      
//       <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-56">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl">
//             Pricing
//           </h2>
//           <p className="mt-4 text-xl font-serif italic text-gray-400">
//             You pay per user, what you see here.
//           </p>
//         </motion.div>

//         {/* Pricing Toggle */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex justify-center items-center space-x-4 my-12"
//         >
//           <button
//             onClick={togglePricing}
//             className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-1 flex items-center relative"
//           >
//             <motion.span
//               animate={{ x: isYearly ? '100%' : '0%' }}
//               transition={{
//                 type: 'tween',
//                 duration: 0.15,
//                 ease: "easeInOut", 
//               }}
//               className="absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-gray-300 rounded-lg left-1"
//             />
//             <span className={`px-4 py-2 mr-3 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
//               isYearly ? 'text-gray-400' : 'text-black'
//             }`}>
//               Monthly
//             </span>
//             <span className={`px-4 py-2 mr-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
//               isYearly ? 'text-black' : 'text-gray-400'
//             }`}>
//               Yearly
//             </span>
//           </button>
//         </motion.div>

        

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8"
//         >
//           {pricingPlans.map((plan, index) => renderPricingTier(plan, isYearly, index))}
//         </motion.div>

//         {/* Calculator Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28">
//           <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center">
//             Pricing Calculator
//           </h3>
//           <p className="mt-4 text-xl text-center font-serif italic text-gray-400">
//             Calculate exact price you need to pay.
//           </p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-14 border border-gray-800 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] rounded-lg p-8 shadow-lg"
//           >
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch space-y-6 md:space-y-0">
//             <div className="w-full md:w-1/2 space-y-6">
//                 <div className="flex flex-col space-y-2 w-full">
//                   <div className="flex justify-between items-center">
//                     <label className="text-gray-300 text-base">Number of Users</label>
//                     <Input
//                       type="number"
//                       min="1"
//                       max="3000"
//                       value={userCount}
//                       onChange={(e) => setUserCount(Math.min(3000, Math.max(1, parseInt(e.target.value) || 1)))}
//                       className="w-20 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white px-2 py-1 rounded-md text-center"
//                     />
//                   </div>
//                   <Slider
//                     value={[userCount]}
//                     onValueChange={(value) => setUserCount(value[0])}
//                     max={3000}
//                     step={1}
//                     className={cn("w-full", "[&_[role=slider]]:bg-gray-200", "[&_.swui-slider-track]:bg-gray-400")}
//                   />
//                 </div>
//                 <div className="flex space-x-4">
//                   <div className="flex flex-col space-y-2 w-1/2">
//                     <Label htmlFor="plan-select" className="text-gray-300 text-base">Select Plan</Label>
//                     <Select value={selectedPlan} onValueChange={(value) => setSelectedPlan(value)}>
//                       <SelectTrigger 
//                         id="plan-select" 
//                         className={cn(
//                           "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white",
//                           "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                         )}
//                       >
//                         <SelectValue placeholder="Select plan" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {getCalculablePlans().map(plan => (
//                           <SelectItem key={plan.name} value={plan.name}>{plan.name}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="flex flex-col space-y-2 w-1/2">
//                     <Label htmlFor="billing-cycle" className="text-gray-300 text-base">Billing Cycle</Label>
//                     <Select value={isYearly ? 'yearly' : 'monthly'} onValueChange={(value) => setIsYearly(value === 'yearly')}>
//                       <SelectTrigger 
//                         id="billing-cycle" 
//                         className={cn(
//                           "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white",
//                           "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                         )}
//                       >
//                         <SelectValue placeholder="Select billing cycle" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="monthly">Monthly</SelectItem>
//                         <SelectItem value="yearly">Yearly</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full border border-gray-800 md:w-1/2 md:ml-10 flex flex-col items-center justify-center bg-black/10 rounded-lg p-6">
//                 <p className="text-xl text-gray-300 mb-2">Estimated {isYearly ? 'Yearly' : 'Monthly'} Cost:</p>
//                 <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
//                   €{calculatePrice()}
//                 </p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   {isYearly ? 'per year' : 'per month'} for {userCount} user{userCount > 1 ? 's' : ''}
//                 </p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   (€{getPricePerUser()} per user {isYearly ? 'per year' : 'per month'})
//                 </p>
//               </div>
              
//             </div>
//           </motion.div>
//         </div>

//         {/* FAQ and CTA Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-3xl">
//               Frequently asked questions
//             </h2>
//             <p className="mt-4 text-xl mb-14 font-serif italic text-gray-400">
//               Here are some quick answers to common questions.
//             </p>
//           </motion.div>
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* FAQ Section */}
//             <div className="lg:w-1/2">
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//                 className="space-y-5"
//               >
//                 {faqs.map((faq, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}
//                     className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-lg overflow-hidden"
//                   >
//                     <button
//                       className="flex justify-between items-center w-full p-4 text-left"
//                       onClick={() => toggleFAQ(index)}
//                     >
//                       <span>{faq.question}</span>
//                       <motion.div
//                         animate={{ rotate: openFAQ === index ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <ChevronDown className="h-5 w-5" />
//                       </motion.div>
//                     </button>
//                     <AnimatePresence initial={false}>
//                       {openFAQ === index && (
//                         <motion.div
//                           key="content"
//                           initial="collapsed"
//                           animate="open"
//                           exit="collapsed"
//                           variants={{
//                             open: { opacity: 1, height: "auto" },
//                             collapsed: { opacity: 0, height: 0 }
//                           }}
//                           transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
//                         >
//                           <motion.div
//                             variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
//                             transition={{ duration: 0.2 }}
//                             className="p-4 pt-0 text-gray-400"
//                           >
//                             {faq.answer}
//                           </motion.div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* CTA Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//               className="lg:w-1/2 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-center"
//             >
//               <div className="px-6 py-8 sm:p-10">
//                 <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-4">
//                   Still have questions?
//                 </h3>
//                 <div className="text-gray-400 mb-6">
//                   <p>
//                     We may not cover everything here, but these FAQs address some of the most common questions. For more detailed information, feel free to contact us directly.
//                   </p>
//                 </div>
//                 <motion.button
//                   onClick={() => handleCTAClick('/contact')}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="inline-flex items-center px-6 py-3 border border-gray-800 text-base font-medium rounded-xl shadow-sm text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                 >
//                   Get in touch
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//         </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default PricingPage;

'use client'

import React, { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

// const PricingCard = ({ plan, isYearly }) => (
//   <div className="relative group">
//     {/* Glass card effect with lighter gray */}
//     <div className="w-full p-8 rounded-xl bg-gray-800/20 backdrop-blur-lg border border-gray-700/50 transition-all duration-300">
//       {/* Dark inset price effect */}
//       <div className="mb-6">
//         <div className="relative">
//           <span className="text-7xl font-bold text-black/10">
//             €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
//           </span>
//           <span className="absolute inset-0 text-7xl font-bold text-black/20">
//             €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
//           </span>
//         </div>
//         <p className="text-gray-400/80 mt-2">Per user/{isYearly ? 'year' : 'month'}</p>
//       </div>
      
//       <p className="text-gray-300/80 text-sm min-h-[60px]">
//         {plan.description}
//       </p>
      
//       <button 
//         onClick={() => handleCTAClick(plan.link, plan.name)}
//         className="w-full mt-4 py-3 px-4 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300">
//         {plan.cta}
//       </button>
//     </div>
    
//     <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//   </div>
// );

// const PricingCard = ({ plan, isYearly }) => (
//   <div className="relative group">
//     {/* Glass card effect with much lighter gray */}
//     <div className="w-full p-8 rounded-xl bg-gray-400/5 backdrop-blur-lg border border-gray-300/10 transition-all duration-300">
//       {/* Price */}
//       <div className="mb-6">
//         <div className="relative text-center">
//           <span className="text-7xl font-bold text-gray-300/50">
//             €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
//           </span>
//           <span className="absolute inset-0 text-center text-7xl font-bold text-gray-300/80">
//             €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
//           </span>
//         </div>
//         <p className="text-gray-300/80 text-center mt-2">Per user/{isYearly ? 'year' : 'month'}</p>
//       </div>

//       <p className="text-gray-300/90 text-center text-sm min-h-[60px]">
//         {plan.description}
//       </p>

//       <button 
//         onClick={() => handleCTAClick(plan.link, plan.name)}
//         className="w-full mt-4 py-3 px-4 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300"
//       >
//         {plan.cta}
//       </button>
//     </div>

//     <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//   </div>
// );

const PricingCard = ({ plan, isYearly }) => (
  <div className="relative group">
    <motion.div
      className="w-full p-8 rounded-xl bg-[linear-gradient(180deg,#2A2D35_0%,#1F2228_100%)] transition-all duration-300 relative overflow-hidden"
      initial={{ "--x": "100%" }}
      animate={{ "--x": "-100%" }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        duration: 2
      }}
      
    >
      {/* Content container */}
      <div className="relative z-10">
        {/* Price section */}
        <div className="mb-6">
          <div className="flex justify-center items-center">
            <div className="relative text-center">
              <span className="text-6xl font-bold text-black/50">
              €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="absolute inset-0 text-6xl ml-[1px] font-bold text-neutral-950">
                €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
            </div>
          </div>
          <p className="text-white text-center mt-2">Per user/{isYearly ? 'year' : 'month'}</p>
        </div>

        <p className="text-gray-400 text-center text-sm min-h-[60px]">
          {plan.description}
        </p>

        <button 
          onClick={() => handleCTAClick(plan.link, plan.name)}
          className="w-full mt-4 py-3 px-4 rounded-lg bg-transpent text-white border border-gray-500 font-medium hover:bg-border-gray-700 transition-all duration-300"
        >
          {plan.cta}
        </button>
      </div>

      {/* Shiny overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(-75deg, rgba(255,255,255,0) calc(var(--x) + 20%), rgba(255,255,255,0.08) calc(var(--x) + 25%), rgba(255,255,255,0) calc(var(--x) + 100%))"
        }}
      />
    </motion.div>
  </div>
);

const FeaturesTable = () => {
  const columnClass = "py-6 px-8";
  const features = [
    {
      name: "Free Trial",
      essential: "14-day trial",
      core: "14-day trial",
      advanced: "14-day trial"
    },
    {
      name: "Training Modules",
      essential: "Essential modules",
      core: "Advanced modules",
      advanced: "Custom modules"
    },
    {
      name: "Analytics",
      essential: "Basic",
      core: "Advanced",
      advanced: "Advanced + Custom"
    },
    {
      name: "Admin Seats",
      essential: "1",
      core: "3",
      advanced: "Unlimited"
    },
    {
      name: "Support",
      essential: "Email",
      core: "Email",
      advanced: "Priority"
    },
    {
      name: "Risk Assessment",
      essential: false,
      core: true,
      advanced: true
    },
    {
      name: "Simulation Exercises",
      essential: false,
      core: true,
      advanced: true
    },
    {
      name: "Custom Integration",
      essential: false,
      core: false,
      advanced: true
    }
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto">
      <div className="rounded-xl overflow-hidden bg-transparent border border-gray-800/50">
        <div className="grid grid-cols-4 text-left border-b border-gray-800/50">
          <div className={`${columnClass} text-sm font-medium text-gray-300`}>Features</div>
          <div className={`${columnClass} text-sm font-medium text-gray-300`}>Essential</div>
          <div className={`${columnClass} text-sm font-medium text-gray-300`}>Core</div>
          <div className={`${columnClass} text-sm font-medium text-gray-300`}>Advanced</div>
        </div>
        
        <div>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="grid grid-cols-4 text-sm border-b border-gray-800/50 last:border-0"
            >
              <div className={`${columnClass} text-gray-300`}>{feature.name}</div>
              {[feature.essential, feature.core, feature.advanced].map((value, i) => (
                <div key={i} className={`${columnClass} text-gray-400`}>
                  {typeof value === 'boolean' ? (
                    value ? (
                      <Check className="h-4 w-4 text-gray-400" />
                    ) : (
                      <X className="h-4 w-4 text-gray-600" />
                    )
                  ) : (
                    value
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [userCount, setUserCount] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Essential');
  const router = useRouter();

  const togglePricing = () => setIsYearly(!isYearly);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleCTAClick = (link, planName) => {
    if (link === '/checkout' && planName) {
      router.push(`${link}?plan=${planName.toLowerCase()}`);
    } else {
      router.push(link);
    }
  };

  const pricingTiers: PricingTier[] = [
    { 
      users: 50, 
      essentialMonthly: 2.3, 
      essentialYearly: 22.08, 
      coreMonthly: 4.5, 
      coreYearly: 43.20,
      advancedMonthly: 6.4,
      advancedYearly: 61.44
    },
    { 
      users: 100, 
      essentialMonthly: 1.9, 
      essentialYearly: 18.24, 
      coreMonthly: 3.9, 
      coreYearly: 37.44,
      advancedMonthly: 5.9,
      advancedYearly: 56.64
    },
    { 
      users: 250, 
      essentialMonthly: 1.5, 
      essentialYearly: 14.40, 
      coreMonthly: 3.2, 
      coreYearly: 30.72,
      advancedMonthly: 5.2,
      advancedYearly: 49.92
    },
    { 
      users: 1000, 
      essentialMonthly: 1.3, 
      essentialYearly: 12.48, 
      coreMonthly: 2.8, 
      coreYearly: 26.88,
      advancedMonthly: 4.8,
      advancedYearly: 46.08
    },
    { 
      users: 2000, 
      essentialMonthly: 1.2, 
      essentialYearly: 11.52, 
      coreMonthly: 2.6, 
      coreYearly: 24.96,
      advancedMonthly: 4.6,
      advancedYearly: 44.16
    },
    { 
      users: 3000, 
      essentialMonthly: 1.0, 
      essentialYearly: 9.60, 
      coreMonthly: 2.3, 
      coreYearly: 22.08,
      advancedMonthly: 4.3,
      advancedYearly: 41.28
    },
];

const getPrice = (userCount: number, planName: string, isYearly: boolean): number => {
  const tier = pricingTiers.find(t => userCount <= t.users) || pricingTiers[pricingTiers.length - 1];
  
  switch(planName.toLowerCase()) {
      case 'essential':
          return isYearly ? tier.essentialYearly : tier.essentialMonthly;
      case 'core':
          return isYearly ? tier.coreYearly : tier.coreMonthly;
      case 'advanced':
          return isYearly ? tier.advancedYearly : tier.advancedMonthly;
      default:
          return isYearly ? tier.essentialYearly : tier.essentialMonthly;
  }
};

const calculatePrice = (): string => {
  const pricePerUser = getPrice(userCount, selectedPlan, isYearly);
  return (userCount * pricePerUser).toFixed(2);
};

const getPricePerUser = (): string => {
  return getPrice(userCount, selectedPlan, isYearly).toFixed(2);
};


  const pricingPlans = [
    {
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
      cta: "Start Free Trial",
      link: "/free-trial?plan=essential",
    },
    {
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
      cta: "Start Free Trial",
      link: "/free-trial?plan=core",
      highlighted: true
    },
    {
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
      cta: "Start Free Trial",
      link: "/free-trial?plan=advanced",
    }
  ];

  const faqs = [
    { 
      question: "Is there a free trial available?", 
      answer: "No, but we offer a satisfaction guarantee. If you fully engage with our training for the first month and don't see measurable improvement, we'll work with you to address any concerns or offer a refund." 
    },
    { 
      question: "Is it possible to change the plan later?", 
      answer: "Yes, you can upgrade or downgrade your plan at any time." 
    },
    { 
      question: "What is your cancellation policy?", 
      answer: "You only have to inform us 14 days prior cancelation. We do not lock businesses in long-term contracts unless they are happy with our solutions." 
    },
    { 
      question: "How does billing work?", 
      answer: "We bill monthly or yearly, depending on your chosen plan." 
    },
  ];

  const getCalculablePlans = () => pricingPlans.filter(plan => plan.name !== "Tailored");

  return (
    <div className="min-h-screen font-sans bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-56">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl">
            Pricing
          </h2>
          <p className="mt-4 text-xl font-serif italic text-gray-400">
            You pay per user, what you see here.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center space-x-4 my-12"
        >
          <button
            onClick={togglePricing}
            className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-lg p-1 flex items-center relative"
          >
            <motion.span
              animate={{ x: isYearly ? '100%' : '0%' }}
              transition={{
                type: 'tween',
                duration: 0.15,
                ease: "easeInOut", 
              }}
              className="absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-gray-300 rounded-lg left-1"
            />
            <span className={`px-4 py-2 mr-3 text-sm transition-colors duration-200 relative z-10 ${
              isYearly ? 'text-gray-400' : 'text-black'
            }`}>
              Monthly
            </span>
            <span className={`px-4 py-2 mr-2 text-sm transition-colors duration-200 relative z-10 ${
              isYearly ? 'text-black' : 'text-gray-400'
            }`}>
              Yearly
            </span>
          </button>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8"
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} isYearly={isYearly} />
          ))}
        </motion.div>

        {/* Features Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
              Compare Features
            </h3>
            <p className="mt-4 text-xl font-serif italic text-gray-400">
              Everything you need to know about our plans
            </p>
          </motion.div>
          <FeaturesTable />
        </div>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28">
          <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center">
            Pricing Calculator
          </h3>
          <p className="mt-4 text-xl text-center font-serif italic text-gray-400">
            Calculate exact price you need to pay.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 border border-gray-800 rounded-lg p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch space-y-6 md:space-y-0">
            <div className="w-full md:w-1/2 space-y-6">
                <div className="flex flex-col space-y-2 w-full">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-300 text-base">Number of Users</label>
                    <Input
                      type="number"
                      min="1"
                      max="3000"
                      value={userCount}
                      onChange={(e) => setUserCount(Math.min(3000, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-20 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white px-2 py-1 rounded-lg text-center"
                    />
                  </div>
                  <Slider
                    value={[userCount]}
                    onValueChange={(value) => setUserCount(value[0])}
                    max={3000}
                    step={1}
                    className={cn("w-full", "[&_[role=slider]]:bg-gray-200", "[&_.swui-slider-track]:bg-gray-400")}
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col space-y-2 w-1/2">
                    <Label htmlFor="plan-select" className="text-gray-300 text-base">Select Plan</Label>
                    <Select value={selectedPlan} onValueChange={(value) => setSelectedPlan(value)}>
                      <SelectTrigger 
                        id="plan-select" 
                        className={cn(
                          "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white",
                          "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        )}
                      >
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCalculablePlans().map(plan => (
                          <SelectItem key={plan.name} value={plan.name}>{plan.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-2 w-1/2">
                    <Label htmlFor="billing-cycle" className="text-gray-300 text-base">Billing Cycle</Label>
                    <Select value={isYearly ? 'yearly' : 'monthly'} onValueChange={(value) => setIsYearly(value === 'yearly')}>
                      <SelectTrigger 
                        id="billing-cycle" 
                        className={cn(
                          "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white",
                          "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        )}
                      >
                        <SelectValue placeholder="Select billing cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full border border-gray-800 md:w-1/2 md:ml-10 flex flex-col items-center justify-center bg-black/10 rounded-lg p-6">
                <p className="text-xl text-gray-300 mb-2">Estimated {isYearly ? 'Yearly' : 'Monthly'} Cost:</p>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
                  €{calculatePrice()}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {isYearly ? 'per year' : 'per month'} for {userCount} user{userCount > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  (€{getPricePerUser()} per user {isYearly ? 'per year' : 'per month'})
                </p>
              </div>
              
            </div>
          </motion.div>
        </div>

        {/* FAQ and CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-xl mb-14 font-serif italic text-gray-400">
              Here are some quick answers to common questions.
            </p>
          </motion.div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* FAQ Section */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-5"
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <button
                      className="flex justify-between items-center w-full p-4 text-left"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFAQ === index && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                          }}
                          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          <motion.div
                            variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
                            transition={{ duration: 0.2 }}
                            className="p-4 pt-0 text-gray-400"
                          >
                            {faq.answer}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="lg:w-1/2 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-center"
            >
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-4">
                  Still have questions?
                </h3>
                <div className="text-gray-400 mb-6">
                  <p>
                    We may not cover everything here, but these FAQs address some of the most common questions. For more detailed information, feel free to contact us directly.
                  </p>
                </div>
                <motion.button
                  onClick={() => handleCTAClick('/contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 border border-gray-800 text-base font-medium rounded-xl shadow-sm text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Get in touch
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      
      <Footer />
    </div>
  );
};

export default PricingPage;

