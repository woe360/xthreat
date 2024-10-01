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


'use client';

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




import React, { useState } from 'react';
import Link from 'next/link';
import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
};

const PhishingAwarenessPage = () => {
  const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({
    'what-is-phishing': false,
    'history-of-phishing': false,
    'common-phishing-methods': false,
    'phishing-signs': false,
    'analyzing-links': false,
    'email-security': false,
    'multi-factor-authentication': false,
    'incident-response': false,
    'reporting-phishing': false,
    'targeted-attacks': false,
    'defending-against-spear-phishing': false,
  });

  const subLessons = [
    { slug: 'phishing-introduction', title: 'Introduction', level: 1, points: 10, lessons: [
      { slug: 'what-is-phishing', title: 'What is Phishing?', points: 5 },
      { slug: 'history-of-phishing', title: 'History of Phishing', points: 5 },
      { slug: 'common-phishing-methods', title: 'Common Phishing Methods', points: 10 },
    ] },
    { slug: 'detecting-phishing', title: 'Detecting Phishing Emails', level: 2, points: 15, lessons: [
      { slug: 'phishing-signs', title: 'Signs of Phishing Emails', points: 7 },
      { slug: 'analyzing-links', title: 'Analyzing Suspicious Links', points: 8 },
    ] },
    { slug: 'preventing-phishing', title: 'Preventing Phishing Attacks', level: 3, points: 20, lessons: [
      { slug: 'email-security', title: 'Email Security Best Practices', points: 10 },
      { slug: 'multi-factor-authentication', title: 'Using Multi-Factor Authentication', points: 10 },
    ] },
    { slug: 'responding-to-phishing', title: 'Responding to Phishing Incidents', level: 4, points: 25, lessons: [
      { slug: 'incident-response', title: 'Incident Response Steps', points: 12 },
      { slug: 'reporting-phishing', title: 'Reporting Phishing Attacks', points: 13 },
    ] },
    { slug: 'spear-phishing', title: 'Spear Phishing Attacks', level: 5, points: 30, lessons: [
      { slug: 'targeted-attacks', title: 'Understanding Targeted Attacks', points: 15 },
      { slug: 'defending-against-spear-phishing', title: 'Defending Against Spear Phishing', points: 15 },
    ] },
  ];

  const toggleLesson = (slug: string) => {
    setOpenLessons(prevState => ({
      ...prevState,
      [slug]: !prevState[slug],
    }));
  };

  const toggleCompletion = (slug: string) => {
    setCompletedLessons(prevState => ({
      ...prevState,
      [slug]: !prevState[slug],
    }));
  };

  return (
    <div className="min-h-screen p-4 bg-custom-radial">
      <div className="flex justify-between items-center">
        <Link className="text-gray-400 ml-5 mt-5 hover:text-white transition flex items-center" href="/modules">
        <ChevronLeft/> Back
        </Link>
      </div>
      <div className="border-b my-6 mx-6">
        <h1 className="text-3xl">Phishing Awareness</h1>
        <div className="flex space-x-2 mt-3 text-sm">
          <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
          <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">Beginner</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">100 Points</span>
        </div>
        <div className="flex justify-between items-start">
          <p className="text-[17px] text-gray-400 my-4 w-1/3">
            These lessons equip you with essential skills to identify, prevent, and respond to phishing attacks. Learn practical techniques to protect yourself and your organization from digital threats.
          </p>
        </div>
        <div>
          <button className='bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]'><Cable className='inline'/> RESUME</button>
        </div>
      </div>
      <ul className="space-y-6">
        {subLessons.map((lesson) => (
          <li key={lesson.slug} className="bg-gray-800 p-4 mx-10 rounded-lg shadow-md" style={componentStyle}>
            <div
              className="cursor-pointer text-xl text-gray-300 hover:text-white transition-colors flex items-center justify-between"
              onClick={() => toggleLesson(lesson.slug)}
            >
              <div className="flex items-center">
                <span className="mr-2">{openLessons[lesson.slug] ? <ChevronUp /> : <ChevronDown />}</span>
                {lesson.title}
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">Level {lesson.level}</span>
                <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">{lesson.points} Points</span>
              </div>
            </div>
            {openLessons[lesson.slug] && lesson.lessons && (
              <ul className="mt-4 space-y-2">
                {lesson.lessons.map((subLesson) => (
                  <li key={subLesson.slug} className="bg-gray-700 rounded-md overflow-hidden">
                    <Link
                      href={`/modules/phishing-awareness/${lesson.slug}/${subLesson.slug}`}
                      className="flex items-center justify-between py-3 px-4 hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <span onClick={(e) => { e.preventDefault(); toggleCompletion(subLesson.slug); }} className="mr-3 cursor-pointer">
                          {completedLessons[subLesson.slug] ? 
                            <CheckCircle2 className="text-green-500 w-5 h-5" /> : 
                            <Circle className="text-gray-400 w-5 h-5" />
                          }
                        </span>
                        <span className="text-base text-gray-200 hover:text-white transition-colors">
                          {subLesson.title}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm bg-gray-800 px-2 py-1 rounded-full">
                        {subLesson.points} Points
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
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
