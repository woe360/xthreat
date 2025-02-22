// 'use client'
// import React, { useState } from 'react';
// import { Shield, Lock, UserCheck, TrendingUp } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import Link from 'next/link';

// const AboutXThreat = () => {
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   const approaches = [
//     { title: "Interactive Quizzes", desc: "Engage with scenario-based learning" },
//     { title: "Adaptive Learning", desc: "Personalized training journeys" },
//     { title: "Real-world Simulations", desc: "Prepare for actual threats" },
//     { title: "Weak Points Analysis", desc: "Identify vulnerabilities" },
//     { title: "Custom Trainings", desc: "Tailored to your needs" },
//   ];

//   const challenges = [
//     "Overwhelming amounts of cybersecurity data",
//     "Low engagement with traditional security training methods",
//     "The constant evolution of cyber threats",
//   ];

//   const impacts = [
//     { icon: Lock, title: "Enhanced Security Posture", value: "85%", desc: "reduction in successful phishing attempts" },
//     { icon: UserCheck, title: "Employee Engagement", value: "93%", desc: "completion rate for training modules" },
//     { icon: TrendingUp, title: "ROI on Security", value: "3.5x", desc: "return on investment in cybersecurity training" },
//   ];

//   const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

//   return (
//     <div className="min-h-min bg-black text-white relative overflow-hidden">
//       <Navbar />
  
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-56 mb-21 relative z-10">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-20"
//         >
//           <h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 sm:text-5xl mb-6">
//             Empowering Your First Line of Defense
//           </h1>
//           <p className="mt-4 text-xl font-serif italic text-gray-400 max-w-3xl mx-auto">
//             XThreat transforms your employees from potential cybersecurity vulnerabilities into your strongest line of defense.
//           </p>
//         </motion.div>

//         {/* Our Story Section */}
//         <section className="mb-20 px-4">
//           <motion.h2
//             {...fadeInUp}
//             className="text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-8 text-center"
//           >
//             Our Story
//           </motion.h2>
//           <div className="flex flex-col md:flex-row gap-8">
//             <motion.div
//               {...fadeInUp}
//               transition={{ delay: 0.2 }}
//               className="text-lg md:w-1/2 text-gray-300 space-y-6"
//             >
//               <p>
//                 At XThreat, we help your employees become an active part of your cybersecurity strategy. Our innovative platform delivers engaging, interactive training that empowers your team to recognize and respond to cyber threats with confidence.
//               </p>
//               <p>
//                 We understand the challenges businesses face in today&apos;s complex threat landscape.
//               </p>
//               <p>
//                 That&apos;s why we&apos;ve developed a solution that cuts through the noise, delivering clear, practical training that not only educates but transforms how your organization handles cyber threats.
//               </p>
//             </motion.div>
//             <motion.div
//               {...fadeInUp}
//               transition={{ delay: 0.4 }}
//               className="md:w-1/2"
//             >
//               <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-4">
//                 Challenges We Address
//               </h3>
//               <div className="bg-black border border-gray-800 rounded-lg p-6 shadow-lg">
//                 {challenges.map((challenge, index) => (
//                   <motion.div
//                     key={index}
//                     className="mb-4 last:mb-0"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
                    
//                     <div
//                       className={`flex items-center cursor-pointer p-3 rounded-lg transition-all duration-300 ${
//                         activeChallenge === index ? 'bg-gray-800' : 'hover:bg-gray-900'
//                       }`}
//                       onClick={() => setActiveChallenge(activeChallenge === index ? null : index)}
//                     >
//                       <Shield className="h-6 w-6 mr-3 flex-shrink-0 text-white" />
//                       <p className="font-medium">{challenge}</p>
//                     </div>
//                     {activeChallenge === index && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="mt-2 ml-9 text-sm text-gray-400"
//                       >
//                         XThreat provides tailored solutions to address this challenge, ensuring your team stays ahead of potential threats.
//                       </motion.div>
                      
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* Our Impact Section */}
//         <section className="mb-20">
//           <motion.h2 
//             {...fadeInUp}
//             className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-semibold pb-1 mb-8 text-center"
//           >
//             Our Impact
//           </motion.h2>
//           <motion.div 
//             {...fadeInUp}
//             transition={{ delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//           >
//             {impacts.map((impact, index) => (
//               <div key={index} className="bg-black border border-gray-800 rounded-lg p-6 text-center">
//                 <impact.icon className="h-12 w-12 text-white mb-4 mx-auto" />
//                 <h3 className="text-xl font-semibold mb-2">{impact.title}</h3>
//                 <p className="text-3xl font-bold text-white mb-2">{impact.value}</p>
//                 <p className="text-sm text-gray-400">{impact.desc}</p>
//               </div>
//             ))}
//           </motion.div>
//         </section>

//         {/* Call to Action */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mt-48 font-semibold pb-1 mb-4">Ready to strengthen your cybersecurity posture?</h2>
//           <p className="mb-6 text-gray-400 text-xl font-serif italic max-w-3xl mx-auto">Join us in creating a world where every employee is a cybersecurity champion. Let's turn your team into your most powerful cybersecurity asset.</p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-xl shadow-sm text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//           >
//             <Link
//               href="/pricing">
//               See Our Plans
//             </Link>
//           </motion.button>
//         </motion.section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default AboutXThreat;



// import React from 'react';
// import Link from 'next/link';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';

// const AboutPage = () => {
//   const features = [
//     {
//       title: "Proactive Defense",
//       description: "Transform employees from potential vulnerabilities into your strongest security assets"
//     },
//     {
//       title: "Adaptive Learning",
//       description: "Personalized training paths that evolve with emerging threats"
//     },
//     {
//       title: "Real-world Simulations",
//       description: "Practice with realistic scenarios based on actual cyber threats"
//     }
//   ];

//   const stats = [
//     {
//       value: "85%",
//       title: "Threat Reduction",
//       description: "Average reduction in successful phishing attempts"
//     },
//     {
//       value: "93%",
//       title: "Engagement Rate",
//       description: "Employee completion rate for training modules"
//     },
//     {
//       value: "3.5x",
//       title: "Security ROI",
//       description: "Return on investment in security training"
//     }
//   ];

//   return (
//     <div className="min-h-screen font-sans bg-black text-white">
//       <Navbar />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 py-24">
//         {/* Hero Section */}
//         <div className="text-center mb-24">
//           <h1 className="text-5xl font-semibold text-transparent pb-1 bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//             Building Human-Centric Cybersecurity
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Empowering your employees to become your strongest line of defense against cyber threats.
//           </p>
//         </div>

//         {/* Mission Section */}
//         <div className="grid md:grid-cols-2 gap-16 mb-24">
//           <div>
//             <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//               We transform security awareness into security culture
//             </h2>
//           </div>
//           <div className="space-y-6 text-gray-300">
//             <p>
//               In today's digital landscape, cybersecurity isn't just about technology—it's about people. We believe every employee can be transformed from a potential security risk into a powerful defender of your organization.
//             </p>
//             <p>
//               Our platform delivers engaging, interactive training that empowers your team to recognize and respond to cyber threats with confidence.
//             </p>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="grid md:grid-cols-3 gap-8 mb-24">
//           {features.map((feature, index) => (
//             <div 
//               key={index}
//               className="p-6 border border-gray-800 rounded-xl bg-black/50 backdrop-blur hover:border-gray-700 transition-colors"
//             >
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-400">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Stats Section */}
//         <div className="mb-24">
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-12 text-center">
//             Proven Results
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {stats.map((stat, index) => (
//               <div 
//                 key={index}
//                 className="p-6 border border-gray-800 rounded-xl text-center"
//               >
//                 <div className="text-4xl font-bold mb-2">{stat.value}</div>
//                 <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
//                 <p className="text-gray-400">{stat.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="text-center">
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//             Ready to strengthen your security posture?
//           </h2>
//           <Link
//             href="/pricing"
//             className="inline-block px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
//           >
//             View Plans
//           </Link>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutPage;



// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';

// const AboutPage = () => {
//   const features = [
//     {
//       title: "Proactive Defense",
//       description: "Transform employees from potential vulnerabilities into your strongest security assets"
//     },
//     {
//       title: "Adaptive Learning",
//       description: "Personalized training paths that evolve with emerging threats"
//     },
//     {
//       title: "Real-world Simulations",
//       description: "Practice with realistic scenarios based on actual cyber threats"
//     }
//   ];

//   const stats = [
//     {
//       value: "85%",
//       title: "Threat Reduction",
//       description: "Average reduction in successful phishing attempts"
//     },
//     {
//       value: "93%",
//       title: "Engagement Rate",
//       description: "Employee completion rate for training modules"
//     },
//     {
//       value: "3.5x",
//       title: "Security ROI",
//       description: "Return on investment in security training"
//     }
//   ];

//   return (
//     <div className="min-h-screen font-sans bg-black text-white">
//       <Navbar />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 pb-20">
//         {/* Hero Section */}
//         <div className="text-center mb-24">
//           <h1 className="text-5xl font-semibold pb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 mb-6">
//             Building Human-Centric Cybersecurity
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Empowering your employees to become your strongest line of defense against cyber threats.
//           </p>
//         </div>

//         {/* Mission Section */}
//         <div className="grid md:grid-cols-2 gap-16 mb-32">
//           <div>
//             <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//               We transform security awareness into security culture
//             </h2>
//           </div>
//           <div className="space-y-6 text-gray-300">
//             <p>
//               In today's digital landscape, cybersecurity isn't just about technology—it's about people. We believe every employee can be transformed from a potential security risk into a powerful defender of your organization.
//             </p>
//             <p>
//               Our platform delivers engaging, interactive training that empowers your team to recognize and respond to cyber threats with confidence.
//             </p>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="grid md:grid-cols-3 gap-8 mb-24">
//           {features.map((feature, index) => (
//             <div 
//               key={index}
//               className="p-6 border border-gray-800 rounded-xl bg-black/50 backdrop-blur hover:border-gray-700 transition-colors"
//             >
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-400">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Stats Section */}
//         <div className="mb-24">
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-12 text-center">
//             Proven Results
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {stats.map((stat, index) => (
//               <div 
//                 key={index}
//                 className="p-6 border border-gray-800 rounded-xl text-center"
//               >
//                 <div className="text-4xl font-bold mb-2">{stat.value}</div>
//                 <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
//                 <p className="text-gray-400">{stat.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>


//         {/* CTA Section */}
//         <div className="text-center">
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//             Ready to strengthen your security posture?
//           </h2>
//           <Link
//             href="/pricing"
//             className="inline-block px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
//           >
//             View Plans
//           </Link>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutPage;



// 'use client'

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';

// const AboutPage = () => {
//   const features = [
//     {
//       title: "Proactive Defense",
//       description: "Transform employees from potential vulnerabilities into your strongest security assets"
//     },
//     {
//       title: "Adaptive Learning",
//       description: "Personalized training paths that evolve with emerging threats"
//     },
//     {
//       title: "Real-world Simulations",
//       description: "Practice with realistic scenarios based on actual cyber threats"
//     }
//   ];

//   const stats = [
//     {
//       value: "85%",
//       title: "Threat Reduction",
//       description: "Average reduction in successful phishing attempts"
//     },
//     {
//       value: "93%",
//       title: "Engagement Rate",
//       description: "Employee completion rate for training modules"
//     },
//     {
//       value: "3.5x",
//       title: "Security ROI",
//       description: "Return on investment in security training"
//     }
//   ];

//   return (
//     <div className="min-h-screen font-sans bg-black text-white">
//       <Navbar />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 pb-20">
//         {/* Hero Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-24"
//         >
//           <h1 className="text-5xl font-semibold pb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 mb-6">
//             Building Human-Centric Cybersecurity
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Empowering your employees to become your strongest line of defense against cyber threats.
//           </p>
//         </motion.div>

//         {/* Mission Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="grid md:grid-cols-2 gap-16 mb-32"
//         >
//           <div>
//             <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//               We transform security awareness into security culture
//             </h2>
//           </div>
//           <div className="space-y-6 text-gray-300">
//             <p>
//               In today's digital landscape, cybersecurity isn't just about technology—it's about people. We believe every employee can be transformed from a potential security risk into a powerful defender of your organization.
//             </p>
//             <p>
//               Our platform delivers engaging, interactive training that empowers your team to recognize and respond to cyber threats with confidence.
//             </p>
//           </div>
//         </motion.div>

//         {/* Features Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="grid md:grid-cols-3 gap-8 mb-24"
//         >
//           {features.map((feature, index) => (
//             <div 
//               key={index}
//               className="p-6 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl backdrop-blur hover:border-gray-600 transition-colors"
//             >
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-400">{feature.description}</p>
//             </div>
//           ))}
//         </motion.div>

//         {/* Stats Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="mb-24"
//         >
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-12 text-center">
//             Proven Results
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {stats.map((stat, index) => (
//               <div 
//                 key={index}
//                 className="p-6 bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl text-center"
//               >
//                 <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
//                   {stat.value}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
//                 <p className="text-gray-400">{stat.description}</p>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Founder Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="mb-32"
//         >
//           <div className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8 md:p-12">
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div className="space-y-6">
//                 <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
//                   Meet the Founder
//                 </h2>
//                 <div className="prose prose-invert">
//                   <p className="text-gray-300">
//                     Hi, I'm Domas, a cybersecurity expert with over [X] years of experience in protecting organizations from digital threats. My journey in cybersecurity began [brief background].
//                   </p>
//                   <p className="text-gray-300">
//                     After witnessing countless organizations struggle with security breaches due to human error, I realized that traditional security training wasn't enough. That's why I created [Company Name] - to transform how organizations approach cybersecurity training.
//                   </p>
//                   <div className="flex gap-4 mt-6">
//                     <Link
//                       href="https://linkedin.com/in/domasss"
//                       className="px-4 py-2 border border-gray-700 rounded-lg text-sm hover:bg-gray-800/50 transition-colors"
//                     >
//                       LinkedIn
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative w-full h-96 rounded-xl overflow-hidden">
//                 <div className="w-full h-full bg-gray-800 rounded-xl"></div>
//                 {/* Replace this div with Image component when you have your actual image */}
//                 {/* <Image
//                   src="/your-image.jpg"
//                   alt="Founder"
//                   fill
//                   className="object-cover"
//                 /> */}
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//             Ready to strengthen your security posture?
//           </h2>
//           <Link
//             href="/pricing"
//             className="inline-block px-8 py-3 bg-gray-200 text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
//           >
//             View Plans
//           </Link>
//         </motion.div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutPage;



// 'use client'

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import { ArrowRight, Shield, Brain, Target } from 'lucide-react';

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen font-sans bg-black text-white">
//       <Navbar />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 pb-20">
//         {/* Hero Section */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-32"
//         >
//           <h1 className="text-6xl md:text-7xl font-semibold pb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 mb-6">
//             Security is<br />Human First
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             We're transforming how organizations protect their digital assets by focusing on their most valuable resource - people.
//           </p>
//         </motion.div>

//         {/* Key Points Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-32">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
//           >
//             <Shield className="w-10 h-10 mb-6 text-gray-400" />
//             <h3 className="text-2xl font-medium mb-4">Proactive Protection</h3>
//             <p className="text-gray-400">
//               Transform security from a checkbox exercise into an organizational strength through continuous learning and adaptation.
//             </p>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
//           >
//             <Brain className="w-10 h-10 mb-6 text-gray-400" />
//             <h3 className="text-2xl font-medium mb-4">Behavioral Change</h3>
//             <p className="text-gray-400">
//               Build lasting security habits through engaging, interactive experiences that resonate with your team.
//             </p>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
//           >
//             <Target className="w-10 h-10 mb-6 text-gray-400" />
//             <h3 className="text-2xl font-medium mb-4">Measurable Impact</h3>
//             <p className="text-gray-400">
//               Track progress and demonstrate ROI through comprehensive analytics and behavioral metrics.
//             </p>
//           </motion.div>
//         </div>

//         {/* Vision Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8 md:p-16 mb-32"
//         >
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             <div>
//               <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//                 Our Vision
//               </h2>
//               <p className="text-gray-300 mb-6">
//                 In today's digital landscape, cybersecurity isn't just about technology—it's about people. We're building a future where every employee is empowered to be an active defender of their organization.
//               </p>
//               <p className="text-gray-300">
//                 Through innovative training approaches and real-world simulations, we're transforming security awareness from a compliance requirement into a competitive advantage.
//               </p>
//             </div>
//             <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
//               {/* Add vision illustration/image here */}
//             </div>
//           </div>
//         </motion.div>

//         {/* Founder Section */}
// <motion.div 
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5, delay: 0.6 }}
//   className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8 md:p-16 mb-32"
// >
//   <div className="max-w-3xl mx-auto text-center">
//     <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-8">
//       Behind XGuard
//     </h2>
//     <p className="text-gray-300 mb-6">
//       Hey, Domas here. I'm building XThreat to make security training something people actually want to do, not have to do.
//     </p>
//     <p className="text-gray-300 mb-8">
//       Our approach is simple: create security training that doesn't feel like training. Just practical skills that stick.
//     </p>
//     <Link
//       href="https://linkedin.com/in/domasss"
//       className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-xl text-sm hover:bg-gray-800/50 transition-colors"
//     >
//       Connect on LinkedIn
//     </Link>
//   </div>
// </motion.div>

//         {/* CTA Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.7 }}
//           className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8 md:p-16 text-center"
//         >
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//             Ready to Transform Your Security Culture?
//           </h2>
//           <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
//             Join organizations that are revolutionizing their approach to cybersecurity through human-centric training.
//           </p>
//           <Link
//             href="/pricing"
//             className="inline-flex items-center px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
//           >
//             View Solutions <ArrowRight className="ml-2 w-5 h-5" />
//           </Link>
//         </motion.div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutPage;



// 'use client'

// import React from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { ArrowRight, Shield, Lock, Globe, ChevronRight } from 'lucide-react';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen font-sans bg-black text-white">
//       <Navbar />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 pb-20">
//         {/* Hero Section */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-32"
//         >
//           <h1 className="text-4xl md:text-5xl font-semibold pb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 mb-6">
//             Security that<br />People Actually Use
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl italic mx-auto">
//             We're making security training effective by making it engaging. Built for modern teams that value both security and user experience.
//           </p>
//         </motion.div>


//         {/* Key Info Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-4 mb-32">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
//           >
//             <h3 className="text-2xl font-medium mb-4">GDPR Compliant</h3>
//             <p className="text-gray-400">
//               Built with European data protection standards at its core. Your data stays in the EU.
//             </p>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
//           >
//             <h3 className="text-2xl font-medium mb-4">Security First</h3>
//             <p className="text-gray-400">
//               Built with robust security practices from day one. We prioritize your data protection.
//             </p>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
//           >
//             <h3 className="text-2xl font-medium mb-4">Global Support</h3>
//             <p className="text-gray-400">
//               24/5 support coverage with dedicated response times for enterprise clients.
//             </p>
//           </motion.div>
//         </div>

//         {/* Company Info Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8 md:p-16 mb-32"
//         >
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//               European Security Standards
//             </h2>
//             <p className="text-gray-300">
//               Based in the EU, we maintain the highest standards of data protection while delivering innovative security solutions globally.
//             </p>
//           </div>
//         </motion.div>

//         {/* CTA Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.7 }}
//           className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8 md:p-16 text-center"
//         >
//           <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6">
//             See How It Works
//           </h2>
//           <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
//             Book a quick demo to see how XThreat can enhance your security training.
//           </p>
//           <Link
//             href="/try-quiz"
//             className="inline-flex items-center px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
//           >
//             Try App <ChevronRight className="ml-2 w-5 h-5" />
//           </Link>
//           <Link
//             href="/pricing"
//             className="inline-flex items-center px-8 py-4 ml-5 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
//           >
//             Free Trial <ChevronRight className="ml-2 w-5 h-5" />
//           </Link>
//         </motion.div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AboutPage;


'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Globe, ChevronRight, Users, BarChart, Award, Clock } from 'lucide-react';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen font-sans bg-black text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-56 pb-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-32"
        >
          <h1 className="text-4xl md:text-5xl font-semibold pb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 mb-6">
            Security that<br />People Actually Use
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl italic font-serif mx-auto">
            We're making security training effective by making it engaging. Built for modern teams that value both security and user experience.
          </p>
        </motion.div>

        {/* Key Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-4 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
          >
            <h3 className="text-2xl font-medium mb-4">GDPR Compliant</h3>
            <p className="text-gray-400">
              Built with European data protection standards at its core. Your data stays in the EU.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
          >
            <h3 className="text-2xl font-medium mb-4">Security First</h3>
            <p className="text-gray-400">
              Built with robust security practices from day one. We prioritize your data protection.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8"
          >
            <h3 className="text-2xl font-medium mb-4">Global Support</h3>
            <p className="text-gray-400">
              24/5 support coverage with dedicated response times for enterprise clients.
            </p>
          </motion.div>
        </div>

        {/* Company Info Section - Now with key metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-32"
        >
          <h2 className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-12">
            Why Companies Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-medium mb-4">Employee Engagement</h3>
              <p className="text-gray-300 mb-4">Interactive microlearning sessions that keep your team engaged.</p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2" />5-minute daily challenges</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2" />Gamified learning experience</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2" />Mobile-first approach</li>
              </ul>
            </div>
            <div className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-medium mb-4">Measurable Results</h3>
              <p className="text-gray-300 mb-4">Track your team's security awareness progress with detailed analytics.</p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2" />Real-time progress tracking</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2" />Department-level insights</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2" />Risk assessment reports</li>
              </ul>
            </div>
          </div>
        </motion.div>
        

        {/* CTA Section - Now with social proof */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gray-900/30 [box-shadow:0_-20px_70px_-20px_#ffffff1f_inset] w-full max-w-7xl mx-auto border mb-32 border-gray-700 rounded-xl p-8 md:p-16 text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">
            Start Securing Your Team Today
          </h2>
          <p className="text-gray-400 mb-8">
            Get a personalized demo and see how we can help protect your company.
          </p>
          <div className="space-x-4">
          <Link
              href="/pricing"
              className="inline-flex items-center px-5 bg-white text-black py-3 border border-white/20 rounded-xl font-medium hover:bg-white/90 transition-colors"
            >
              View Plans
            </Link>
            <Link 
            href="/try-app"
            className="inline-flex items-center px-8 py-3 border border-white/20 rounded-xl font-medium hover:bg-white/10 transition-colors">
              Try App
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;