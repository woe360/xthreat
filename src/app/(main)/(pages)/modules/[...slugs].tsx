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




// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import { supabase } from '@/lib/supabaseClient';
// import ModulePage from './module/page'; // Generalized ModulePage

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { slugs } = context.params;
//   const moduleSlug = slugs[0]; // First part of URL is the module
//   const lessonSlug = slugs[1]; // Second part of URL is the lesson (optional)
//   const subLessonSlug = slugs[2]; // Third part of URL is the sub-lesson (optional)

//   // Fetch module data
//   const { data: moduleData, error: moduleError } = await supabase
//     .from('modules')
//     .select('*')
//     .eq('slug', moduleSlug)
//     .single();

//   if (moduleError || !moduleData) {
//     return { notFound: true };
//   }

//   // Fetch lessons for the module
//   const { data: lessonsData, error: lessonsError } = await supabase
//     .from('lessons')
//     .select('*, sub_lessons(*)') // Also fetch sub-lessons
//     .eq('module_id', moduleData.id);

//   if (lessonsError || !lessonsData) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       moduleData,
//       lessonsData,
//     },
//   };
// };

// const DynamicModulePage = ({ moduleData, lessonsData }) => {
//   const router = useRouter();

//   // Render loading state
//   if (router.isFallback) {
//     return <div>Loadingssss...</div>;
//   }

//   return <ModulePage moduleData={moduleData} lessonsData={lessonsData} />;
// };

// export default DynamicModulePage;

'use client'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Lock } from 'lucide-react';

interface SubLesson {
  id: number;
  title: string;
  content: string;
  order: number;
  lesson_id: number;
  created_at: string;
  updated_at: string;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  module_id: number;
  order: number;
  created_at: string;
  updated_at: string;
  sub_lessons: SubLesson[];
}

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  moduleData: Module;
  lessonsData: Lesson[];
}

interface ModulePageProps {
  moduleData: Module;
  lessonsData: Lesson[];
}

const ModulePage: React.FC<ModulePageProps> = ({ moduleData, lessonsData }) => {
  const router = useRouter();

  const handleLessonClick = (lessonId: number) => {
    router.push(`/modules/${moduleData.slug}/${lessonId}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-gray-900/20 via-transparent to-gray-900/20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Module Header */}
        <Card className="border-gray-700 bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl text-neutral-200">{moduleData.title}</CardTitle>
            <CardDescription className="text-neutral-400">
              {moduleData.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={33} className="h-2" />
            <p className="text-sm text-neutral-400 mt-2">33% Complete</p>
          </CardContent>
        </Card>

        {/* Lessons List */}
        <div className="grid gap-4">
          {lessonsData.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className="border-gray-700 bg-transparent transition-colors hover:bg-gray-800/50 cursor-pointer"
              onClick={() => handleLessonClick(lesson.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-gray-800">
                      {index === 0 ? (
                        <BookOpen className="w-5 h-5 text-blue-400" />
                      ) : index < 3 ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg text-neutral-200">{lesson.title}</CardTitle>
                      <CardDescription className="text-neutral-400">
                        {lesson.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-sm text-neutral-400">
                    {lesson.sub_lessons.length} sub-lessons
                  </div>
                </div>
              </CardHeader>
              {lesson.sub_lessons.length > 0 && (
                <CardContent>
                  <div className="pl-14 space-y-2">
                    {lesson.sub_lessons.map((subLesson) => (
                      <div 
                        key={subLesson.id}
                        className="flex items-center justify-between text-sm text-neutral-400 hover:text-neutral-200"
                      >
                        <span>{subLesson.title}</span>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const slugs = context.params?.slugs;
  
  if (!slugs || !Array.isArray(slugs)) {
    return { notFound: true };
  }

  const moduleSlug = slugs[0];
  const lessonSlug = slugs[1];
  const subLessonSlug = slugs[2];

  const { data: moduleData, error: moduleError } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', moduleSlug)
    .single();

  if (moduleError || !moduleData) {
    return { notFound: true };
  }

  const { data: lessonsData, error: lessonsError } = await supabase
    .from('lessons')
    .select('*, sub_lessons(*)')
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

const DynamicModulePage: React.FC<PageProps> = ({ moduleData, lessonsData }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <ModulePage moduleData={moduleData} lessonsData={lessonsData} />;
};

export default DynamicModulePage;