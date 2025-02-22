import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface PricingFAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const FAQSection: React.FC<PricingFAQProps> = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 font-sans bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-2 text-center font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
          Prepare for Tomorrow
        </h2>
        <h3 className="text-lg sm:text-xl md:text-xl mb-8 mx-7 font-serif italic text-gray-400 text-center font-light">
          Every 39 seconds, a business is attacked.
        </h3>
        
        <div className="flex flex-row justify-center items-center gap-6 mt-10">
          <Link 
            href="/pricing" 
            className="w-auto px-7 py-3 text-md font-base rounded-xl bg-gray-300 text-black hover:bg-black hover:text-white border hover:border-gray-700 transition-all duration-300 text-center"
          >
            Our Plans
          </Link>
          <Link 
            href="/contact" 
            className="w-auto px-5 py-3 text-md font-base rounded-xl border border-gray-700 text-white hover:bg-white hover:text-black transition-all duration-300 text-center"
          >
            Contact Us
          </Link>
        </div>

        <div className="max-w-[1400px] mx-auto mt-28">
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
                      <span className="text-white">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5 text-white" />
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
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-gray-800 text-base font-medium rounded-xl shadow-sm text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;