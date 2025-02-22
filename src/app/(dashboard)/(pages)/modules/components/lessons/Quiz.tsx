// 'use client'

// import React from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ChevronRight, ChevronLeft } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// interface QuizProps {
//   questions: any[]
//   answers: any[]
//   moduleId: string
// }

// export const Quiz = ({ questions, answers, moduleId }: QuizProps) => {
//   const router = useRouter()
//   const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
//   const [selectedAnswers, setSelectedAnswers] = React.useState<{[key: number]: number[]}>({})
//   const [isComplete, setIsComplete] = React.useState(false)
//   const [score, setScore] = React.useState<{correct: number, total: number} | null>(null)

//   const currentQuestion = questions[currentQuestionIndex]
//   const currentAnswers = answers.filter(a => a.question_id === currentQuestion?.id)
  
//   const handleAnswerSelect = (answerId: number) => {
//     setSelectedAnswers(prev => {
//       const current = prev[currentQuestion.id] || []
//       return {
//         ...prev,
//         [currentQuestion.id]: current.includes(answerId)
//           ? current.filter(id => id !== answerId)
//           : [...current, answerId]
//       }
//     })
//   }

//   const calculateScore = () => {
//     let correctCount = 0
//     questions.forEach(question => {
//       const selectedIds = selectedAnswers[question.id] || []
//       const correctAnswers = answers
//         .filter(a => a.question_id === question.id && a.is_correct)
//         .map(a => a.id)
      
//       const isCorrect = 
//         selectedIds.length === correctAnswers.length &&
//         selectedIds.every(id => correctAnswers.includes(id))
      
//       if (isCorrect) correctCount++
//     })
//     return {
//       correct: correctCount,
//       total: questions.length
//     }
//   }

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1)
//     } else {
//       const finalScore = calculateScore()
//       setScore(finalScore)
//       setIsComplete(true)
//     }
//   }

//   if (isComplete && score) {
//     return (
//       <div className="max-w-3xl mx-auto px-4">
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-medium text-white mb-2">Quiz Complete!</h2>
//             <div className="flex flex-col items-center justify-center mt-8 mb-6">
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
//                   <span className="text-4xl font-bold text-blue-400">
//                     {Math.round((score.correct / score.total) * 100)}%
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 text-gray-400">
//                 <span className="text-xl font-medium text-blue-400">{score.correct}</span>
//                 <span className="mx-2">/</span>
//                 <span className="text-xl">{score.total}</span>
//                 <p className="text-sm mt-1">Correct Answers</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-center">
//             <button 
//               onClick={() => router.push(`/modules/${moduleId}`)}
//               className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2"
//             >
//               Return to Module <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4">
//       <div className="flex justify-center mb-4">
//         <span className="text-sm text-gray-400">
//           Question {currentQuestionIndex + 1} of {questions.length}
//         </span>
//       </div>

//       <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
//         <div className="h-1 bg-gray-800">
//           <div 
//             className="h-full bg-blue-500 transition-all duration-300" 
//             style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
//           />
//         </div>

//         <div className="p-6">
//           <div className="mb-8">
//             <h3 className="text-xl font-medium text-white mb-2">
//               {currentQuestion.question_text}
//             </h3>
//             <p className="text-sm text-gray-400">Select all that apply</p>
//           </div>

//           <div className="space-y-3">
//             {currentAnswers.map((answer) => (
//               <button
//                 key={answer.id}
//                 onClick={() => handleAnswerSelect(answer.id)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
//                   selectedAnswers[currentQuestion.id]?.includes(answer.id)
//                     ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
//                     : 'border-transparent bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-white'
//                 }`}
//               >
//                 {answer.answer_text}
//               </button>
//             ))}
//           </div>
          
//           <div className="flex justify-between mt-8 pt-6 border-t border-gray-800/40">
//             {currentQuestionIndex > 0 ? (
//               <button
//                 onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
//                 className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2"
//               >
//                 <ChevronLeft className="w-4 h-4" /> Previous
//               </button>
//             ) : (
//               <div />
//             )}
            
//             <button
//               onClick={handleNextQuestion}
//               className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-4 py-2 rounded-lg flex items-center gap-2"
//             >
//               {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Quiz

'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card"
import { Button } from "@/components/button"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface QuizProps {
  questions: any[]
  answers: any[]
  moduleId: string
  onComplete?: () => void
  isLastSubLesson?: boolean
}

export const Quiz = ({ questions, answers, moduleId, onComplete, isLastSubLesson }: QuizProps) => {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswers, setSelectedAnswers] = React.useState<{[key: number]: number[]}>({})
  const [isComplete, setIsComplete] = React.useState(false)
  const [score, setScore] = React.useState<{correct: number, total: number} | null>(null)

  if (!questions.length || !answers.length) {
    return <div className="text-center p-6">Loading quiz...</div>
  }

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
    let correctCount = 0
    questions.forEach(question => {
      const selectedIds = selectedAnswers[question.id] || []
      const correctAnswers = answers
        .filter(a => a.question_id === question.id && a.is_correct)
        .map(a => a.id)
      
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
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Quiz Complete!</h2>
            <div className="flex flex-col items-center justify-center mt-8 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-400">
                    {Math.round((score.correct / score.total) * 100)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 text-gray-400">
                <span className="text-xl font-medium text-blue-400">{score.correct}</span>
                <span className="mx-2">/</span>
                <span className="text-xl">{score.total}</span>
                <p className="text-sm mt-1">Correct Answers</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                if (isLastSubLesson) {
                  router.push(`/modules/${moduleId}`)
                } else if (onComplete) {
                  onComplete()
                }
              }}
              className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2"
            >
              {isLastSubLesson ? 'Return to Module' : 'Next Lesson'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-medium text-white mb-2">
              {currentQuestion.question_text}
            </h3>
            <p className="text-sm text-gray-400">Select all that apply</p>
          </div>

          <div className="space-y-3">
            {currentAnswers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(answer.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion.id]?.includes(answer.id)
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                    : 'border-transparent bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-white'
                }`}
              >
                {answer.answer_text}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800/40">
            {currentQuestionIndex > 0 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div />
            )}
            
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz