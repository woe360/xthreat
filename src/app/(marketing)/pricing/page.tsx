'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import Navbar from '@/app/(marketing)/navigation/navbar';
import Footer from '@/app/(marketing)/navigation/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { Input } from '@/components/input';
import { cn } from "@/lib/utils"
import { Slider } from "@/components/slider"
import Link from 'next/link';
import NumberFlow from "@number-flow/react";

interface AnimatedPriceProps {
  price: number;
  isYearly: boolean;
}

const AnimatedPrice = ({ price, isYearly }: AnimatedPriceProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative text-center h-20 flex items-center justify-center w-full">
        <div className="flex items-center justify-center w-full -ml-4">
          <div className="relative w-8 h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={isYearly ? 'yearly-euro' : 'monthly-euro'}
                initial={{ 
                  x: 20,
                  opacity: 0 
                }}
                animate={{ 
                  x: 0,
                  opacity: 1 
                }}
                exit={{ 
                  x: -20,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="text-5xl mt-2 text-white/80 absolute"
              >
                €
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-5xl mt-2 font-base text-white/80">
            {price.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="text-white text-center flex items-center justify-center w-full -mt-2">
        <div className="flex items-center justify-center text-center">Per user /</div>
        <div className="relative w-16 h-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={isYearly ? ' yearly' : ' monthly'}
              initial={{ 
                x: 20,
                opacity: 0 
              }}
              animate={{ 
                x: 0,
                opacity: 1 
              }}
              exit={{ 
                x: -20,
                opacity: 0 
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="absolute right-1 left-0 whitespace-nowrap"
            >
              {isYearly ? ' year' : ' month'}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Define proper types for the pricing plans
interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  link: string;
  highlighted?: boolean;
}

const FeaturesTable = () => {
  const columnClass = "py-5 px-4 md:px-6";
  const features = [
    {
      name: "Free Trial",
      essential: "14-day trial",
      core: "14-day trial",
      advanced: "14-day trial"
    },
    {
      name: "Training Modules",
      essential: "Essential",
      core: "Advanced",
      advanced: "Advanced + Custom"
    },
    {
      name: "Manager Seats",
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
      name: "Role Based Training",
      essential: true,
      core: true,
      advanced: true
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
      name: "Weak Points",
      essential: false,
      core: false,
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
    <div className="w-full max-w-[1360px] mx-auto overflow-x-auto">
      <div className="min-w-[768px] border-white/20">
        <div className="grid grid-cols-4 text-left border-b border-white/10">
          <div className={`${columnClass} text-lg`}>Features</div>
          <div className={`${columnClass} text-lg`}>Essential</div>
          <div className={`${columnClass} text-lg`}>Core</div>
          <div className={`${columnClass} text-lg`}>Advanced</div>
        </div>
        
        <div>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="grid grid-cols-4 text-sm border-b border-white/5 last:border-0"
            >
              <div className={`${columnClass} text-white`}>{feature.name}</div>
              {[feature.essential, feature.core, feature.advanced].map((value, i) => (
                <div key={i} className={`${columnClass} text-neutral-400`}>
                  {typeof value === 'boolean' ? (
                    value ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-red-700">—</span>
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [userCount, setUserCount] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Essential');
  const router = useRouter();

  const [animatedTotalCost, setAnimatedTotalCost] = useState(0);
  const [animatedCostPerUser, setAnimatedCostPerUser] = useState(0);

  const togglePricing = () => setIsYearly(!isYearly);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleCTAClick = (link: string, planName?: string) => {
    if (planName) {
      const baseLink = link.split('?')[0];
      const searchParams = new URLSearchParams();
      searchParams.append('plan', planName.toLowerCase());
      searchParams.append('billing', isYearly ? 'yearly' : 'monthly');
      router.push(`${baseLink}?${searchParams.toString()}`);
    } else {
      router.push(link);
    }
  };

  const pricingTiers = [
    { 
      users: 50, 
      essentialMonthly: 3.9, 
      essentialYearly: 39.0, 
      coreMonthly: 6.9, 
      coreYearly: 69.0,
      advancedMonthly: 9.9,
      advancedYearly: 99.0
    },
    { 
      users: 100, 
      essentialMonthly: 3.2, 
      essentialYearly: 32.0, 
      coreMonthly: 6.0, 
      coreYearly: 60.0,
      advancedMonthly: 9.1,
      advancedYearly: 91.0
    },
    { 
      users: 250, 
      essentialMonthly: 2.5, 
      essentialYearly: 25.0, 
      coreMonthly: 4.9, 
      coreYearly: 49.0,
      advancedMonthly: 8.0,
      advancedYearly: 80.0
    },
    { 
      users: 1000, 
      essentialMonthly: 2.2, 
      essentialYearly: 22.0, 
      coreMonthly: 4.3, 
      coreYearly: 43.0,
      advancedMonthly: 7.4,
      advancedYearly: 74.0
    },
    { 
      users: 2000, 
      essentialMonthly: 2.0, 
      essentialYearly: 20.0, 
      coreMonthly: 4.0, 
      coreYearly: 40.0,
      advancedMonthly: 7.1,
      advancedYearly: 71.0
    },
    { 
      users: 3000, 
      essentialMonthly: 1.7, 
      essentialYearly: 17.0, 
      coreMonthly: 3.5, 
      coreYearly: 35.0,
      advancedMonthly: 6.7,
      advancedYearly: 67.0
    },
    { 
      users: 5000, 
      essentialMonthly: 1.4, 
      essentialYearly: 14.0, 
      coreMonthly: 2.9, 
      coreYearly: 29.0,
      advancedMonthly: 5.9,
      advancedYearly: 59.0
    },
    { 
      users: 10000, 
      essentialMonthly: 1.0, 
      essentialYearly: 10.0, 
      coreMonthly: 2.3, 
      coreYearly: 23.0,
      advancedMonthly: 5.0,
      advancedYearly: 50.0
    },
    { 
      users: 30000, 
      essentialMonthly: 0.8, 
      essentialYearly: 8.0, 
      coreMonthly: 1.8, 
      coreYearly: 18.0,
      advancedMonthly: 4.3,
      advancedYearly: 43.0
    }
  ];

  const getPrice = (userCount: number, planName: string, isYearly: boolean) => {
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

  useEffect(() => {
    const pricePerUser = getPrice(userCount, selectedPlan, isYearly);
    const totalCost = userCount * pricePerUser;
    setAnimatedTotalCost(totalCost);
    setAnimatedCostPerUser(pricePerUser);
  }, [userCount, selectedPlan, isYearly]);

  const pricingPlans: PricingPlan[] = [
    {
      name: "Essential",
      monthlyPrice: 3.9,
      yearlyPrice: 39,
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
      monthlyPrice: 6.9,
      yearlyPrice: 69,
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
      monthlyPrice: 9.9,
      yearlyPrice: 99,
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
    <div className="min-h-screen font-sans bg-[#0b0b0b] text-white relative overflow-hidden">
      {/* Subtle gradient elements */}
      {/* <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div> */}
      {/* <div className="absolute top-3/4 left-1/3 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div> */}
      <Navbar />
      
      {/* Section 1: Header, Toggle, Pricing Cards - Wrapped in full-width border div */}
      <div className="w-full pb-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-80">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-start"
          >
            <h2 className="text-5xl font-normal">
              Pricing
            </h2>
            <p className="mt-6 text-lg text-neutral-400">
              You pay per user, what you see here.
            </p>
          </motion.div>

          {/* Pricing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-end mb-16"
          >
            {(() => {
              // Logic for the animated toggle - assuming isYearly and setIsYearly are defined in this component's scope
              const monthlyRef = useRef<HTMLButtonElement>(null);
              const yearlyRef = useRef<HTMLButtonElement>(null);
              const [highlightStyle, setHighlightStyle] = useState({ x: 0, width: 0, opacity: 0 });

              useEffect(() => {
                const calculateHighlight = () => {
                  if (isYearly) {
                    if (yearlyRef.current) {
                      setHighlightStyle({
                        x: yearlyRef.current.offsetLeft,
                        width: yearlyRef.current.offsetWidth,
                        opacity: 1,
                      });
                    }
                  } else {
                    if (monthlyRef.current) {
                      setHighlightStyle({
                        x: monthlyRef.current.offsetLeft - 2,
                        width: monthlyRef.current.offsetWidth,
                        opacity: 1,
                      });
                    }
                  }
                };
                calculateHighlight(); // Calculate on mount and when isYearly changes
                // Consider adding a window resize listener here if the button sizes are responsive
              }, [isYearly]);

              return (
                <div className="relative inline-flex rounded-full border border-white/10 p-[2px]">
                  <motion.div
                    className="absolute top-[2px] bottom-[2px] h-[calc(100%-4px)] rounded-full bg-white/10"
                    initial={false}
                    animate={highlightStyle}
                    transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
                  />
                  <button
                    ref={monthlyRef}
                    onClick={() => setIsYearly(false)}
                    className={`relative z-10 px-7 py-2 rounded-full transition-colors`}
                  >
                    Monthly
                  </button>
                  <button
                    ref={yearlyRef}
                    onClick={() => setIsYearly(true)}
                    className={`relative z-10 px-7 py-2 rounded-full transition-colors`}
                  >
                    Yearly
                  </button>
                </div>
              );
            })()}
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16"
          >
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="flex flex-col">
                <h3 className="text-xl font-normal mb-6">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <div className="text-5xl font-light">
                    <NumberFlow 
                      value={isYearly ? plan.yearlyPrice : plan.monthlyPrice} 
                      format={{
                        style: 'currency',
                        currency: 'EUR',
                        trailingZeroDisplay: 'stripIfInteger',
                        maximumFractionDigits: 1 
                      }}
                    />
                  </div>
                  <div className="text-neutral-400 mt-1">
                    Per user / {isYearly ? 'year' : 'month'}
                  </div>
                </div>
                <p className="text-neutral-400 mb-10 min-h-[80px]">
                  {plan.description}
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-neutral-400">
                      <Check className="h-5 w-5 mr-3 text-white/60 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCTAClick('/free-trial', plan.name)}
                  className="rounded-full border border-white/20 py-3 px-8 hover:bg-white/5 transition-colors mt-auto"
                >
                  Start Free Trial
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Table (Optional) - If uncommented, might need border adjustments */}
      {/* <div className="w-full border-b border-white/20 py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-normal mb-12 text-center">Compare features</h3>
          <FeaturesTable />
        </div>
      </div> */}

      {/* Calculator Section - Now just has bottom border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full border-b border-white/10 py-36"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8"> {/* Added padding */}
          <div className="flex justify-between items-center mb-16">
            <h3 className="text-5xl font-normal">
              Pricing calculator
            </h3>
            <button 
              onClick={() => handleCTAClick('/contact')}
              className=" rounded-full border border-white/20 py-2.5 px-6 flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              Request Custom Pricing
            </button>
          </div>
          
          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-2 gap-x-16 gap-y-10">
              <div>
                <p className="text-lg text-neutral-400 mb-3">Plan</p>
                <Select value={selectedPlan} onValueChange={(value) => setSelectedPlan(value)}>
                  <SelectTrigger 
                    id="plan-select" 
                    className="bg-transparent border-0 border-t border-white/20 rounded-none px-0 py-2 h-auto text-xl font-normal flex justify-between shadow-none"
                  >
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-gray-700">
                    {getCalculablePlans().map(plan => (
                      <SelectItem key={plan.name} value={plan.name}>{plan.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-lg text-neutral-400 mb-3">Billing Cycle</p>
                <Select value={isYearly ? 'yearly' : 'monthly'} onValueChange={(value) => setIsYearly(value === 'yearly')}>
                  <SelectTrigger 
                    id="billing-cycle" 
                    className="bg-transparent border-0 border-t border-white/20 rounded-none px-0 py-2 h-auto text-xl font-normal flex justify-between shadow-none"
                  >
                    <SelectValue placeholder="Select billing" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-gray-700">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="w-full">
              <p className="text-lg text-neutral-400 mb-3">Number of Users</p>
              <div className="flex items-center gap-4 w-full mb-2">
                <Input
                  type="number"
                  min="1"
                  max="30000"
                  value={userCount}
                  onChange={(e) => setUserCount(Math.min(30000, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="bg-transparent border-0 border-t border-white/20 rounded-none px-0 py-2 h-auto text-xl font-normal w-full shadow-none"
                />
              </div>
              
              <div className="flex items-center w-full">
                <p className="text-sm text-neutral-400 w-10">{userCount}</p>
                <div className="w-full mx-2">
                  <Slider
                    value={[userCount]}
                    onValueChange={(value) => setUserCount(value[0])}
                    max={30000}
                    step={1}
                    className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_.swui-slider-track]:bg-neutral-700 [&_.swui-slider-range]:bg-white"
                  />
                </div>
                <p className="text-sm text-neutral-400 w-12 text-right">30000+</p>
              </div>
            </div>
          </div>
          
          <div className="mt-20 flex justify-end">
            <div className="text-right">
              <p className="text-xl text-neutral-400">Cost</p>
              <p className="text-7xl font-normal mt-3">
                <NumberFlow 
                  value={animatedTotalCost} 
                  format={{
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }}
                />
              </p>
              <p className="text-sm text-neutral-400 mt-2">
                {isYearly ? 'per year' : 'per month'} for {userCount} user{userCount > 1 ? 's' : ''} 
                (<NumberFlow 
                  value={animatedCostPerUser} 
                  format={{
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }}
                /> per user)
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ and CTA Section - Outer div has border, inner border removed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full mt-36 border-b border-white/10 pb-20"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8"> {/* Added padding */}
          <div className="flex justify-between items-center mb-16">
            <h3 className="text-5xl font-normal">
              Frequently asked questions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {faqs.map((faq, index) => (
              <div key={`faq-item-${index}`} className="border-t border-white/20">
                <button
                  className="flex justify-between items-center w-full py-4 text-left text-xl"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-white/60" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFAQ === index && (
                    <motion.div
                      layout 
                      key={`faq-content-${index}`}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      className="block" 
                      variants={{
                        open: { opacity: 1, height: "auto", transitionEnd: { overflow: "visible" } }, 
                        collapsed: { opacity: 0, height: 0, overflow: "hidden" }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="text-neutral-400 py-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          {/* "Still have questions?" CTA - No border here now */}
          <div className="mt-20 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h4 className="text-2xl text-neutral-400 mb-6 md:mb-0">Still have questions?</h4>
              <button
                onClick={() => handleCTAClick('/contact')}
                className="rounded-full border border-white/20 py-2.5 px-6 flex items-center gap-2 hover:bg-white/5 transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final CTA Section - Has bottom border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full mt-36 pt-10 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-normal mb-6">
            Ready to get started?
          </h3>
          <p className="text-neutral-400 mb-10 max-w-2xl mx-auto">
            Try a free trial or see how our app works with no commitment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-trial"
              className="rounded-full border border-white bg-white text-black py-2.5 px-7 hover:bg-white/85 transition-colors"
            >
             Free Trial
            </Link>
            <Link
              href="/try-app"
              className="rounded-full border border-white/20 py-2.5 px-7 hover:bg-white/5 transition-colors"
            >
              Try App
            </Link>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default PricingPage;