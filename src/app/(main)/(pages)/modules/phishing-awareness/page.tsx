// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { ChevronDown, ChevronUp, ChevronLeft, Circle, CheckCircle, CircleCheck } from "lucide-react";

// const PhishingAwarenessPage = () => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
//     'what-is-phishing': false,
//     'history-of-phishing': false,
//     'common-phishing-methods': false,
//     'phishing-signs': false,
//     'analyzing-links': false,
//     'email-security': false,
//     'multi-factor-authentication': false,
//     'incident-response': false,
//     'reporting-phishing': false,
//     'targeted-attacks': false,
//     'defending-against-spear-phishing': false,
//   });

//   const subLessons = [
//     { slug: 'phishing-introduction', title: 'Introduction', level: 1, points: 10, lessons: [
//       { slug: 'what-is-phishing', title: 'What is Phishing?', points: 5 },
//       { slug: 'history-of-phishing', title: 'History of Phishing', points: 5 },
//       { slug: 'common-phishing-methods', title: 'Common Phishing Methods', points: 10 },
//     ] },
//     { slug: 'detecting-phishing', title: 'Detecting Phishing Emails', level: 2, points: 15, lessons: [
//       { slug: 'phishing-signs', title: 'Signs of Phishing Emails', points: 7 },
//       { slug: 'analyzing-links', title: 'Analyzing Suspicious Links', points: 8 },
//     ] },
//     { slug: 'preventing-phishing', title: 'Preventing Phishing Attacks', level: 3, points: 20, lessons: [
//       { slug: 'email-security', title: 'Email Security Best Practices', points: 10 },
//       { slug: 'multi-factor-authentication', title: 'Using Multi-Factor Authentication', points: 10 },
//     ] },
//     { slug: 'responding-to-phishing', title: 'Responding to Phishing Incidents', level: 4, points: 25, lessons: [
//       { slug: 'incident-response', title: 'Incident Response Steps', points: 12 },
//       { slug: 'reporting-phishing', title: 'Reporting Phishing Attacks', points: 13 },
//     ] },
//     { slug: 'spear-phishing', title: 'Spear Phishing Attacks', level: 5, points: 30, lessons: [
//       { slug: 'targeted-attacks', title: 'Understanding Targeted Attacks', points: 15 },
//       { slug: 'defending-against-spear-phishing', title: 'Defending Against Spear Phishing', points: 15 },
//     ] },
//   ];

//   const toggleLesson = (slug: string) => {
//     setOpenLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   const toggleCompletion = (slug: string) => {
//     setCompletedLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   return (
//     <div className="min-h-screen p-4 bg-custom-radial">
//       <div className="border-b my-10 mx-6">
//         <h1 className="text-3xl">Phishing Awareness</h1>
//           <div className="flex space-x-2 mt-3 text-sm">
//             <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
//             <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">Beginner</span>
//             <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">13.8 hrs</span>
//             <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">100 Points</span>
//           </div>
//           <div className="flex justify-between items-start">
//             <p className="text-[17px] text-gray-400 my-4 w-1/3">
//               These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. Learn practical techniques to protect yourself and your organization from digital threats.
//             </p>
//           </div>
//           <div>
//               <button className='bg-green-700 px-2 py-1 mb-6 rounded-[5px]'>RESUME</button>
//           </div>
//       </div>
//       <ul className="space-y-4">
//         {subLessons.map((lesson) => (
//           <li key={lesson.slug} className="bg-transparent p-4 mx-10 mt-10 rounded-lg shadow-md">
//             <div
//               className="cursor-pointer text-xl text-gray-400 hover:text-white transition-colors flex items-center justify-between"
//               onClick={() => toggleLesson(lesson.slug)}
//             >
//               <div className="flex items-center">
//                 <span className="mr-2">{openLessons[lesson.slug] ? <ChevronUp /> : <ChevronDown />}</span>
//                 {lesson.title}
//               </div>
//               <div className="text-sm text-gray-400">Level {lesson.level} - {lesson.points} Points</div>
//             </div>
//             {openLessons[lesson.slug] && lesson.lessons && (
//               <ul className="mt-4 space-y-2 ml-4">
//                 {lesson.lessons.map((subLesson) => (
//                   <li key={subLesson.slug} className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <span onClick={() => toggleCompletion(subLesson.slug)} className="mr-2 cursor-pointer">
//                         {completedLessons[subLesson.slug] ? <CircleCheck className="text-green-600" /> : <Circle className="text-gray-500" />}
//                       </span>
                      
//                       <Link
//                         href={`/modules/phishing-awareness/${lesson.slug}/${subLesson.slug}`}
//                         className="text-lg text-gray-400 hover:text-white transition-colors"
//                       >
//                         {subLesson.title}
//                       </Link>
//                     </div>
//                     <div className="text-sm text-gray-400">{subLesson.points} Points</div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PhishingAwarenessPage;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CircleCheck } from "lucide-react";

// const PhishingAwarenessPage = () => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});
//   const [subLessons, setSubLessons] = useState([]);

//   useEffect(() => {
//     const fetchLessons = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/modules/phishing-awareness/lessons');
//         const data = await response.json();
//         setSubLessons(data);
//       } catch (error) {
//         console.error('Error fetching lessons:', error);
//       }
//     };

//     fetchLessons();
//   }, []);

//   const toggleLesson = (slug: string) => {
//     setOpenLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   const toggleCompletion = (slug: string) => {
//     setCompletedLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   return (
//     <div className="min-h-screen p-4 bg-custom-radial">
//       <div className="border-b my-10 mx-6">
//         <h1 className="text-3xl">Phishing Awareness</h1>
//         <div className="flex space-x-2 mt-3 text-sm">
//           <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
//           <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">Beginner</span>
//           <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">100 Points</span>
//         </div>
//         <div className="flex justify-between items-start">
//           <p className="text-[17px] text-gray-400 my-4 w-1/3">
//             These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. Learn practical techniques to protect yourself and your organization from digital threats.
//           </p>
//         </div>
//         <div>
//           <button className='bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]'><Cable className='inline'/> RESUME</button>
//         </div>
        
//       </div>
//       <ul className="space-y-4">
//         {subLessons.map((lesson) => (
//           <li key={lesson.slug} className="bg-transparent p-4 mx-10 mt-10 border rounded-lg shadow-md">
//             <div
//               className="cursor-pointer text-xl text-gray-400 hover:text-white transition-colors flex items-center justify-between"
//               onClick={() => toggleLesson(lesson.slug)}
//             >
//               <div className="flex items-center">
//                 <span className="mr-2">{openLessons[lesson.slug] ? <ChevronUp /> : <ChevronDown />}</span>
//                 {lesson.title}
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">Level {lesson.level}</span>
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">{lesson.points} Points</span>
//               </div>
//             </div>
//             {openLessons[lesson.slug] && lesson.subLessons && (
//               <ul className="mt-4 space-y-2 ml-4">
//                 {lesson.subLessons.map((subLesson) => (
//                   <li key={subLesson.slug} className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <span onClick={() => toggleCompletion(subLesson.slug)} className="mr-2 cursor-pointer">
//                         {completedLessons[subLesson.slug] ? <CircleCheck className="text-green-600" /> : <Circle className="text-gray-500" />}
//                       </span>
//                       <Link
//                         href={`/modules/phishing-awareness/${lesson.slug}/${subLesson.slug}`}
//                         className="text-lg text-gray-400 hover:text-white transition-colors"
//                       >
//                         {subLesson.title}
//                       </Link>
//                     </div>
//                     <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">{subLesson.points} Points</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PhishingAwarenessPage;







//VEIKIA 

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// };

// const PhishingAwarenessPage = () => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
//     'what-is-phishing': false,
//     'history-of-phishing': false,
//     'common-phishing-methods': false,
//     'phishing-signs': false,
//     'analyzing-links': false,
//     'email-security': false,
//     'multi-factor-authentication': false,
//     'incident-response': false,
//     'reporting-phishing': false,
//     'targeted-attacks': false,
//     'defending-against-spear-phishing': false,
//   });

//   const subLessons = [
//     { slug: 'phishing-introduction', title: 'Introduction', level: 1, points: 10, lessons: [
//       { slug: 'what-is-phishing', title: 'What is Phishing?', points: 5 },
//       { slug: 'history-of-phishing', title: 'History of Phishing', points: 5 },
//       { slug: 'common-phishing-methods', title: 'Common Phishing Methods', points: 10 },
//     ] },
//     { slug: 'detecting-phishing', title: 'Detecting Phishing Emails', level: 2, points: 15, lessons: [
//       { slug: 'phishing-signs', title: 'Signs of Phishing Emails', points: 7 },
//       { slug: 'analyzing-links', title: 'Analyzing Suspicious Links', points: 8 },
//     ] },
//     { slug: 'preventing-phishing', title: 'Preventing Phishing Attacks', level: 3, points: 20, lessons: [
//       { slug: 'email-security', title: 'Email Security Best Practices', points: 10 },
//       { slug: 'multi-factor-authentication', title: 'Using Multi-Factor Authentication', points: 10 },
//     ] },
//     { slug: 'responding-to-phishing', title: 'Responding to Phishing Incidents', level: 4, points: 25, lessons: [
//       { slug: 'incident-response', title: 'Incident Response Steps', points: 12 },
//       { slug: 'reporting-phishing', title: 'Reporting Phishing Attacks', points: 13 },
//     ] },
//     { slug: 'spear-phishing', title: 'Spear Phishing Attacks', level: 5, points: 30, lessons: [
//       { slug: 'targeted-attacks', title: 'Understanding Targeted Attacks', points: 15 },
//       { slug: 'defending-against-spear-phishing', title: 'Defending Against Spear Phishing', points: 15 },
//     ] },
//   ];

//   const toggleLesson = (slug: string) => {
//     setOpenLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   const toggleCompletion = (slug: string) => {
//     setCompletedLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   return (
//     <div className="min-h-screen p-4 bg-custom-radial">
//       <div className="flex justify-between items-center">
//         <Link className="text-gray-400 ml-5 mt-5 hover:text-white transition flex items-center" href="/modules">
//         <ChevronLeft/> Back
//         </Link>
//       </div>
//       <div className="border-b my-6 mx-6">
//         <h1 className="text-3xl">Phishing Awareness</h1>
//         <div className="flex space-x-2 mt-3 text-sm">
//           <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
//           <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">Beginner</span>
//           <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">100 Points</span>
//         </div>
//         <div className="flex justify-between items-start">
//           <p className="text-[17px] text-gray-400 my-4 w-1/3">
//             These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. Learn practical techniques to protect yourself and your organization from digital threats.
//           </p>
//         </div>
//         <div>
//           <button className='bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]'><Cable className='inline'/> RESUME</button>
//         </div>
//       </div>
//       <ul className="space-y-6">
//         {subLessons.map((lesson) => (
//           <li key={lesson.slug} className="bg-gray-800 p-4 mx-10 rounded-lg shadow-md" style={componentStyle}>
//             <div
//               className="cursor-pointer text-xl text-gray-300 hover:text-white transition-colors flex items-center justify-between"
//               onClick={() => toggleLesson(lesson.slug)}
//             >
//               <div className="flex items-center">
//                 <span className="mr-2">{openLessons[lesson.slug] ? <ChevronUp /> : <ChevronDown />}</span>
//                 {lesson.title}
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">Level {lesson.level}</span>
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">{lesson.points} Points</span>
//               </div>
//             </div>
//             {openLessons[lesson.slug] && lesson.lessons && (
//               <ul className="mt-4 space-y-2">
//                 {lesson.lessons.map((subLesson) => (
//                   <li key={subLesson.slug} className="bg-gray-700 rounded-md overflow-hidden">
//                     <Link
//                       href={`/modules/phishing-awareness/${lesson.slug}/${subLesson.slug}`}
//                       className="flex items-center justify-between py-3 px-4 hover:bg-gray-600 transition-colors duration-200"
//                     >
//                       <div className="flex items-center">
//                         <span onClick={(e) => { e.preventDefault(); toggleCompletion(subLesson.slug); }} className="mr-3 cursor-pointer">
//                           {completedLessons[subLesson.slug] ? 
//                             <CheckCircle2 className="text-green-500 w-5 h-5" /> : 
//                             <Circle className="text-gray-400 w-5 h-5" />
//                           }
//                         </span>
//                         <span className="text-base text-gray-200 hover:text-white transition-colors">
//                           {subLesson.title}
//                         </span>
//                       </div>
//                       <span className="text-gray-400 text-sm bg-gray-800 px-2 py-1 rounded-full">
//                         {subLesson.points} Points
//                       </span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PhishingAwarenessPage;


//IDEALIAI
// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";

// const PhishingAwarenessPage = () => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
//     'what-is-phishing': false,
//     'history-of-phishing': false,
//     'common-phishing-methods': false,
//     'phishing-signs': false,
//     'analyzing-links': false,
//     'email-security': false,
//     'multi-factor-authentication': false,
//     'incident-response': false,
//     'reporting-phishing': false,
//     'targeted-attacks': false,
//     'defending-against-spear-phishing': false,
//   });

//   const subLessons = [
//     { slug: 'phishing-introduction', title: 'Introduction', level: 1, points: 10, lessons: [
//       { slug: 'what-is-phishing', title: 'What is Phishing?', points: 5 },
//       { slug: 'history-of-phishing', title: 'History of Phishing', points: 5 },
//       { slug: 'common-phishing-methods', title: 'Common Phishing Methods', points: 10 },
//     ] },
//     { slug: 'detecting-phishing', title: 'Detecting Phishing Emails', level: 2, points: 15, lessons: [
//       { slug: 'phishing-signs', title: 'Signs of Phishing Emails', points: 7 },
//       { slug: 'analyzing-links', title: 'Analyzing Suspicious Links', points: 8 },
//     ] },
//     { slug: 'preventing-phishing', title: 'Preventing Phishing Attacks', level: 3, points: 20, lessons: [
//       { slug: 'email-security', title: 'Email Security Best Practices', points: 10 },
//       { slug: 'multi-factor-authentication', title: 'Using Multi-Factor Authentication', points: 10 },
//     ] },
//     { slug: 'responding-to-phishing', title: 'Responding to Phishing Incidents', level: 4, points: 25, lessons: [
//       { slug: 'incident-response', title: 'Incident Response Steps', points: 12 },
//       { slug: 'reporting-phishing', title: 'Reporting Phishing Attacks', points: 13 },
//     ] },
//     { slug: 'spear-phishing', title: 'Spear Phishing Attacks', level: 5, points: 30, lessons: [
//       { slug: 'targeted-attacks', title: 'Understanding Targeted Attacks', points: 15 },
//       { slug: 'defending-against-spear-phishing', title: 'Defending Against Spear Phishing', points: 15 },
//     ] },
//   ];

//   const toggleLesson = (slug: string) => {
//     setOpenLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   const toggleCompletion = (slug: string) => {
//     setCompletedLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6">
//       <div className="flex items-center mb-6">
//       </div>

//       <div className="border-b border-gray-800 pb-6 mb-8">
//         <div className="flex">
//           <Link 
//             className="text-gray-400 mb-4 mr-2 hover:bg-slate-200 border px-2 rounded-lg hover:text-gray-900 transition-colors flex items-center" 
//             href="/modules"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </Link>
//           <h1 className="text-2xl font-base text-white mb-4">Phishing Awareness</h1>
//         </div>
        
//         <div className="flex space-x-3 mb-4">
//           <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm">Public</span>
//           <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">Beginner</span>
//           <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">100 Points</span>
//         </div>

//         <div className="flex justify-between items-start mb-6">
//           <p className="text-gray-400 text-sm max-w-xl">
//             These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. 
//             Learn practical techniques to protect yourself and your organization from digital threats.
//           </p>
//         </div>

//         <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
//           <Cable className="h-5 w-5" />
//           Resume
//         </button>
//       </div>

//       <div className="space-y-4">
//         {subLessons.map((lesson) => (
//           <div key={lesson.slug} className="bg-[#050607] border border-gray-800 rounded-lg">
//             <div
//               className="p-4 cursor-pointer hover:bg-gray-800/50 transition-colors flex items-center justify-between"
//               onClick={() => toggleLesson(lesson.slug)}
//             >
//               <div className="flex items-center gap-2">
//                 {openLessons[lesson.slug] ? 
//                   <ChevronUp className="h-5 w-5 text-gray-400" /> : 
//                   <ChevronDown className="h-5 w-5 text-gray-400" />
//                 }
//                 <span className="text-lg">{lesson.title}</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-lg text-sm">
//                   Level {lesson.level}
//                 </span>
//                 <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
//                   {lesson.points} Points
//                 </span>
//               </div>
//             </div>

//             {openLessons[lesson.slug] && lesson.lessons && (
//               <div className="p-4 pt-0">
//                 <div className="space-y-2">
//                   {lesson.lessons.map((subLesson) => (
//                     <Link
//                       key={subLesson.slug}
//                       href={`/modules/phishing-awareness/${lesson.slug}/${subLesson.slug}`}
//                       className="flex items-center justify-between p-3 bg-[#050607] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span 
//                           onClick={(e) => { 
//                             e.preventDefault(); 
//                             toggleCompletion(subLesson.slug); 
//                           }} 
//                           className="cursor-pointer"
//                         >
//                           {completedLessons[subLesson.slug] ? 
//                             <CheckCircle2 className="h-5 w-5 text-green-400" /> : 
//                             <Circle className="h-5 w-5 text-gray-400" />
//                           }
//                         </span>
//                         <span className="text-gray-200">{subLesson.title}</span>
//                       </div>
//                       <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
//                         {subLesson.points} Points
//                       </span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PhishingAwarenessPage;


// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft, Lock } from "lucide-react";

// const PhishingAwarenessPage = () => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
//     'what-is-phishing': true, // First lesson starts unlocked
//     'history-of-phishing': false,
//     'common-phishing-methods': false,
//     'phishing-signs': false,
//     'analyzing-links': false,
//     'email-security': false,
//     'multi-factor-authentication': false,
//     'incident-response': false,
//     'reporting-phishing': false,
//     'targeted-attacks': false,
//     'defending-against-spear-phishing': false,
//   });

//   // Track unlocked status for each level
//   const [unlockedLevels, setUnlockedLevels] = useState<{ [key: number]: boolean }>({
//     1: true, // First level starts unlocked
//     2: false,
//     3: false,
//     4: false,
//     5: false,
//   });

//   const subLessons = [
//     { slug: 'phishing-introduction', title: 'Introduction', level: 1, points: 10, lessons: [
//       { slug: 'what-is-phishing', title: 'What is Phishing?', points: 5 },
//       { slug: 'history-of-phishing', title: 'History of Phishing', points: 5 },
//       { slug: 'common-phishing-methods', title: 'Common Phishing Methods', points: 10 },
//     ] },
//     { slug: 'detecting-phishing', title: 'Detecting Phishing Emails', level: 2, points: 15, lessons: [
//       { slug: 'phishing-signs', title: 'Signs of Phishing Emails', points: 7 },
//       { slug: 'analyzing-links', title: 'Analyzing Suspicious Links', points: 8 },
//     ] },
//     { slug: 'preventing-phishing', title: 'Preventing Phishing Attacks', level: 3, points: 20, lessons: [
//       { slug: 'email-security', title: 'Email Security Best Practices', points: 10 },
//       { slug: 'multi-factor-authentication', title: 'Using Multi-Factor Authentication', points: 10 },
//     ] },
//     { slug: 'responding-to-phishing', title: 'Responding to Phishing Incidents', level: 4, points: 25, lessons: [
//       { slug: 'incident-response', title: 'Incident Response Steps', points: 12 },
//       { slug: 'reporting-phishing', title: 'Reporting Phishing Attacks', points: 13 },
//     ] },
//     { slug: 'spear-phishing', title: 'Spear Phishing Attacks', level: 5, points: 30, lessons: [
//       { slug: 'targeted-attacks', title: 'Understanding Targeted Attacks', points: 15 },
//       { slug: 'defending-against-spear-phishing', title: 'Defending Against Spear Phishing', points: 15 },
//     ] },
//   ];

//   const toggleLesson = (slug: string, level: number) => {
//     if (!unlockedLevels[level]) return; // Prevent opening locked levels
//     setOpenLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   const toggleCompletion = (slug: string, level: number) => {
//     setCompletedLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));

//     // Check if all lessons in the current level are completed
//     const currentLevelLessons = subLessons
//       .find(lesson => lesson.level === level)
//       ?.lessons.map(l => l.slug) || [];
    
//     const allCurrentLevelCompleted = currentLevelLessons
//       .every(lessonSlug => completedLessons[lessonSlug]);

//     // If all lessons are completed, unlock the next level
//     if (allCurrentLevelCompleted) {
//       setUnlockedLevels(prevState => ({
//         ...prevState,
//         [level + 1]: true,
//       }));
//     }
//   };

//   // Helper function to check if a level should be locked
//   const isLevelLocked = (level: number) => !unlockedLevels[level];

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6">
//       <div className="flex items-center mb-6">
//       </div>

//       <div className="border-b border-gray-800 pb-6 mb-8">
//         <div className="flex">
//           <Link 
//             className="text-gray-400 mb-4 mr-2 hover:bg-slate-200 border px-2 rounded-lg hover:text-gray-900 transition-colors flex items-center" 
//             href="/modules"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </Link>
//           <h1 className="text-2xl font-base text-white mb-4">Phishing Awareness</h1>
//         </div>
        
//         <div className="flex space-x-3 mb-4">
//           <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm">Public</span>
//           <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">Beginner</span>
//           <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">100 Points</span>
//         </div>

//         <div className="flex justify-between items-start mb-6">
//           <p className="text-gray-400 text-sm max-w-xl">
//             These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. 
//             Learn practical techniques to protect yourself and your organization from digital threats.
//           </p>
//         </div>

//         <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
//           <Cable className="h-5 w-5" />
//           Resume
//         </button>
//       </div>

//       <div className="space-y-4">
//         {subLessons.map((lesson) => {
//           const isLocked = isLevelLocked(lesson.level);
//           return (
//             <div 
//               key={lesson.slug} 
//               className={`bg-[#050607] border border-gray-800 rounded-lg ${isLocked ? 'opacity-75' : ''}`}
//             >
//               <div
//                 className={`p-4 ${!isLocked ? 'cursor-pointer hover:bg-gray-800/50' : ''} transition-colors flex items-center justify-between`}
//                 onClick={() => toggleLesson(lesson.slug, lesson.level)}
//               >
//                 <div className="flex items-center gap-2">
//                   {isLocked ? (
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     openLessons[lesson.slug] ? 
//                       <ChevronUp className="h-5 w-5 text-gray-400" /> : 
//                       <ChevronDown className="h-5 w-5 text-gray-400" />
//                   )}
//                   <span className="text-lg">{lesson.title}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className={`px-3 py-1 rounded-lg text-sm ${
//                     isLocked ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
//                   }`}>
//                     Level {lesson.level}
//                   </span>
//                   <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
//                     {lesson.points} Points
//                   </span>
//                 </div>
//               </div>

//               {openLessons[lesson.slug] && lesson.lessons && !isLocked && (
//                 <div className="p-4 pt-0">
//                   <div className="space-y-2">
//                     {lesson.lessons.map((subLesson) => (
//                       <Link
//                         key={subLesson.slug}
//                         href={`/modules/phishing-awareness/${lesson.slug}/${subLesson.slug}`}
//                         className="flex items-center justify-between p-3 bg-[#050607] border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span 
//                             onClick={(e) => { 
//                               e.preventDefault(); 
//                               toggleCompletion(subLesson.slug, lesson.level); 
//                             }} 
//                             className="cursor-pointer"
//                           >
//                             {completedLessons[subLesson.slug] ? 
//                               <CheckCircle2 className="h-5 w-5 text-green-400" /> : 
//                               <Circle className="h-5 w-5 text-gray-400" />
//                             }
//                           </span>
//                           <span className="text-gray-200">{subLesson.title}</span>
//                         </div>
//                         <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
//                           {subLesson.points} Points
//                         </span>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default PhishingAwarenessPage;


// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft, Lock, ArrowRight } from "lucide-react";

// const PhishingAwarenessPage = () => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
//     'phishing-introduction': false,
//     'detecting-phishing': false,
//     'preventing-phishing': false,
//     'responding-to-phishing': false,
//     'spear-phishing': false,
//   });

//   // Track unlocked status for each level
//   const [unlockedLevels, setUnlockedLevels] = useState<{ [key: number]: boolean }>({
//     1: true, // First level starts unlocked
//     2: false,
//     3: false,
//     4: false,
//     5: false,
//   });

//   const subLessons = [
//     { 
//       slug: 'phishing-introduction', 
//       title: 'Introduction', 
//       level: 1, 
//       points: 10,
//       description: 'Learn the basics of phishing attacks and their history.',
//       nextLesson: 'detecting-phishing'
//     },
//     { 
//       slug: 'detecting-phishing', 
//       title: 'Detecting Phishing Emails', 
//       level: 2, 
//       points: 15,
//       description: 'Master the skills to identify suspicious emails and links.',
//       nextLesson: 'preventing-phishing'
//     },
//     { 
//       slug: 'preventing-phishing', 
//       title: 'Preventing Phishing Attacks', 
//       level: 3, 
//       points: 20,
//       description: 'Learn essential prevention techniques and best practices.',
//       nextLesson: 'responding-to-phishing'
//     },
//     { 
//       slug: 'responding-to-phishing', 
//       title: 'Responding to Phishing Incidents', 
//       level: 4, 
//       points: 25,
//       description: 'Understand how to properly handle and report phishing attempts.',
//       nextLesson: 'spear-phishing'
//     },
//     { 
//       slug: 'spear-phishing', 
//       title: 'Spear Phishing Attacks', 
//       level: 5, 
//       points: 30,
//       description: 'Advanced techniques for handling targeted phishing attacks.',
//       nextLesson: null
//     },
//   ];

//   const toggleLesson = (slug: string, level: number) => {
//     if (!unlockedLevels[level]) return;
//     setOpenLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   const completeLesson = (slug: string, level: number) => {
//     setCompletedLessons(prevState => ({
//       ...prevState,
//       [slug]: true
//     }));

//     // Unlock next level
//     setUnlockedLevels(prevState => ({
//       ...prevState,
//       [level + 1]: true
//     }));
//   };

//   const getNextLesson = (currentSlug: string) => {
//     const currentLesson = subLessons.find(lesson => lesson.slug === currentSlug);
//     if (currentLesson?.nextLesson) {
//       const nextLesson = subLessons.find(lesson => lesson.slug === currentLesson.nextLesson);
//       return nextLesson;
//     }
//     return null;
//   };

//   // Helper function to check if a level should be locked
//   const isLevelLocked = (level: number) => !unlockedLevels[level];

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6">
//       <div className="flex items-center mb-6">
//       </div>

//       <div className="border-b border-gray-800 pb-6 mb-8">
//         <div className="flex">
//           <Link 
//             className="text-gray-400 mb-4 mr-2 hover:bg-slate-200 border px-2 rounded-lg hover:text-gray-900 transition-colors flex items-center" 
//             href="/modules"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </Link>
//           <h1 className="text-2xl font-base text-white mb-4">Phishing Awareness</h1>
//         </div>
        
//         <div className="flex space-x-3 mb-4">
//           <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm">Public</span>
//           <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">Beginner</span>
//           <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">100 Points</span>
//         </div>

//         <div className="flex justify-between items-start mb-6">
//           <p className="text-gray-400 text-sm max-w-xl">
//             These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. 
//             Learn practical techniques to protect yourself and your organization from digital threats.
//           </p>
//         </div>

//         <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
//           <Cable className="h-5 w-5" />
//           Resume
//         </button>
//       </div>

//       <div className="space-y-4">
//         {subLessons.map((lesson) => {
//           const isLocked = isLevelLocked(lesson.level);
//           const isCompleted = completedLessons[lesson.slug];
//           const nextLesson = getNextLesson(lesson.slug);

//           return (
//             <div 
//               key={lesson.slug} 
//               className={`bg-[#050607] border border-gray-800 rounded-lg ${isLocked ? 'opacity-75' : ''}`}
//             >
//               <div
//                 className={`p-6 ${!isLocked ? 'cursor-pointer hover:bg-gray-800/50' : ''} transition-colors`}
//                 onClick={() => !isLocked && toggleLesson(lesson.slug, lesson.level)}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center gap-3">
//                     {isLocked ? (
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     ) : isCompleted ? (
//                       <CheckCircle2 className="h-5 w-5 text-green-400" />
//                     ) : (
//                       <Circle className="h-5 w-5 text-gray-400" />
//                     )}
//                     <span className="text-lg">{lesson.title}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className={`px-3 py-1 rounded-lg text-sm ${
//                       isLocked ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
//                     }`}>
//                       Level {lesson.level}
//                     </span>
//                     <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
//                       {lesson.points} Points
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-gray-400 text-sm ml-8">{lesson.description}</p>

//                 {!isLocked && (
//                   <div className="flex justify-end mt-4">
//                     {!isCompleted && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           completeLesson(lesson.slug, lesson.level);
//                         }}
//                         className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors px-4 py-2 rounded-lg"
//                       >
//                         Complete Lesson
//                       </button>
//                     )}
//                     {isCompleted && nextLesson && !isLevelLocked(nextLesson.level) && (
//                       <Link
//                         href={`/modules/phishing-awareness/${nextLesson.slug}`}
//                         className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2"
//                       >
//                         Next Lesson
//                         <ArrowRight className="h-4 w-4" />
//                       </Link>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default PhishingAwarenessPage;


'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bug, Cable, Circle, CheckCircle2, ChevronLeft, Lock, ArrowRight } from "lucide-react";

const PhishingAwarenessPage = () => {
  const router = useRouter();
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
    'phishing-introduction': false,
    'detecting-phishing': false,
    'preventing-phishing': false,
    'responding-to-phishing': false,
    'spear-phishing': false,
  });

  const [unlockedLevels, setUnlockedLevels] = useState<{ [key: number]: boolean }>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const subLessons = [
    { 
      slug: 'phishing-introduction', 
      title: 'Introduction', 
      level: 1, 
      points: 10,
      description: 'Learn the basics of phishing attacks and their history.',
      nextLesson: 'detecting-phishing'
    },
    { 
      slug: 'detecting-phishing', 
      title: 'Detecting Phishing Emails', 
      level: 2, 
      points: 15,
      description: 'Master the skills to identify suspicious emails and links.',
      nextLesson: 'preventing-phishing'
    },
    { 
      slug: 'preventing-phishing', 
      title: 'Preventing Phishing Attacks', 
      level: 3, 
      points: 20,
      description: 'Learn essential prevention techniques and best practices.',
      nextLesson: 'responding-to-phishing'
    },
    { 
      slug: 'responding-to-phishing', 
      title: 'Responding to Phishing Incidents', 
      level: 4, 
      points: 25,
      description: 'Understand how to properly handle and report phishing attempts.',
      nextLesson: 'spear-phishing'
    },
    { 
      slug: 'spear-phishing', 
      title: 'Spear Phishing Attacks', 
      level: 5, 
      points: 30,
      description: 'Advanced techniques for handling targeted phishing attacks.',
      nextLesson: null
    },
  ];

  const completeLesson = (e: React.MouseEvent, slug: string, level: number) => {
    e.stopPropagation();
    setCompletedLessons(prevState => ({
      ...prevState,
      [slug]: true
    }));

    setUnlockedLevels(prevState => ({
      ...prevState,
      [level + 1]: true
    }));
  };

  const navigateToLesson = (slug: string, isLocked: boolean) => {
    if (!isLocked) {
      router.push(`/modules/phishing-awareness/${slug}`);
    }
  };

  const isLevelLocked = (level: number) => !unlockedLevels[level];

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
      <div className="border-b border-gray-800 pb-6 mb-8">
        <div className="flex">
          <Link 
            className="text-gray-400 mb-4 mr-2 hover:bg-slate-200 border px-2 py-1 rounded-lg hover:text-gray-900 transition-colors flex items-center" 
            href="/modules"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-base text-white mb-4">Phishing Awareness</h1>
        </div>
        
        <div className="flex space-x-3 mb-4">
          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm">Public</span>
          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-sm">Beginner</span>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">100 Points</span>
        </div>

        <div className="flex justify-between items-start mb-6">
          <p className="text-gray-400 text-sm max-w-xl">
            These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. 
            Learn practical techniques to protect yourself and your organization from digital threats.
          </p>
        </div>

        <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
          <Cable className="h-5 w-5" />
          Resume
        </button>
      </div>

      <div className="space-y-4">
        {subLessons.map((lesson) => {
          const isLocked = isLevelLocked(lesson.level);
          const isCompleted = completedLessons[lesson.slug];

          return (
            <div 
              key={lesson.slug} 
              onClick={() => navigateToLesson(lesson.slug, isLocked)}
              className={`bg-[#050607] border border-gray-800 rounded-lg ${
                isLocked ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:border-gray-700 hover:bg-gray-800/50'
              } transition-all`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {isLocked ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="text-lg">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-sm ${
                      isLocked ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      Level {lesson.level}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                      {lesson.points} Points
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm ml-8">{lesson.description}</p>

                {!isLocked && (
                  <div className="flex justify-end mt-4">
                    {!isCompleted ? (
                      <button
                        onClick={(e) => completeLesson(e, lesson.slug, lesson.level)}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors px-4 py-2 rounded-lg"
                      >
                        Complete Lesson
                      </button>
                    ) : lesson.nextLesson && !isLevelLocked(lesson.level + 1) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/modules/phishing-awareness/${lesson.nextLesson}`);
                        }}
                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        Next Lesson
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhishingAwarenessPage;


// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CircleCheck } from "lucide-react";

// const PhishingAwarenessPage = () => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
//     'what-is-phishing': false,
//     'history-of-phishing': false,
//     'common-phishing-methods': false,
//     'phishing-signs': false,
//     'analyzing-links': false,
//     'email-security': false,
//     'multi-factor-authentication': false,
//     'incident-response': false,
//     'reporting-phishing': false,
//     'targeted-attacks': false,
//     'defending-against-spear-phishing': false,
//   });

//   const subLessons = [
//     { slug: 'phishing-introduction', title: 'Introduction', level: 1, points: 10, lessons: [
//       { slug: 'what-is-phishing', title: 'What is Phishing?', points: 5 },
//       { slug: 'history-of-phishing', title: 'History of Phishing', points: 5 },
//       { slug: 'common-phishing-methods', title: 'Common Phishing Methods', points: 10 },
//     ] },
//     { slug: 'detecting-phishing', title: 'Detecting Phishing Emails', level: 2, points: 15, lessons: [
//       { slug: 'phishing-signs', title: 'Signs of Phishing Emails', points: 7 },
//       { slug: 'analyzing-links', title: 'Analyzing Suspicious Links', points: 8 },
//     ] },
//     { slug: 'preventing-phishing', title: 'Preventing Phishing Attacks', level: 3, points: 20, lessons: [
//       { slug: 'email-security', title: 'Email Security Best Practices', points: 10 },
//       { slug: 'multi-factor-authentication', title: 'Using Multi-Factor Authentication', points: 10 },
//     ] },
//     { slug: 'responding-to-phishing', title: 'Responding to Phishing Incidents', level: 4, points: 25, lessons: [
//       { slug: 'incident-response', title: 'Incident Response Steps', points: 12 },
//       { slug: 'reporting-phishing', title: 'Reporting Phishing Attacks', points: 13 },
//     ] },
//     { slug: 'spear-phishing', title: 'Spear Phishing Attacks', level: 5, points: 30, lessons: [
//       { slug: 'targeted-attacks', title: 'Understanding Targeted Attacks', points: 15 },
//       { slug: 'defending-against-spear-phishing', title: 'Defending Against Spear Phishing', points: 15 },
//     ] },
//   ];

//   const toggleLesson = (slug: string) => {
//     setOpenLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   const toggleCompletion = (slug: string) => {
//     setCompletedLessons(prevState => ({
//       ...prevState,
//       [slug]: !prevState[slug],
//     }));
//   };

//   return (
//     <div className="min-h-screen p-4 bg-custom-radial">
//       <div className="border-b my-10 mx-6">
//         <h1 className="text-3xl">Phishing Awareness</h1>
//         <div className="flex space-x-2 mt-3 text-sm">
//           <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
//           <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">Beginner</span>
//           <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">100 Points</span>
//         </div>
//         <div className="flex justify-between items-start">
//           <p className="text-[17px] text-gray-400 my-4 w-1/3">
//             These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. Learn practical techniques to protect yourself and your organization from digital threats.
//           </p>
//         </div>
//         <div>
//           <button className='bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]'><Cable className='inline'/> RESUME</button>
//         </div>
        
//       </div>
//       <ul className="space-y-4">
//         {subLessons.map((lesson) => (
//           <li key={lesson.slug} className="bg-transparent p-4 mx-10 mt-10 border rounded-lg shadow-md">
//             <div
//               className="cursor-pointer text-xl text-gray-400 hover:text-white transition-colors flex items-center justify-between"
//               onClick={() => toggleLesson(lesson.slug)}
//             >
//               <div className="flex items-center">
//                 <span className="mr-2">{openLessons[lesson.slug] ? <ChevronUp /> : <ChevronDown />}</span>
//                 {lesson.title}
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">Level {lesson.level}</span>
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">{lesson.points} Points</span>
//               </div>
//             </div>
//             {openLessons[lesson.slug] && lesson.lessons && (
//               <ul className="mt-4 space-y-2 ml-4">
//                 {lesson.lessons.map((subLesson) => (
//                   <li key={subLesson.slug} className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <span onClick={() => toggleCompletion(subLesson.slug)} className="mr-2 cursor-pointer">
//                         {completedLessons[subLesson.slug] ? <CircleCheck className="text-green-600" /> : <Circle className="text-gray-500" />}
//                       </span>
//                       <Link
//                         href={`/modules/phishing-awareness/${lesson.slug}/${subLesson.slug}`}
//                         className="text-lg text-gray-400 hover:text-white transition-colors"
//                       >
//                         {subLesson.title}
//                       </Link>
//                     </div>
//                     <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">{subLesson.points} Points</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PhishingAwarenessPage;
