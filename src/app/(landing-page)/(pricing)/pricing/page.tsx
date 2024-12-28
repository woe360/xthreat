// 'use client'

// import React, { useState } from 'react';
// import { Check, CheckCircle, ChevronDown } from 'lucide-react';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { cn } from "@/lib/utils"
// import { Slider } from "@/components/ui/slider"

// const PricingPage = () => {
//   const [isYearly, setIsYearly] = useState(false);
//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [userCount, setUserCount] = useState(1);
//   const [selectedPlan, setSelectedPlan] = useState('Essential');
//   const router = useRouter();

//   const togglePricing = () => setIsYearly(!isYearly);

//   const toggleFAQ = (index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const handleCTAClick = (link) => {
//     router.push(link);
//   };

//   const pricingTiers = [
//     { users: 50, essentialMonthly: 1.8, essentialYearly: 21.6, advancedMonthly: 3.5, advancedYearly: 42 },
//     { users: 100, essentialMonthly: 1.5, essentialYearly: 18, advancedMonthly: 3, advancedYearly: 36 },
//     { users: 250, essentialMonthly: 1.2, essentialYearly: 14.4, advancedMonthly: 2.5, advancedYearly: 30 },
//     { users: 1000, essentialMonthly: 1, essentialYearly: 12, advancedMonthly: 2.2, advancedYearly: 26.4 },
//     { users: 2000, essentialMonthly: 0.9, essentialYearly: 10.8, advancedMonthly: 2, advancedYearly: 24 },
//     { users: 3000, essentialMonthly: 0.8, essentialYearly: 9.6, advancedMonthly: 1.8, advancedYearly: 21.6 },
//   ];

//   const getPrice = (userCount, isAdvanced, isYearly) => {
//     const tier = pricingTiers.find(t => userCount <= t.users) || pricingTiers[pricingTiers.length - 1];
//     if (isAdvanced) {
//       return isYearly ? tier.advancedYearly : tier.advancedMonthly;
//     } else {
//       return isYearly ? tier.essentialYearly : tier.essentialMonthly;
//     }
//   };

//   const calculatePrice = () => {
//     const pricePerUser = getPrice(userCount, selectedPlan === "Advanced", isYearly);
//     return (userCount * pricePerUser).toFixed(2);
//   };

//   const getPricePerUser = () => {
//     return getPrice(userCount, selectedPlan === "Advanced", isYearly).toFixed(2);
//   };

//   const pricingPlans = [
//     {
//       name: "Essential",
//       monthlyPrice: 1.8,
//       yearlyPrice: 21.6,
//       description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
//       features: [
//         "Access to essential cybersecurity awareness training modules",
//         "Core analytics",
//         "Email support",
//         "1 administrator seat",
//         "Role Based training",
//       ],
//       cta: "Select",
//       link: "/checkout",
//     },
//     {
//       name: "Advanced",
//       monthlyPrice: 3.5,
//       yearlyPrice: 42,
//       description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
//       features: [
//         "Everything in the Essential plan",
//         "Access to all core and advanced training modules",
//         "Advanced analytics",
//         "3 administrator seats",
//         "Weak Points",
//       ],
//       cta: "Select",
//       link: "/checkout",
//       highlighted: true
//     },
//     {
//       name: "Tailored",
//       monthlyPrice: "Custom",
//       yearlyPrice: "Custom",
//       description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
//       features: [
//         "Everything in the Advanced plan",
//         "Access to all training modules, including specialized topics",
//         "Unlimited administrator seats",
//         "Priority Email and Phone Support",
//         "Custom Solutions",
//       ],
//       cta: "Request a Quote",
//       link: "/contact",
//     }
//   ];

//   const faqs = [
//     { question: "Is there a free trial available?", answer: "No, but we offer a satisfaction guarantee. If you fully engage with our training for the first month and don’t see measurable improvement, we’ll work with you to address any concerns or offer a refund." },
//     { question: "Is it possible to change the plan later?", answer: "Yes, you can upgrade or downgrade your plan at any time." },
//     { question: "What is your cancellation policy?", answer: "You only have to inform us 14 days prior cancelation. We do not lock businesses in long-term contracts unless they are happy with our solutions." },
//     { question: "How does billing work?", answer: "We bill monthly or yearly, depending on your chosen plan." },
//   ];

//   const renderPricingTier = (plan, isYearly, index) => {
//     const calculateYearlySavings = () => {
//       if (plan.monthlyPrice === "Custom" || plan.yearlyPrice === "Custom") {
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
//         className={`flex flex-col rounded-lg overflow-hidden bg-gray-900/20 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] ${
//           plan.highlighted ? 'border-2 border-gray-800 lg:scale-105' : 'border border-gray-800 lg:scale-95'
//         }`}
//       >
//         <div className="px-6 py-8 sm:p-10 sm:pb-6">
//           <div>
//             <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
//               {plan.name}
//             </h3>
//           </div>
//           <div className="mt-4 flex items-baseline text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//             {plan.monthlyPrice === "Custom" ? "Custom" : 
//               `€${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`}
//             {plan.monthlyPrice !== "Custom" && (
//               <span className="ml-1 text-2xl font-medium text-gray-500">
//                 /user/{isYearly ? 'year' : 'month'}
//               </span>
//             )}
//           </div>
//           <div className="h-5">
//             {isYearly && savings && (
//               <p className="text-sm text-green-400">
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
//                   <Check className="h-6 w-6 text-green-500" />
//                 </div>
//                 <p className="ml-3 text-base text-gray-300">{feature}</p>
//               </li>
//             ))}
//           </ul>
//           <div className="w-full rounded-md shadow">
//             <motion.button
//               onClick={() => handleCTAClick(plan.link)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full flex items-center justify-center px-5 py-3 border border-gray-800  text-base font-medium rounded-md text-black bg-gray-200/80 hover:bg-gray-200"
//             >
//               {plan.cta}
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-56">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl">
//           Flexible per-user pricing to meet your needs
//           </h2>
//           <p className="mt-4 text-xl font-serif italic text-gray-400">
//             No tricks or hidden fees. You pay per user, what you see here.
//           </p>
//         </motion.div>

//         {/* Pricing Toggle */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex justify-center items-center space-x-4 my-12"
//           >
//             <button
//               onClick={togglePricing}
//               className="bg-gray-900/20 border border-gray-700 rounded-xl p-1 flex items-center relative"
//             >
//             <motion.span
//               animate={{ x: isYearly ? '100%' : '0%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//               className="absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-gray-100 rounded-lg left-1"
//             />
//             <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
//               isYearly ? 'text-gray-400' : 'text-black'
//             }`}>
//               Pay monthly
//             </span>
//             <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
//               isYearly ? 'text-black' : 'text-gray-400'
//             }`}>
//               Pay yearly
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

//         {/* Calculator */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28">
//         <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center">Pricing Calculator</h3>
//         <p className="mt-4 text-xl text-center font-serif italic text-gray-400">
//             Calculate exact price you need to pay.
//           </p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-14 border border-gray-800 bg-black rounded-lg p-8 shadow-lg"
//           >
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch space-y-6 md:space-y-0">
//               <div className="w-full md:w-1/2 space-y-6">
//                 <div className="flex flex-col space-y-2 w-full">
//                   <div className="flex justify-between items-center">
//                     <label className="text-gray-300 text-base">Number of Users</label>
//                     <Input
//                       type="number"
//                       min="1"
//                       max="3000"
//                       value={userCount}
//                       onChange={(e) => setUserCount(Math.min(3000, Math.max(1, parseInt(e.target.value) || 1)))}
//                       className="w-20 bg-gray-900/20 text-white px-2 py-1 rounded-md text-center"
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
//                       <SelectTrigger id="plan-select" className="bg-gray-900/20 text-white">
//                         <SelectValue placeholder="Select plan" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {pricingPlans.map(plan => (
//                           <SelectItem key={plan.name} value={plan.name}>{plan.name}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="flex flex-col space-y-2 w-1/2">
//                     <Label htmlFor="billing-cycle" className="text-gray-300 text-base">Billing Cycle</Label>
//                     <Select value={isYearly ? 'yearly' : 'monthly'} onValueChange={(value) => setIsYearly(value === 'yearly')}>
//                       <SelectTrigger id="billing-cycle" className="bg-gray-900/20 text-white">
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
//               <div className="w-full border border-gray-800 md:w-1/2 md:ml-10 flex flex-col items-center justify-center bg-gray-900/20 rounded-lg p-6">
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
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28 ">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  sm:text-3xl">
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
//                     className="bg-gray-900/20 border border-gray-800 rounded-lg overflow-hidden"
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
//               className="lg:w-1/2 bg-gray-900/20 border border-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-center"
//             >
//               <div className="px-6 py-8 sm:p-10">
//                 <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  mb-4">
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
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default PricingPage;


//gerai
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

// const PricingPage = () => {
//   const [isYearly, setIsYearly] = useState(false);
//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [userCount, setUserCount] = useState(1);
//   const [selectedPlan, setSelectedPlan] = useState('Essential');
//   const router = useRouter();

//   const togglePricing = () => setIsYearly(!isYearly);

//   const toggleFAQ = (index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const handleCTAClick = (link) => {
//     router.push(link);
//   };

//   const pricingTiers = [
//     { users: 50, essentialMonthly: 1.8, essentialYearly: 21.6, advancedMonthly: 3.5, advancedYearly: 42 },
//     { users: 100, essentialMonthly: 1.5, essentialYearly: 18, advancedMonthly: 3, advancedYearly: 36 },
//     { users: 250, essentialMonthly: 1.2, essentialYearly: 14.4, advancedMonthly: 2.5, advancedYearly: 30 },
//     { users: 1000, essentialMonthly: 1, essentialYearly: 12, advancedMonthly: 2.2, advancedYearly: 26.4 },
//     { users: 2000, essentialMonthly: 0.9, essentialYearly: 10.8, advancedMonthly: 2, advancedYearly: 24 },
//     { users: 3000, essentialMonthly: 0.8, essentialYearly: 9.6, advancedMonthly: 1.8, advancedYearly: 21.6 },
//   ];

//   const getPrice = (userCount, isAdvanced, isYearly) => {
//     const tier = pricingTiers.find(t => userCount <= t.users) || pricingTiers[pricingTiers.length - 1];
//     if (isAdvanced) {
//       return isYearly ? tier.advancedYearly : tier.advancedMonthly;
//     } else {
//       return isYearly ? tier.essentialYearly : tier.essentialMonthly;
//     }
//   };

//   const calculatePrice = () => {
//     const pricePerUser = getPrice(userCount, selectedPlan === "Advanced", isYearly);
//     return (userCount * pricePerUser).toFixed(2);
//   };

//   const getPricePerUser = () => {
//     return getPrice(userCount, selectedPlan === "Advanced", isYearly).toFixed(2);
//   };

//   const pricingPlans = [
//     {
//       name: "Essential",
//       monthlyPrice: 1.8,
//       yearlyPrice: 18,
//       description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
//       features: [
//         "Access to essential cybersecurity awareness training modules",
//         "Core analytics",
//         "Email support",
//         "1 administrator seat",
//         "Role Based training",
//       ],
//       cta: "Select",
//       link: "/checkout",
//     },
//     {
//       name: "Advanced",
//       monthlyPrice: 3.5,
//       yearlyPrice: 35,
//       description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
//       features: [
//         "Everything in the Essential plan",
//         "Access to all core and advanced training modules",
//         "Advanced analytics",
//         "3 administrator seats",
//         "Weak Points",
//       ],
//       cta: "Select",
//       link: "/checkout",
//       highlighted: true
//     },
//     {
//       name: "Tailored",
//       monthlyPrice: "Custom",
//       yearlyPrice: "Custom",
//       description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
//       features: [
//         "Everything in the Advanced plan",
//         "Access to all training modules, including specialized topics",
//         "Unlimited administrator seats",
//         "Priority Email and Phone Support",
//         "Custom Solutions",
//       ],
//       cta: "Request a Quote",
//       link: "/contact",
//     }
//   ];

//   const getCalculablePlans = () => pricingPlans.filter(plan => plan.name !== "Tailored");

//   const faqs = [
//     { question: "Is there a free trial available?", answer: "No, but we offer a satisfaction guarantee. If you fully engage with our training for the first month and don't see measurable improvement, we'll work with you to address any concerns or offer a refund." },
//     { question: "Is it possible to change the plan later?", answer: "Yes, you can upgrade or downgrade your plan at any time." },
//     { question: "What is your cancellation policy?", answer: "You only have to inform us 14 days prior cancelation. We do not lock businesses in long-term contracts unless they are happy with our solutions." },
//     { question: "How does billing work?", answer: "We bill monthly or yearly, depending on your chosen plan." },
//   ];

//   const renderPricingTier = (plan, isYearly, index) => {
//     const calculateYearlySavings = () => {
//       if (plan.monthlyPrice === "Custom" || plan.yearlyPrice === "Custom") {
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
//         className={`flex flex-col rounded-lg overflow-hidden bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] ${
//           plan.highlighted ? 'border-2 border-gray-800 lg:scale-105' : 'border border-gray-800 lg:scale-95'
//         }`}
//       >
//         <div className="px-6 py-8 sm:p-10 sm:pb-6">
//           <div>
//             <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
//               {plan.name}
//             </h3>
//           </div>
//           <div className="mt-4 flex items-baseline text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
//             {plan.monthlyPrice === "Custom" ? "Custom" : 
//               `€${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`}
//             {plan.monthlyPrice !== "Custom" && (
//               <span className="ml-1 text-2xl font-medium text-gray-500">
//                 /user/{isYearly ? 'year' : 'month'}
//               </span>
//             )}
//           </div>
//           <div className="h-5">
//             {isYearly && savings && (
//               <p className="text-sm text-orange-400/80">
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
//                   <Check className="h-6 w-6 text-orange-500/80" />
//                 </div>
//                 <p className="ml-3 text-base text-gray-300">{feature}</p>
//               </li>
//             ))}
//           </ul>
//           <div className="w-full rounded-md shadow">
//             <motion.button
//               onClick={() => handleCTAClick(plan.link)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full flex items-center justify-center px-5 py-3 border border-gray-800  text-base font-medium rounded-md text-black bg-gray-200/80 hover:bg-gray-200"
//             >
//               {plan.cta}
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-56">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl">
//           Flexible per-user pricing to meet your needs
//           </h2>
//           <p className="mt-4 text-xl font-serif italic text-gray-400">
//             No tricks or hidden fees. You pay per user, what you see here.
//           </p>
//         </motion.div>

//         {/* Pricing Toggle */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="flex justify-center items-center space-x-4 my-12"
//           >
//             <button
//               onClick={togglePricing}
//               className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-1 flex items-center relative"
//             >
//             <motion.span
//               animate={{ x: isYearly ? '100%' : '0%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//               className="absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-gray-100 rounded-lg left-1"
//             />
//             <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
//               isYearly ? 'text-gray-400' : 'text-black'
//             }`}>
//               Pay monthly
//             </span>
//             <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
//               isYearly ? 'text-black' : 'text-gray-400'
//             }`}>
//               Pay yearly
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

//         {/* Calculator */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28">
//         <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center">Pricing Calculator</h3>
//         <p className="mt-4 text-xl text-center font-serif italic text-gray-400">
//             Calculate exact price you need to pay.
//           </p>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-14 border border-gray-800 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] rounded-lg p-8 shadow-lg"
//           >
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch space-y-6 md:space-y-0">
//               <div className="w-full md:w-1/2 space-y-6">
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
//                   <Label htmlFor="plan-select" className="text-gray-300 text-base">Select Plan</Label>
//                     <Select value={selectedPlan} onValueChange={(value) => setSelectedPlan(value)}>
//                       <SelectTrigger id="plan-select" 
//                       // className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white">
//                       className={cn(
//                         "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white",
//                         "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                       )}>
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
//                       <SelectTrigger id="billing-cycle" 
//                       // className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white">
//                       className={cn(
//                         "bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white",
//                         "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                       )}>
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
//               <div className="w-full border border-gray-800 md:w-1/2 md:ml-10 flex flex-col items-center justify-center bg-gray-900/10  rounded-lg p-6">
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
//         <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mt-28 ">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  sm:text-3xl">
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
//                 <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  mb-4">
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
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default PricingPage;



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

// interface PricingTier {
//   users: number;
//   essentialMonthly: number;
//   essentialYearly: number;
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

//   const handleCTAClick = (link: string) => {
//     router.push(link);
//   };

//   const pricingTiers: PricingTier[] = [
//     { users: 50, essentialMonthly: 1.8, essentialYearly: 21.6, advancedMonthly: 3.5, advancedYearly: 42 },
//     { users: 100, essentialMonthly: 1.5, essentialYearly: 18, advancedMonthly: 3, advancedYearly: 36 },
//     { users: 250, essentialMonthly: 1.2, essentialYearly: 14.4, advancedMonthly: 2.5, advancedYearly: 30 },
//     { users: 1000, essentialMonthly: 1, essentialYearly: 12, advancedMonthly: 2.2, advancedYearly: 26.4 },
//     { users: 2000, essentialMonthly: 0.9, essentialYearly: 10.8, advancedMonthly: 2, advancedYearly: 24 },
//     { users: 3000, essentialMonthly: 0.8, essentialYearly: 9.6, advancedMonthly: 1.8, advancedYearly: 21.6 },
//   ];

//   const getPrice = (userCount: number, isAdvanced: boolean, isYearly: boolean): number => {
//     const tier = pricingTiers.find(t => userCount <= t.users) || pricingTiers[pricingTiers.length - 1];
//     if (isAdvanced) {
//       return isYearly ? tier.advancedYearly : tier.advancedMonthly;
//     } else {
//       return isYearly ? tier.essentialYearly : tier.essentialMonthly;
//     }
//   };

//   const calculatePrice = (): string => {
//     const pricePerUser = getPrice(userCount, selectedPlan === "Advanced", isYearly);
//     return (userCount * pricePerUser).toFixed(2);
//   };

//   const getPricePerUser = (): string => {
//     return getPrice(userCount, selectedPlan === "Advanced", isYearly).toFixed(2);
//   };

//   const pricingPlans: PricingPlan[] = [
//     {
//       name: "Essential",
//       monthlyPrice: 1.8,
//       yearlyPrice: 18,
//       description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
//       features: [
//         "Access to essential cybersecurity awareness training modules",
//         "Core analytics",
//         "Email support",
//         "1 administrator seat",
//         "Role Based training",
//       ],
//       cta: "Select",
//       link: "/checkout",
//     },
//     {
//       name: "Advanced",
//       monthlyPrice: 3.5,
//       yearlyPrice: 35,
//       description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
//       features: [
//         "Everything in the Essential plan",
//         "Access to all core and advanced training modules",
//         "Advanced analytics",
//         "3 administrator seats",
//         "Weak Points",
//       ],
//       cta: "Select",
//       link: "/checkout",
//       highlighted: true
//     },
//     {
//       name: "Tailored",
//       monthlyPrice: "Custom",
//       yearlyPrice: "Custom",
//       description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
//       features: [
//         "Everything in the Advanced plan",
//         "Access to all training modules, including specialized topics",
//         "Unlimited administrator seats",
//         "Priority Email and Phone Support",
//         "Custom Solutions",
//       ],
//       cta: "Request a Quote",
//       link: "/contact",
//     }
//   ];

//   const getCalculablePlans = () => pricingPlans.filter(plan => plan.name !== "Tailored");

//   const faqs: FAQ[] = [
//     { question: "Is there a free trial available?", answer: "No, but we offer a satisfaction guarantee. If you fully engage with our training for the first month and don't see measurable improvement, we'll work with you to address any concerns or offer a refund." },
//     { question: "Is it possible to change the plan later?", answer: "Yes, you can upgrade or downgrade your plan at any time." },
//     { question: "What is your cancellation policy?", answer: "You only have to inform us 14 days prior cancelation. We do not lock businesses in long-term contracts unless they are happy with our solutions." },
//     { question: "How does billing work?", answer: "We bill monthly or yearly, depending on your chosen plan." },
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
//         className={`flex flex-col rounded-lg overflow-hidden bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] ${
//           plan.highlighted ? 'border-2 border-gray-800 lg:scale-105' : 'border border-gray-800 lg:scale-95'
//         }`}
//       >
//         <div className="px-6 py-8 sm:p-10 sm:pb-6">
//           <div>
//             <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
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
//               onClick={() => handleCTAClick(plan.link)}
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
//     <div className="min-h-screen bg-black text-white relative overflow-hidden">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-56">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl">
//             Flexible per-user pricing to meet your needs
//           </h2>
//           <p className="mt-4 text-xl font-serif italic text-gray-400">
//             No tricks or hidden fees. You pay per user, what you see here.
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
//               <div className="w-full md:w-1/2 space-y-6">
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
//               <div className="w-full border border-gray-800 md:w-1/2 md:ml-10 flex flex-col items-center justify-center bg-gray-900/10 rounded-lg p-6">
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
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default PricingPage;


'use client'

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Pricing - XThreat',
//   description: 'XThreat Pricing',
// };

interface PricingTier {
  users: number;
  essentialMonthly: number;
  essentialYearly: number;
  advancedMonthly: number;
  advancedYearly: number;
}

interface PricingPlan {
  name: string;
  monthlyPrice: number | "Custom";
  yearlyPrice: number | "Custom";
  description: string;
  features: string[];
  cta: string;
  link: string;
  highlighted?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface YearlySavings {
  amount: string;
  percentage: string;
}

const PricingPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number>(1);
  const [selectedPlan, setSelectedPlan] = useState<string>('Essential');
  const router = useRouter();

  const togglePricing = () => setIsYearly(!isYearly);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleCTAClick = (link: string, planName?: string) => {
    if (link === '/checkout' && planName) {
      router.push(`${link}?plan=${planName.toLowerCase()}`);
    } else {
      router.push(link);
    }
  };

  // const pricingTiers: PricingTier[] = [
  //   { users: 50, essentialMonthly: 1.8, essentialYearly: 21.6, advancedMonthly: 3.5, advancedYearly: 42 },
  //   { users: 100, essentialMonthly: 1.5, essentialYearly: 18, advancedMonthly: 3, advancedYearly: 36 },
  //   { users: 250, essentialMonthly: 1.2, essentialYearly: 14.4, advancedMonthly: 2.5, advancedYearly: 30 },
  //   { users: 1000, essentialMonthly: 1, essentialYearly: 12, advancedMonthly: 2.2, advancedYearly: 26.4 },
  //   { users: 2000, essentialMonthly: 0.9, essentialYearly: 10.8, advancedMonthly: 2, advancedYearly: 24 },
  //   { users: 3000, essentialMonthly: 0.8, essentialYearly: 9.6, advancedMonthly: 1.8, advancedYearly: 21.6 },
  // ];

const pricingTiers: PricingTier[] = [
    { users: 50, essentialMonthly: 2.3, essentialYearly: 22.08, advancedMonthly: 4.5, advancedYearly: 43.20 },
    { users: 100, essentialMonthly: 1.9, essentialYearly: 18.24, advancedMonthly: 3.9, advancedYearly: 37.44 },
    { users: 250, essentialMonthly: 1.5, essentialYearly: 14.40, advancedMonthly: 3.2, advancedYearly: 30.72 },
    { users: 1000, essentialMonthly: 1.3, essentialYearly: 12.48, advancedMonthly: 2.8, advancedYearly: 26.88 },
    { users: 2000, essentialMonthly: 1.2, essentialYearly: 11.52, advancedMonthly: 2.6, advancedYearly: 24.96 },
    { users: 3000, essentialMonthly: 1.0, essentialYearly: 9.60, advancedMonthly: 2.3, advancedYearly: 22.08 },
];

  const getPrice = (userCount: number, isAdvanced: boolean, isYearly: boolean): number => {
    const tier = pricingTiers.find(t => userCount <= t.users) || pricingTiers[pricingTiers.length - 1];
    if (isAdvanced) {
      return isYearly ? tier.advancedYearly : tier.advancedMonthly;
    } else {
      return isYearly ? tier.essentialYearly : tier.essentialMonthly;
    }
  };

  const calculatePrice = (): string => {
    const pricePerUser = getPrice(userCount, selectedPlan === "Advanced", isYearly);
    return (userCount * pricePerUser).toFixed(2);
  };

  const getPricePerUser = (): string => {
    return getPrice(userCount, selectedPlan === "Advanced", isYearly).toFixed(2);
  };

  // const pricingPlans: PricingPlan[] = [
  //   {
  //     name: "Essential",
  //     monthlyPrice: 1.8,
  //     yearlyPrice: 18,
  //     description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
  //     features: [
  //       "Access to essential cybersecurity awareness training modules",
  //       "Core analytics",
  //       "Email support",
  //       "1 administrator seat",
  //       "Role Based training",
  //     ],
  //     cta: "Select",
  //     link: "/checkout",
  //   },
  //   {
  //     name: "Advanced",
  //     monthlyPrice: 3.5,
  //     yearlyPrice: 35,
  //     description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
  //     features: [
  //       "Everything in the Essential plan",
  //       "Access to all core and advanced training modules",
  //       "Advanced analytics",
  //       "3 administrator seats",
  //       "Weak Points",
  //     ],
  //     cta: "Select",
  //     link: "/checkout",
  //     highlighted: true
  //   },
  //   {
  //     name: "Tailored",
  //     monthlyPrice: "Custom",
  //     yearlyPrice: "Custom",
  //     description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
  //     features: [
  //       "Everything in the Advanced plan",
  //       "Access to all training modules, including specialized topics",
  //       "Unlimited administrator seats",
  //       "Priority Email and Phone Support",
  //       "Custom Solutions",
  //     ],
  //     cta: "Request a Quote",
  //     link: "/contact",
  //   }
  // ];

  const pricingPlans: PricingPlan[] = [
    {
      name: "Essential",
      monthlyPrice: 2.3,
      yearlyPrice: 22.08, // 20% annual discount applied
      description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
      features: [
        "Access to essential cybersecurity awareness training modules",
        "Core analytics and reporting",
        "Email support",
        "1 administrator seat",
        "Role-based training paths",
        "Interactive quizzes and assessments",
      ],
      cta: "Select",
      link: "/checkout",
    },
    {
      name: "Advanced",
      monthlyPrice: 4.5,
      yearlyPrice: 43.20, // 20% annual discount applied
      description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
      features: [
        "Everything in the Essential plan",
        "Access to all core and advanced training modules",
        "Advanced analytics and custom reports",
        "3 administrator seats",
        "Risk assessment dashboard",
        "Advanced simulation exercises",
      ],
      cta: "Select",
      link: "/checkout",
      highlighted: true
    },
    {
      name: "Enterprise",  // Changed from "Tailored" to more standard term
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
      features: [
        "Everything in the Advanced plan",
        "Custom training module development",
        "Unlimited administrator seats",
        "Priority Email and Phone Support",
        "Custom integration solutions",
        "Dedicated success manager",
      ],
      cta: "Request a Quote",
      link: "/contact",
    }
  ];

  const getCalculablePlans = () => pricingPlans.filter(plan => plan.name !== "Tailored");

  const faqs: FAQ[] = [
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

  const renderPricingTier = (plan: PricingPlan, isYearly: boolean, index: number) => {
    const calculateYearlySavings = (): YearlySavings | null => {
      if (typeof plan.monthlyPrice === "string" || typeof plan.yearlyPrice === "string") {
        return null;
      }
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlySavings = monthlyCost - plan.yearlyPrice;
      const savingsPercentage = (yearlySavings / monthlyCost) * 100;
      return {
        amount: yearlySavings.toFixed(1),
        percentage: savingsPercentage.toFixed(0)
      };
    };
  
    const savings = calculateYearlySavings();

    return (
      <motion.div
        key={plan.name}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`flex flex-col rounded-lg overflow-hidden font-sans bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] ${
          plan.highlighted ? 'border-2 border-gray-800 lg:scale-105' : 'border border-gray-800 lg:scale-95'
        }`}
      >
        <div className="px-6 py-8 sm:p-10 sm:pb-6">
          <div>
            <h3 className="inline-flex px-4 py-1 font-sans rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-900 border border-gray-800 text-gray-200">
              {plan.name}
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold">
            {typeof plan.monthlyPrice === "string" ? "Custom" : 
              `€${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`}
            {typeof plan.monthlyPrice !== "string" && (
              <span className="ml-1 text-2xl font-medium text-gray-500">
                user/{isYearly ? 'year' : 'month'}
              </span>
            )}
          </div>
          <div className="h-5">
            {isYearly && savings && (
              <p className="text-sm text-green-400/80">
                Save €{savings.amount}/user/year ({savings.percentage}% off)
              </p>
            )}
          </div>
          <p className="text-base text-gray-400">{plan.description}</p>
        </div>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-2 space-y-6 sm:p-10 sm:pt-2">
          <ul className="space-y-4">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-green-500/80" />
                </div>
                <p className="ml-3 text-base text-gray-300">{feature}</p>
              </li>
            ))}
          </ul>
          <div className="w-full rounded-md shadow">
            <motion.button
              onClick={() => handleCTAClick(plan.link, plan.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center px-5 py-3 border border-gray-800 text-base font-medium rounded-md text-black bg-gray-200/80 hover:bg-gray-200"
            >
              {plan.cta}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };
  

  return (
    <div className="min-h-screen font-sans bg-black text-white relative overflow-hidden">
      <Navbar />
      
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-56">
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
            className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-1 flex items-center relative"
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
            <span className={`px-4 py-2 mr-3 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
              isYearly ? 'text-gray-400' : 'text-black'
            }`}>
              Monthly
            </span>
            <span className={`px-4 py-2 mr-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
              isYearly ? 'text-black' : 'text-gray-400'
            }`}>
              Yearly
            </span>
          </button>
        </motion.div>

        

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8"
        >
          {pricingPlans.map((plan, index) => renderPricingTier(plan, isYearly, index))}
        </motion.div>

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
            className="mt-14 border border-gray-800 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] rounded-lg p-8 shadow-lg"
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
                      className="w-20 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] text-white px-2 py-1 rounded-md text-center"
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





