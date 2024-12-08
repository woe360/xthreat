'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Lock, ChevronLeft, Circle, CheckCircle2, Cable, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SubLesson {
  id: number;
  title: string;
  content: string;
  order: number;
  lesson_id: number;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  module_id: number;
  points: number;
  lesson_order: number;
  level: 'E' | 'A' | 'M';  // Added level field
}

const DynamicModulePage = () => {
  const params = useParams();
  const router = useRouter();
  const [moduleData, setModuleData] = React.useState<any>(null);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = React.useState<{ [key: number]: boolean }>({});
  const [unlockedLevels, setUnlockedLevels] = React.useState<{ [key: number]: boolean }>({});

  // Helper function to get level badge styling
  const getLevelBadgeStyle = (level: 'E' | 'A' | 'M') => {
    switch (level) {
      case 'E':
        return 'bg-green-500/10 text-green-500';
      case 'A':
        return 'bg-orange-500/10 text-orange-500';
      case 'M':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Helper function to get level text
  const getLevelText = (level: 'E' | 'A' | 'M') => {
    switch (level) {
      case 'E':
        return 'Essential';
      case 'A':
        return 'Advanced';
      case 'M':
        return 'Mixed';
      default:
        return 'Unknown';
    }
  };

  React.useEffect(() => {
    const fetchModuleData = async () => {
      try {
        setLoading(true);
        const moduleRes = await fetch(`/api/modules/${params.module}`);
        if (!moduleRes.ok) throw new Error('Failed to fetch module');
        const moduleData = await moduleRes.json();
        
        const lessonsRes = await fetch(`/api/modules/${params.module}/lessons`);
        if (!lessonsRes.ok) throw new Error('Failed to fetch lessons');
        const lessonsData = await lessonsRes.json();

        // Initialize completion and unlock states
        const initialCompletedState: { [key: number]: boolean } = {};
        const initialUnlockedState: { [key: number]: boolean } = {};
        lessonsData.forEach((lesson: Lesson, index: number) => {
          initialCompletedState[lesson.id] = false;
          initialUnlockedState[lesson.lesson_order] = index === 0;
        });

        setModuleData(moduleData);
        setLessons(lessonsData);
        setCompletedLessons(initialCompletedState);
        setUnlockedLevels(initialUnlockedState);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.module) {
      fetchModuleData();
    }
  }, [params.module]);

  const completeLesson = (e: React.MouseEvent, lessonId: number, order: number) => {
    e.stopPropagation();
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: true
    }));
    setUnlockedLevels(prev => ({
      ...prev,
      [order + 1]: true
    }));
  };

  const isLevelLocked = (order: number) => !unlockedLevels[order];

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

  if (error) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-base text-white mb-4">{moduleData?.title}</h1>
        </div>
        
        <div className="flex space-x-3 mb-4">
          <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-lg text-sm">Essential</span>
          <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg text-sm">Advanced</span>
          <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-lg text-sm">Mixed</span>
          <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-lg text-sm">
            {lessons.reduce((total, lesson) => total + lesson.points, 0)} Points
          </span>
        </div>

        <div className="flex justify-between items-start mb-6">
          <p className="text-gray-400 text-sm max-w-xl">
            {moduleData?.description}
          </p>
        </div>

        <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
          <Cable className="h-5 w-5" />
          Resume
        </button>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const isLocked = isLevelLocked(lesson.lesson_order);
          const isCompleted = completedLessons[lesson.id];

          return (
            <div 
              key={lesson.id} 
              onClick={() => !isLocked && router.push(`/modules/${params.module}/${lesson.id}`)}
              className={`bg-gray-700/30 border border-gray-800 rounded-lg ${
                isLocked ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:border-gray-700 hover:bg-gray-800/50'
              } transition-all`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
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
                    <span className={`${getLevelBadgeStyle(lesson.level)} px-3 py-1 rounded-lg text-sm`}>
                      {getLevelText(lesson.level)}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-sm ${
                      isLocked ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      Level {lesson.lesson_order}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg text-sm">
                      {lesson.points} Points
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm ml-8">{lesson.description}</p>

                {!isLocked && (
                  <div className="flex justify-end">
                    {!isCompleted ? (
                      <button
                        onClick={(e) => completeLesson(e, lesson.id, lesson.lesson_order)}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors px-4 py-2 rounded-lg"
                      >
                        Complete Lesson
                      </button>
                    ) : lesson.lesson_order < lessons.length && !isLevelLocked(lesson.lesson_order + 1) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const nextLesson = lessons.find(l => l.lesson_order === lesson.lesson_order + 1);
                          if (nextLesson) {
                            router.push(`/modules/${params.module}/${nextLesson.id}`);
                          }
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

export default DynamicModulePage;