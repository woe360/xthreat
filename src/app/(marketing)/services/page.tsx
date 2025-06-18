'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  Check, 
  X,
  Star,
  ArrowRight,
  Users,
  ChevronDown
} from 'lucide-react';
import Navbar from '@/app/(marketing)/navigation/navbar';
import Footer from '@/app/(marketing)/navigation/footer';
import { Label } from '@/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select';
import { Input } from '@/components/input';
import { Slider } from "@/components/slider";
import NumberFlow from "@number-flow/react";
import { AnimatePresence } from 'framer-motion';

interface PackageProps {
  name: string;
  subtitle: string;
  startingPrice: string;
  teamSizeNote: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  pricing: Array<{
    size: string;
    range: string;
  }>;
  isPopular?: boolean;
  delay: number;
}

const PackageCard: React.FC<PackageProps> = ({ 
  name, 
  subtitle, 
  startingPrice, 
  teamSizeNote,
  features, 
  pricing,
  isPopular = false,
  delay 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col relative"
    >
      
      <div className={`flex flex-col h-full ${isPopular ? 'border border-white/40' : ''} ${isPopular ? 'bg-white/[0.02]' : ''} pr-6 pt-6 pb-6 rounded-lg`}>
        <h3 className="text-2xl font-normal mb-2">
          {name}
      </h3>
        <p className="text-neutral-400 mb-6">{subtitle}</p>
        
      <div className="mb-6">
          <div className="text-3xl font-light mb-1">
            {startingPrice}
          </div>
          <div className="text-sm text-neutral-400">
            {teamSizeNote}
          </div>
        </div>

        <div className="mb-8 flex-grow">
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                {feature.included ? (
                  <Check className="h-4 w-4 mr-3 text-white/60 mt-1 flex-shrink-0" />
                ) : (
                  <X className="h-4 w-4 mr-3 text-red-700 mt-1 flex-shrink-0" />
                )}
                <span className={feature.included ? "text-neutral-300" : "text-neutral-500"}>
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
      </div>

        <Link
          href="/contact"
          className="rounded-full border border-white/20 py-3 px-8 hover:bg-white/5 transition-colors text-center mt-auto"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const [participantCount, setParticipantCount] = useState(25);
  const [selectedPackage, setSelectedPackage] = useState('Professional');
  const [animatedTotalCost, setAnimatedTotalCost] = useState(0);
  const [animatedCostPerParticipant, setAnimatedCostPerParticipant] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Pricing tiers for each package based on participant count
  const pricingTiers = {
    'Essential': [
      { maxParticipants: 10, basePrice: 350, maxPrice: 450 },
      { maxParticipants: 50, basePrice: 450, maxPrice: 650 },
      { maxParticipants: 100, basePrice: 800, maxPrice: 1200 },
      { maxParticipants: 500, basePrice: 1200, maxPrice: 2000 },
      { maxParticipants: 3000, basePrice: 2000, maxPrice: 4000 }
    ],
    'Professional': [
      { maxParticipants: 10, basePrice: 600, maxPrice: 750 },
      { maxParticipants: 50, basePrice: 750, maxPrice: 1050 },
      { maxParticipants: 100, basePrice: 1500, maxPrice: 2200 },
      { maxParticipants: 500, basePrice: 2200, maxPrice: 3500 },
      { maxParticipants: 3000, basePrice: 3500, maxPrice: 6000 }
    ],
    'Enterprise': [
      { maxParticipants: 10, basePrice: 950, maxPrice: 1200 },
      { maxParticipants: 50, basePrice: 1200, maxPrice: 1650 },
      { maxParticipants: 100, basePrice: 2400, maxPrice: 3500 },
      { maxParticipants: 500, basePrice: 3500, maxPrice: 5500 },
      { maxParticipants: 3000, basePrice: 5500, maxPrice: 9000 }
    ]
  };

  const getPrice = (participantCount: number, packageName: string) => {
    const tiers = pricingTiers[packageName as keyof typeof pricingTiers];
    const tier = tiers.find(t => participantCount <= t.maxParticipants) || tiers[tiers.length - 1];
    
    // Calculate price based on participant count within the tier
    const progress = participantCount / tier.maxParticipants;
    const price = tier.basePrice + (tier.maxPrice - tier.basePrice) * progress;
    
    return Math.round(price);
  };

  useEffect(() => {
    const totalCost = getPrice(participantCount, selectedPackage);
    const costPerParticipant = totalCost / participantCount;
    setAnimatedTotalCost(totalCost);
    setAnimatedCostPerParticipant(costPerParticipant);
  }, [participantCount, selectedPackage]);

  // Package data
  const packages = [
    {
      name: "Essential Package",
      subtitle: "Perfect for getting started",
      startingPrice: "€35/person",
      teamSizeNote: "min. 10 people",
      features: [
        { text: "2-hour security awareness training", included: true },
        { text: "Phishing simulation & recognition training", included: true },
        { text: "Password security best practices", included: true },
        { text: "Safe email & internet practices", included: true },
        { text: "Social engineering awareness", included: true },
        { text: "Digital security guides provided", included: true },
        { text: "Compliance-specific content", included: false },
        { text: "Knowledge assessment", included: false },
        { text: "Custom content for your organization", included: false },
      ],
      pricing: [
        { size: "1-10 people", range: "€350 - €450" },
        { size: "11-50 people", range: "€450 - €650" },
        { size: "51+ people", range: "€800+" },
      ]
    },
    {
      name: "Professional Package",
      subtitle: "2-hour compliance training covering:",
      startingPrice: "€75/person",
      teamSizeNote: "min. 10 people",
      features: [
        { text: "GDPR requirements and employee obligations", included: true },
        { text: "ISO 27001 security standards training", included: true },
        { text: "NIS2 directive compliance requirements", included: true },
        { text: "Legal obligations and responsibilities", included: true },
        { text: "Data protection procedures", included: true },
        { text: "Incident reporting requirements", included: true },
        { text: "Regulatory compliance best practices", included: true },
        { text: "Custom industry-specific content", included: false },
      ],
      pricing: [
        { size: "1-10 people", range: "€600 - €750" },
        { size: "11-50 people", range: "€750 - €1,050" },
        { size: "51+ people", range: "€1,500+" },
      ]
    },
    {
      name: "Enterprise Package",
      subtitle: "2-hour custom training featuring:",
      startingPrice: "€120/person",
      teamSizeNote: "min. 10 people",
      features: [
        { text: "Content tailored to your specific industry", included: true },
        { text: "Your company systems and processes included", included: true },
        { text: "Industry-specific threat scenarios", included: true },
        { text: "Customized security policies training", included: true },
        { text: "Your organizational procedures covered", included: true },
        { text: "Branded presentation materials", included: true },
        { text: "Role-specific security responsibilities", included: true },
        { text: "Follow-up consultation included", included: true },
      ],
      pricing: [
        { size: "1-10 people", range: "€950 - €1,200" },
        { size: "11-50 people", range: "€1,200 - €1,650" },
        { size: "51+ people", range: "€2,400+" },
      ]
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-[#0b0b0b] text-white relative overflow-hidden">
      <Navbar />
      
      {/* Header Section */}
      <div className="w-full pb-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-80">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-start"
          >
            <h2 className="text-5xl font-normal">
              Security Training
            </h2>
            <p className="mt-6 text-lg text-neutral-400">
              Professional training programs designed to strengthen your team's security awareness
            </p>
          </motion.div>
        </div>
      </div>

      {/* Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full py-20"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard 
                key={index}
                name={pkg.name}
                subtitle={pkg.subtitle}
                startingPrice={pkg.startingPrice}
                teamSizeNote={pkg.teamSizeNote}
                features={pkg.features}
                pricing={pkg.pricing}
                isPopular={false}
                delay={0.3 + (index * 0.1)}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-neutral-400">
              7-day money-back guarantee • Full refund if not satisfied
            </p>
          </div>
        </div>
      </motion.div>

      {/* Training Calculator Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full border-b border-white/10 py-36"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <h3 className="text-5xl font-normal">
              Training calculator
            </h3>
            <Link 
              href="/contact"
              className="rounded-full border border-white/20 py-2.5 px-6 flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              Request Custom Quote
            </Link>
          </div>
          
          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-1 gap-x-16 gap-y-10">
              <div>
                <p className="text-lg text-neutral-400 mb-3">Package</p>
                <Select value={selectedPackage} onValueChange={(value) => setSelectedPackage(value)}>
                  <SelectTrigger 
                    id="package-select" 
                    className="bg-transparent border-0 border-t border-white/20 rounded-none px-0 py-2 h-auto text-xl font-normal flex justify-between shadow-none"
                  >
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-gray-700">
                    {packages.map(pkg => (
                      <SelectItem key={pkg.name.split(' ')[0]} value={pkg.name.split(' ')[0]}>{pkg.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="w-full">
              <p className="text-lg text-neutral-400 mb-3">Number of Participants</p>
              <div className="border-t border-white/20 mb-2 py-2">
              </div>
              
              <div className="flex items-center w-full">
                <p className="text-xl text-neutral-400 w-10">{participantCount}</p>
                <div className="w-full mx-6">
                  <Slider
                    value={[participantCount]}
                    onValueChange={(value) => setParticipantCount(value[0])}
                    max={3000}
                    step={1}
                    className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_.swui-slider-track]:bg-neutral-700 [&_.swui-slider-range]:bg-white"
                  />
                </div>
                <p className="text-xl text-neutral-400 w-12 text-right">3000+</p>
              </div>
          </div>
        </div>
          
          <div className="mt-20 flex justify-end">
            <div className="text-right">
              <p className="text-xl text-neutral-400">Total Cost</p>
              <p className="text-7xl font-normal mt-3">
                <NumberFlow 
                  value={animatedTotalCost} 
                  format={{
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }}
                />
              </p>
              <p className="text-sm text-neutral-400 mt-2">
                for {participantCount} participant{participantCount > 1 ? 's' : ''} 
                (<NumberFlow 
                  value={animatedCostPerParticipant} 
                  format={{
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }}
                /> per participant)
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full border-t border-white/10 py-20"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <h3 className="text-5xl font-normal">
              Frequently asked questions
            </h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {[
              { 
                question: "How long does each training session last?", 
                answer: "All training packages include a 2-hour interactive session. This duration has been optimized to maintain engagement while covering all essential topics comprehensively." 
              },
              { 
                question: "Can the training be conducted remotely?", 
                answer: "Yes, we offer both in-person and remote training options. Remote sessions are conducted via video conferencing with the same level of interaction and engagement as in-person training." 
              },
              { 
                question: "What materials do participants receive?", 
                answer: "All participants receive digital materials including training slides, security guides, best practice checklists, and access to our resource library. Physical materials can be provided upon request." 
              },
              { 
                question: "Do you provide compliance certificates?", 
                answer: "Professional and Enterprise packages include individual compliance certificates. Essential package participants receive a completion certificate. All certificates are suitable for audit purposes." 
              },
              { 
                question: "Can the training be customized for our industry?", 
                answer: "Yes, our Professional package includes basic customization, while our Enterprise package offers full industry-specific customization including your systems, processes, and branded materials." 
              },
              { 
                question: "What's included in follow-up support?", 
                answer: "All packages include email support. Enterprise package includes 30-day follow-up support with direct access to trainers, progress reviews, and additional resources as needed." 
              },
              { 
                question: "How do you measure training effectiveness?", 
                answer: "Professional and Enterprise packages include knowledge assessments. Enterprise also provides performance analytics, progress tracking, and detailed reports on learning outcomes." 
              },
              { 
                question: "Is the training conducted online or in-person?", 
                answer: "All our training sessions are conducted online via video conferencing. This allows us to deliver consistent, high-quality training to teams anywhere while maintaining the same level of interaction and engagement as in-person sessions." 
              }
            ].map((faq, index) => (
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
          
          {/* "Still have questions?" CTA */}
          <div className="mt-20 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h4 className="text-2xl text-neutral-400 mb-6 md:mb-0">Still have questions?</h4>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 py-2.5 px-6 flex items-center gap-2 hover:bg-white/5 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full border-t border-white/10 py-20"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-normal mb-6">
            Ready to get started?
          </h3>
          <p className="text-neutral-400 mb-10 text-lg">
            Contact us to discuss your training needs and get a customized quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-full border border-white bg-white text-black py-2.5 px-4 hover:bg-white/85 transition-colors w-32 text-center"
            >
              Contact
            </Link>
            <Link
              href="/try-app"
              className="rounded-full border border-white/20 py-2.5 px-4 hover:bg-white/5 transition-colors w-32 text-center"
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

export default ServicesPage;