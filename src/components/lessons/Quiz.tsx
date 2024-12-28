'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface QuizProps {
  questions: any[]
  answers: any[]
  moduleId: string
}

export const Quiz = ({ questions, answers, moduleId }: QuizProps) => {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswers, setSelectedAnswers] = React.useState<{[key: number]: number[]}>({})
  const [isComplete, setIsComplete] = React.useState(false)
  const [score, setScore] = React.useState<{correct: number, total: number} | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswers = answers.filter(a => a.question_id === currentQuestion?.id)
  
  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswers(prev => {
      const current = prev[currentQuestion.id] || []
      return {
        ...prev,
        [currentQuestion.id]: current.includes(answerId)
          ? current.filter(id => id !== answerId)
          : [...current, answerId]
      }
    })
  }

  const calculateScore = () => {
    let correctCount = 0;
    
    questions.forEach(question => {
      const selectedIds = selectedAnswers[question.id] || []
      const correctAnswers = answers
        .filter(a => a.question_id === question.id && a.is_correct)
        .map(a => a.id)
      
      // Tikriname ar pasirinkti atsakymai sutampa su teisingais
      const isCorrect = 
        selectedIds.length === correctAnswers.length &&
        selectedIds.every(id => correctAnswers.includes(id))
      
      if (isCorrect) correctCount++
    })

    return {
      correct: correctCount,
      total: questions.length
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      const finalScore = calculateScore()
      setScore(finalScore)
      setIsComplete(true)
    }
  }

  if (isComplete && score) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-neutral-200">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-500 mb-2">
              {score.correct} / {score.total}
            </p>
            <p className="text-neutral-400">
              Correct Answers
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => router.push(`/modules/${moduleId}`)}
              variant="outline"
              className="flex items-center gap-2"
            >
              Return to Module <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <span className="text-sm text-neutral-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-neutral-200">
            {currentQuestion.order_number}. {currentQuestion.question_text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentAnswers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer.id)}
              className={`w-full text-left p-4 rounded transition-colors ${
                selectedAnswers[currentQuestion.id]?.includes(answer.id)
                  ? 'bg-blue-500/20 border border-blue-500'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              {answer.answer_text}
            </button>
          ))}
          
          <div className="flex justify-between mt-8">
            {currentQuestionIndex > 0 ? (
              <Button
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
            ) : (
              <div />
            )}
            
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              className="flex items-center gap-2"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'} 
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}