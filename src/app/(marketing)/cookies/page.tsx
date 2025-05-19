'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/(marketing)/navigation/navbar';
import Footer from '@/app/(marketing)/navigation/footer';

interface CookieSection {
  title: string;
  content: string | string[];
}

const LAST_UPDATED_DATE = '2025-05-20';

const COOKIE_SECTIONS: CookieSection[] = [
  {
    title: 'What are cookies?',
    content: [
      'Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.',
      'Cookies set by the website owner (in this case, XThreat) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.'
    ]
  },
  {
    title: 'Why do we use cookies?',
    content: [
      'We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.',
      'Other cookies enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes.',
      'The specific types of first and third-party cookies served through our Website and the purposes they perform are described in the table below.'
    ]
  },
  {
    title: 'Types of cookies we use',
    content: [
      'Essential cookies: These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.',
      'Performance and functionality cookies: These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.',
      'Analytics and customization cookies: These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.',
      'Advertising cookies: These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.'
    ]
  },
  {
    title: 'How can you control cookies?',
    content: [
      'You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject.',
      'Essential cookies cannot be rejected as they are strictly necessary to provide you with services.',
      'If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.',
      'The specific way in which you can refuse cookies through your web browser controls varies from browser-to-browser, you should visit your browser\'s help menu for more information.'
    ]
  },
  {
    title: 'How often will we update this Cookie Policy?',
    content: [
      'We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.',
      'The date at the top of this Cookie Policy indicates when it was last updated.'
    ]
  },
  {
    title: 'Where can you get further information?',
    content: 'If you have any questions about our use of cookies or other technologies, please email us at privacy@xthreat.eu or by post to: XThreat Privacy Office, Your Address Here.'
  }
];

const PolicySection = ({ index, section }: { index: number; section: CookieSection }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <h2 className="text-xl font-medium text-white mt-10 mb-4">
      {`${index + 1}. ${section.title}`}
    </h2>
    {Array.isArray(section.content) ? (
      section.content.map((paragraph, i) => (
        <p key={i} className="text-neutral-300 leading-relaxed mb-4">
          {paragraph}
        </p>
      ))
    ) : (
      <p className="text-neutral-300 leading-relaxed mb-6">{section.content}</p>
    )}
  </motion.div>
);

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0b]">
      <Navbar/>
      
      <main className="flex-grow pb-32">
        <div className="max-w-screen-2xl mx-auto flex justify-center w-full mt-[50vh]">
          <div className="w-1/2 max-w-[1000px] px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-normal text-white mb-10 text-center normal-case"
            >
              Cookie Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-neutral-400 mb-16 text-center"
            >
              Last updated: {LAST_UPDATED_DATE}
            </motion.p>
            <div className="border-b border-white/10 pb-16 mb-16">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-neutral-300 text-lg leading-relaxed text-center max-w-2xl mx-auto"
              >
                This Cookie Policy explains how XThreat ("we", "us", or "our") uses cookies and similar 
                technologies to recognize you when you visit our website at www.xthreat.eu ("Website"). 
                It explains what these technologies are and why we use them, as well as your rights to 
                control our use of them.
              </motion.p>
            </div>
            <div className="space-y-24">
              {COOKIE_SECTIONS.map((section, index) => (
                <div key={section.title} className="border-b border-white/10 pb-16 last:border-0 last:pb-0">
                  <PolicySection 
                    index={index} 
                    section={section} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}