import React from 'react';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';

interface PrivacySection {
  title: string;
  content: string | string[] | { text: string; list?: string[] };
}

const LAST_UPDATED_DATE = '2024-09-19';

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: 'Information We Collect',
    content: {
      text: 'We may collect the following types of information:',
      list: [
        'Personal Information: Name, email address, phone number, and other contact details you provide.',
        'Account Information: Login credentials and preferences associated with your account.',
        'Usage Data: Information about how you use our services, including IP address, browser type, pages visited, and time spent on our website.',
        'Technical Data: Information about your device, operating system, and network.'
      ]
    }
  },
  {
    title: 'How We Use Your Information',
    content: {
      text: 'We use the collected information for various purposes, including:',
      list: [
        'Providing and maintaining our services',
        'Improving and personalizing user experience',
        'Communicating with you about our services, updates, and promotional offers',
        'Analyzing usage patterns and trends to enhance our services',
        'Detecting, preventing, and addressing technical issues or fraudulent activities'
      ]
    }
  },
  {
    title: 'Data Sharing and Disclosure',
    content: {
      text: 'We may share your information in the following circumstances:',
      list: [
        'With your consent',
        'To comply with legal obligations',
        'To protect our rights, privacy, safety, or property',
        'In connection with a merger, acquisition, or sale of assets',
        'With service providers who assist us in operating our business (subject to confidentiality agreements)'
      ]
    }
  },
  {
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'
  },
  {
    title: 'Your Rights and Choices',
    content: {
      text: 'You have certain rights regarding your personal information, including:',
      list: [
        'Accessing, correcting, or deleting your personal information',
        'Withdrawing your consent at any time',
        'Opting out of marketing communications',
        'Requesting a copy of your personal data'
      ]
    }
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: 'We use cookies and similar tracking technologies to collect and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.'
  },
  {
    title: "Children's Privacy",
    content: 'Our services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers.'
  },
  {
    title: 'Changes to This Privacy Policy',
    content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.'
  }
];

const BackgroundGradient = ({ direction }: { direction: 'left' | 'right' }) => (
  <div 
    className={`absolute top-0 ${direction}-0 w-1/4 h-full bg-gradient-to-${direction === 'left' ? 'r' : 'l'} from-gray-800 to-transparent opacity-20`} 
  />
);

const PolicySection = ({ index, section }: { index: number; section: PrivacySection }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mt-8 mb-4">
      {`${index + 1}. ${section.title}`}
    </h2>
    {typeof section.content === 'string' ? (
      <p className="text-gray-300 mb-8">{section.content}</p>
    ) : 'text' in section.content ? (
      <>
        <p className="text-gray-300 mb-4">{section.content.text}</p>
        <ul className="list-disc pl-5 mb-8 text-gray-300">
          {section.content.list?.map((item, i) => (
            <li key={i} className="mb-2">{item}</li>
          ))}
        </ul>
      </>
    ) : (
      section.content.map((paragraph, i) => (
        <p key={i} className="text-gray-300 mb-4">
          {paragraph}
        </p>
      ))
    )}
  </div>
);

export default function PrivacyPolicy() {
  return (
    <main className="bg-black min-h-screen text-white relative overflow-hidden pt-20 font-sans">
      <Navbar/>
      <BackgroundGradient direction="left" />
      <BackgroundGradient direction="right" />
      
      <div className="max-w-[1330px] mx-auto py-12 px-4 sm:px-6 lg:py-16 relative z-10">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b pb-2 from-white to-neutral-600 sm:text-5xl sm:tracking-tight lg:text-6xl mb-8 pb-4 border-b-2 border-gray-700">
          Privacy Policy
        </h1>
        
        <p className="text-sm text-gray-400 mb-8">
          Last Updated: {LAST_UPDATED_DATE}
        </p>
        <div className="text-gray-300">
          <p className="mb-8">
            At XThreat, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            services or visit our website. By using our services, you consent to the data practices described in this policy.
          </p>
          {PRIVACY_SECTIONS.map((section, index) => (
            <PolicySection 
              key={section.title}
              index={index}
              section={section}
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}