'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ArrowRight, ChevronDown, ChevronUp, Check } from 'lucide-react'
import ModuleSkeleton from './skeleton'
import { supabase } from '@/lib/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface SubLesson {
  id: string | number;
  title: string;
  slug: string;
  duration: string;
  lesson_id: number;
  order_number: number;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  level: string;
  points: number;
  module_id: number;
  lesson_order: number;
  slug: string;
  subLessons?: SubLesson[];
}

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  tags: string[];
}

const ModulePage = () => {
  const params = useParams()
  const supabaseClient = createClientComponentClient()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [moduleData, setModuleData] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)
  const [completedSubLessons, setCompletedSubLessons] = useState<Set<string>>(new Set())
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabaseClient.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
          return
        }
        setUser(user)
      } catch (error) {
        console.error('Error getting user:', error)
      }
    }

    fetchUser()
  }, [supabaseClient])

  useEffect(() => {
    const fetchData = async () => {
      if (!params.module) {
        setError('No module specified')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const moduleSlug = String(params.module)
        console.log('Fetching module data for slug:', moduleSlug)
        
        // Add direct test endpoint as fallback
        let moduleRes = await fetch(`/api/modules/${moduleSlug}`)
        console.log('Module response status:', moduleRes.status)
        
        if (!moduleRes.ok) {
          const errorText = await moduleRes.text().catch(() => 'No error details')
          console.error('Module fetch error details:', errorText)
          
          // Try the direct test endpoint
          console.log('Trying direct test endpoint')
          moduleRes = await fetch(`/api/direct-test`)
          console.log('Direct test response status:', moduleRes.status)
          
          if (!moduleRes.ok) {
            setError('Failed to load module')
            setLoading(false)
            return
          }
        }
        
        const moduleData = await moduleRes.json()
        console.log('Module data received:', moduleData)
        
        // Handle if we got an array from the direct-test endpoint
        let actualModuleData
        if (Array.isArray(moduleData)) {
          console.log('Received array of modules, looking for matching slug')
          actualModuleData = moduleData.find(m => 
            m.slug?.toLowerCase() === moduleSlug.toLowerCase())
          
          if (!actualModuleData) {
            console.error('No matching module found in array')
            setError('Module not found')
            setLoading(false)
            return
          }
          
          setModuleData(actualModuleData)
        } else {
          setModuleData(moduleData)
        }
        
        // Fetch lessons for this module (now includes subLessons)
        let lessonsRes = await fetch(`/api/modules/${moduleSlug}/lessons`)
        console.log('Lessons response status:', lessonsRes.status)
        
        if (!lessonsRes.ok) {
          const errorText = await lessonsRes.text().catch(() => 'No error details')
          console.error('Lessons fetch error details:', errorText)
          
          setError('Failed to load lessons')
          setLoading(false)
          return
        }
        
        const lessonsData: Lesson[] = await lessonsRes.json() // Type assertion for clarity
        console.log('Lessons data received (with subLessons):', lessonsData)
        
        if (!lessonsData || (Array.isArray(lessonsData) && lessonsData.length === 0)) {
          console.log('No lessons found for this module')
          setLessons([])
        } else {
          // Ensure subLessons is always an array, even if null/undefined from API
          const lessonsWithEnsuredSubLessons = lessonsData.map(lesson => ({
            ...lesson,
            subLessons: lesson.subLessons || [] 
          }));
          setLessons(lessonsWithEnsuredSubLessons)
        }

      } catch (err) {
        console.error('Error fetching data:', err)
        setError('An error occurred while loading the module')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.module])

  // Separate effect for fetching completion status and auto-expanding
  useEffect(() => {
    if (user && lessons.length > 0) {
      fetchCompletionStatusAndExpand()
    }
  }, [user, lessons])

  // Listen for page visibility changes to refresh completion status
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user && lessons.length > 0) {
        // Page became visible again, refresh completion status
        console.log('🔄 Page visible again, refreshing completion status...');
        fetchCompletionStatusAndExpand();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also listen for focus events as a backup
    const handleFocus = () => {
      if (user && lessons.length > 0) {
        console.log('🔄 Page focused, refreshing completion status...');
        fetchCompletionStatusAndExpand();
      }
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, lessons]);

  const fetchCompletionStatusAndExpand = async () => {
    if (!user) return;
    
    try {
      console.log('🔍 Fetching completion status for user:', user.id);
      console.log('🔍 Module ID:', params.module);
      
      // Fetch completed lessons from analytics_events
      const url = `/api/analytics?event_type=lesson_completed&user_id=${user.id}&module_id=${params.module}`;
      console.log('🔍 Fetching from URL:', url);
      
      const response = await fetch(url);
      console.log('🔍 Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('🔍 Full response:', result);
        const analyticsData = result.data;
        
        if (analyticsData && Array.isArray(analyticsData)) {
          console.log('🔍 Analytics events found:', analyticsData.length);
          
          const completed = new Set<string>();
          let lastCompletedLessonId: number | null = null;
          let lastCompletionTime = 0;
          
          analyticsData.forEach((event: any, index: number) => {
            console.log(`🔍 Processing event ${index}:`, event);
            
            if (event.data?.sub_lesson_id) {
              const subLessonId = event.data.sub_lesson_id.toString();
              completed.add(subLessonId);
              console.log('✅ Added completed sub-lesson:', subLessonId);
              
              // Find the most recent completion to auto-expand that lesson
              const eventTime = new Date(event.timestamp || event.created_at).getTime();
              if (eventTime > lastCompletionTime) {
                lastCompletionTime = eventTime;
                // Find which lesson this sub-lesson belongs to
                const parentLesson = lessons.find(lesson => 
                  lesson.subLessons?.some(subLesson => 
                    subLesson.id.toString() === subLessonId
                  )
                );
                if (parentLesson) {
                  lastCompletedLessonId = parentLesson.id;
                  console.log('🎯 Found parent lesson for auto-expand:', parentLesson.id, parentLesson.title);
                }
              }
            }
          });
          
          console.log('✅ Final completed sub-lessons:', Array.from(completed));
          console.log('🎯 Last completed lesson ID:', lastCompletedLessonId);
          
          // Force re-render by creating a new Set
          setCompletedSubLessons(new Set(completed));
          
          // Auto-expand the lesson that was most recently worked on
          if (lastCompletedLessonId && expandedLesson !== lastCompletedLessonId) {
            setExpandedLesson(lastCompletedLessonId);
            console.log('📂 Auto-expanding lesson:', lastCompletedLessonId);
          }
        } else {
          console.log('⚠️ No analytics data found or data is not an array');
        }
      } else {
        const errorText = await response.text();
        console.warn('⚠️ Failed to fetch completion status:', response.status, errorText);
      }
    } catch (error) {
      console.error('❌ Error fetching completion status:', error);
    }
  };

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
  
  const toggleExpand = (lessonId: number) => {
    setExpandedLesson(prev => prev === lessonId ? null : lessonId);
  };

  // Check if a sub-lesson is completed
  const isSubLessonCompleted = (subLessonId: string | number) => {
    return completedSubLessons.has(subLessonId.toString());
  };

  // Check if all sub-lessons in a lesson are completed
  const isLessonCompleted = (lesson: Lesson) => {
    const subLessons = lesson.subLessons || [];
    if (subLessons.length === 0) return false;
    return subLessons.every(subLesson => isSubLessonCompleted(subLesson.id));
  };

  if (loading) {
    return <ModuleSkeleton />
  }

  if (error || !moduleData) {
    return (
      <div className="min-h-screen font-sans bg-[#0b0b0b] text-gray-100 p-4 px-8 mt-3">
        <Link
          className="text-gray-400 inline-flex items-center hover:text-white mb-6"
          href="/modules"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Modules
        </Link>
        
        <div className="p-8 rounded-lg border border-gray-800/40 bg-black/20 text-center">
          <h1 className="text-xl font-light text-red-400 mb-2">
            {error || 'Module not found'}
          </h1>
          <p className="text-gray-400 mb-6">
            We couldn't load the requested module. Please try again later.
          </p>
          <Link
            href="/modules"
            className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            Return to Modules
          </Link>
        </div>
      </div>
    )
  }

  const totalPoints = lessons.reduce((total, lesson) => total + lesson.points, 0)
  const sortedLessons = [...lessons].sort((a, b) => a.lesson_order - b.lesson_order)

  return (
    <div className="min-h-screen font-sans bg-[#0b0b0b] text-gray-100 px-10 py-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="border-b border-white/15 pb-6 mb-8">
          <Link
            className="text-gray-400 border text-sm border-white/20 rounded-full px-4 py-2 inline-flex items-center hover:text-white mb-6"
            href="/modules"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-xl md:text-3xl font-light text-white mb-4">{moduleData.title}</h1>
              <p className="text-gray-400 max-w-2xl text-base md:text-md">
                {moduleData.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm">
                  {totalPoints} Total Points
                </span>
                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {sortedLessons.filter(lesson => isLessonCompleted(lesson)).length}/{sortedLessons.length} Topics
                </span>
                <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm">
                  {sortedLessons.reduce((acc, lesson) => 
                    acc + (lesson.subLessons?.filter(subLesson => isSubLessonCompleted(subLesson.id)).length || 0), 0)}/
                  {sortedLessons.reduce((acc, lesson) => 
                    acc + (lesson.subLessons?.length || 0), 0)} Lessons
                </span>
              </div>
        
              
            </div>
            

          </div>
        </div>

        {lessons.length === 0 ? (
          <div className="text-center p-8 border border-white/15 rounded-lg bg-black/20">
            <p className="text-gray-400">No lessons available for this module yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedLessons.map((lesson, index) => {
              const subLessons = lesson.subLessons || [];
              const isExpanded = expandedLesson === lesson.id;
              
              // Log subLessons data when component re-renders
              console.log(`Rendering lesson ${lesson.id}: expanded=${isExpanded}, subLessons data=`, subLessons);

              return (
                <div 
                  key={lesson.id} 
                  id={`lesson-${lesson.id}`}
                  className="border border-white/15 rounded-md overflow-hidden"
                >
                  {/* Lesson header - always visible */}
                  <div 
                    className={`p-5 cursor-pointer transition-colors hover:bg-neutral-900/30 ${isExpanded ? 'bg-neutral-900/20' : 'bg-[#121212]'}`}
                    onClick={() => toggleExpand(lesson.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div>
                          <h3 className="text-xl md:text-xl font-light text-white group-hover:text-white/90">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-400 text-sm md:text-base mt-1">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-6 flex-shrink-0">
                        <div className="hidden md:flex flex-col items-end mr-4">
                          <div className="flex items-center gap-2">
                            <span className={`${getLevelColor(lesson.level)} px-3 py-1 rounded-full text-xs`}>
                              {getLevelText(lesson.level)}
                            </span>
                            {isLessonCompleted(lesson) && (
                              <div className="flex items-center gap-1 bg-green-500/20 border border-green-500/40 text-green-400 px-3 py-1 rounded-full text-xs">
                                <Check className="w-3 h-3" />
                                <span>Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sub-lessons - visible when expanded */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isExpanded ? 'max-h-[500px] opacity-100 border-t border-neutral-800/40 bg-[#121212]' : 'max-h-0 opacity-0'}
                    `}
                  >
                    {subLessons.map((subLesson, i) => {
                      const href = `/modules/${moduleData?.slug}/${lesson.slug}/${subLesson.slug}`;
                      // Log the actual href being passed to the Link component
                      console.log(`Link Generation:
                                    Module: ${moduleData?.slug}
                                    Lesson: ${lesson.title} (Slug: ${lesson.slug})
                                    SubLesson: ${subLesson.title} (Slug: ${subLesson.slug})
                                    Generated Href: ${href}`); 
                      
                      return (
                        <Link 
                          href={href} // Use href with fetched slugs
                          key={subLesson.id}
                          className="group flex items-center ml-2 justify-between p-4 border-b border-neutral-800/20 last:border-0 hover:bg-neutral-900/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center text-sm rounded-full border transition-all ${
                              isSubLessonCompleted(subLesson.id)
                                ? 'bg-green-500/20 border-green-500/40 text-green-400'
                                : 'border-gray-600 text-gray-400'
                            }`}>
                              {isSubLessonCompleted(subLesson.id) ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                i + 1
                              )}
                            </div>
                            <span className={`text-base md:text-lg font-light group-hover:text-white ${
                              isSubLessonCompleted(subLesson.id) ? 'text-green-200' : 'text-gray-200'
                            }`}>
                              {subLesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">
                              {subLesson.duration}
                            </span>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-0.5" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModulePage