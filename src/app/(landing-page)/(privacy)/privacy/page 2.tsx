// import React from 'react';
// import Head from 'next/head';
// import Navbar from '@/components/global/navbar';
// import Footer from '@/components/global/footer';

// const PrivacyPolicy = () => {
//   return (
//     <>
//       <Navbar />
//       <Head>
//         <title>Privacy Policy - XThreat</title>
//         <meta name="description" content="XThreat Privacy Policy" />
//       </Head>
//       <div className="bg-black min-h-screen text-white relative overflow-hidden pt-20">
//         {/* Left gradient */}
//         <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
//         {/* Right gradient */}
//         <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        
//         <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-10">
//           <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-8 pb-4 border-b-2 border-gray-700">
//             Privacy Policy
//           </h1>
//           <p className="text-sm text-gray-400 mb-8">Last Updated: 2024-09-19</p>

//           <div className="prose prose-lg text-gray-300 mx-auto">
//             <p>
//               At XThreat, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website. By using our services, you consent to the data practices described in this policy.
//             </p>

//             <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
//             <p>We may collect the following types of information:</p>
//             <ul className="list-disc pl-5 mb-4">
//               <li>Personal Information: Name, email address, phone number, and other contact details you provide.</li>
//               <li>Account Information: Login credentials and preferences associated with your account.</li>
//               <li>Usage Data: Information about how you use our services, including IP address, browser type, pages visited, and time spent on our website.</li>
//               <li>Technical Data: Information about your device, operating system, and network.</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
//             <p>We use the collected information for various purposes, including:</p>
//             <ul className="list-disc pl-5 mb-4">
//               <li>Providing and maintaining our services</li>
//               <li>Improving and personalizing user experience</li>
//               <li>Communicating with you about our services, updates, and promotional offers</li>
//               <li>Analyzing usage patterns and trends to enhance our services</li>
//               <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
//             <p>We may collect the following types of information:</p>
//             <ul className="list-disc pl-5 mb-4">
//               <li>Personal Information: Name, email address, phone number, and other contact details you provide.</li>
//               <li>Account Information: Login credentials and preferences associated with your account.</li>
//               <li>Usage Data: Information about how you use our services, including IP address, browser type, pages visited, and time spent on our website.</li>
//               <li>Technical Data: Information about your device, operating system, and network.</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
//             <p>We use the collected information for various purposes, including:</p>
//             <ul className="list-disc pl-5 mb-4">
//               <li>Providing and maintaining our services</li>
//               <li>Improving and personalizing user experience</li>
//               <li>Communicating with you about our services, updates, and promotional offers</li>
//               <li>Analyzing usage patterns and trends to enhance our services</li>
//               <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Sharing and Disclosure</h2>
//             <p>We may share your information in the following circumstances:</p>
//             <ul className="list-disc pl-5 mb-4">
//               <li>With your consent</li>
//               <li>To comply with legal obligations</li>
//               <li>To protect our rights, privacy, safety, or property</li>
//               <li>In connection with a merger, acquisition, or sale of assets</li>
//               <li>With service providers who assist us in operating our business (subject to confidentiality agreements)</li>
//             </ul>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
//             <p>
//               We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights and Choices</h2>
//             <p>You have certain rights regarding your personal information, including:</p>
//             <ul className="list-disc pl-5 mb-4">
//               <li>Accessing, correcting, or deleting your personal information</li>
//               <li>Withdrawing your consent at any time</li>
//               <li>Opting out of marketing communications</li>
//               <li>Requesting a copy of your personal data</li>
//             </ul>
//             <p>To exercise these rights, please contact us using the information provided at the end of this policy.</p>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
//             <p>
//               We use cookies and similar tracking technologies to collect and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Children's Privacy</h2>
//             <p>
//               Our services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Changes to This Privacy Policy</h2>
//             <p>
//               We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
//             </p>

//             <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact Us</h2>
//             <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
//             <p>
//               XThreat<br />
//               [Insert Company Address]<br />
//               Email: privacy@xthreat.com<br />
//               Phone: [Insert Phone Number]
//             </p>

//             <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
//             <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
//             <p>
//               XThreat<br />
//               [Insert Company Address]<br />
//               Email: privacy@xthreat.com<br />
//               Phone: [Insert Phone Number]
//             </p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default PrivacyPolicy;

import React from 'react';
import Head from 'next/head';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Head>
        <title>Privacy Policy - XThreat</title>
        <meta name="description" content="XThreat Privacy Policy" />
      </Head>
      <div className="bg-black min-h-screen text-white relative overflow-hidden pt-20">
        {/* Left gradient */}
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        {/* Right gradient */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />

        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-8 pb-4 border-b-2 border-gray-700">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-8">Last Updated: 2024-09-19</p>

          <div className="prose prose-lg text-gray-300 mx-auto">
            <p>
              At XThreat, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website. By using our services, you consent to the data practices described in this policy.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Personal Information: Name, email address, phone number, and other contact details you provide.</li>
              <li>Account Information: Login credentials and preferences associated with your account.</li>
              <li>Usage Data: Information about how you use our services, including IP address, browser type, pages visited, and time spent on our website.</li>
              <li>Technical Data: Information about your device, operating system, and network.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information for various purposes, including:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Providing and maintaining our services</li>
              <li>Improving and personalizing user experience</li>
              <li>Communicating with you about our services, updates, and promotional offers</li>
              <li>Analyzing usage patterns and trends to enhance our services</li>
              <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
              <li>With service providers who assist us in operating our business (subject to confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Your Rights and Choices</h2>
            <p>You have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Accessing, correcting, or deleting your personal information</li>
              <li>Withdrawing your consent at any time</li>
              <li>Opting out of marketing communications</li>
              <li>Requesting a copy of your personal data</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided at the end of this policy.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Children's Privacy</h2>
            <p>
              Our services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to remove that information from our servers.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
