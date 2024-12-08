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

