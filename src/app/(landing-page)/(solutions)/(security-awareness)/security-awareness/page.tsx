// 'use client'
// import React from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { Shield, Lock, Users, Smartphone, Cloud, HardDrive } from 'lucide-react';
// import { motion } from 'framer-motion';

// const TopicCard = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="bg-gray-800 p-6 rounded-lg"
//   >
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const BenefitItem = ({ title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="flex items-start space-x-3 mb-6"
//   >
//     <div className="flex-shrink-0">
//       <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
//         <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//         </svg>
//       </div>
//     </div>
//     <div>
//       <h4 className="text-lg font-semibold mb-1">{title}</h4>
//       <p className="text-gray-300">{description}</p>
//     </div>
//   </motion.div>
// );

// const SecurityAwarenessPage = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Navbar />
//       <div className="flex-grow py-24 mt-32 px-4 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20" />
//         <div className="max-w-7xl mx-auto relative z-10">
//           {/* Hero Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-16"
//           >
//             <motion.h1 
//               {...fadeInUp}
//               className="text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  mb-6"
//             >
//               Security Awareness
//             </motion.h1>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Empower your workforce with the knowledge and skills to become your strongest line of defense against cyber threats.
//             </motion.p>
//           </motion.div>

//           {/* Training Topics Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  text-center mb-8">Comprehensive Training Topics</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <TopicCard 
//                 icon={<Shield className="w-8 h-8 text-blue-400" />}
//                 title="Phishing and Social Engineering"
//                 description="Learn to identify and defend against sophisticated phishing attacks and social engineering tactics."
//                 delay={0.4}
//               />
//               <TopicCard 
//                 icon={<Lock className="w-8 h-8 text-blue-400" />}
//                 title="Password Security"
//                 description="Master the art of creating strong, unique passwords and understand the importance of proper password management."
//                 delay={0.5}
//               />
//               <TopicCard 
//                 icon={<Users className="w-8 h-8 text-blue-400" />}
//                 title="Physical Security"
//                 description="Discover best practices for maintaining security in physical workspaces and preventing unauthorized access."
//                 delay={0.6}
//               />
//               <TopicCard 
//                 icon={<Smartphone className="w-8 h-8 text-blue-400" />}
//                 title="Mobile Device Security"
//                 description="Learn how to secure mobile devices and protect sensitive data on-the-go."
//                 delay={0.7}
//               />
//               <TopicCard 
//                 icon={<Cloud className="w-8 h-8 text-blue-400" />}
//                 title="Cloud Security"
//                 description="Understand the risks and best practices associated with cloud computing and data storage."
//                 delay={0.8}
//               />
//               <TopicCard 
//                 icon={<HardDrive className="w-8 h-8 text-blue-400" />}
//                 title="Data Protection and Privacy"
//                 description="Learn about data protection regulations and how to handle sensitive information responsibly."
//                 delay={0.9}
//               />
//             </div>
//           </motion.div>

//           {/* Benefits Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 0.5 }}
//             className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg backdrop-blur-sm mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  text-center mb-8">Benefits of XThreat Security Awareness Training</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <BenefitItem 
//                 title="Reduced Security Incidents"
//                 description="Significantly decrease the number of security breaches caused by human error."
//                 delay={1.1}
//               />
//               <BenefitItem 
//                 title="Compliance Support"
//                 description="Meet regulatory requirements and industry standards for security training."
//                 delay={1.2}
//               />
//               <BenefitItem 
//                 title="Improved Security Culture"
//                 description="Foster a culture of security awareness throughout your organization."
//                 delay={1.3}
//               />
//               <BenefitItem 
//                 title="Customized Learning Paths"
//                 description="Tailor training content to specific roles and departments within your company."
//                 delay={1.4}
//               />
//               <BenefitItem 
//                 title="Real-world Simulations"
//                 description="Practice defending against realistic security scenarios in a safe environment."
//                 delay={1.5}
//               />
//               <BenefitItem 
//                 title="Continuous Improvement"
//                 description="Regular updates and assessments to keep your team's skills sharp and up-to-date."
//                 delay={1.6}
//               />
//             </div>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.7, duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  mb-6">Transform Your Workforce into Cyber Guardians</h2>
//             <p className="text-xl text-gray-300 mb-8">
//               Don't leave your organization's security to chance. Invest in comprehensive security awareness training with XThreat today.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
//             >
//               Get Started
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SecurityAwarenessPage;

'use client'
import React from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { Shield, Lock, Users, Smartphone, Cloud, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TopicCard = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black p-6 rounded-lg border border-gray-800"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const BenefitItem = ({ title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start space-x-3 mb-6"
  >
    <div className="flex-shrink-0">
      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const SecurityAwarenessPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      <Navbar />
      <div className="flex-grow py-24 px-4 relative mt-32">
        <div className="absolute inset-0 bg-black" />
        {/* Left gradient */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        {/* Right gradient */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.h1 
              {...fadeInUp}
              className="text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6"
            >
              Security Awareness
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-300 font-serif italic max-w-3xl mx-auto"
            >
              Empower your workforce with the knowledge and skills to become your strongest line of defense against cyber threats.
            </motion.p>
          </motion.div>

          {/* Training Topics Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-16"
          >
            
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">Comprehensive Training Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TopicCard 
                icon={<Shield className="w-8 h-8 text-white" />}
                title="Phishing and Social Engineering"
                description="Learn to identify and defend against sophisticated phishing attacks and social engineering tactics."
                delay={0.4}
              />
              <TopicCard 
                icon={<Lock className="w-8 h-8 text-white" />}
                title="Password Security"
                description="Master the art of creating strong, unique passwords and understand the importance of proper password management."
                delay={0.5}
              />
              <TopicCard 
                icon={<Users className="w-8 h-8 text-white" />}
                title="Physical Security"
                description="Discover best practices for maintaining security in physical workspaces and preventing unauthorized access."
                delay={0.6}
              />
              <TopicCard 
                icon={<Smartphone className="w-8 h-8 text-white" />}
                title="Mobile Device Security"
                description="Learn how to secure mobile devices and protect sensitive data on-the-go."
                delay={0.7}
              />
              <TopicCard 
                icon={<Cloud className="w-8 h-8 text-white" />}
                title="Cloud Security"
                description="Understand the risks and best practices associated with cloud computing and data storage."
                delay={0.8}
              />
              <TopicCard 
                icon={<HardDrive className="w-8 h-8 text-white" />}
                title="Data Protection and Privacy"
                description="Learn about data protection regulations and how to handle sensitive information responsibly."
                delay={0.9}
              />
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-black border border-gray-800 p-8 rounded-lg mb-16"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">Benefits of XThreat Security Awareness Training</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BenefitItem 
                title="Reduced Security Incidents"
                description="Significantly decrease the number of security breaches caused by human error."
                delay={1.1}
              />
              <BenefitItem 
                title="Compliance Support"
                description="Meet regulatory requirements and industry standards for security training."
                delay={1.2}
              />
              <BenefitItem 
                title="Improved Security Culture"
                description="Foster a culture of security awareness throughout your organization."
                delay={1.3}
              />
              <BenefitItem 
                title="Customized Learning Paths"
                description="Tailor training content to specific roles and departments within your company."
                delay={1.4}
              />
              <BenefitItem 
                title="Real-world Simulations"
                description="Practice defending against realistic security scenarios in a safe environment."
                delay={1.5}
              />
              <BenefitItem 
                title="Continuous Improvement"
                description="Regular updates and assessments to keep your team's skills sharp and up-to-date."
                delay={1.6}
              />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className="text-center mt-36 mb-10"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6">Transform Your Workforce into Cyber Guardians</h2>
            <p className="text-xl text-gray-300 font-serif max-w-3xl mx-auto italic mb-8">
              Don't leave your organization's security to chance. Invest in comprehensive security awareness training with XThreat today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300"
            >
              <Link
                  href="/pricing">
                  See Our Plans
                </Link>
            </motion.button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SecurityAwarenessPage;