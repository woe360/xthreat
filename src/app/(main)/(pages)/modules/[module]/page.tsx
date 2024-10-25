// modules/[module]/page.tsx

// 'use client'
// import { useEffect, useState } from 'react';

// interface ModulePageProps {
//   params: {
//     module: string;  // this matches the dynamic folder [module]
//   };
// }

// const ModulePage = ({ params }: ModulePageProps) => {
//   const { module } = params; // Destructure the module slug from params

//   const [moduleData, setModuleData] = useState(null);

//   useEffect(() => {
//     const fetchModuleData = async () => {
//       try {
//         const response = await fetch(`/api/modules/${module}`);
//         const data = await response.json();
//         setModuleData(data);
//       } catch (error) {
//         console.error('Error fetching module:', error);
//       }
//     };

//     fetchModuleData();
//   }, [module]);

//   if (!moduleData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{moduleData.title}</h1>
//       <p>{moduleData.description}</p>
//     </div>
//   );
// };

// export default ModulePage;


// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
// };

// const DynamicModulePage = () => {
//   const { module } = useParams(); // Get the module slug from the URL
//   const [moduleData, setModuleData] = useState<any>(null);
//   const [lessons, setLessons] = useState<any[]>([]);
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});

//   // Fetch module data and associated lessons
//   useEffect(() => {
//     const fetchModuleData = async () => {
//       try {
//         // Fetch module data by slug
//         const moduleRes = await fetch(`http://localhost:5000/api/modules/${module}`);
//         const moduleData = await moduleRes.json();

//         // Fetch lessons for the module
//         const lessonsRes = await fetch(`http://localhost:5000/api/modules/${module}/lessons`);
//         const lessonsData = await lessonsRes.json();

//         setModuleData(moduleData);
//         setLessons(lessonsData);

//         // Prepare the completedLessons state based on the lesson slugs
//         const completedLessonsState = {};
//         lessonsData.forEach((lesson) => {
//           completedLessonsState[lesson.slug] = false; // Assume all lessons are incomplete by default
//         });
//         setCompletedLessons(completedLessonsState);

//       } catch (error) {
//         console.error('Error fetching module or lessons data:', error);
//       }
//     };

//     if (module) {
//       fetchModuleData();
//     }
//   }, [module]);

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

//   if (!moduleData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen p-4 bg-custom-radial">
//       <div className="flex justify-between items-center">
//         <Link className="text-gray-400 ml-5 mt-5 hover:text-white transition flex items-center" href="/modules">
//           <ChevronLeft /> Back
//         </Link>
//       </div>
//       <div className="border-b my-6 mx-6">
//         <h1 className="text-3xl">{moduleData.title}</h1>
//         <div className="flex space-x-2 mt-3 text-sm">
//           <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
//           <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">Beginner</span>
//           <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">{moduleData.points} Points</span>
//         </div>
//         <div className="flex justify-between items-start">
//           <p className="text-[17px] text-gray-400 my-4 w-1/3">
//             {moduleData.description}
//           </p>
//         </div>
//         <div>
//           <button className='bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]'>
//             <Cable className='inline' /> RESUME
//           </button>
//         </div>
//       </div>
//       <ul className="space-y-6">
//         {lessons.map((lesson) => (
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
//             {openLessons[lesson.slug] && (
//               <ul className="mt-4 space-y-2">
//                 {/* Assume lesson has sub-lessons (topics) */}
//                 {lesson.topics?.map((subLesson) => (
//                   <li key={subLesson.slug} className="bg-gray-700 rounded-md overflow-hidden">
//                     <Link
//                       href={`/modules/${module}/${lesson.slug}/${subLesson.slug}`}
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

// export default DynamicModulePage;


//adding types
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";

// Define interfaces for our data structures
interface Topic {
  slug: string;
  title: string;
  points: number;
}

interface Lesson {
  slug: string;
  title: string;
  level: number;
  points: number;
  topics?: Topic[];
}

interface Module {
  title: string;
  description: string;
  points: number;
}

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
};

const DynamicModulePage = () => {
  const { module } = useParams(); // Get the module slug from the URL
  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});

  // Fetch module data and associated lessons
  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        // Fetch module data by slug
        const moduleRes = await fetch(`http://localhost:5000/api/modules/${module}`);
        const moduleData: Module = await moduleRes.json();

        // Fetch lessons for the module
        const lessonsRes = await fetch(`http://localhost:5000/api/modules/${module}/lessons`);
        const lessonsData: Lesson[] = await lessonsRes.json();

        setModuleData(moduleData);
        setLessons(lessonsData);

        // Prepare the completedLessons state based on the lesson slugs
        const completedLessonsState: { [key: string]: boolean } = {};
        lessonsData.forEach((lesson: Lesson) => {
          completedLessonsState[lesson.slug] = false; // Assume all lessons are incomplete by default
        });
        setCompletedLessons(completedLessonsState);

      } catch (error) {
        console.error('Error fetching module or lessons data:', error);
      }
    };

    if (module) {
      fetchModuleData();
    }
  }, [module]);

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

  if (!moduleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-custom-radial">
      <div className="flex justify-between items-center">
        <Link className="text-gray-400 ml-5 mt-5 hover:text-white transition flex items-center" href="/modules">
          <ChevronLeft /> Back
        </Link>
      </div>
      <div className="border-b my-6 mx-6">
        <h1 className="text-3xl">{moduleData.title}</h1>
        <div className="flex space-x-2 mt-3 text-sm">
          <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
          <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">Beginner</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">{moduleData.points} Points</span>
        </div>
        <div className="flex justify-between items-start">
          <p className="text-[17px] text-gray-400 my-4 w-1/3">
            {moduleData.description}
          </p>
        </div>
        <div>
          <button className='bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]'>
            <Cable className='inline' /> RESUME
          </button>
        </div>
      </div>
      <ul className="space-y-6">
        {lessons.map((lesson) => (
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
            {openLessons[lesson.slug] && (
              <ul className="mt-4 space-y-2">
                {lesson.topics?.map((subLesson) => (
                  <li key={subLesson.slug} className="bg-gray-700 rounded-md overflow-hidden">
                    <Link
                      href={`/modules/${module}/${lesson.slug}/${subLesson.slug}`}
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

export default DynamicModulePage;