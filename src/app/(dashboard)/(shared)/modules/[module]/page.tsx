'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ArrowRight, ChevronDown, ChevronUp, CheckCircle2, Check } from 'lucide-react'
import ModuleSkeleton from './skeleton'

interface Lesson {
  id: number;
  title: string;
  description: string;
  level: string;
  points: number;
  module_id: number;
  lesson_order: number;
  slug: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  tags: string[];
}

interface SubLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  slug: string;
}

const ModulePage = () => {
  const params = useParams()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [moduleData, setModuleData] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)

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
        
        // Fetch lessons for this module
        let lessonsRes = await fetch(`/api/modules/${moduleSlug}/lessons`)
        console.log('Lessons response status:', lessonsRes.status)
        
        if (!lessonsRes.ok) {
          const errorText = await lessonsRes.text().catch(() => 'No error details')
          console.error('Lessons fetch error details:', errorText)
          
          setError('Failed to load lessons')
          setLoading(false)
          return
        }
        
        const lessonsData = await lessonsRes.json()
        console.log('Lessons data received:', lessonsData)
        
        if (!lessonsData || (Array.isArray(lessonsData) && lessonsData.length === 0)) {
          console.log('No lessons found for this module')
          setLessons([])
        } else {
          setLessons(lessonsData)
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

  // Effect to scroll the expanded lesson into view
  useEffect(() => {
    if (expandedLesson !== null) {
      // Use setTimeout to ensure the element has rendered and height is calculated
      setTimeout(() => {
        const element = document.getElementById(`lesson-${expandedLesson}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 160); // Small delay might be needed for transition
    }
  }, [expandedLesson]);

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
    if (expandedLesson === lessonId) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonId);
    }
  };

  // Helper function to generate simple slugs (replace with a robust library if needed)
  const generateSlug = (title: string) => {
    // Ensure title is a string before processing
    if (typeof title !== 'string') {
      console.error('generateSlug received non-string title:', title);
      return 'invalid-title'; // Return a fallback slug
    }
    
    return title
      .toLowerCase()
      .trim() // Remove leading/trailing whitespace first
      .replace(/[^a-z0-9\\s-]/g, '') // Remove invalid chars (keeping spaces and hyphens)
      .replace(/\\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      // The trim start/end hyphen replacements were correct
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };

  // Generate sub-lessons with completion status (mock data for demonstration)
  const getSubLessons = (lessonId: number, level: string): SubLesson[] => {
    // Mock completion data - in real app this would come from API/state
    const completionMap: Record<string, boolean> = {
      '1-1': true,
      '1-2': true,
      '1-3': false,
      '1-4': false,
      '2-1': true,
      '2-2': true,
      '2-3': true,
      '2-4': false,
      '3-1': true,
      '3-2': false,
      '3-3': false,
      '3-4': false,
      '4-1': false,
      '4-2': false,
      '4-3': false,
      '4-4': false,
    };
    
    const subLessonsData = [
      { id: `${lessonId}-1`, title: 'Overview & Concepts', duration: '10 min' },
      { id: `${lessonId}-2`, title: 'Practical Examples', duration: '12 min' },
      { id: `${lessonId}-3`, title: 'Interactive Exercise', duration: '15 min' },
      { id: `${lessonId}-4`, title: 'Knowledge Check', duration: '8 min' },
    ];
    
    const subLessons: SubLesson[] = subLessonsData.map(sub => {
      // --- TEMPORARY HACK for Overview & Concepts slug ---
      const correctSlug = sub.title === 'Overview & Concepts' 
                          ? 'overview-and-concepts' 
                          : generateSlug(sub.title); // Use generator for others
      // --- END HACK ---
      
      return {
        ...sub,
        slug: correctSlug, // Use the potentially corrected slug
        completed: completionMap[sub.id] || false
      }
    });
    
    if (level === 'A') {
      const advancedSub = {
        id: `${lessonId}-5`, 
        title: 'Advanced Scenario', 
        duration: '20 min',
      };
      subLessons.push({
        ...advancedSub,
        slug: generateSlug(advancedSub.title), // Generate slug
        completed: completionMap[advancedSub.id] || false
      });
    }
    
    return subLessons;
  };

  // Calculate topic completion percentage
  const getTopicCompletionPercent = (subLessons: SubLesson[]): number => {
    if (subLessons.length === 0) return 0;
    const completedCount = subLessons.filter(lesson => lesson.completed).length;
    return Math.round((completedCount / subLessons.length) * 100);
  };

  // Get overall module completion percentage
  const getModuleCompletionPercent = (): number => {
    if (lessons.length === 0) return 0;
    
    let totalSubLessons = 0;
    let completedSubLessons = 0;
    
    lessons.forEach(lesson => {
      const subs = getSubLessons(lesson.id, lesson.level);
      totalSubLessons += subs.length;
      completedSubLessons += subs.filter(sub => sub.completed).length;
    });
    
    return Math.round((completedSubLessons / totalSubLessons) * 100);
  };

  if (loading) {
    return <ModuleSkeleton />
  }

  if (error || !moduleData) {
    return (
      <div className="min-h-screen font-sans bg-[#050607] text-gray-100 p-4 px-6 mt-3">
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
  // Sort lessons by their order
  const sortedLessons = [...lessons].sort((a, b) => a.lesson_order - b.lesson_order)
  const moduleCompletionPercent = getModuleCompletionPercent();

  return (
    <div className="min-h-screen font-sans bg-[#050607] text-gray-100 px-8 py-6">
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
                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm">
                  {sortedLessons.length} Topics
                </span>
                <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-sm">
                  {sortedLessons.reduce((acc, lesson) => 
                    acc + (lesson.level === 'A' ? 5 : 4), 0)} Lessons
                </span>
              </div>
        
              
            </div>
            
            <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#1f2937"
                        strokeWidth="8"
                      />
                      {/* Progress circle - only show if there's progress */}
                      {moduleCompletionPercent > 0 && (
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={moduleCompletionPercent === 100 ? "#10b981" : "#3b82f6"}
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 40 * moduleCompletionPercent / 100} ${2 * Math.PI * 40 * (1 - moduleCompletionPercent / 100)}`}
                          strokeDashoffset={2 * Math.PI * 40 * 0.25}
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                    <span className="absolute text-xl font-semibold">{moduleCompletionPercent}%</span>
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
              const subLessons = getSubLessons(lesson.id, lesson.level);
              const isExpanded = expandedLesson === lesson.id;
              const completionPercent = getTopicCompletionPercent(subLessons);
              const completedCount = subLessons.filter(sub => sub.completed).length;
              
              return (
                <div 
                  key={lesson.id} 
                  id={`lesson-${lesson.id}`}
                  className="border border-white/15 rounded-md overflow-hidden"
                >
                  {/* Lesson header - always visible */}
                  <div 
                    className={`p-5 cursor-pointer transition-colors hover:bg-gray-900/30 ${isExpanded ? 'bg-gray-900/20' : 'bg-black/20'}`}
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
                            <span className="bg-blue-500/15 text-blue-400 px-3 py-1 rounded-full text-xs">
                              {completedCount}/{subLessons.length} complete
                            </span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                      </div>
                    </div>
                    <div className="md:hidden mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex gap-2">
                          <span className={`${getLevelColor(lesson.level)} px-3 py-1 rounded-full text-xs`}>
                            {getLevelText(lesson.level)}
                          </span>
                          <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">
                            {completedCount}/{subLessons.length}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{completionPercent}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            completionPercent === 100 
                              ? 'bg-green-500' 
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${completionPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sub-lessons - visible when expanded */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isExpanded ? 'max-h-[500px] opacity-100 border-t border-gray-800/40 bg-black/10' : 'max-h-0 opacity-0'}
                    `}
                  >
                    {subLessons.map((subLesson, i) => {
                      const href = `/modules/${moduleData.slug}/${lesson.slug}/${subLesson.slug}`;
                      // Log the actual href being passed to the Link component
                      console.log(`Link Generation:
                                    Module: ${moduleData.slug}
                                    Lesson: ${lesson.title} (Slug: ${lesson.slug})
                                    SubLesson: ${subLesson.title} (Slug: ${subLesson.slug})
                                    Generated Href: ${href}`); 
                      
                      return (
                        <Link 
                          href={href} // Ensure we use the logged href
                          key={subLesson.id}
                          className="group flex items-center ml-2 justify-between p-4 border-b border-gray-800/20 last:border-0 hover:bg-gray-900/20 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center text-sm rounded-full
                              ${subLesson.completed 
                                ? 'bg-green-500/10 text-green-500 border border-green-500/30' 
                                : 'border border-gray-600 text-gray-400'}`
                            }>
                              {subLesson.completed 
                                ? <Check className="h-4 w-4" /> 
                                : null
                              }
                            </div>
                            <span className={`text-base md:text-lg font-light group-hover:text-white
                              ${subLesson.completed ? 'text-white' : 'text-gray-200'}`
                            }>
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
            
            {/* Module completion indicator */}
            
          </div>
        )}
      </div>
    </div>
  )
}

export default ModulePage