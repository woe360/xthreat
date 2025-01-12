'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Quiz } from '@/components/lessons/Quiz'
import { QuizSkeleton } from '@/components/lessons/QuizSkeleton'
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft } from 'lucide-react'
// import { EmailInspector } from '@/components/lessons/Email'
import B2BPhishingVariants from '@/components/lessons/Variants'
import VendorPortalSimulator from '@/components/lessons/Vendor'
import MultiChannelPhishingSimulator from '@/components/lessons/Multi'
import { EmailInspector } from '@/components/lessons/Email'

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

  const renderLessonContent = () => {
    // Jei tai yra "Recognizing Phishing Emails" pamoka
    if (lesson.id === 2) { // Pakeiskite į teisingą pamokos ID iš DB
      return <EmailInspector />
    }

    if (lesson.id === 3) { // Pakeiskite į teisingą pamokos ID iš DB
        // return <B2BPhishingVariants />
        return <VendorPortalSimulator />
      }

      if (lesson.id === 4) { // Pakeiskite į teisingą pamokos ID iš DB
        return <MultiChannelPhishingSimulator />
      }

    // Kitoms pamokoms rodome įprastą Quiz
    return (
      <Quiz 
        questions={questions}
        answers={answers}
        moduleId={params.module as string}
      />
    )
  }

  if (loading) return (
    <div className="max-w-4xl mx-auto p-6">
      <QuizSkeleton />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050607] text-gray-100 p-4 px-10 mt-3">
      <div className="pb-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push(`/modules/${params.module}`)}
            className="text-gray-400 justify-center hover:bg-gray-800 border border-gray-700 w-8 h-8 rounded-lg hover:text-gray-200 transition-colors flex items-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
  
      <div className="w-full max-w-4xl mx-auto">
        {renderLessonContent()}
      </div>
    </div>
  )
}

export default LessonPage