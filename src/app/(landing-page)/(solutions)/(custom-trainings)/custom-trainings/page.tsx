// 'use client'
// import React, { useState } from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { Book, CheckCircle, Settings, Sliders, Send } from 'lucide-react';
// import { motion } from 'framer-motion';

// const TopicCard = ({ icon, title, description, isSelected, onClick }) => (
//   <motion.div 
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     className={`bg-gradient-to-br ${isSelected ? 'from-blue-600 to-blue-800' : 'from-gray-800 to-gray-900'} p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300`}
//     onClick={onClick}
//   >
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//     {isSelected && (
//       <CheckCircle className="w-6 h-6 text-green-400 absolute top-2 right-2" />
//     )}
//   </motion.div>
// );

// const CustomTrainingPage = () => {
//   const [selectedTopics, setSelectedTopics] = useState([]);

//   const toggleTopic = (topic) => {
//     setSelectedTopics(prev => 
//       prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
//     );
//   };

//   const trainingTopics = [
//     { id: 1, icon: <Book className="w-8 h-8 text-blue-400" />, title: "Phishing Awareness", description: "Identify and prevent various types of phishing attacks." },
//     { id: 2, icon: <Settings className="w-8 h-8 text-green-400" />, title: "Password Security", description: "Create and manage strong, unique passwords." },
//     { id: 3, icon: <Sliders className="w-8 h-8 text-yellow-400" />, title: "Data Privacy", description: "Handle sensitive data securely and comply with regulations." },
//     { id: 4, icon: <Send className="w-8 h-8 text-purple-400" />, title: "Social Engineering", description: "Recognize and resist manipulation tactics." },
//     { id: 5, icon: <Book className="w-8 h-8 text-red-400" />, title: "Mobile Device Security", description: "Secure smartphones and tablets against threats." },
//     { id: 6, icon: <Settings className="w-8 h-8 text-orange-400" />, title: "Cloud Security", description: "Safely use cloud services and protect cloud-based data." },
//   ];

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
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-5xl mt-32 pb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6"
//             >
//               Customized Security Training Solutions
//             </motion.p>
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//               className="text-xl text-gray-300 max-w-3xl mx-auto"
//             >
//               Tailor your employees' security education with XThreat's flexible training programs. Choose the topics that matter most to your organization.
//             </motion.p>
//           </motion.div>

//           {/* Custom Training Process */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold text-center mb-8">Our Custom Training Process</h2>
//             <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
//               {[
//                 { icon: "📋", title: "You Choose", description: "Select the training topics that align with your needs" },
//                 { icon: "🎨", title: "We Customize", description: "Our experts tailor the content to your industry and company culture" },
//                 { icon: "🚀", title: "Employees Learn", description: "Engaging, interactive training delivered to your team" },
//                 { icon: "📊", title: "Measure Impact", description: "Track progress and see tangible security improvements" }
//               ].map((step, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
//                   className="flex flex-col items-center text-center"
//                 >
//                   <div className="text-4xl mb-4">{step.icon}</div>
//                   <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//                   <p className="text-gray-300">{step.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Training Topics Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.6, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold text-center mb-8">Choose Your Training Topics</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {trainingTopics.map((topic, index) => (
//                 <TopicCard
//                   key={topic.id}
//                   icon={topic.icon}
//                   title={topic.title}
//                   description={topic.description}
//                   isSelected={selectedTopics.includes(topic.id)}
//                   onClick={() => toggleTopic(topic.id)}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Benefits Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.8, duration: 0.5 }}
//             className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg shadow-xl mb-16"
//           >
//             <h2 className="text-3xl font-bold text-center mb-8">Benefits of Custom Training</h2>
//             <ul className="space-y-4">
//               {[
//                 "Targeted learning that addresses your specific security challenges",
//                 "Flexible content that adapts to your industry and company culture",
//                 "Efficient use of training time by focusing on relevant topics",
//                 "Increased employee engagement through personalized content",
//                 "Measurable improvements in security awareness and practices"
//               ].map((benefit, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
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
//             transition={{ delay: 2.5, duration: 0.5 }}
//             className="text-center"
//           >
//             <h2 className="text-3xl font-bold mb-6">Ready to Build Your Custom Training Program?</h2>
//             <p className="text-xl text-gray-300 mb-8">
//               Let's create a security training plan that's perfectly tailored to your organization's needs.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
//             >
//               Start Customizing Your Training
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default CustomTrainingPage;




// 'use client'
// import React, { useState } from 'react';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import { Book, CheckCircle, Settings, Sliders, Send, ClipboardList, Palette, Rocket, BarChart } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const TopicCard = ({ icon, title, description, isSelected, onClick }) => (
//   <motion.div 
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     className={`bg-black p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 border ${isSelected ? 'border-white' : 'border-gray-800'}`}
//     onClick={onClick}
//   >
//     <div className="flex items-center mb-4">
//       {icon}
//       <h3 className="text-xl font-semibold ml-3">{title}</h3>
//     </div>
//     <p className="text-gray-300">{description}</p>
//     {isSelected && (
//       <CheckCircle className="w-6 h-6 text-white absolute top-2 right-2" />
//     )}
//   </motion.div>
// );

// const CustomTrainingPage = () => {
//   const [selectedTopics, setSelectedTopics] = useState([]);

//   const toggleTopic = (topic) => {
//     setSelectedTopics(prev => 
//       prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
//     );
//   };

//   const trainingTopics = [
//     { id: 1, icon: <Book className="w-8 h-8 text-white" />, title: "Phishing Awareness", description: "Identify and prevent various types of phishing attacks." },
//     { id: 2, icon: <Settings className="w-8 h-8 text-white" />, title: "Password Security", description: "Create and manage strong, unique passwords." },
//     { id: 3, icon: <Sliders className="w-8 h-8 text-white" />, title: "Data Privacy", description: "Handle sensitive data securely and comply with regulations." },
//     { id: 4, icon: <Send className="w-8 h-8 text-white" />, title: "Social Engineering", description: "Recognize and resist manipulation tactics." },
//     { id: 5, icon: <Book className="w-8 h-8 text-white" />, title: "Mobile Device Security", description: "Secure smartphones and tablets against threats." },
//     { id: 6, icon: <Settings className="w-8 h-8 text-white" />, title: "Cloud Security", description: "Safely use cloud services and protect cloud-based data." },
//   ];

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
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="text-5xl mt-32 pb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  font-semibold mb-6"
//             >
//               Customized Security Training Solutions
//             </motion.p>
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//               className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
//             >
//               Tailor your employees' security education with XThreat's flexible training programs. Choose the topics that matter most to your organization.
//             </motion.p>
//           </motion.div>

//           {/* Custom Training Process */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  text-center mb-8">Our Custom Training Process</h2>
//             <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
//               {[
//                 { icon: <ClipboardList className="w-12 h-12 text-white" />, title: "You Choose", description: "Select the training topics that align with your needs" },
//                 { icon: <Palette className="w-12 h-12 text-white" />, title: "We Customize", description: "Our experts tailor the content to your industry and company culture" },
//                 { icon: <Rocket className="w-12 h-12 text-white" />, title: "Employees Learn", description: "Engaging, interactive training delivered to your team" },
//                 { icon: <BarChart className="w-12 h-12 text-white" />, title: "Measure Impact", description: "Track progress and see tangible security improvements" }
//               ].map((step, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
//                   className="flex flex-col items-center text-center"
//                 >
//                   <div className="mb-4">{step.icon}</div>
//                   <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//                   <p className="text-gray-300">{step.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Training Topics Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.6, duration: 0.5 }}
//             className="mb-16"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  font-semibold text-center mb-8">Choose Your Training Topics</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {trainingTopics.map((topic, index) => (
//                 <TopicCard
//                   key={topic.id}
//                   icon={topic.icon}
//                   title={topic.title}
//                   description={topic.description}
//                   isSelected={selectedTopics.includes(topic.id)}
//                   onClick={() => toggleTopic(topic.id)}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Benefits Section */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.8, duration: 0.5 }}
//             className="bg-black p-8 rounded-lg shadow-xl mb-16 border border-gray-800"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">Benefits of Custom Training</h2>
//             <ul className="space-y-4">
//               {[
//                 "Targeted learning that addresses your specific security challenges",
//                 "Flexible content that adapts to your industry and company culture",
//                 "Efficient use of training time by focusing on relevant topics",
//                 "Increased employee engagement through personalized content",
//                 "Measurable improvements in security awareness and practices"
//               ].map((benefit, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
//                   className="flex items-start"
//                 >
//                   <CheckCircle className="w-6 h-6 text-white mr-2 flex-shrink-0" />
//                   <span>{benefit}</span>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* CTA Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 2.5, duration: 0.5 }}
//             className="text-center mt-36 mb-10"
//           >
//             <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500  font-semibold mb-6">Ready to Build Your Custom Training Program?</h2>
//             <p className="text-xl font-serif italic text-gray-300 mb-8">
//               Let's create a security training plan that's perfectly tailored to your organization's needs.
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

// export default CustomTrainingPage;


//adding types
'use client'

import React, { useState } from 'react';
import Footer from '@/app/(landing-page)/navigation/footer';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import { Book, CheckCircle, Settings, Sliders, Send, ClipboardList, Palette, Rocket, BarChart, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TopicCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

interface TrainingTopic {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ icon, title, description, isSelected, onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`bg-black p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 border relative ${isSelected ? 'border-white' : 'border-gray-800'}`}
    onClick={onClick}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
    {isSelected && (
      <CheckCircle className="w-6 h-6 text-white absolute top-2 right-2" />
    )}
  </motion.div>
);

const CustomTrainingPage: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);

  const toggleTopic = (topic: number): void => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const trainingTopics: TrainingTopic[] = [
    { id: 1, icon: <Book className="w-8 h-8 text-white" />, title: "Phishing Awareness", description: "Identify and prevent various types of phishing attacks." },
    { id: 2, icon: <Settings className="w-8 h-8 text-white" />, title: "Password Security", description: "Create and manage strong, unique passwords." },
    { id: 3, icon: <Sliders className="w-8 h-8 text-white" />, title: "Data Privacy", description: "Handle sensitive data securely and comply with regulations." },
    { id: 4, icon: <Send className="w-8 h-8 text-white" />, title: "Social Engineering", description: "Recognize and resist manipulation tactics." },
    { id: 5, icon: <Book className="w-8 h-8 text-white" />, title: "Mobile Device Security", description: "Secure smartphones and tablets against threats." },
    { id: 6, icon: <Settings className="w-8 h-8 text-white" />, title: "Cloud Security", description: "Safely use cloud services and protect cloud-based data." },
  ];

  const processSteps: ProcessStep[] = [
    { icon: <ClipboardList className="w-12 h-12 text-white" />, title: "You Choose", description: "Select the training topics that align with your needs" },
    { icon: <Palette className="w-12 h-12 text-white" />, title: "We Customize", description: "Our experts tailor the content to your industry and company culture" },
    { icon: <Rocket className="w-12 h-12 text-white" />, title: "Employees Learn", description: "Engaging, interactive training delivered to your team" },
    { icon: <BarChart className="w-12 h-12 text-white" />, title: "Measure Impact", description: "Track progress and see tangible security improvements" }
  ];

  const benefits: string[] = [
    "Targeted learning that addresses your specific security challenges",
    "Flexible content that adapts to your industry and company culture",
    "Efficient use of training time by focusing on relevant topics",
    "Increased employee engagement through personalized content",
    "Measurable improvements in security awareness and practices"
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow py-24 px-4 relative mt-27">
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
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-5xl mt-32 pb-1 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6"
            >
              Customized Security Training Solutions
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl font-serif italic text-gray-300 max-w-3xl mx-auto"
            >
              Tailor your employees' security education with XThreat's flexible training programs. Choose the topics that matter most to your organization.
            </motion.p>
          </motion.div>

          {/* Custom Training Process */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 text-center mb-8">
              Our Custom Training Process
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Training Topics Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">
              Choose Your Training Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  icon={topic.icon}
                  title={topic.title}
                  description={topic.description}
                  isSelected={selectedTopics.includes(topic.id)}
                  onClick={() => toggleTopic(topic.id)}
                />
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="bg-black p-8 rounded-lg shadow-xl mb-16 border border-gray-800"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold text-center mb-8">
              Benefits of Custom Training
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <CheckCircle className="w-6 h-6 text-white mr-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="text-center mt-36 mb-10"
          >
            <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold mb-6">
              Ready to Build Your Custom Training Program?
            </h2>
            <p className="text-xl font-serif italic text-gray-300 mb-8">
              Let's create a security training plan that's perfectly tailored to your organization's needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
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

export default CustomTrainingPage;