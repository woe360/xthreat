// 'use client'
// import React from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { UserCog, Target, Layers, ChevronRight } from 'lucide-react';
// import { motion } from 'framer-motion';

// const RoleCard = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//   >
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const FeatureItem = ({ title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="flex items-start space-x-3 mb-6"
//   >
//     <ChevronRight className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
//     <div>
//       <h4 className="text-lg font-semibold mb-1">{title}</h4>
//       <p className="text-gray-300">{description}</p>
//     </div>
//   </motion.div>
// );

// const RoleBasedTrainingPage = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Navbar />
//       <div className="flex-grow py-24 px-4 relative mt-27">
//         <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
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
//               Role Based Training
//             </motion.p>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Tailored cybersecurity education for every role in your organization, elevating your overall security posture.
//             </motion.p>
//           </motion.div>

//           {/* Role-Based Training Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  text-center mb-8">Customized Training for Key Roles</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <RoleCard 
//                 icon={<UserCog className="w-8 h-8 text-blue-400" />}
//                 title="IT and Security Teams"
//                 description="Advanced training on threat detection, incident response, and cutting-edge security technologies."
//                 delay={0.4}
//               />
//               <RoleCard 
//                 icon={<Target className="w-8 h-8 text-green-400" />}
//                 title="Executives and Management"
//                 description="Strategic insights on cybersecurity leadership, risk management, and compliance."
//                 delay={0.5}
//               />
//               <RoleCard 
//                 icon={<Layers className="w-8 h-8 text-yellow-400" />}
//                 title="General Employees"
//                 description="Foundational training on daily security practices, data protection, and threat recognition."
//                 delay={0.6}
//               />
//             </div>
//           </motion.div>

//           {/* Key Features Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.5 }}
//             className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg shadow-xl mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  text-center mb-8">Key Features of XThreat Role-Based Training</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <FeatureItem 
//                 title="Adaptive Learning Paths"
//                 description="Dynamic courses that adjust based on individual roles and existing knowledge levels."
//                 delay={0.8}
//               />
//               <FeatureItem 
//                 title="Real-World Scenarios"
//                 description="Role-specific simulations and case studies for practical, hands-on learning experiences."
//                 delay={0.9}
//               />
//               <FeatureItem 
//                 title="Continuous Assessment"
//                 description="Regular evaluations to track progress and identify areas for improvement."
//                 delay={1.0}
//               />
//               <FeatureItem 
//                 title="Microlearning Modules"
//                 description="Bite-sized, focused content for efficient and effective learning on-the-go."
//                 delay={1.1}
//               />
//             </div>
//           </motion.div>

//           {/* Benefits Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  text-center mb-8">Benefits of Role-Based Security Training</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
//               {[
//                 { title: "Increased Relevance", description: "Training tailored to specific job responsibilities" },
//                 { title: "Improved Engagement", description: "Higher completion rates due to personalized content" },
//                 { title: "Enhanced Skills", description: "Develop role-specific security competencies" },
//                 { title: "Efficient Learning", description: "Focus on the most critical skills for each role" },
//                 { title: "Measurable Impact", description: "Track role-based improvements in security posture" },
//                 { title: "Adaptive Security Culture", description: "Foster a security-first mindset across all levels" }
//               ].map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
//                   className="bg-gray-800 p-6 rounded-lg"
//                 >
//                   <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
//                   <p className="text-gray-300">{benefit.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.9, duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  mb-6">Elevate Your Organization's Security IQ</h2>
//             <p className="text-xl text-gray-300 mb-8">
//               Empower every member of your team with role-specific security knowledge and skills.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
//             >
//               Schedule a Demo
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default RoleBasedTrainingPage;




// 'use client'
// import React from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { UserCog, Target, Layers, ChevronRight } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const RoleCard = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800"
//   >
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const FeatureItem = ({ title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="flex items-start space-x-3 mb-6"
//   >
//     <ChevronRight className="w-6 h-6 text-white flex-shrink-0 mt-1" />
//     <div>
//       <h4 className="text-lg font-semibold mb-1">{title}</h4>
//       <p className="text-gray-300">{description}</p>
//     </div>
//   </motion.div>
// );

// const RoleBasedTrainingPage = () => {
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
//               Role Based Training
//             </motion.p>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
//             >
//               Tailored cybersecurity education for every role in your organization, elevating your overall security posture.
//             </motion.p>
//           </motion.div>

//           {/* Role-Based Training Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">Customized Training for Key Roles</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <RoleCard 
//                 icon={<UserCog className="w-8 h-8 text-white" />}
//                 title="IT and Security Teams"
//                 description="Advanced training on threat detection, incident response, and cutting-edge security technologies."
//                 delay={0.4}
//               />
//               <RoleCard 
//                 icon={<Target className="w-8 h-8 text-white" />}
//                 title="Executives and Management"
//                 description="Strategic insights on cybersecurity leadership, risk management, and compliance."
//                 delay={0.5}
//               />
//               <RoleCard 
//                 icon={<Layers className="w-8 h-8 text-white" />}
//                 title="General Employees"
//                 description="Foundational training on daily security practices, data protection, and threat recognition."
//                 delay={0.6}
//               />
//             </div>
//           </motion.div>

//           {/* Key Features Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7, duration: 0.5 }}
//             className="bg-black p-8 rounded-lg shadow-xl mb-16 border border-gray-800"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  font-semibold text-center mb-8">Key Features of XThreat Role-Based Training</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <FeatureItem 
//                 title="Adaptive Learning Paths"
//                 description="Dynamic courses that adjust based on individual roles and existing knowledge levels."
//                 delay={0.8}
//               />
//               <FeatureItem 
//                 title="Real-World Scenarios"
//                 description="Role-specific simulations and case studies for practical, hands-on learning experiences."
//                 delay={0.9}
//               />
//               <FeatureItem 
//                 title="Continuous Assessment"
//                 description="Regular evaluations to track progress and identify areas for improvement."
//                 delay={1.0}
//               />
//               <FeatureItem 
//                 title="Microlearning Modules"
//                 description="Bite-sized, focused content for efficient and effective learning on-the-go."
//                 delay={1.1}
//               />
//             </div>
//           </motion.div>

//           {/* Benefits Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.2, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  font-semibold text-center mb-8">Benefits of Role-Based Security Training</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
//               {[
//                 { title: "Increased Relevance", description: "Training tailored to specific job responsibilities" },
//                 { title: "Improved Engagement", description: "Higher completion rates due to personalized content" },
//                 { title: "Enhanced Skills", description: "Develop role-specific security competencies" },
//                 { title: "Efficient Learning", description: "Focus on the most critical skills for each role" },
//                 { title: "Measurable Impact", description: "Track role-based improvements in security posture" },
//                 { title: "Adaptive Security Culture", description: "Foster a security-first mindset across all levels" }
//               ].map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
//                   className="bg-black p-6 rounded-lg border border-gray-800"
//                 >
//                   <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
//                   <p className="text-gray-300">{benefit.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.9, duration: 0.5 }}
//             className="text-center mt-40 mb-10"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  font-semibold mb-6">Elevate Your Organization's Security IQ</h2>
//             <p className="text-xl font-serif italic text-gray-300 mb-8">
//               Empower every member of your team with role-specific security knowledge and skills.
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

// export default RoleBasedTrainingPage;


//adding types
'use client'
import React from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { UserCog, Target, Layers, ChevronRight } from 'lucide-react';
import { motion, type TargetAndTransition, type AnimationProps as FramerAnimationProps } from 'framer-motion';
import Link from 'next/link';

// Types
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

interface RoleCardProps extends BaseProps {
  icon: React.ReactNode;
  delay: number;
}

interface FeatureItemProps extends BaseProps {
  delay: number;
}

interface BenefitItemProps extends BaseProps {}

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
const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-start space-x-3 mb-6"
  >
    <ChevronRight className="w-6 h-6 text-white flex-shrink-0 mt-1" />
    <div>
      <h4 className="text-lg font-semibold mb-1">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const BenefitCard: React.FC<BenefitItemProps & { delay: number }> = ({ title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black p-6 rounded-lg border border-gray-800"
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

// Content Data
const roleCardsData: RoleCardProps[] = [
  {
    icon: <UserCog className="w-8 h-8 text-white" />,
    title: "IT and Security Teams",
    description: "Advanced training on threat detection, incident response, and cutting-edge security technologies.",
    delay: 0.4
  },
  {
    icon: <Target className="w-8 h-8 text-white" />,
    title: "Executives and Management",
    description: "Strategic insights on cybersecurity leadership, risk management, and compliance.",
    delay: 0.5
  },
  {
    icon: <Layers className="w-8 h-8 text-white" />,
    title: "General Employees",
    description: "Foundational training on daily security practices, data protection, and threat recognition.",
    delay: 0.6
  }
];

const featuresData: FeatureItemProps[] = [
  {
    title: "Adaptive Learning Paths",
    description: "Dynamic courses that adjust based on individual roles and existing knowledge levels.",
    delay: 0.8
  },
  {
    title: "Real-World Scenarios",
    description: "Role-specific simulations and case studies for practical, hands-on learning experiences.",
    delay: 0.9
  },
  {
    title: "Continuous Assessment",
    description: "Regular evaluations to track progress and identify areas for improvement.",
    delay: 1.0
  },
  {
    title: "Microlearning Modules",
    description: "Bite-sized, focused content for efficient and effective learning on-the-go.",
    delay: 1.1
  }
];

const benefitsData: BenefitItemProps[] = [
  { title: "Increased Relevance", description: "Training tailored to specific job responsibilities" },
  { title: "Improved Engagement", description: "Higher completion rates due to personalized content" },
  { title: "Enhanced Skills", description: "Develop role-specific security competencies" },
  { title: "Efficient Learning", description: "Focus on the most critical skills for each role" },
  { title: "Measurable Impact", description: "Track role-based improvements in security posture" },
  { title: "Adaptive Security Culture", description: "Foster a security-first mindset across all levels" }
];

// Main Page Component
const RoleBasedTrainingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow py-24 px-4 relative mt-27">
        {/* Background Gradients */}
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
              Role Based Training
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
            >
              Tailored cybersecurity education for every role in your organization, elevating your overall security posture.
            </motion.p>
          </motion.section>

          {/* Role Cards Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">
              Customized Training for Key Roles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roleCardsData.map((card, index) => (
                <RoleCard key={index} {...card} />
              ))}
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-black p-8 rounded-lg shadow-xl mb-16 border border-gray-800"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">
              Key Features of XThreat Role-Based Training
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuresData.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </div>
          </motion.section>

          {/* Benefits Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">
              Benefits of Role-Based Security Training
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              {benefitsData.map((benefit, index) => (
                <BenefitCard 
                  key={index} 
                  {...benefit} 
                  delay={1.3 + index * 0.1} 
                />
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="text-center mt-40 mb-10"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6">
              Elevate Your Organization's Security IQ
            </h2>
            <p className="text-xl font-serif italic text-gray-300 mb-8">
              Empower every member of your team with role-specific security knowledge and skills.
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

export default RoleBasedTrainingPage;