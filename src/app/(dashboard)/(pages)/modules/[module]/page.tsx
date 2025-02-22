// 'use client'

// import React from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { BookOpen, CheckCircle, Lock, ChevronLeft, Circle, CheckCircle2, Cable, ArrowRight } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface SubLesson {
//   id: number;
//   title: string;
//   content: string;
//   order: number;
//   lesson_id: number;
// }

// interface Lesson {
//   id: number;
//   title: string;
//   description: string;
//   module_id: number;
//   points: number;
//   lesson_order: number;
//   level: 'E' | 'A' | 'M';  // Added level field
// }

// const DynamicModulePage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const [moduleData, setModuleData] = React.useState<any>(null);
//   const [lessons, setLessons] = React.useState<Lesson[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);
//   const [completedLessons, setCompletedLessons] = React.useState<{ [key: number]: boolean }>({});
//   const [unlockedLevels, setUnlockedLevels] = React.useState<{ [key: number]: boolean }>({});

//   // Helper function to get level badge styling
//   const getLevelBadgeStyle = (level: 'E' | 'A' | 'M') => {
//     switch (level) {
//       case 'E':
//         return 'bg-green-500/10 text-green-500';
//       case 'A':
//         return 'bg-orange-500/10 text-orange-500';
//       case 'M':
//         return 'bg-purple-500/10 text-purple-500';
//       default:
//         return 'bg-gray-500/10 text-gray-500';
//     }
//   };

//   // Helper function to get level text
//   const getLevelText = (level: 'E' | 'A' | 'M') => {
//     switch (level) {
//       case 'E':
//         return 'Essential';
//       case 'A':
//         return 'Advanced';
//       case 'M':
//         return 'Mixed';
//       default:
//         return 'Unknown';
//     }
//   };

//   React.useEffect(() => {
//     const fetchModuleData = async () => {
//       try {
//         setLoading(true);
//         const moduleRes = await fetch(`/api/modules/${params.module}`);
//         if (!moduleRes.ok) throw new Error('Failed to fetch module');
//         const moduleData = await moduleRes.json();
        
//         const lessonsRes = await fetch(`/api/modules/${params.module}/lessons`);
//         if (!lessonsRes.ok) throw new Error('Failed to fetch lessons');
//         const lessonsData = await lessonsRes.json();

//         // Initialize completion and unlock states
//         const initialCompletedState: { [key: number]: boolean } = {};
//         const initialUnlockedState: { [key: number]: boolean } = {};
//         lessonsData.forEach((lesson: Lesson, index: number) => {
//           initialCompletedState[lesson.id] = false;
//           initialUnlockedState[lesson.lesson_order] = index === 0;
//         });

//         setModuleData(moduleData);
//         setLessons(lessonsData);
//         setCompletedLessons(initialCompletedState);
//         setUnlockedLevels(initialUnlockedState);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.module) {
//       fetchModuleData();
//     }
//   }, [params.module]);

//   const completeLesson = (e: React.MouseEvent, lessonId: number, order: number) => {
//     e.stopPropagation();
//     setCompletedLessons(prev => ({
//       ...prev,
//       [lessonId]: true
//     }));
//     setUnlockedLevels(prev => ({
//       ...prev,
//       [order + 1]: true
//     }));
//   };

//   const isLevelLocked = (order: number) => !unlockedLevels[order];

//   if (loading) {
//     return (
//       <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
//         <div className="animate-pulse space-y-4">
//           <div className="h-8 bg-gray-800 rounded w-1/4"></div>
//           <div className="h-4 bg-gray-800 rounded w-1/3"></div>
//           <div className="h-4 bg-gray-800 rounded w-1/2"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
//         <div className="text-red-400">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
//       <div className="border-b border-gray-800 pb-6 mb-8">
//         <div className="flex">
//           <Link 
//             className="text-gray-400 mb-4 mr-2 hover:bg-slate-200 border px-2 py-1 rounded-lg hover:text-gray-900 transition-colors flex items-center" 
//             href="/modules"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </Link>
//           <h1 className="text-2xl font-base text-white mb-4">{moduleData?.title}</h1>
//         </div>
        
//         <div className="flex space-x-3 mb-4">
//           <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-sm">Essential</span>
//           <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg text-sm">Advanced</span>
//           <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-lg text-sm">Mixed</span>
//           <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-lg text-sm">
//             {lessons.reduce((total, lesson) => total + lesson.points, 0)} Points
//           </span>
//         </div>

//         <div className="flex justify-between items-start mb-6">
//           <p className="text-gray-400 text-sm max-w-xl">
//             {moduleData?.description}
//           </p>
//         </div>

//         <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
//           <Cable className="h-5 w-5" />
//           Resume
//         </button>
//       </div>

//       <div className="space-y-4">
//         {lessons.map((lesson) => {
//           const isLocked = isLevelLocked(lesson.lesson_order);
//           const isCompleted = completedLessons[lesson.id];

//           return (
//             <div 
//               key={lesson.id} 
//               onClick={() => !isLocked && router.push(`/modules/${params.module}/${lesson.id}`)}
//               className={`bg-gray-700/30 border border-gray-800 rounded-lg ${
//                 isLocked ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:border-gray-700 hover:bg-gray-800/50'
//               } transition-all`}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-3">
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
//                     <span className={`${getLevelBadgeStyle(lesson.level)} px-3 py-1 rounded-lg text-sm`}>
//                       {getLevelText(lesson.level)}
//                     </span>
//                     <span className={`px-3 py-1 rounded-lg text-sm ${
//                       isLocked ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
//                     }`}>
//                       Level {lesson.lesson_order}
//                     </span>
//                     <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
//                       {lesson.points} Points
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-gray-400 text-sm ml-8">{lesson.description}</p>

//                 {!isLocked && (
//                   <div className="flex justify-end">
//                     {!isCompleted ? (
//                       <button
//                         onClick={(e) => completeLesson(e, lesson.id, lesson.lesson_order)}
//                         className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors px-4 py-2 rounded-lg"
//                       >
//                         Complete Lesson
//                       </button>
//                     ) : lesson.lesson_order < lessons.length && !isLevelLocked(lesson.lesson_order + 1) ? (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           const nextLesson = lessons.find(l => l.lesson_order === lesson.lesson_order + 1);
//                           if (nextLesson) {
//                             router.push(`/modules/${params.module}/${nextLesson.id}`);
//                           }
//                         }}
//                         className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2"
//                       >
//                         Next Lesson
//                         <ArrowRight className="h-4 w-4" />
//                       </button>
//                     ) : null}
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

// export default DynamicModulePage;



// 'use client'

// import { useParams, useRouter } from 'next/navigation'
// import React from 'react'
// import Link from 'next/link'
// import { BookOpen, Clock, Award, ArrowLeft } from 'lucide-react'
// import { Button } from "@/components/ui/button"

// const ModulePage = () => {
//   const params = useParams()
//   const router = useRouter()
//   const [lessons, setLessons] = React.useState<any[]>([])
//   const [moduleData, setModuleData] = React.useState<any>(null)
//   const [loading, setLoading] = React.useState(true)
//   const [error, setError] = React.useState<string | null>(null)

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
        
//         // Fetch module data
//         const moduleRes = await fetch(`/api/modules/${params.module}`)
//         if (!moduleRes.ok) throw new Error('Failed to fetch module')
//         const moduleData = await moduleRes.json()
//         setModuleData(moduleData)

//         // Fetch lessons
//         const lessonsRes = await fetch(`/api/modules/${params.module}/lessons`)
//         if (!lessonsRes.ok) throw new Error('Failed to fetch lessons')
//         const lessonsData = await lessonsRes.json()
//         setLessons(lessonsData)
//       } catch (err) {
//         console.error('Error:', err)
//         setError('Failed to load data')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [params.module])

//   const getLevelColor = (level: string) => {
//     switch (level) {
//       case 'E':
//         return 'text-green-500 bg-green-500/10'
//       case 'A':
//         return 'text-orange-500 bg-orange-500/10'
//       case 'M':
//         return 'text-purple-500 bg-purple-500/10'
//       default:
//         return 'text-gray-500 bg-gray-500/10'
//     }
//   }

//   const getLevelText = (level: string) => {
//     switch (level) {
//       case 'E':
//         return 'Essential'
//       case 'A':
//         return 'Advanced'
//       case 'M':
//         return 'Mixed'
//       default:
//         return 'Unknown'
//     }
//   }

//   if (loading) return <div className="max-w-4xl mx-auto p-6">Loading...</div>
//   if (error) return <div className="max-w-4xl mx-auto p-6 text-red-500">Error: {error}</div>

//   return (
//     <div className="max-w-4xl font-sans mx-auto p-6">
//       <div className="mb-8">
//         <Button
//           variant="ghost"
//           className="mb-4 flex items-center gap-2 hover:bg-gray-800/50"
//           onClick={() => router.push('/modules')}
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to Modules
//         </Button>
        
//         <h1 className="text-2xl font-bold mb-2">{moduleData?.title || 'Module Lessons'}</h1>
//         {moduleData?.description && (
//           <p className="text-gray-400">{moduleData.description}</p>
//         )}
//       </div>
//       <div className="grid gap-4">
//         {lessons.map((lesson) => (
//           <Link 
//             href={`/modules/${params.module}/${lesson.id}`} 
//             key={lesson.id}
//           >
//             <div className="p-6 bg-gray-800/30 border border-gray-700 rounded-lg hover:bg-gray-700/30 transition-all hover:border-gray-600">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-xl font-medium text-white mb-2">{lesson.title}</h2>
//                   <p className="text-gray-400 text-sm">{lesson.description}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-lg text-sm ${getLevelColor(lesson.level)}`}>
//                   {getLevelText(lesson.level)}
//                 </span>
//               </div>
              
//               <div className="flex items-center gap-4 text-sm text-gray-400">
//                 <div className="flex items-center gap-2">
//                   <Award className="h-4 w-4" />
//                   <span>{lesson.points} Points</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="h-4 w-4" />
//                   <span>{lesson.estimated_time} min</span>
//                 </div>
//                 {/* <div className="flex items-center gap-2">
//                   <BookOpen className="h-4 w-4" />
//                   <span>Lesson {lesson.lesson_order}</span>
//                 </div> */}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default ModulePage



'use client'

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { BookOpen, Clock, Award, ChevronLeft, Cable } from 'lucide-react'
import ModuleSkeleton from './skeleton'

const ModulePage = () => {
  const params = useParams()
  const router = useRouter()
  const [lessons, setLessons] = React.useState<any[]>([])
  const [moduleData, setModuleData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const moduleRes = await fetch(`/api/modules/${params.module}`)
        if (!moduleRes.ok) throw new Error('Failed to fetch module')
        const moduleData = await moduleRes.json()
        setModuleData(moduleData)

        const lessonsRes = await fetch(`/api/modules/${params.module}/lessons`)
        if (!lessonsRes.ok) throw new Error('Failed to fetch lessons')
        const lessonsData = await lessonsRes.json()
        setLessons(lessonsData)
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.module])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'E':
        return 'bg-green-500/10 text-green-500'
      case 'C':
        return 'bg-orange-500/10 text-orange-500'
      case 'A':
        return 'bg-purple-500/10 text-purple-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case 'E':
        return 'Essential'
      case 'C':
        return 'Core'
      case 'A':
        return 'Advanced'
      default:
        return 'Unknown'
    }
  }

  if (loading) {
    return <ModuleSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
        <div className="text-red-400">Error: {error}</div>
      </div>
    )
  }

  const totalPoints = lessons.reduce((total, lesson) => total + lesson.points, 0)

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-10 mt-3">
      <div className="border-b border-gray-800/40 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            className="text-gray-400 justify-center hover:bg-[#181b24] border border-gray-700 w-8 h-8 rounded-lg hover:text-gray-200 transition-colors flex items-center"
            href="/modules"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-medium text-white">{moduleData?.title}</h1>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-3">
            <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-sm">Essential</span>
            <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg text-sm">Core</span>
            <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-lg text-sm">Advanced</span>
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm">
              {totalPoints} Points
            </span>
          </div>
        </div>
  
        <div className="mb-0">
          <p className="text-gray-400 text-sm max-w-3xl">
            {moduleData?.description}
          </p>
        </div>
      </div>

      <div className="grid gap-2">
        {lessons.map((lesson) => (
          <Link 
            href={`/modules/${params.module}/${lesson.id}`} 
            key={lesson.id}
          >
            <div className="group bg-[#181b24] hover:bg-[#181b24]/80 border border-transparent hover:border-gray-800 rounded-lg cursor-pointer transition-all duration-200">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <span className={`${getLevelColor(lesson.level)} px-3 py-1 rounded-lg text-sm`}>
                      {getLevelText(lesson.level)}
                    </span>
                    <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-sm">
                      {lesson.points} Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ModulePage