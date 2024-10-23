// 'use client'
// import React from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { Shield, Zap, Users, BarChart, Mail, Brain } from 'lucide-react';
// import { motion } from 'framer-motion';

// const FeatureCard = ({ icon, title, description, delay }) => (
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

// const StatItem = ({ value, label, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ delay, duration: 0.5 }}
//     className="text-center"
//   >
//     <div className="text-4xl font-bold text-blue-400 mb-2">{value}</div>
//     <div className="text-gray-300">{label}</div>
//   </motion.div>
// );

// const PhishingAwarenessPage = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col">
//       <Navbar />
//       <div className="flex-grow py-24 px-4 relative">
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
//               className="text-5xl bg-clip-text text-transparent bg-gradient-to-b pb-1 from-white to-neutral-500 font-semibold mt-32 mb-6"
//             >
//               Phishing Awareness
//             </motion.h1>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Empower your team with cutting-edge phishing awareness training to protect your organization from evolving cyber threats.
//             </motion.p>
//           </motion.div>

//           {/* Features Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
//           >
//             <FeatureCard 
//               icon={<Mail className="w-8 h-8 text-blue-400" />}
//               title="Realistic Simulations"
//               description="Create and send authentic-looking phishing emails to test and educate employees in a safe environment."
//               delay={0.4}
//             />
//             <FeatureCard 
//               icon={<Brain className="w-8 h-8 text-blue-400" />}
//               title="AI-Powered Learning"
//               description="Leverage machine learning algorithms to personalize training and adapt to each employee's learning curve."
//               delay={0.5}
//             />
//             <FeatureCard 
//               icon={<Users className="w-8 h-8 text-blue-400" />}
//               title="Interactive Training Modules"
//               description="Engage employees with gamified, scenario-based learning experiences that make security awareness fun and memorable."
//               delay={0.6}
//             />
//             <FeatureCard 
//               icon={<BarChart className="w-8 h-8 text-blue-400" />}
//               title="Comprehensive Analytics"
//               description="Track progress and identify vulnerabilities with detailed reporting and analytics on employee performance."
//               delay={0.7}
//             />
//             <FeatureCard 
//               icon={<Zap className="w-8 h-8 text-blue-400" />}
//               title="Real-Time Threat Intelligence"
//               description="Stay ahead of emerging threats with continuously updated phishing templates based on the latest attack vectors."
//               delay={0.8}
//             />
//             <FeatureCard 
//               icon={<Shield className="w-8 h-8 text-blue-400" />}
//               title="Compliance Management"
//               description="Ensure adherence to industry regulations with built-in compliance tracking and reporting features."
//               delay={0.9}
//             />
//           </motion.div>

//           {/* Stats Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 0.5 }}
//             className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg backdrop-blur-sm mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  text-center mb-8">The XThreat Advantage</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               <StatItem value="94%" label="Reduction in Successful Phishing Attacks" delay={1.1} />
//               <StatItem value="85%" label="Increase in Employee Reporting of Suspicious Emails" delay={1.2} />
//               <StatItem value="3x" label="Faster Time-to-Competency in Security Awareness" delay={1.3} />
//               <StatItem value="99.9%" label="Customer Satisfaction Rate" delay={1.4} />
//             </div>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.5, duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1  mb-6">Ready to Strengthen Your First Line of Defense?</h2>
//             <p className="text-xl text-gray-300 mb-8">
//               Don't let your organization fall victim to phishing attacks. Empower your team with XThreat's advanced phishing awareness solution today.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
//             >
//               Request a Demo
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PhishingAwarenessPage;



// 'use client'
// import React from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { Shield, Zap, Users, BarChart, Mail, Brain } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const FeatureCard = ({ icon, title, description, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay, duration: 0.5 }}
//     className="bg-black p-6 rounded-lg border border-gray-800"
//   >
//                   {/* Left gradient */}
//                   <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
//         {/* Right gradient */}
//         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const StatItem = ({ value, label, delay }) => (
//   <motion.div 
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ delay, duration: 0.5 }}
//     className="text-center"
//   >
//     <div className="text-4xl font-bold text-white mb-2">{value}</div>
    
//     <div className="text-gray-300">{label}</div>
//   </motion.div>
// );

// const PhishingAwarenessPage = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   return (
    
//     <div className="min-h-screen bg-black text-white flex flex-col">
      
//       <Navbar />
//       <div className="flex-grow py-24 px-4 relative">
//         <div className="absolute inset-0 bg-black" />
//                 {/* Left gradient */}
//                 <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
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
//             <motion.h1 
//               {...fadeInUp}
//               className="text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mt-32 mb-6"
//             >
//               Phishing Awareness
//             </motion.h1>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
//             >
//               Empower your team with cutting-edge phishing awareness training to protect your organization from evolving cyber threats.
//             </motion.p>
//           </motion.div>

//           {/* Features Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
//           >
//             <FeatureCard 
//               icon={<Mail className="w-8 h-8 text-white" />}
//               title="Realistic Simulations"
//               description="Create and send authentic-looking phishing emails to test and educate employees in a safe environment."
//               delay={0.4}
//             />
//             <FeatureCard 
//               icon={<Brain className="w-8 h-8 text-white" />}
//               title="AI-Powered Learning"
//               description="Leverage machine learning algorithms to personalize training and adapt to each employee's learning curve."
//               delay={0.5}
//             />
//             <FeatureCard 
//               icon={<Users className="w-8 h-8 text-white" />}
//               title="Interactive Training Modules"
//               description="Engage employees with gamified, scenario-based learning experiences that make security awareness fun and memorable."
//               delay={0.6}
//             />
//             <FeatureCard 
//               icon={<BarChart className="w-8 h-8 text-white" />}
//               title="Comprehensive Analytics"
//               description="Track progress and identify vulnerabilities with detailed reporting and analytics on employee performance."
//               delay={0.7}
//             />
//             <FeatureCard 
//               icon={<Zap className="w-8 h-8 text-white" />}
//               title="Real-Time Threat Intelligence"
//               description="Stay ahead of emerging threats with continuously updated phishing templates based on the latest attack vectors."
//               delay={0.8}
//             />
//             <FeatureCard 
//               icon={<Shield className="w-8 h-8 text-white" />}
//               title="Compliance Management"
//               description="Ensure adherence to industry regulations with built-in compliance tracking and reporting features."
//               delay={0.9}
//             />
//           </motion.div>

//           {/* Stats Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 0.5 }}
//             className="bg-black border border-gray-800 p-8 rounded-lg mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">The XThreat Advantage</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               <StatItem value="94%" label="Reduction in Successful Phishing Attacks" delay={1.1} />
//               <StatItem value="85%" label="Increase in Employee Reporting of Suspicious Emails" delay={1.2} />
//               <StatItem value="3x" label="Faster Time-to-Competency in Security Awareness" delay={1.3} />
//               <StatItem value="99.9%" label="Customer Satisfaction Rate" delay={1.4} />
//             </div>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.5, duration: 0.5 }}
//             className="text-center mt-36 mb-10"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6">Ready to Strengthen Your First Line of Defense?</h2>
//             <p className="text-xl font-serif italic max-w-3xl mx-auto text-gray-300 mb-8">
//               Don't let your organization fall victim to phishing attacks. Empower your team with XThreat's advanced phishing awareness solution today.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300"
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

// export default PhishingAwarenessPage;

//addding types
'use client'
import React from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { Shield, Zap, Users, BarChart, Mail, Brain, LucideIcon } from 'lucide-react';
import { motion, Variant, Variants, HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

interface MotionHeadingProps extends HTMLMotionProps<"h1"> {
  children: React.ReactNode;
}

interface MotionParagraphProps extends HTMLMotionProps<"p"> {
  children: React.ReactNode;
}

const MotionHeading: React.FC<MotionHeadingProps> = motion.h1;
const MotionParagraph: React.FC<MotionParagraphProps> = motion.p;

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-black p-6 rounded-lg border border-gray-800 relative"
  >
    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
    
    <div className="flex items-center mb-4 relative z-10">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300 relative z-10">{description}</p>
  </motion.div>
);

const StatItem: React.FC<StatItemProps> = ({ value, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="text-center"
  >
    <div className="text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-gray-300">{label}</div>
  </motion.div>
);

const PhishingAwarenessPage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  } as const;

  const features: FeatureCardProps[] = [
    {
      icon: <Mail className="w-8 h-8 text-white" />,
      title: "Realistic Simulations",
      description: "Create and send authentic-looking phishing emails to test and educate employees in a safe environment.",
      delay: 0.4
    },
    {
      icon: <Brain className="w-8 h-8 text-white" />,
      title: "AI-Powered Learning",
      description: "Leverage machine learning algorithms to personalize training and adapt to each employee's learning curve.",
      delay: 0.5
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Interactive Training Modules",
      description: "Engage employees with gamified, scenario-based learning experiences that make security awareness fun and memorable.",
      delay: 0.6
    },
    {
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: "Comprehensive Analytics",
      description: "Track progress and identify vulnerabilities with detailed reporting and analytics on employee performance.",
      delay: 0.7
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Real-Time Threat Intelligence",
      description: "Stay ahead of emerging threats with continuously updated phishing templates based on the latest attack vectors.",
      delay: 0.8
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Compliance Management",
      description: "Ensure adherence to industry regulations with built-in compliance tracking and reporting features.",
      delay: 0.9
    }
  ];

  const stats: StatItemProps[] = [
    {
      value: "94%",
      label: "Reduction in Successful Phishing Attacks",
      delay: 1.1
    },
    {
      value: "85%",
      label: "Increase in Employee Reporting of Suspicious Emails",
      delay: 1.2
    },
    {
      value: "3x",
      label: "Faster Time-to-Competency in Security Awareness",
      delay: 1.3
    },
    {
      value: "99.9%",
      label: "Customer Satisfaction Rate",
      delay: 1.4
    }
  ];

  const buttonAnimation: Variants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow py-24 px-4 relative">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-800 to-transparent opacity-20" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <MotionHeading
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
              className="text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mt-32 mb-6"
            >
              Phishing Awareness
            </MotionHeading>
            <MotionParagraph
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
            >
              Empower your team with cutting-edge phishing awareness training to protect your organization from evolving cyber threats.
            </MotionParagraph>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-black border border-gray-800 p-8 rounded-lg mb-16"
          >
            <MotionHeading
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
              className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8"
            >
              The XThreat Advantage
            </MotionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} />
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center mt-36 mb-10"
          >
            <MotionHeading
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={fadeInUp.transition}
              className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6"
            >
              Ready to Strengthen Your First Line of Defense?
            </MotionHeading>
            <MotionParagraph
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="text-xl font-serif italic max-w-3xl mx-auto text-gray-300 mb-8"
            >
              Don't let your organization fall victim to phishing attacks. Empower your team with XThreat's advanced phishing awareness solution today.
            </MotionParagraph>
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimation}
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300"
            >
              <Link href="/pricing">
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

export default PhishingAwarenessPage;