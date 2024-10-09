// import React from 'react';
// import Head from 'next/head';
// import Navbar from '@/components/global/navbar';
// import Footer from '@/components/global/footer';
// import { Shield, Target, Zap, CheckCircle } from 'lucide-react';

// const ProductFeature = ({ icon, title, description, benefits, isEven }) => (
//   <div className={`flex items-center ${isEven ? 'bg-gray-900' : 'bg-black'} min-h-screen pt-20`}>
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//       <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
//         <div className="md:w-1/2 mb-8 md:mb-0">
//           <div className={`text-blue-400 ${isEven ? 'md:text-right' : 'md:text-left'}`}>{icon}</div>
//         </div>
//         <div className="md:w-1/2">
//           <h2 className={`text-4xl font-bold mb-4 ${isEven ? 'md:text-right' : 'md:text-left'}`}>{title}</h2>
//           <p className={`text-xl text-gray-300 mb-6 ${isEven ? 'md:text-right' : 'md:text-left'}`}>{description}</p>
//           <ul className={`space-y-2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
//             {benefits.map((benefit, index) => (
//               <li key={index} className="flex items-center text-gray-300">
//                 <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                 {benefit}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const ProductPage = () => {
//   return (
//     <>
//       <Navbar />
//       <Head>
//         <title>XThreat Products - Cybersecurity Training Solutions</title>
//         <meta name="description" content="XThreat's cybersecurity products: Interactive Quizzes, Phishing Simulations, and Weak Points Analysis" />
//       </Head>
//       <div className="bg-black text-white pt-20">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900 to-transparent opacity-20" />
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
//             <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-8 text-center">
//               XThreat Cybersecurity Solutions
//             </h1>
//             <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
//               Empower your team with cutting-edge cybersecurity training and analysis tools designed to protect your organization from evolving threats
//             </p>
//           </div>
//         </div>

//         {/* Product Sections */}
//         <ProductFeature 
//           icon={<Shield size={72} />}
//           title="Interactive Quizzes"
//           description="Engage your employees with dynamic, scenario-based quizzes that test and improve their cybersecurity knowledge. Our adaptive learning platform ensures that each team member receives personalized training tailored to their role and skill level."
//           benefits={[
//             "Customizable quiz content based on your industry and specific threats",
//             "Real-time performance tracking and analytics",
//             "Gamification elements to increase engagement and retention",
//             "Regular updates to cover emerging cybersecurity trends and threats"
//           ]}
//           isEven={false}
//         />
//         <ProductFeature 
//           icon={<Target size={72} />}
//           title="Phishing Simulations"
//           description="Conduct realistic phishing simulations to identify vulnerabilities and train your team to recognize and report threats. Our advanced algorithms create personalized scenarios based on your industry and specific risk factors, providing a true test of your organization's phishing readiness."
//           benefits={[
//             "Customizable templates mimicking real-world phishing attempts",
//             "Automated campaign scheduling and reporting",
//             "Detailed analytics on user responses and improvement over time",
//             "Integration with popular email platforms for seamless deployment"
//           ]}
//           isEven={true}
//         />
//         <ProductFeature 
//           icon={<Zap size={72} />}
//           title="Weak Points Analysis"
//           description="Identify and address your organization's cybersecurity weak points with our comprehensive analysis tools. Our AI-powered system scans your infrastructure, policies, and human factors to provide a holistic view of your security posture."
//           benefits={[
//             "Automated vulnerability scanning and risk assessment",
//             "Prioritized recommendations for addressing identified weaknesses",
//             "Compliance checking against industry standards (GDPR, HIPAA, etc.)",
//             "Regular reports and dashboards for tracking improvement over time"
//           ]}
//           isEven={false}
//         />

//         {/* Call to Action */}
//         <div className="bg-gray-900">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready to strengthen your cybersecurity defenses?</h2>
//             <p className="text-xl text-gray-300 mb-8">Get in touch with our team for a personalized demo and consultation. Let's build a robust security strategy together.</p>
//             <a
//               href="/contact"
//               className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//             >
//               Request a Demo
//             </a>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductPage;


import React from 'react';
import Head from 'next/head';
import Navbar from '@/app/(landing-page)/navigation/navbar';
import Footer from '@/app/(landing-page)/navigation/footer';
import { Shield, CheckCircle, Users, Brain, Trophy, Briefcase, Target, Mail, Lock } from 'lucide-react';

const FeatureSection = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="text-gray-300 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const AdaptiveLearning = () => (
  <FeatureSection
    icon={<Brain size={48} />}
    title="Adaptive Learning"
    description="Quizzes adjust in real-time based on user performance, ensuring optimal challenge and engagement."
  />
);

const RealWorldScenarios = () => (
  <FeatureSection
    icon={<Shield size={48} />}
    title="Real-world Scenarios"
    description="Practice with simulations of actual cybersecurity threats and situations your team might encounter."
  />
);

const RoleBasedContent = () => (
  <FeatureSection
    icon={<Users size={48} />}
    title="Role-based Content"
    description="Tailored quizzes for different roles within your organization, from IT staff to general employees."
  />
);

const Gamification = () => (
  <FeatureSection
    icon={<Trophy size={48} />}
    title="Gamification"
    description="Leaderboards, badges, and rewards to motivate continuous learning and improvement."
  />
);

const BenefitCard = ({ benefit }) => (
  <div className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-3">
      <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
      <h4 className="text-lg font-semibold">{benefit.title}</h4>
    </div>
    <p className="text-gray-400">{benefit.description}</p>
  </div>
);

const SolutionSection = ({ title, description, icon, imagePosition }) => (
  <div className={`flex items-center my-16 ${imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
    <div className="w-1/2 p-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl text-gray-300 mb-6">{description}</p>
      <a href="#" className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Learn more
      </a>
    </div>
    <div className="w-1/2 flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full filter blur-xl"></div>
        <div className="relative bg-gray-800 p-8 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  </div>
);

const Solutions = () => {
  const benefits = [
    { title: "Increased Retention", description: "Boost retention of cybersecurity best practices through interactive learning." },
    { title: "Measurable Improvement", description: "Track and quantify advancements in security awareness across your organization." },
    { title: "Gap Identification", description: "Pinpoint knowledge gaps and vulnerable areas in your security posture." },
    { title: "Compliance Adherence", description: "Meet and exceed industry training requirements with comprehensive quizzes." },
    { title: "Risk Reduction", description: "Minimize the likelihood of human-error related security incidents." },
    { title: "Security Culture", description: "Foster a culture of continuous learning and security consciousness." }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-black text-white font-sans pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold font-sans text-white sm:text-5xl sm:tracking-tight lg:text-5xl mb-8">
                Interactive Cybersecurity Trainings
              </h1>
              <p className="text-xl font-sans text-gray-300 max-w-3xl mx-auto mb-8">
                Empower your team with engaging, adaptive learning experiences that turn cybersecurity knowledge into instinct.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* New Solution Sections */}
          <SolutionSection
            title="Phishing Awareness"
            description="Use AI to guide each employee on a unique path to identify and avoid phishing attempts, strengthening your first line of defense."
            icon={<Mail size={64} className="text-blue-500" />}
            imagePosition="left"
          />
          <SolutionSection
            title="Security Awareness"
            description="Deliver interactive, bite-sized trainings that employees love. Boost engagement, ensure compliance, and coach away risky behaviors."
            icon={<Lock size={64} className="text-blue-500" />}
            imagePosition="right"
          />
          <SolutionSection
            title="Role-based Training"
            description="Tailor cybersecurity training to specific roles within your organization, ensuring relevant and impactful learning experiences."
            icon={<Briefcase size={64} className="text-blue-500" />}
            imagePosition="left"
          />
          <SolutionSection
            title="Weak Points"
            description="Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals."
            icon={<Target size={64} className="text-blue-500" />}
            imagePosition="right"
          />
          <SolutionSection
            title="Custom Trainings"
            description="Develop tailored solutions that address your unique security challenges and align with your organization's specific needs and goals."
            icon={<Target size={64} className="text-blue-500" />}
            imagePosition="left"
          />

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AdaptiveLearning />
              <RealWorldScenarios />
              <RoleBasedContent />
              <Gamification />
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
            <div className="bg-gray-900 rounded-lg p-8">
              <ol className="list-decimal list-inside space-y-4 text-gray-300">
                <li>Sign up and onboard your team to the XThreat platform.</li>
                <li>Customize quiz content based on your industry and specific security needs.</li>
                <li>Employees take initial assessment quizzes to establish baseline knowledge.</li>
                <li>Regular, scheduled quizzes are sent to employees, adapting to their progress.</li>
                <li>Track performance and identify areas for improvement through our analytics dashboard.</li>
                <li>Continuously update and refine your training program based on quiz results and emerging threats.</li>
              </ol>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">Benefits of XThreat's Interactive Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gray-900 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your cybersecurity training?</h2>
            <p className="text-xl text-gray-300 mb-8">Join the ranks of security-savvy organizations. Start your free trial today.</p>
            <a
              href="/contact"
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Solutions;

// import React from 'react';
// import Head from 'next/head';
// import Navbar from '@/app/(landing-page)/navigation/navbar';
// import Footer from '@/app/(landing-page)/navigation/footer';
// import { Shield, CheckCircle, Users, Brain, Trophy } from 'lucide-react';

// const FeatureSection = ({ icon, title, description }) => (
//   <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//     <div className="text-gray-300 mb-4">{icon}</div>
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-400">{description}</p>
//   </div>
// );

// const AdaptiveLearning = () => (
//   <FeatureSection
//     icon={<Brain size={48} />}
//     title="Adaptive Learning"
//     description="Quizzes adjust in real-time based on user performance, ensuring optimal challenge and engagement."
//   />
// );

// const RealWorldScenarios = () => (
//   <FeatureSection
//     icon={<Shield size={48} />}
//     title="Real-world Scenarios"
//     description="Practice with simulations of actual cybersecurity threats and situations your team might encounter."
//   />
// );

// const RoleBasedContent = () => (
//   <FeatureSection
//     icon={<Users size={48} />}
//     title="Role-based Content"
//     description="Tailored quizzes for different roles within your organization, from IT staff to general employees."
//   />
// );

// const Gamification = () => (
//   <FeatureSection
//     icon={<Trophy size={48} />}
//     title="Gamification"
//     description="Leaderboards, badges, and rewards to motivate continuous learning and improvement."
//   />
// );

// const BenefitCard = ({ benefit }) => (
//   <div className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
//     <div className="flex items-center mb-3">
//       <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
//       <h4 className="text-lg font-semibold">{benefit.title}</h4>
//     </div>
//     <p className="text-gray-400">{benefit.description}</p>
//   </div>
// );

// const Solutions = () => {
//   const benefits = [
//     { title: "Increased Retention", description: "Boost retention of cybersecurity best practices through interactive learning." },
//     { title: "Measurable Improvement", description: "Track and quantify advancements in security awareness across your organization." },
//     { title: "Gap Identification", description: "Pinpoint knowledge gaps and vulnerable areas in your security posture." },
//     { title: "Compliance Adherence", description: "Meet and exceed industry training requirements with comprehensive quizzes." },
//     { title: "Risk Reduction", description: "Minimize the likelihood of human-error related security incidents." },
//     { title: "Security Culture", description: "Foster a culture of continuous learning and security consciousness." }
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="bg-black text-white font-sans pt-20">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 relative z-10">
//             <div className="text-center">
//               <h1 className="text-4xl font-bold font-sans text-white sm:text-5xl sm:tracking-tight lg:text-5xl mb-8">
//                 Interactive Cybersecurity Trainings
//               </h1>
//               <p className="text-xl font-sans text-gray-300 max-w-3xl mx-auto mb-8">
//                 Empower your team with engaging, adaptive learning experiences that turn cybersecurity knowledge into instinct.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           {/* Key Features */}
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               <AdaptiveLearning />
//               <RealWorldScenarios />
//               <RoleBasedContent />
//               <Gamification />
//             </div>
//           </div>

//           {/* How It Works */}
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
//             <div className="bg-gray-900 rounded-lg p-8">
//               <ol className="list-decimal list-inside space-y-4 text-gray-300">
//                 <li>Sign up and onboard your team to the XThreat platform.</li>
//                 <li>Customize quiz content based on your industry and specific security needs.</li>
//                 <li>Employees take initial assessment quizzes to establish baseline knowledge.</li>
//                 <li>Regular, scheduled quizzes are sent to employees, adapting to their progress.</li>
//                 <li>Track performance and identify areas for improvement through our analytics dashboard.</li>
//                 <li>Continuously update and refine your training program based on quiz results and emerging threats.</li>
//               </ol>
//             </div>
//           </div>

//           {/* Benefits */}
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-center mb-10">Benefits of XThreat's Interactive Quizzes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {benefits.map((benefit, index) => (
//                 <BenefitCard key={index} benefit={benefit} />
//               ))}
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="text-center bg-gray-900 rounded-lg p-8">
//             <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your cybersecurity training?</h2>
//             <p className="text-xl text-gray-300 mb-8">Join the ranks of security-savvy organizations. Start your free trial today.</p>
//             <a
//               href="/contact"
//               className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//             >
//               Get Started Now
//             </a>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Solutions;




// import React from 'react';
// import Head from 'next/head';
// import Navbar from '@/components/global/navbar';
// import Footer from '@/components/global/footer';
// import { Shield, CheckCircle, Users, Brain, Trophy } from 'lucide-react';

// const FeatureSection = ({ icon, title, description }) => (
//   <div className="flex flex-col items-center text-center p-6">
//     <div className="text-blue-400 mb-4">{icon}</div>
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </div>
// );

// const InteractiveQuizzesPage = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="bg-black text-white pt-20 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20">
        
//         {/* Hero Section */}
//         <div className="relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-full  opacity-20" />
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 relative z-10">
//             <div className="text-center">
//               <h1 className="text-3xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-5xl mb-8">
//                 Interactive Cybersecurity Trainings
//               </h1>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
//                 Empower your team with engaging, adaptive learning experiences that turn cybersecurity knowledge into instinct.
//               </p>
//               <a
//                 href="/contact"
//                 className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//               >
//                 Start Your Free Trial
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           {/* Key Features */}
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               <FeatureSection 
//                 icon={<Brain size={48} />}
//                 title="Adaptive Learning"
//                 description="Quizzes adjust in real-time based on user performance, ensuring optimal challenge and engagement."
//               />
//               <FeatureSection 
//                 icon={<Shield size={48} />}
//                 title="Real-world Scenarios"
//                 description="Practice with simulations of actual cybersecurity threats and situations your team might encounter."
//               />
//               <FeatureSection 
//                 icon={<Users size={48} />}
//                 title="Role-based Content"
//                 description="Tailored quizzes for different roles within your organization, from IT staff to general employees."
//               />
//               <FeatureSection 
//                 icon={<Trophy size={48} />}
//                 title="Gamification"
//                 description="Leaderboards, badges, and rewards to motivate continuous learning and improvement."
//               />
//             </div>
//           </div>

//           {/* How It Works */}
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
//             <div className="bg-gray-900 rounded-lg p-8">
//               <ol className="list-decimal list-inside space-y-4 text-gray-300">
//                 <li>Sign up and onboard your team to the XThreat platform.</li>
//                 <li>Customize quiz content based on your industry and specific security needs.</li>
//                 <li>Employees take initial assessment quizzes to establish baseline knowledge.</li>
//                 <li>Regular, scheduled quizzes are sent to employees, adapting to their progress.</li>
//                 <li>Track performance and identify areas for improvement through our analytics dashboard.</li>
//                 <li>Continuously update and refine your training program based on quiz results and emerging threats.</li>
//               </ol>
//             </div>
//           </div>

//           {/* Benefits */}
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-center mb-10">Benefits of XThreat's Interactive Quizzes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {[
//                 "Increased retention of cybersecurity best practices",
//                 "Measurable improvement in security awareness",
//                 "Identification of knowledge gaps and vulnerable areas",
//                 "Compliance with industry training requirements",
//                 "Reduced risk of human-error related security incidents",
//                 "Fostering a culture of continuous learning and security consciousness"
//               ].map((benefit, index) => (
//                 <div key={index} className="flex items-start">
//                   <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
//                   <span>{benefit}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your cybersecurity training?</h2>
//             <p className="text-xl text-gray-300 mb-8">Join the ranks of security-savvy organizations. Start your free trial today.</p>
//             <a
//               href="/contact"
//               className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
//             >
//               Get Started Now
//             </a>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default InteractiveQuizzesPage;