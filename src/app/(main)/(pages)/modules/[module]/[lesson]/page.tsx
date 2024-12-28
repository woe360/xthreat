'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Quiz } from '@/components/lessons/Quiz'
import { QuizSkeleton } from '@/components/lessons/QuizSkeleton'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

const LessonPage = () => {
  const router = useRouter()
  const params = useParams()
  const [questions, setQuestions] = React.useState<any[]>([])
  const [answers, setAnswers] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [lesson, setLesson] = React.useState<any>({ title: 'Loading...' })

  React.useEffect(() => {
    const supabase = createClientComponentClient()
    
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch lesson data
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', params.lesson)
          .single()

        if (lessonError) throw lessonError
        setLesson(lessonData)

        // Fetch questions
        const { data: questionsData, error: questionsError } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('lesson_id', params.lesson)
          .order('order_number')

        if (questionsError) throw questionsError
        setQuestions(questionsData || [])

        // Fetch answers
        if (questionsData?.length) {
          const { data: answersData, error: answersError } = await supabase
            .from('quiz_answers')
            .select('*')
            .in('question_id', questionsData.map(q => q.id))

          if (answersError) throw answersError
          setAnswers(answersData || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.lesson])

  if (loading) return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Loading...</h1>
      <QuizSkeleton />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2 hover:bg-gray-800/50"
        onClick={() => router.push(`/modules/${params.module}`)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lessons
      </Button>

      <h1 className="text-2xl font-bold mb-6">{lesson.title}</h1>
      {lesson.description && (
        <p className="text-gray-400 mb-6">{lesson.description}</p>
      )}
      
      <Quiz 
        questions={questions}
        answers={answers}
        moduleId={params.module as string}
      />
    </div>
  )
}

export default LessonPage