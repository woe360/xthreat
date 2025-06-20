'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Quiz } from '@/app/(dashboard)/(shared)/modules/components/lessons/Quiz'
import { QuizSkeleton } from '@/app/(dashboard)/(shared)/modules/components/lessons/QuizSkeleton'
import { Button } from "@/components/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EmailInspector } from '@/app/(dashboard)/(shared)/modules/components/lessons/Email'
import VendorPortalSimulator from '@/app/(dashboard)/(shared)/modules/components/lessons/Vendor'
import MultiChannelPhishingSimulator from '@/app/(dashboard)/(shared)/modules/components/lessons/Multi'
import CaseStudy from '@/app/(dashboard)/(shared)/modules/components/lessons/CaseStudy'
import URLInspectorChallenge from '@/app/(dashboard)/(shared)/modules/components/lessons/Inspector'
import SecurityStory from '@/app/(dashboard)/(shared)/modules/components/lessons/Story'
import EmailComparison from '@/app/(dashboard)/(shared)/modules/components/lessons/EmailComparison'
import ConceptOverview from '../../components/lessons/ConceptOverview'

const LessonPage = () => {
  const router = useRouter()
  const params = useParams()
  const supabase = createClientComponentClient()
  
  console.log('Component initialized with params:', params)
  
  const [questions, setQuestions] = React.useState<any[]>([])
  const [answers, setAnswers] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [lesson, setLesson] = React.useState<any>({ title: 'Loading...' })
  const [subLessons, setSubLessons] = React.useState<any[]>([])
  const [currentSubLessonIndex, setCurrentSubLessonIndex] = React.useState(0)
  const [nextLesson, setNextLesson] = React.useState<any>(null)
  const [previousLesson, setPreviousLesson] = React.useState<any>(null)
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
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
  }, [supabase])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        console.log('Fetching data for lesson:', params.lesson)
        
        // Gauname pagrindinę pamoką
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select()
          .eq('id', parseInt(params.lesson as string))
          .single()

        console.log('Main lesson data:', lessonData)

        if (lessonError) {
          console.error('Lesson error:', lessonError)
          throw lessonError
        }
        
        if (!lessonData) {
          console.error('No lesson data found')
          return
        }

        setLesson(lessonData)

        // Gauname sub-pamokas
        const { data: subLessonsData, error: subLessonsError } = await supabase
          .from('sub_lessons')
          .select('*')
          .eq('lesson_id', parseInt(params.lesson as string))
          .order('order_number', { ascending: true })

        console.log('Sub-lessons data:', subLessonsData)

        if (subLessonsError) {
          console.error('Sub-lessons error:', subLessonsError)
          throw subLessonsError
        }

        setSubLessons(subLessonsData || [])

        // Gauname klausimus
        const { data: questionsData, error: questionsError } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('lesson_id', parseInt(params.lesson as string))
          .order('order_number', { ascending: true })

        console.log('Questions from DB:', questionsData)
        
        if (questionsError) {
          console.error('Questions error:', questionsError)
          throw questionsError
        }
        
        setQuestions(questionsData || [])
        
        // Gauname atsakymus
        if (questionsData?.length) {
          const { data: answersData, error: answersError } = await supabase
            .from('quiz_answers')
            .select('*')
            .in('question_id', questionsData.map(q => q.id))

          console.log('Answers from DB:', answersData)
          
          if (answersError) {
            console.error('Answers error:', answersError)
            throw answersError
          }
          
          setAnswers(answersData || [])
        }

        // Gauname navigacijos pamokas
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select()
          .eq('module_id', 1)
          .order('lesson_order', { ascending: true })

        console.log('Navigation lessons:', lessonsData)
        
        if (lessonsError) {
          console.error('Navigation lessons error:', lessonsError)
          throw lessonsError
        }

        if (lessonsData) {
          const currentIndex = lessonsData.findIndex(l => l.id === parseInt(params.lesson as string))
          setPreviousLesson(currentIndex > 0 ? lessonsData[currentIndex - 1] : null)
          setNextLesson(currentIndex < lessonsData.length - 1 ? lessonsData[currentIndex + 1] : null)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.lesson])

  const handleSubLessonComplete = async () => {
    console.log('Sub-lesson complete. Current index:', currentSubLessonIndex, 'Total:', subLessons.length)
    
    // Track lesson completion in analytics
    if (user && subLessons[currentSubLessonIndex]) {
      const currentSubLesson = subLessons[currentSubLessonIndex];
      const isLastSubLesson = currentSubLessonIndex >= subLessons.length - 1;
      
      try {
        console.log('🚀 Tracking lesson completion analytics...');
        console.log('🔍 User ID:', user.id);
        console.log('🔍 Current sub-lesson:', currentSubLesson);
        
        const analyticsEvent = {
          event_type: 'lesson_completed',
          user_id: user.id,
          module_id: params.module,
          lesson_id: params.lesson,
          component_type: currentSubLesson.content_type || 'lesson',
          data: {
            sub_lesson_id: currentSubLesson.id,
            sub_lesson_title: currentSubLesson.title,
            lesson_completed: isLastSubLesson,
            completion_time: new Date().toISOString(),
            lesson_order: currentSubLessonIndex + 1,
            total_sub_lessons: subLessons.length
          }
        };

        console.log('📤 Sending analytics event:', analyticsEvent);

        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(analyticsEvent),
        });

        console.log('📥 Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Analytics API error response:', errorText);
          throw new Error(`Analytics API failed: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Analytics tracking successful:', result);
        
        // Immediately update parent about completion if we're going back to module
        if (isLastSubLesson || currentSubLessonIndex >= subLessons.length - 1) {
          console.log('🔄 This was the last sub-lesson, will refresh module page...');
        }
        
      } catch (error) {
        console.error('❌ Failed to track lesson completion:', error);
        // Don't block progression if analytics fails
      }
    } else {
      console.warn('⚠️ Cannot track completion: user or sub-lesson missing', {
        hasUser: !!user,
        hasSubLesson: !!subLessons[currentSubLessonIndex],
        currentIndex: currentSubLessonIndex,
        totalSubLessons: subLessons.length
      });
    }
    
    // Advancement Logic:
    if (currentSubLessonIndex < subLessons.length - 1) {
      console.log('Moving to next sub-lesson');
      setCurrentSubLessonIndex(prev => prev + 1)
    } else if (nextLesson) {
      console.log('Moving to next main lesson');
      router.push(`/modules/${params.module}/${nextLesson.id}`)
    } else {
      console.log('Last sub-lesson, returning to module overview');
      router.push(`/modules/${params.module}`)
    }
  }

  const renderLessonContent = () => {
    if (!lesson) {
      console.log('No lesson data')
      return null;
    }
   
    if (subLessons.length > 0) {
      const currentSubLesson = subLessons[currentSubLessonIndex]
      console.log('Current sub-lesson:', currentSubLesson)
      console.log('All questions:', questions)
      console.log('All answers:', answers)
   
      // Define types explicitly
      let lessonQuestions: any[] = [];
      let questionIds: number[] = []; // Assuming IDs are numbers
      let lessonAnswers: any[] = [];
   
      switch (currentSubLesson.content_type) {
        case 'email_inspector':
          lessonQuestions = questions.filter(q => q.sub_lesson_id === currentSubLesson.id)
          questionIds = lessonQuestions.map(q => q.id)
          lessonAnswers = answers.filter(a => 
            questionIds.includes(a.question_id) && 
            a.sub_lesson_id === currentSubLesson.id
          )
          
          // Pass questions and answers directly, not nested
          return (
            <EmailInspector 
              moduleId={params.module as string}
              onComplete={handleSubLessonComplete}
            />
          )
        case 'vendor_portal':
          return <VendorPortalSimulator onComplete={handleSubLessonComplete} />
        case 'multi_channel':
          return <MultiChannelPhishingSimulator onComplete={handleSubLessonComplete} />
        case 'story':
          return <SecurityStory onComplete={handleSubLessonComplete} />
        case 'email_comparison':
          return <EmailComparison moduleId={params.module as string} onComplete={handleSubLessonComplete} />
        case 'case_study':
          return <CaseStudy onComplete={handleSubLessonComplete} />
        case 'url_inspector':
          return <URLInspectorChallenge moduleId={params.module as string} onComplete={handleSubLessonComplete} lessonId={currentSubLesson.id} />
        case 'concept_overview':
          return <ConceptOverview onComplete={handleSubLessonComplete} />
        case 'quiz':
          lessonQuestions = questions.filter(q => q.sub_lesson_id === currentSubLesson.id)
          
          if (lessonQuestions.length > 0) {
            questionIds = lessonQuestions.map(q => q.id)
            lessonAnswers = answers.filter(a => 
              questionIds.includes(a.question_id) && 
              a.sub_lesson_id === currentSubLesson.id
            )
            
            return (
              <Quiz 
                questions={lessonQuestions}
                answers={lessonAnswers}
                moduleId={params.module as string}
                onComplete={handleSubLessonComplete}
              />
            )
          }
          
          console.log('No questions found for sub-lesson ID:', currentSubLesson.id)
          return <div className="text-center p-6">No quiz questions available for this lesson</div>
        default:
          console.log('Unknown sub-lesson type:', currentSubLesson.content_type)
          return <div>Unknown sub-lesson type: {currentSubLesson.content_type || 'no content type'}</div>
      }
    }
   
    console.log('No sub-lessons available')
    return <div className="text-center p-6">No content available for this lesson</div>
   }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <QuizSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-gray-100 p-4 px-10 mt-3">
      <div className="">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/modules/${params.module}`)}
              className="text-gray-400 justify-center hover:bg-gray-800 border border-gray-600/30 w-8 h-8 rounded-full hover:text-gray-200 transition-colors flex items-center "
            >
              <ChevronLeft className="h-5 w-5 " />
            </button>
            <div>
              <h1 className="text-xl font-light">{lesson.title}</h1>
            </div>
          </div>
        </div>
      </div>
  
      <div className="w-full">
          {renderLessonContent()}
      </div>
    </div>
  )
}

export default LessonPage