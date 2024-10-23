// 'use client'
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const ModulePage = ({ moduleData, lessonsData }) => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});

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
//           <ChevronLeft /> Back
//         </Link>
//       </div>
//       <div className="border-b my-6 mx-6">
//         <h1 className="text-3xl">{moduleData.title}</h1>
//         <div className="flex space-x-2 mt-3 text-sm">
//           <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">Public</span>
//           <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">{moduleData.level}</span>
//           <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">{moduleData.points} Points</span>
//         </div>
//         <div className="flex justify-between items-start">
//           <p className="text-[17px] text-gray-400 my-4 w-1/3">
//             {moduleData.description}
//           </p>
//         </div>
//         <div>
//           <button className="bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]">
//             <Cable className="inline" /> RESUME
//           </button>
//         </div>
//       </div>
//       <ul className="space-y-6">
//         {lessonsData.map((lesson) => (
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
//             {openLessons[lesson.slug] && lesson.subLessons && (
//               <ul className="mt-4 space-y-2">
//                 {lesson.subLessons.map((subLesson) => (
//                   <li key={subLesson.slug} className="bg-gray-700 rounded-md overflow-hidden">
//                     <Link
//                       href={`/modules/${moduleData.slug}/${lesson.slug}/${subLesson.slug}`}
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

// export default ModulePage;




// 'use client'
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";

// // Define interfaces for the data structures
// interface SubLesson {
//   slug: string;
//   title: string;
//   points: number;
// }

// interface Lesson {
//   slug: string;
//   title: string;
//   level: number;
//   points: number;
//   subLessons?: SubLesson[];
// }

// interface Module {
//   title: string;
//   slug: string;
//   level: string;
//   points: number;
//   description: string;
// }

// interface ModulePageProps {
//   moduleData: Module;
//   lessonsData: Lesson[];
// }

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const ModulePage: React.FC<ModulePageProps> = ({ moduleData, lessonsData }) => {
//   const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
//   const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});

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
//         <Link 
//           className="text-gray-400 ml-5 mt-5 hover:text-white transition flex items-center" 
//           href="/modules"
//         >
//           <ChevronLeft /> Back
//         </Link>
//       </div>
      
//       <div className="border-b my-6 mx-6">
//         <h1 className="text-3xl">{moduleData.title}</h1>
//         <div className="flex space-x-2 mt-3 text-sm">
//           <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">
//             Public
//           </span>
//           <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">
//             {moduleData.level}
//           </span>
//           <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">
//             {moduleData.points} Points
//           </span>
//         </div>
        
//         <div className="flex justify-between items-start">
//           <p className="text-[17px] text-gray-400 my-4 w-1/3">
//             {moduleData.description}
//           </p>
//         </div>
        
//         <div>
//           <button className="bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]">
//             <Cable className="inline" /> RESUME
//           </button>
//         </div>
//       </div>

//       <ul className="space-y-6">
//         {lessonsData.map((lesson) => (
//           <li 
//             key={lesson.slug} 
//             className="bg-gray-800 p-4 mx-10 rounded-lg shadow-md" 
//             style={componentStyle}
//           >
//             <div
//               className="cursor-pointer text-xl text-gray-300 hover:text-white transition-colors flex items-center justify-between"
//               onClick={() => toggleLesson(lesson.slug)}
//             >
//               <div className="flex items-center">
//                 <span className="mr-2">
//                   {openLessons[lesson.slug] ? <ChevronUp /> : <ChevronDown />}
//                 </span>
//                 {lesson.title}
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">
//                   Level {lesson.level}
//                 </span>
//                 <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">
//                   {lesson.points} Points
//                 </span>
//               </div>
//             </div>

//             {openLessons[lesson.slug] && lesson.subLessons && (
//               <ul className="mt-4 space-y-2">
//                 {lesson.subLessons.map((subLesson) => (
//                   <li 
//                     key={subLesson.slug} 
//                     className="bg-gray-700 rounded-md overflow-hidden"
//                   >
//                     <Link
//                       href={`/modules/${moduleData.slug}/${lesson.slug}/${subLesson.slug}`}
//                       className="flex items-center justify-between py-3 px-4 hover:bg-gray-600 transition-colors duration-200"
//                     >
//                       <div className="flex items-center">
//                         <span 
//                           onClick={(e) => {
//                             e.preventDefault();
//                             toggleCompletion(subLesson.slug);
//                           }} 
//                           className="mr-3 cursor-pointer"
//                         >
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

// export default ModulePage;

'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bug, Cable, ChevronDown, ChevronUp, Circle, CheckCircle2, ChevronLeft } from "lucide-react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface SubLesson {
  slug: string;
  title: string;
  points: number;
}

interface Lesson {
  slug: string;
  title: string;
  level: number;
  points: number;
  subLessons?: SubLesson[];
}

interface Module {
  title: string;
  slug: string;
  level: string;
  points: number;
  description: string;
}

const componentStyle = {
  background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
};

const ModulePage = async ({ params }: { params: { moduleId: string } }) => {
  const supabase = createClientComponentClient();
  const [moduleData, setModuleData] = useState<Module | null>(null);
  const [lessonsData, setLessonsData] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openLessons, setOpenLessons] = useState<{ [key: string]: boolean }>({});
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch module data
        const { data: moduleResult, error: moduleError } = await supabase
          .from('modules')
          .select('*')
          .eq('slug', params.moduleId)
          .single();

        if (moduleError) throw moduleError;

        // Fetch lessons data
        const { data: lessonsResult, error: lessonsError } = await supabase
          .from('lessons')
          .select(`
            *,
            sub_lessons (*)
          `)
          .eq('module_id', moduleResult.id);

        if (lessonsError) throw lessonsError;

        // Transform the data
        const formattedModule: Module = {
          title: moduleResult.title,
          slug: moduleResult.slug,
          level: moduleResult.level,
          points: moduleResult.points,
          description: moduleResult.description,
        };

        const formattedLessons: Lesson[] = lessonsResult.map((lesson: any) => ({
          slug: lesson.slug,
          title: lesson.title,
          level: lesson.level,
          points: lesson.points,
          subLessons: lesson.sub_lessons?.map((sub: any) => ({
            slug: sub.slug,
            title: sub.title,
            points: sub.points,
          })),
        }));

        setModuleData(formattedModule);
        setLessonsData(formattedLessons);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [supabase, params.moduleId]);

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

  if (isLoading) {
    return <div className="min-h-screen p-4 bg-custom-radial">Loading...</div>;
  }

  if (error || !moduleData) {
    return <div className="min-h-screen p-4 bg-custom-radial">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-custom-radial">
      <div className="flex justify-between items-center">
        <Link 
          className="text-gray-400 ml-5 mt-5 hover:text-white transition flex items-center" 
          href="/modules"
        >
          <ChevronLeft /> Back
        </Link>
      </div>
      
      <div className="border-b my-6 mx-6">
        <h1 className="text-3xl">{moduleData.title}</h1>
        <div className="flex space-x-2 mt-3 text-sm">
          <span className="bg-transparent hover:bg-red-950 border text-white px-2 py-1 rounded-[5px]">
            Public
          </span>
          <span className="bg-yellow-600 text-black px-2 py-1 rounded-[5px]">
            {moduleData.level}
          </span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px]">
            {moduleData.points} Points
          </span>
        </div>
        
        <div className="flex justify-between items-start">
          <p className="text-[17px] text-gray-400 my-4 w-1/3">
            {moduleData.description}
          </p>
        </div>
        
        <div>
          <button className="bg-green-700 hover:bg-green-800 px-3 py-2 mb-6 rounded-[5px]">
            <Cable className="inline" /> RESUME
          </button>
        </div>
      </div>

      <ul className="space-y-6">
        {lessonsData.map((lesson) => (
          <li 
            key={lesson.slug} 
            className="bg-gray-800 p-4 mx-10 rounded-lg shadow-md" 
            style={componentStyle}
          >
            <div
              className="cursor-pointer text-xl text-gray-300 hover:text-white transition-colors flex items-center justify-between"
              onClick={() => toggleLesson(lesson.slug)}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  {openLessons[lesson.slug] ? <ChevronUp /> : <ChevronDown />}
                </span>
                {lesson.title}
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">
                  Level {lesson.level}
                </span>
                <span className="bg-gray-700 text-white px-2 py-1 rounded-[5px] text-sm">
                  {lesson.points} Points
                </span>
              </div>
            </div>

            {openLessons[lesson.slug] && lesson.subLessons && (
              <ul className="mt-4 space-y-2">
                {lesson.subLessons.map((subLesson) => (
                  <li 
                    key={subLesson.slug} 
                    className="bg-gray-700 rounded-md overflow-hidden"
                  >
                    <Link
                      href={`/modules/${moduleData.slug}/${lesson.slug}/${subLesson.slug}`}
                      className="flex items-center justify-between py-3 px-4 hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <span 
                          onClick={(e) => {
                            e.preventDefault();
                            toggleCompletion(subLesson.slug);
                          }} 
                          className="mr-3 cursor-pointer"
                        >
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

export default ModulePage;