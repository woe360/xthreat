// 'use client'
// import React from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { Search, AlertTriangle, Crosshair, TrendingUp, Shield, Users } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ProcessStep = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="flex flex-col items-center text-center"
//   >
//     <div className="bg-blue-500 p-4 rounded-full mb-4">
//       {icon}
//     </div>
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const WeakPointCard = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg"
//   >
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const SecurityWeakPointsPage = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Navbar />
//       <div className="flex-grow py-24 px-4 relative mt-27">
//         <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-blue-900/10" />
//         <div className="max-w-7xl mx-auto relative z-10">
//           {/* Hero Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-16"
//           >
//             <motion.p 
//               {...fadeInUp}
//               className="text-5xl mt-32 pb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6"
//             >
//               Identify and Address Security Weak Points
//             </motion.p>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Uncover vulnerabilities in your organization's human firewall and transform them into strengths with XThreat's targeted assessment and training solutions.
//             </motion.p>
//           </motion.div>

//           {/* Process Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold text-center mb-12">Our Comprehensive Approach</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <ProcessStep 
//                 icon={<Search className="w-8 h-8 text-white" />}
//                 title="Assess"
//                 description="Conduct thorough security assessments to identify weak points in employee practices and knowledge."
//                 delay={0.4}
//               />
//               <ProcessStep 
//                 icon={<Crosshair className="w-8 h-8 text-white" />}
//                 title="Target"
//                 description="Pinpoint specific areas of vulnerability and design tailored training programs."
//                 delay={0.5}
//               />
//               <ProcessStep 
//                 icon={<TrendingUp className="w-8 h-8 text-white" />}
//                 title="Improve"
//                 description="Implement targeted training and measure improvements in security practices over time."
//                 delay={0.6}
//               />
//             </div>
//           </motion.div>

//           {/* Common Weak Points Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold text-center mb-8">Common Security Weak Points We Address</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <WeakPointCard 
//                 icon={<AlertTriangle className="w-8 h-8 text-yellow-400" />}
//                 title="Phishing Susceptibility"
//                 description="Identify employees who are more likely to fall for phishing attempts and provide targeted awareness training."
//                 delay={0.8}
//               />
//               <WeakPointCard 
//                 icon={<Shield className="w-8 h-8 text-red-400" />}
//                 title="Weak Password Practices"
//                 description="Detect and address poor password habits, educating on the importance of strong, unique passwords."
//                 delay={0.9}
//               />
//               <WeakPointCard 
//                 icon={<Users className="w-8 h-8 text-green-400" />}
//                 title="Social Engineering Vulnerabilities"
//                 description="Assess susceptibility to social engineering tactics and train employees to recognize and resist manipulation attempts."
//                 delay={1.0}
//               />
//               <WeakPointCard 
//                 icon={<Crosshair className="w-8 h-8 text-blue-400" />}
//                 title="Data Handling Errors"
//                 description="Identify risky data management practices and implement protocols for proper handling of sensitive information."
//                 delay={1.1}
//               />
//             </div>
//           </motion.div>

//           {/* Benefits Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2, duration: 0.5 }}
//             className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg shadow-xl mb-16"
//           >
//             <h2 className="text-3xl font-bold text-center mb-8">Benefits of Our Weak Point Analysis</h2>
//             <ul className="space-y-4">
//               {[
//                 "Customized security training tailored to your organization's specific vulnerabilities",
//                 "Efficient resource allocation by focusing on the most critical areas of improvement",
//                 "Measurable reduction in security incidents and data breaches",
//                 "Enhanced overall security posture and employee confidence in handling threats",
//                 "Continuous improvement through regular assessments and adaptive training programs"
//               ].map((benefit, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
//                   className="flex items-start"
//                 >
//                   <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>{benefit}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.8, duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl font-bold mb-6">Strengthen Your Human Firewall</h2>
//             <p className="text-xl text-gray-300 mb-8">
//               Don't let security weak points compromise your organization. Partner with XThreat to identify, address, and fortify your human defenses.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
//             >
//               Request a Vulnerability Assessment
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SecurityWeakPointsPage;




// 'use client'
// import React from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { Search, AlertTriangle, Crosshair, TrendingUp, Shield, Users } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const ProcessStep = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="flex flex-col items-center text-center"
//   >
//     <div className="bg-white text-black p-4 rounded-full mb-4">
//       {icon}
//     </div>
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const WeakPointCard = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="bg-black p-6 rounded-lg shadow-lg border border-gray-800"
//   >
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const SecurityWeakPointsPage = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Navbar />
//       <div className="flex-grow py-24 px-4 relative mt-27">
//         <div className="absolute inset-0 bg-black" />
//         {/* Left gradient */}
//         <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
//         {/* Right gradient */}
//         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
//         <div className="max-w-7xl mx-auto relative z-10">
//           {/* Hero Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-center mb-16"
//           >
//             <motion.p 
//               {...fadeInUp}
//               className="text-5xl mt-32 pb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  font-semibold mb-6"
//             >
//               Weak Points
//             </motion.p>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
//             >
//               Uncover vulnerabilities in your organization's human firewall and transform them into strengths with XThreat's targeted assessment and training solutions.
//             </motion.p>
//           </motion.div>

//           {/* Process Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  text-center mb-12">Our Comprehensive Approach</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <ProcessStep 
//                 icon={<Search className="w-8 h-8" />}
//                 title="Assess"
//                 description="Conduct thorough security assessments to identify weak points in employee practices and knowledge."
//                 delay={0.4}
//               />
//               <ProcessStep 
//                 icon={<Crosshair className="w-8 h-8" />}
//                 title="Target"
//                 description="Pinpoint specific areas of vulnerability and design tailored training programs."
//                 delay={0.5}
//               />
//               <ProcessStep 
//                 icon={<TrendingUp className="w-8 h-8" />}
//                 title="Improve"
//                 description="Implement targeted training and measure improvements in security practices over time."
//                 delay={0.6}
//               />
//             </div>
//           </motion.div>

//           {/* Common Weak Points Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  text-center mb-8">Common Security Weak Points We Address</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <WeakPointCard 
//                 icon={<AlertTriangle className="w-8 h-8 text-white" />}
//                 title="Phishing Susceptibility"
//                 description="Identify employees who are more likely to fall for phishing attempts and provide targeted awareness training."
//                 delay={0.8}
//               />
//               <WeakPointCard 
//                 icon={<Shield className="w-8 h-8 text-white" />}
//                 title="Weak Password Practices"
//                 description="Detect and address poor password habits, educating on the importance of strong, unique passwords."
//                 delay={0.9}
//               />
//               <WeakPointCard 
//                 icon={<Users className="w-8 h-8 text-white" />}
//                 title="Social Engineering Vulnerabilities"
//                 description="Assess susceptibility to social engineering tactics and train employees to recognize and resist manipulation attempts."
//                 delay={1.0}
//               />
//               <WeakPointCard 
//                 icon={<Crosshair className="w-8 h-8 text-white" />}
//                 title="Data Handling Errors"
//                 description="Identify risky data management practices and implement protocols for proper handling of sensitive information."
//                 delay={1.1}
//               />
//             </div>
//           </motion.div>

//           {/* Benefits Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2, duration: 0.5 }}
//             className="bg-black p-8 rounded-lg shadow-xl mb-16 border border-gray-800"
//           >
//             <h2 className="text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center mb-8">Benefits of Our Weak Point Analysis</h2>
//             <ul className="space-y-4">
//               {[
//                 "Customized security training tailored to your organization's specific vulnerabilities",
//                 "Efficient resource allocation by focusing on the most critical areas of improvement",
//                 "Measurable reduction in security incidents and data breaches",
//                 "Enhanced overall security posture and employee confidence in handling threats",
//                 "Continuous improvement through regular assessments and adaptive training programs"
//               ].map((benefit, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
//                   className="flex items-start"
//                 >
//                   <svg className="w-6 h-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span>{benefit}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.8, duration: 0.5 }}
//             className="text-center mt-36 mb-10"
//           >
//             <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  mb-6">Strengthen Your Human Firewall</h2>
//             <p className="text-xl font-serif italic max-w-3xl mx-auto text-gray-300 mb-8">
//               Don't let security weak points compromise your organization. Partner with XThreat to identify, address, and fortify your human defenses.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
//             >
//               <Link
//                   href="/pricing">
//                   See Our Plans
//                 </Link>
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SecurityWeakPointsPage;


//adding types
'use client'
import React from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { Search, AlertTriangle, Crosshair, TrendingUp, Shield, Users } from 'lucide-react';
import { motion, type TargetAndTransition, type AnimationProps as FramerAnimationProps } from 'framer-motion';
import Link from 'next/link';

// Shared Types
interface BaseProps {
  title: string;
  description: string;
}

interface AnimationProps extends FramerAnimationProps {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: {
    duration: number;
    delay?: number;
  };
}

interface ProcessStepProps extends BaseProps {
  icon: React.ReactNode;
  delay: number;
}

interface WeakPointCardProps extends BaseProps {
  icon: React.ReactNode;
  delay: number;
}

// Animation Constants
const fadeInUp: AnimationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

// Reusable Components
const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center text-center"
  >
    <div className="bg-white text-black p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const WeakPointCard: React.FC<WeakPointCardProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black p-6 rounded-lg shadow-lg border border-gray-800"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

// Content Data
const processStepsData: ProcessStepProps[] = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Assess",
    description: "Conduct thorough security assessments to identify weak points in employee practices and knowledge.",
    delay: 0.4
  },
  {
    icon: <Crosshair className="w-8 h-8" />,
    title: "Target",
    description: "Pinpoint specific areas of vulnerability and design tailored training programs.",
    delay: 0.5
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Improve",
    description: "Implement targeted training and measure improvements in security practices over time.",
    delay: 0.6
  }
];

const weakPointsData: WeakPointCardProps[] = [
  {
    icon: <AlertTriangle className="w-8 h-8 text-white" />,
    title: "Phishing Susceptibility",
    description: "Identify employees who are more likely to fall for phishing attempts and provide targeted awareness training.",
    delay: 0.8
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Weak Password Practices",
    description: "Detect and address poor password habits, educating on the importance of strong, unique passwords.",
    delay: 0.9
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Social Engineering Vulnerabilities",
    description: "Assess susceptibility to social engineering tactics and train employees to recognize and resist manipulation attempts.",
    delay: 1.0
  },
  {
    icon: <Crosshair className="w-8 h-8 text-white" />,
    title: "Data Handling Errors",
    description: "Identify risky data management practices and implement protocols for proper handling of sensitive information.",
    delay: 1.1
  }
];

const benefitsData: string[] = [
  "Customized security training tailored to your organization's specific vulnerabilities",
  "Efficient resource allocation by focusing on the most critical areas of improvement",
  "Measurable reduction in security incidents and data breaches",
  "Enhanced overall security posture and employee confidence in handling threats",
  "Continuous improvement through regular assessments and adaptive training programs"
];

// Main Page Component
const SecurityWeakPointsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow py-24 px-4 relative mt-27">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.h1 
              {...fadeInUp}
              className="text-5xl mt-32 pb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6"
            >
              Weak Points
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
            >
              Uncover vulnerabilities in your organization's human firewall and transform them into strengths with XThreat's targeted assessment and training solutions.
            </motion.p>
          </motion.section>

          {/* Process Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center mb-12">
              Our Comprehensive Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processStepsData.map((step, index) => (
                <ProcessStep key={index} {...step} />
              ))}
            </div>
          </motion.section>

          {/* Common Weak Points Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center mb-8">
              Common Security Weak Points We Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {weakPointsData.map((point, index) => (
                <WeakPointCard key={index} {...point} />
              ))}
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-black p-8 rounded-lg shadow-xl mb-16 border border-gray-800"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center mb-8">
              Benefits of Our Weak Point Analysis
            </h2>
            <ul className="space-y-4">
              {benefitsData.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <svg className="w-6 h-6 text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="text-center mt-36 mb-10"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-6">
              Strengthen Your Human Firewall
            </h2>
            <p className="text-xl font-serif italic max-w-3xl mx-auto text-gray-300 mb-8">
              Don't let security weak points compromise your organization. Partner with XThreat to identify, address, and fortify your human defenses.
            </p>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
            >
              <Link href="/pricing">
                See Our Plans
              </Link>
            </motion.button>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SecurityWeakPointsPage;