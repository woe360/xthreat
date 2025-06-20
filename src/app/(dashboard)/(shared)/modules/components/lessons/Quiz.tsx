'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'

interface QuizProps {
  questions: any[]
  answers: any[]
  moduleId: string
  onComplete?: () => void
}

export const Quiz = ({ questions, answers, moduleId, onComplete }: QuizProps) => {
  const router = useRouter()
  const { trackQuizStart, trackQuizComplete } = useAnalytics('quiz')
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswers, setSelectedAnswers] = React.useState<{[key: number]: number[]}>({})
  const [isComplete, setIsComplete] = React.useState(false)
  const [score, setScore] = React.useState<{correct: number, total: number} | null>(null)
  const [shuffledOptions, setShuffledOptions] = React.useState<any[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  // Track quiz start - only once when component mounts
  React.useEffect(() => {
    if (questions.length > 0) {
      trackQuizStart(moduleId, `quiz_${moduleId}`)
    }
  }, [questions.length, moduleId, trackQuizStart])

  React.useEffect(() => {
    if (currentQuestion) {
      const currentAns = answers.filter(a => a.question_id === currentQuestion.id);
      // Only take the first 4 answers and shuffle them
      const limitedAnswers = currentAns.slice(0, 4);
      setShuffledOptions(limitedAnswers.sort(() => Math.random() - 0.5));
    }
  }, [currentQuestion, answers]);

  if (!questions.length) {
    return <div className="text-center p-6">Loading quiz...</div>
  }

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswers(prev => {
      const currentQuestionId = currentQuestion.id;
      const currentSelection = prev[currentQuestionId] || [];
      const newSelection = currentSelection.includes(answerId)
        ? currentSelection.filter(id => id !== answerId)
        : [...currentSelection, answerId];
      
      // No longer track individual answers - too much spam!
      
      return {
        ...prev,
        [currentQuestionId]: newSelection
      };
    });
  };

  const calculateScore = () => {
    let correctCount = 0
    questions.forEach(question => {
      const selectedIds = selectedAnswers[question.id] || [];
      const correctAnswers = answers
        .filter(a => a.question_id === question.id && a.is_correct)
        .map(a => a.id);

      // Sort both arrays to ensure order doesn't affect comparison
      const sortedSelectedIds = [...selectedIds].sort();
      const sortedCorrectAnswers = [...correctAnswers].sort();
      
      // Check if the selected answers exactly match the correct answers
      const isCorrect = 
        sortedSelectedIds.length === sortedCorrectAnswers.length &&
        sortedSelectedIds.every((id, index) => id === sortedCorrectAnswers[index]);

      if (isCorrect) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      total: questions.length
    };
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      const finalScore = calculateScore()
      
      // Track quiz completion
      const quizAnswers = questions.map(question => {
        const selectedIds = selectedAnswers[question.id] || [];
        const correctAnswers = answers
          .filter(a => a.question_id === question.id && a.is_correct)
          .map(a => a.id);
        
        const isCorrect = 
          selectedIds.length === correctAnswers.length &&
          selectedIds.every(id => correctAnswers.includes(id));
          
        return {
          question_id: question.id.toString(),
          selected_answers: selectedIds,
          is_correct: isCorrect
        };
      });
      
      trackQuizComplete(moduleId, finalScore.correct, finalScore.total, quizAnswers);
      
      setScore(finalScore)
      setIsComplete(true)
    }
  }

  const isQuizFinished = currentQuestionIndex >= questions.length || isComplete;
  const selectedOptionIds = selectedAnswers[currentQuestion?.id] || [];

  if (isQuizFinished && score) {
    return (
      <div className="max-w-3xl w-full mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
          Quiz Completed
        </h1>
        
        <div className="relative w-full max-w-md mx-auto mb-12 py-8">
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
          <div className="relative z-10 text-center">
            <div className="text-4xl font-light text-white mb-2">{score.correct}/{score.total}</div>
            <p className="text-neutral-400">
              Your score: {Math.round((score.correct / score.total) * 100)}%
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto flex justify-center gap-4">
           <button
             onClick={() => router.push(`/modules/${moduleId}`)} 
             className="inline-flex items-center px-6 py-3 border border-gray-800 rounded-lg text-white hover:bg-white/5 transition"
           >
             Return to Module
           </button>
           <button
             onClick={onComplete} 
             className="inline-flex items-center px-6 py-3 border border-white/50 bg-white/20 text-white hover:bg-white/20 rounded-lg transition"
           >
              Continue <ChevronRight size={16} className="ml-1" />
           </button>
        </div>

      </div>
    )
  }

  if (!currentQuestion) {
    return <div className="text-center p-6">Loading question...</div>; 
  }
  
  return (
    <div className="max-w-3xl w-full mx-auto py-12 px-4">
      
      <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
        <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-light text-white mb-2">
          {currentQuestion.question_text}
        </h2>
      </div>
      
      <div className="space-y-3 mb-8">
        {shuffledOptions.map((option) => (
          <button
            key={option.id}
            className={`w-full p-4 text-left border rounded-lg transition-all ${ 
              selectedOptionIds.includes(option.id) // Check if ID is in the array
              ? "border-purple-500/50 bg-purple-500/10 text-white" 
              : "border-gray-800 bg-black/20 text-neutral-300 hover:border-gray-700 hover:bg-black/40"
            }`}
            onClick={() => handleAnswerSelect(option.id)}
          >
            {option.answer_text}
          </button>
        ))}
      </div>
      
      <button
        onClick={handleNextQuestion}
        disabled={selectedOptionIds.length === 0}
        className={`w-full py-3 rounded-lg flex items-center justify-center transition-all ${ 
          selectedOptionIds.length === 0
          ? "bg-neutral-800/50 text-neutral-600 cursor-not-allowed"
          : "border border-white/50 bg-white/20 text-white hover:bg-white/20"
        }`}
      >
        {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'} 
        <ChevronRight size={16} className="ml-1" />
      </button>

    </div>
  )
}

export default Quiz