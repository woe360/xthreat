'use client'

import React, { useState } from 'react';
import { Check, CheckCircle, ChevronDown } from 'lucide-react';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const router = useRouter();

  const togglePricing = () => setIsYearly(!isYearly);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleCTAClick = (link) => {
    router.push(link);
  };

  const pricingPlans = [
    {
      name: "Essential",
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: "Ideal for small teams looking to protect their business with essential cybersecurity training.",
      features: [
        "Access to basic cybersecurity awareness training modules",
        "Core analytics",
        "Email support",
        "1 administrator seat",
        "Training for up to 50 employees"
      ],
      cta: "Select",
      link: "/checkout",
    },
    {
      name: "Advanced",
      monthlyPrice: 499,
      yearlyPrice: 4990,
      description: "Comprehensive cybersecurity awareness training designed for medium sized or growing businesses.",
      features: [
        "Access to all core and advanced training modules",
        "Advanced analytics",
        "5 administrator seats",
        "Email support",
        "Training for up to 250 employees"
      ],
      cta: "Select",
      link: "/checkout",
      highlighted: true
    },
    {
      name: "Tailored",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      description: "Enterprise-grade cybersecurity training solutions built to scale with your organization's needs.",
      features: [
        "Everything in the SMB plan",
        "Access to all training modules, including specialized topics",
        "Unlimited administrator seats",
        "Training for over 250 employees",
        "24/7 dedicated customer support",
      ],
      cta: "Request a Quote",
      link: "/contact",
    }
  ];

  const faqs = [
    { question: "Is there a free trial available?", answer: "No, but if you do not see any improvement in the first month with our products, you can get your money back - no questions asked." },
    { question: "Is it possible to change the plan later?", answer: "Yes, you can upgrade or downgrade your plan at any time." },
    { question: "What is your cancellation policy?", answer: "You only have to inform us 14 days prior cancelation. We do not lock businesses in long-term contracts unless they are happy with our products." },
    { question: "How does billing work?", answer: "We bill monthly or yearly, depending on your chosen plan." },
  ];

  const renderPricingTier = (plan, isYearly, index) => {
    const calculateYearlySavings = () => {
      if (plan.monthlyPrice === "Custom" || plan.yearlyPrice === "Custom") {
        return null;
      }
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlySavings = monthlyCost - plan.yearlyPrice;
      const savingsPercentage = (yearlySavings / monthlyCost) * 100;
      return {
        amount: yearlySavings,
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
        className={`flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-900/50 ${
          plan.highlighted ? 'border-2 border-gray-600 lg:scale-105' : 'border border-gray-800 lg:scale-95'
        }`}
      >
        <div className="px-6 py-8 sm:p-10 sm:pb-6">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-xl text-sm font-semibold tracking-wide uppercase bg-gray-800 border border-gray-600 text-gray-200">
              {plan.name}
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-4xl font-extrabold">
            {plan.monthlyPrice === "Custom" ? "Custom" : 
              `${isYearly ? plan.yearlyPrice : plan.monthlyPrice}€`}
            {plan.monthlyPrice !== "Custom" && <span className="ml-1 text-2xl font-medium text-gray-500">/{isYearly ? 'year' : 'month'}</span>}
          </div>
          <div className="h-5"> {/* Fixed height container for savings info */}
            {isYearly && savings && (
              <p className=" text-sm text-green-400">
                Save {savings.amount}€ a year ({savings.percentage}% off)
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
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base text-gray-300">{feature}</p>
              </li>
            ))}
          </ul>
          <div className="w-full rounded-md shadow">
            <motion.button
              onClick={() => handleCTAClick(plan.link)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center px-5 py-3 border border-gray-600 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
            >
              {plan.cta}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-56">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-5xl">
            Scalable pricing tailored to your needs
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            No tricks or hidden fees. You pay what you see here.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center space-x-4 my-12"
        >
          <button
            onClick={togglePricing}
            className="bg-gray-700/50 rounded-xl p-1 flex items-center relative"
          >
            <motion.span
              animate={{ x: isYearly ? '100%' : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute w-1/2 h-4/5 bg-white rounded-xl"
            />
            <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
              isYearly ? 'text-gray-400' : 'text-black'
            }`}>
              Pay monthly
            </span>
            <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
              isYearly ? 'text-black' : 'text-gray-400'
            }`}>
              Pay yearly
            </span>
          </button>
        </motion.div> */}
        <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center items-center space-x-4 my-12"
    >
      <button
        onClick={togglePricing}
        className="bg-gray-700/50 rounded-xl p-1 flex items-center relative"
      >
        <motion.span
          animate={{ x: isYearly ? '100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute w-[calc(50%-4px)] h-[calc(100%-8px)] bg-white rounded-lg left-1"
        />
        <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
          isYearly ? 'text-gray-400' : 'text-black'
        }`}>
          Pay monthly
        </span>
        <span className={`px-4 py-2 rounded-xl text-sm transition-colors duration-200 relative z-10 ${
          isYearly ? 'text-black' : 'text-gray-400'
        }`}>
          Pay yearly
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

        {/* FAQ and CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 ">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-xl mb-14 text-gray-400">
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
                    className="bg-gray-800/50 rounded-lg overflow-hidden"
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
              className="lg:w-1/2 bg-gray-800/50 rounded-lg shadow-lg overflow-hidden flex flex-col justify-center"
            >
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-2xl font-bold mb-4">
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
                  className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-xl shadow-sm text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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




// import React from 'react';
// import { CardBody, CardContainer, CardItem } from '@/components/global/3d-card';
// import Footer from '@/components/global/footer';
// import Navbar from '@/components/global/navbar';
// import { CheckIcon, ArrowRight } from 'lucide-react';

// const PricingPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
//       <Navbar />
//       <div className="flex-grow flex flex-col items-center justify-center px-4 py-16">
//         <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//           Choose Your Plan
//         </h1>
//         <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl">
//           Flexible pricing options to suit businesses of all sizes. Enhance your security awareness today.
//         </p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
//           {renderPricingCard('Essential', '29€', [
//             'Access to core training modules',
//             'Monthly phishing simulations',
//             'Basic reporting & analytics',
//             'Email support'
//           ])}
//           {renderPricingCard('Advanced', '49€', [
//             'All Essential features',
//             'Weak point elimination',
//             'AI simulations',
//             'Weekly phishing simulations',
//             'Advanced reporting & analytics',
//             '24/7 support'
//           ], true)}
//           {renderPricingCard('Enterprise', 'Custom', [
//             'All Advanced features',
//             'Customized training modules',
//             'Dedicated account manager',
//             'API access',
//             'On-premise deployment option',
//             'SSO integration'
//           ])}
//         </div>
//       </div>
      
//       <div className="bg-gray-800 py-16">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
//           {renderFAQ('What is XThreat?', 'XThreat is a comprehensive security awareness and phishing training platform designed to enhance your organization\'s cyber resilience.')}
//           {renderFAQ('How often are training materials updated?', 'Our training materials are continuously updated to reflect the latest cyber threats and best practices in information security.')}
//           {renderFAQ('Can I customize the training for my organization?', 'Yes, our Advanced and Enterprise plans offer customization options to tailor the training to your specific industry and organizational needs.')}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// const renderPricingCard = (title, price, features, isPopular = false) => (
//   <CardContainer className="inter-var">
//     <CardBody className={`relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-gray-900 border-2 ${isPopular ? 'border-emerald-500' : 'border-gray-800'} w-full h-auto rounded-xl p-6`}>
//       {isPopular && (
//         <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
//           Most Popular
//         </div>
//       )}
//       <CardItem
//         translateZ="50"
//         className="text-2xl font-bold text-white mb-4"
//       >
//         {title}
//       </CardItem>
//       <CardItem
//         translateZ="60"
//         className="text-3xl font-bold text-emerald-400 mb-6"
//       >
//         {price} <span className="text-lg text-gray-400">per user/month</span>
//       </CardItem>
//       <CardItem
//         translateZ="60"
//         className="text-gray-300 text-sm"
//       >
//         <ul className="space-y-2">
//           {features.map((feature, index) => (
//             <li key={index} className="flex items-center">
//               <CheckIcon className="h-5 w-5 text-emerald-500 mr-2" />
//               {feature}
//             </li>
//           ))}
//         </ul>
//       </CardItem>
//       <CardItem
//         translateZ={20}
//         as="button"
//         className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200 text-white text-sm font-bold mt-8 w-full flex items-center justify-center"
//       >
//         Get Started <ArrowRight className="ml-2 h-4 w-4" />
//       </CardItem>
//     </CardBody>
//   </CardContainer>
// );

// const renderFAQ = (question, answer) => (
//   <div className="mb-6">
//     <h3 className="text-xl font-semibold mb-2">{question}</h3>
//     <p className="text-gray-400">{answer}</p>
//   </div>
// );

// export default PricingPage;
