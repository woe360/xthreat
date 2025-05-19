'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Type Definitions
interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs: FAQ[] = [
    {
      question: "How is the training content updated to reflect the latest cybersecurity threats?",
      answer: "We continuously monitor the cybersecurity landscape and update our training modules regularly to ensure your team is learning the latest techniques to prevent emerging threats."
    },
    {
        question: "Does the training help in meeting specific industry compliance requirements?",
        answer: "Yes, our training modules are designed to help organizations meet various compliance standards such as GDPR, HIPAA, and PCI-DSS. We continuously update content to reflect current regulations, and can also assist in tailoring programs to address your specific compliance needs."
    },
    {
      question: "Can we track the progress of our employees?",
      answer: "Yes, our platform provides detailed reporting and analytics that allow you to track employee progress, assess learning outcomes, and identify areas for improvement."
    },
    {
      question: "Is the platform customizable for different roles within our company?",
      answer: "Absolutely! Our training can be customized to fit different roles and departments, ensuring each employee receives relevant training based on their responsibilities."
    },
    {
      question: "How secure is your platform?",
      answer: "Security is our top priority. We follow industry best practices, including encryption and regular security audits, to protect your data and ensure the platform is secure."
    },
    {
      question: "Do you provide support during the implementation process?",
      answer: "Yes, we offer full support during implementation, including onboarding assistance and ongoing technical support to ensure a smooth transition and high engagement."
    },
  ];

  return (
    <div className="w-full px-6">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <h3 className="text-5xl font-normal">
            Frequently asked questions
          </h3>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-t border-white/10 overflow-hidden"
            >
              <button
                className="flex justify-between text-white/90 items-center w-full py-4 text-left text-xl"
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
                    <motion.div
                      variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
                      transition={{ duration: 0.2 }}
                      className="pb-4 text-neutral-400"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h4 className="text-2xl text-neutral-400 mb-6 md:mb-0">Still have questions?</h4>
            <Link href="/contact" passHref>
              <button
                className="rounded-full border border-white/20 py-2.5 px-6 flex items-center gap-2 hover:bg-white/5 transition-colors"
              >
                Get In Touch
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQSection; 