// import { GetServerSideProps } from 'next';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabaseClient'; // Make sure you have this Supabase client setup

// export const getServerSideProps: GetServerSideProps = async (context) => {
    
//   const { slugs } = context.params;
//   const moduleSlug = slugs[0]; // First part of URL is the module
//   const lessonSlug = slugs[1]; // Second part of URL is the lesson (optional)
//   const subLessonSlug = slugs[2]; // Third part of URL is the sub-lesson (optional)

//   // Fetch module, lesson, and sub-lesson data from Supabase based on the slug
//   const { data: moduleData, error: moduleError } = await supabase
//     .from('modules')
//     .select('*')
//     .eq('slug', moduleSlug)
//     .single(); // fetch module

//   if (moduleError || !moduleData) {
//     return { notFound: true };
//   }

//   let lessonData = null;
//   if (lessonSlug) {
//     const { data: lesson, error: lessonError } = await supabase
//       .from('lessons')
//       .select('*')
//       .eq('module_id', moduleData.id)
//       .eq('slug', lessonSlug)
//       .single(); // fetch lesson within the module

//     if (lessonError || !lesson) {
//       return { notFound: true };
//     }
//     lessonData = lesson;
//   }

//   let subLessonData = null;
//   if (subLessonSlug) {
//     const { data: subLesson, error: subLessonError } = await supabase
//       .from('sub_lessons')
//       .select('*')
//       .eq('lesson_id', lessonData?.id)
//       .eq('slug', subLessonSlug)
//       .single(); // fetch sub-lesson within the lesson

//     if (subLessonError || !subLesson) {
//       return { notFound: true };
//     }
//     subLessonData = subLesson;
//   }

//   return {
//     props: {
//       moduleData,
//       lessonData,
//       subLessonData,
//     },
//   };
// };

// const DynamicModulePage = ({ moduleData, lessonData, subLessonData }) => {
//   const router = useRouter();

//   // Render loading state
//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   // UI for module
//   if (!lessonData && !subLessonData) {
//     return (
//       <div className="p-6 font-sans bg-black text-white min-h-screen">
//         <h1 className="text-4xl font-bold mb-4">{moduleData.title}</h1>
//         <p className="text-lg text-gray-400">{moduleData.description}</p>
//         <div className="mt-4">
//           {moduleData.tags.map((tag, index) => (
//             <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-lg mr-2">
//               {tag}
//             </span>
//           ))}
//         </div>
//         <div className="mt-8">
//           <h2 className="text-2xl">Lessons in this module:</h2>
//           <ul>
//             {moduleData.lessons.map((lesson) => (
//               <li key={lesson.slug}>
//                 <Link href={`/modules/${moduleData.slug}/${lesson.slug}`}>{lesson.title}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }

//   // UI for lesson
//   if (lessonData && !subLessonData) {
//     return (
//       <div className="p-6 font-sans bg-black text-white min-h-screen">
//         <h1 className="text-4xl font-bold mb-4">{lessonData.title}</h1>
//         <p className="text-lg text-gray-400">{lessonData.description}</p>
//         <div className="mt-4">
//           <Link href={`/modules/${moduleData.slug}`}>← Back to {moduleData.title}</Link>
//         </div>
//       </div>
//     );
//   }

//   // UI for sub-lesson
//   if (subLessonData) {
//     return (
//       <div className="p-6 font-sans bg-black text-white min-h-screen">
//         <h1 className="text-4xl font-bold mb-4">{subLessonData.title}</h1>
//         <p className="text-lg text-gray-400">{subLessonData.content}</p>
//         <div className="mt-4">
//           <Link href={`/modules/${moduleData.slug}/${lessonData.slug}`}>← Back to {lessonData.title}</Link>
//         </div>
//       </div>
//     );
//   }
// };

// export default DynamicModulePage;

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import ModulePage from './module/page'; // Generalized ModulePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slugs } = context.params;
  const moduleSlug = slugs[0]; // First part of URL is the module
  const lessonSlug = slugs[1]; // Second part of URL is the lesson (optional)
  const subLessonSlug = slugs[2]; // Third part of URL is the sub-lesson (optional)

  // Fetch module data
  const { data: moduleData, error: moduleError } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', moduleSlug)
    .single();

  if (moduleError || !moduleData) {
    return { notFound: true };
  }

  // Fetch lessons for the module
  const { data: lessonsData, error: lessonsError } = await supabase
    .from('lessons')
    .select('*, sub_lessons(*)') // Also fetch sub-lessons
    .eq('module_id', moduleData.id);

  if (lessonsError || !lessonsData) {
    return { notFound: true };
  }

  return {
    props: {
      moduleData,
      lessonsData,
    },
  };
};

const DynamicModulePage = ({ moduleData, lessonsData }) => {
  const router = useRouter();

  // Render loading state
  if (router.isFallback) {
    return <div>Loadingssss...</div>;
  }

  return <ModulePage moduleData={moduleData} lessonsData={lessonsData} />;
};

export default DynamicModulePage;
