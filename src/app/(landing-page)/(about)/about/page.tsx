// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import Navbar from '@/components/global/navbar';
// import { FaOtter } from 'react-icons/fa';
// import Footer from '@/components/global/footer';

// const AboutXThreat = () => {
//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] bg-gray-900 text-gray-100">
//       <Navbar/>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-52">
//         {/* Hero Section */}
//         <section className="pt-20 pb-24 text-center">
//           <h1 className="text-5xl font-bold mb-6">About XThreat</h1>
//           <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
//             Revolutionizing cybersecurity with the wisdom of ancient myths and cutting-edge technology.
//           </p>
//           <div className="inline-block">
//             <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center">
//               Get in touch <ArrowRight className="ml-2" size={20} />
//             </a>
//           </div>
//         </section>

//         {/* Our Story Section */}
//         <section className="py-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl font-bold mb-6">Our Story</h2>
//               <p className="text-gray-300 mb-4">
//                 Founded in 2021 in the heart of Vilnius, Lithuania, XThreat emerged from a simple yet powerful idea: in the world of cybersecurity, the most dangerous threats often come from within, much like the legendary Trojan Horse.
//               </p>
//               <p className="text-gray-300">
//                 Our founders, a group of cybersecurity experts and mythology enthusiasts, saw a parallel between the ancient tale of Troy and the modern digital landscape. This insight led to the birth of XThreat, a company dedicated to helping organizations identify, understand, and mitigate internal cybersecurity risks.
//               </p>
//             </div>
//             <div className="flex justify-center">
//               <div className="w-64 h-64 bg-blue-500 rounded-full flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 text-white">
//                   <path d="M12 2L2 8v8l10 6 10-6V8L12 2zm0 2.73l6.67 4-6.67 4-6.67-4 6.67-4zM4 15.46V9.54l8 4.8v6.92l-8-4.8zm16 0l-8 4.8v-6.92l8-4.8v6.92z"/>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Our Mission Section */}
//         <section className="py-20 bg-gray-800 rounded-3xl px-8">
//           <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-gray-700 p-6 rounded-xl">
//               <h3 className="text-xl font-semibold mb-4">Revolutionize Cybersecurity</h3>
//               <p className="text-gray-300">We aim to transform how organizations approach cybersecurity, focusing on both external and internal threats.</p>
//             </div>
//             <div className="bg-gray-700 p-6 rounded-xl">
//               <h3 className="text-xl font-semibold mb-4">Empower Organizations</h3>
//               <p className="text-gray-300">Our goal is to equip companies with the tools and knowledge to build robust, holistic security strategies.</p>
//             </div>
//             <div className="bg-gray-700 p-6 rounded-xl">
//               <h3 className="text-xl font-semibold mb-4">Blend Wisdom with Technology</h3>
//               <p className="text-gray-300">We combine cutting-edge technology with timeless wisdom from mythology and history to create innovative solutions.</p>
//             </div>
//           </div>
//         </section>

//         {/* Why the Trojan Horse Section */}
//         <section className="py-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div className="flex justify-center">
//               <div className="w-64 h-64 bg-gray-700 rounded-full flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 text-blue-500">
//                   <path d="M12 2L2 8v8l10 6 10-6V8L12 2zm0 2.73l6.67 4-6.67 4-6.67-4 6.67-4zM4 15.46V9.54l8 4.8v6.92l-8-4.8zm16 0l-8 4.8v-6.92l8-4.8v6.92z"/>
//                 </svg>
//               </div>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold mb-6">Why the Trojan Horse?</h2>
//               <p className="text-gray-300 mb-4">
//                 The Trojan Horse is more than just our logo - it's the embodiment of our philosophy. This ancient symbol reminds us that the most significant threats often come disguised as something harmless or even beneficial.
//               </p>
//               <p className="text-gray-300">
//                 By adopting the Trojan Horse as our symbol, we constantly remind ourselves and our clients to look beyond the surface, to question assumptions, and to always be vigilant against hidden threats.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Lithuanian Roots Section */}
//         <section className="py-20 bg-gray-800 rounded-3xl px-8 mb-20">
//           <h2 className="text-3xl font-bold mb-8 text-center">Our Lithuanian Roots</h2>
//           <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8">
//             XThreat is proud of its Lithuanian heritage. From our headquarters in Vilnius, we serve clients across the globe, bringing a unique blend of Baltic ingenuity and world-class cybersecurity expertise to every project we undertake.
//           </p>
//           <div className="flex justify-center">
//             <img src="/api/placeholder/800/400" alt="Vilnius, Lithuania" className="rounded-xl shadow-lg" />
//           </div>
//         </section>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default AboutXThreat;

'use client'
import React from 'react';
import { Shield, Brain, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/global/ui/card';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';

const AboutXThreat = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const uniqueApproaches = [
    { icon: Brain, title: "Interactive Quizzes", desc: "Engage employees with dynamic, scenario-based quizzes" },
    { icon: Zap, title: "Adaptive Learning Paths", desc: "Personalized training journeys for optimal knowledge retention" },
    { icon: Target, title: "360° Learning", desc: "Comprehensive coverage of cybersecurity awareness topics" },
    { icon: Shield, title: "Continuous Practice", desc: "Reinforce learning through regular, hands-on exercises" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-56">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-3xl font-bold sm:text-5xl mb-6">
            Empowering Your First Line of Defense
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            XThreat is an innovative cybersecurity startup dedicated to transforming employee awareness through engaging, interactive training solutions.
          </p>
        </motion.div>

        {/* Who We Are Section */}
        <section className="mb-20">
          <motion.h2 
            {...fadeInUp}
            className="text-3xl font-bold mb-8 text-center text-blue-400"
          >
            Who We Are
          </motion.h2>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg mb-12 max-w-3xl mx-auto text-center text-gray-300"
          >
            At XThreat, we're a team of passionate cybersecurity experts and educators on a mission to revolutionize cybersecurity awareness training. We believe that well-informed employees are the strongest defense against cyber threats, and we're here to make security education engaging, effective, and accessible for organizations of all sizes.
          </motion.p>
        </section>

        {/* Our Story Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
            {/* Content on the left */}
            <div className="w-1/2 pr-8">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold mb-12 text-white"
              >
                OUR STORY
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-lg space-y-6 text-gray-300"
              >
                <p>
                  Our journey began when our founder, a seasoned penetration tester, witnessed firsthand the vulnerabilities that even the most sophisticated security systems face due to human error. This revelation sparked a mission to revolutionize cybersecurity awareness training.
                </p>
                <p>
                  As a cybersecurity startup, our goal is to find and tackle the threats that could lead to financial and reputational damage. We know firsthand the challenges you're facing — because we've faced them too. We've been there, going through tons of threat data, trying to make sense of it all. It was overwhelming, and we knew there had to be a better way.
                </p>
                <p>
                  XThreat is more than just a training platform; it's our way of sharing our knowledge and experience. We've designed our interactive quizzes and adaptive learning paths to ensure cybersecurity teams have the right information and tools for better decision making. By focusing on engaging, practical training, we're turning employees from potential vulnerabilities into active defenders of their organization's digital assets.
                </p>
              </motion.div>
            </div>
            
            {/* Gradient design on the right */}
            <div className="w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gray-700/30 rounded-full filter blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Approach Section */}
        <section className="mb-20">
          <motion.h2 
            {...fadeInUp}
            className="text-3xl font-bold mb-8 text-center text-blue-400"
          >
            Our Unique Approach
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uniqueApproaches.map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-gray-900/50 border border-gray-800">
                  <CardContent className="p-6 flex items-center">
                    <approach.icon size={40} className="mr-4 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{approach.title}</h3>
                      <p className="text-gray-300">{approach.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to strengthen your cybersecurity posture?</h2>
          <p className="mb-6 text-gray-400">Get in touch to learn how XThreat can transform your employees into your strongest line of defense.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-xl shadow-sm text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Contact Us
          </motion.button>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutXThreat;

// 'use client'
// import React from 'react';
// import { Shield, Lock, Eye, ArrowRight, Users, Zap, Target } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Navbar from '@/components/global/navbar';
// import Footer from '@/components/global/footer';

// const AboutXThreat = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   const approachSteps = [
//     { title: "Risk Assessment", icon: Shield, description: "Identify vulnerabilities and assess potential threats" },
//     { title: "Tailored Strategy", icon: Target, description: "Develop a customized security plan for your organization" },
//     { title: "Continuous Learning", icon: Zap, description: "Implement ongoing training and awareness programs" },
//     { title: "Performance Monitoring", icon: Eye, description: "Track progress and adjust strategies as needed" },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white relative bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
//       <Navbar />

//       <main className="relative pt-36 z-10">
//         {/* Hero Section */}
//         <section className="py-20 px-4">
//           <div className="max-w-6xl mx-auto text-center">
//             <motion.h1 
//               {...fadeInUp}
//               className="text-5xl font-bold mb-6"
//             >
//               Who are we?
//             </motion.h1>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2 }}
//               className="text-xl mb-8 max-w-3xl mx-auto"
//             >
//               Empowering organizations to turn their greatest risk into their strongest defense through innovative cybersecurity solutions and human-centric approaches.
//             </motion.p>
//           </div>
//         </section>

//         {/* Our Mission Section */}
//         <section className="py-20 px-4">
//           <div className="max-w-6xl mx-auto">
//             <motion.h2 
//               {...fadeInUp}
//               className="text-3xl font-bold mb-8 text-center"
//             >
//               Why are we doing this?
//             </motion.h2>
//             <motion.p 
//               {...fadeInUp}
//               transition={{ delay: 0.2 }}
//               className="text-lg text-center mb-12 max-w-3xl mx-auto"
//             >
//               XThreat is dedicated to revolutionizing cybersecurity awareness and training. We combine cutting-edge technology with effective learning strategies to create a robust human defense against cyber threats in an ever-evolving digital landscape.
//             </motion.p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {[
//                 { icon: Shield, title: "Fortify Digital Defenses", desc: "We provide organizations with advanced tools to protect against both known and emerging cyber threats." },
//                 { icon: Lock, title: "Innovative Security Strategies", desc: "Our approach blends modern security principles with state-of-the-art technology for comprehensive protection." },
//                 { icon: Users, title: "Empower Your Team", desc: "We transform employees from potential vulnerabilities into your strongest line of defense." }
//               ].map((item, index) => (
//                 <motion.div 
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.2 }}
//                   className="bg-blue-900/20 p-6 rounded-xl backdrop-blur-sm"
//                 >
//                   <item.icon size={40} className="mb-4 text-blue-400" />
//                   <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
//                   <p>{item.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Our Approach Section */}
//         <section className="py-20 px-4">
//           <div className="max-w-6xl mx-auto">
//             <motion.h2 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl font-bold mb-16 text-center"
//             >
//               Our Approach
//             </motion.h2>
//             <div className="flex justify-center">
//               <div className="relative w-64 h-64 md:w-96 md:h-96">
//                 <motion.div
//                   className="absolute inset-0 border-2 border-blue-400 rounded-full"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.2, duration: 0.5 }}
//                 />
//                 {approachSteps.map((step, index) => {
//                   const angle = (index / approachSteps.length) * 2 * Math.PI - Math.PI / 2;
//                   const x = Math.cos(angle) * 48 + 50;
//                   const y = Math.sin(angle) * 48 + 50;
//                   return (
//                     <motion.div
//                       key={index}
//                       className="absolute transform -translate-x-1/2 -translate-y-1/2"
//                       style={{ left: `${x}%`, top: `${y}%` }}
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
//                     >
//                       <div className="bg-blue-900/40 p-4 rounded-full w-24 h-24 flex flex-col items-center justify-center text-center">
//                         <step.icon size={24} className="mb-2 text-blue-400" />
//                         <span className="text-sm font-medium">{step.title}</span>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutXThreat;



