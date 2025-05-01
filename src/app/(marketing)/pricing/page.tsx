'use client'

import React, { useState } from 'react';
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

  const calculatePrice = () => {
    const pricePerUser = getPrice(userCount, selectedPlan, isYearly);
    return (userCount * pricePerUser).toFixed(2);
  };

  const getPricePerUser = () => {
    return getPrice(userCount, selectedPlan, isYearly).toFixed(2);
  };

  const pricingPlans: PricingPlan[] = [
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
    <div className="min-h-screen font-sans bg-[#0b0b0b] [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)] text-white relative overflow-hidden">
      <Navbar />
      
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-56">
        {/* Header */}
        <div className="text-start">
          <h2 className="text-5xl font-normal">
            Pricing
          </h2>
          <p className="mt-6 text-lg text-neutral-400 italic">
            You pay per user, what you see here.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-end mb-16">
          <div className="inline-flex rounded-full border border-white/10 p-[2px]">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full transition-colors ${!isYearly ? 'bg-white/10' : ''}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-8 py-2 rounded-full transition-colors ${isYearly ? 'bg-white/10' : ''}`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 mb-32">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="flex flex-col">
              <h3 className="text-xl font-normal mb-6">
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <div className="text-5xl font-light">
                  €{isYearly ? plan.yearlyPrice.toFixed(1) : plan.monthlyPrice.toFixed(1)}
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
        </div>

        {/* Features Table */}
        {/* <div className="mt-36 mb-36">
          <h3 className="text-3xl font-normal mb-12">Compare features</h3>
          <FeaturesTable />
        </div> */}

        {/* Calculator Section */}
        <div className="w-full border-t border-b border-gray-800/50 py-36">
          <div className="max-w-[1360px] mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h3 className="text-5xl font-normal">
                Pricing calculator
              </h3>
              <button 
                onClick={() => handleCTAClick('/contact')}
                className="text-sm rounded-full border border-white/40 py-2 px-6 flex items-center gap-2 hover:bg-white/5 transition-colors"
              >
                REQUEST CUSTOM PRICING <span className="text-xl">→</span>
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
                    max="3000"
                    value={userCount}
                    onChange={(e) => setUserCount(Math.min(3000, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="bg-transparent border-0 border-t border-white/20 rounded-none px-0 py-2 h-auto text-xl font-normal w-full shadow-none"
                  />
                </div>
                
                <div className="flex items-center w-full">
                  <p className="text-sm text-neutral-400 w-10">{userCount}</p>
                  <div className="w-full mx-2">
                    <Slider
                      value={[userCount]}
                      onValueChange={(value) => setUserCount(value[0])}
                      max={3000}
                      step={1}
                      className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_.swui-slider-track]:bg-neutral-700 [&_.swui-slider-range]:bg-white"
                    />
                  </div>
                  <p className="text-sm text-neutral-400 w-12 text-right">3000+</p>
                </div>
              </div>
            </div>
            
            <div className="mt-20 flex justify-end">
              <div className="text-right">
                <p className="text-xl text-neutral-400">Cost</p>
                <p className="text-7xl font-normal mt-3">€{calculatePrice()}</p>
                <p className="text-sm text-neutral-400 mt-2">
                  {isYearly ? 'per year' : 'per month'} for {userCount} user{userCount > 1 ? 's' : ''} (€{getPricePerUser()} per user)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ and CTA Section */}
        <div className="w-full mt-36">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h3 className="text-5xl font-normal">
                Frequently asked questions
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-t border-white/20">
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
                        <div className="text-neutral-400 pb-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            <div className="mt-20 border-t border-white/20 pt-12">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <h4 className="text-2xl text-neutral-400 mb-6 md:mb-0">Still have questions?</h4>
                <button
                  onClick={() => handleCTAClick('/contact')}
                  className="rounded-full border border-white/40 py-3 px-6 flex items-center gap-2 hover:bg-white/5 transition-colors"
                >
                  GET IN TOUCH <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="w-full mt-36 border-t border-white/20 pt-20">
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
                className="rounded-full border border-white bg-white text-black py-3 px-8 hover:bg-white/90 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/try-app"
                className="rounded-full border border-white/40 py-3 px-8 hover:bg-white/5 transition-colors"
              >
                Try App
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PricingPage;