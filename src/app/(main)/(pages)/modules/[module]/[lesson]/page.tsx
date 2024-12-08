'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChevronLeft, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  Cable,
  Clock,
  Calendar,
  BookOpenCheck
} from 'lucide-react';

// interface LessonData {
//   id: number;
//   title: string;
//   description: string;
//   content?: string;
//   level: number;
//   points: number;
//   topic_id?: number;
//   module_id: number;
//   lesson_order: number;
//   navigation?: {
//     previous: { id: number; title: string } | null;
//     next: { id: number; title: string } | null;
//   };
// }

// src/types/lesson.ts
interface SubLesson {
  id: number;
  title: string;
  content?: string;
  order: number;
  completed: boolean;
}

interface LessonData {
  id: number;
  title: string;
  description: string;
  content?: string;
  level: number;
  points: number;
  topic_id?: number;
  module_id: number;
  lesson_order: number;
  activity_type?: 'quiz' | 'video' | 'reading' | 'interactive';
  sub_lessons?: SubLesson[];
  navigation?: {
    previous: { id: number; title: string } | null;
    next: { id: number; title: string } | null;
  };
}

const LessonPage = () => {
  const params = useParams();
  const router = useRouter();
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Patikriname params
        console.log('Raw params:', params);

        // Saugiau ištraukiame ID
        const moduleId = params?.module?.toString();
        const lessonId = params?.lesson?.toString();

        console.log('Extracted IDs:', { moduleId, lessonId });

        if (!moduleId || !lessonId) {
          throw new Error('Trūksta modulio arba pamokos ID');
        }

        const response = await fetch(`/api/modules/${moduleId}/lessons/${lessonId}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || `Klaida: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        if (!data) {
          throw new Error('Negauti pamokos duomenys');
        }

        setLessonData(data);
      } catch (err) {
        console.error('Klaida gaunant pamokos duomenis:', err);
        setError(err instanceof Error ? err.message : 'Nepavyko užkrauti pamokos duomenų');
      } finally {
        setLoading(false);
      }
    };

    if (params?.module && params?.lesson) {
      fetchLessonData();
    }
  }, [params?.module, params?.lesson]);

  if (loading) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded w-1/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !lessonData) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
        <Card className="border-red-800/50 bg-red-950/10">
          <CardHeader>
            <CardTitle className="text-red-400">Error</CardTitle>
            <CardDescription className="text-red-300">
              {error || 'Lesson not found'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
      {/* Header Section */}
      <div className="border-b border-gray-800 pb-6 mb-8">
        <div className="flex">
          <Link 
            className="text-gray-400 mb-4 mr-2 hover:bg-slate-200 border px-2 py-1 rounded-lg hover:text-gray-900 transition-colors flex items-center" 
            href={`/modules/${params.module}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-base text-white mb-4">{lessonData.title}</h1>
        </div>
        
        <div className="flex space-x-3 mb-4">
          <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-lg text-sm">
            Level {lessonData.lesson_order}
          </span>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
            {lessonData.points} Points
          </span>
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
            <Clock className="h-4 w-4" />
            15 mins
          </span>
        </div>

        <div className="flex justify-between items-start mb-6">
          <p className="text-gray-400 text-sm max-w-xl">
            {lessonData.description}
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5" />
            Start Lesson
          </button>
          <button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Save for Later
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {/* <Card className="border-gray-800 bg-transparent">
          <CardContent className="pt-6">
            {lessonData.content ? (
              <div className="prose prose-invert max-w-none">
                {lessonData.content}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No content available for this lesson yet.</p>
              </div>
            )}
          </CardContent>
        </Card> */}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {lessonData.navigation?.previous ? (
            <button
              onClick={() => router.push(`/modules/${params.module}/${lessonData.navigation?.previous?.id}`)}
              className="bg-gray-800 text-neutral-200 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Lesson
            </button>
          ) : (
            <div />
          )}
          
          {lessonData.navigation?.next && (
            <button
              onClick={() => router.push(`/modules/${params.module}/${lessonData.navigation?.next?.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
            >
              Next Lesson
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;