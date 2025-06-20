import { useEffect, useRef } from 'react'
import { analytics, type QuizAnalytics, type EmailComparisonAnalytics, type LessonAnalytics } from '@/lib/analytics'

export function useAnalytics(componentType?: string) {
  const startTimeRef = useRef<number>(Date.now())
  const interactionCountRef = useRef<number>(0)

  // Only track mount/unmount for specific lesson components for completion tracking
  useEffect(() => {
    if (!componentType || !['concept_overview', 'email_comparison', 'email_inspector', 'quiz'].includes(componentType)) return
    
    startTimeRef.current = Date.now()
    // No mount tracking - we have lesson_start for that
    
    return () => {
      // Only track unmount for completed lessons (lesson components)
      if (componentType && ['concept_overview', 'email_comparison', 'email_inspector', 'quiz'].includes(componentType)) {
        const timeSpent = Date.now() - startTimeRef.current
        // Only track if the session was meaningful (more than 5 seconds)
        if (timeSpent > 5000) {
          analytics.trackUserInteraction(componentType, 'session_end', { time_spent: timeSpent })
        }
      }
    }
  }, [componentType])

  // Helper function to track interactions - but be more selective
  const trackInteraction = (action: string, data?: Record<string, any>) => {
    if (!componentType) return
    
    // Only track important interactions, not every click
    if (['element_found', 'difference_found', 'hint_used', 'completion'].includes(action)) {
      interactionCountRef.current += 1
      analytics.trackUserInteraction(componentType, action, {
        ...data,
        interaction_count: interactionCountRef.current
      })
    }
  }

  // Quiz analytics
  const trackQuizStart = (moduleId: string, quizId: string) => {
    analytics.trackQuizStart(moduleId, quizId)
    startTimeRef.current = Date.now()
  }

  const trackQuizAnswer = (questionId: string, selectedAnswers: number[], isCorrect: boolean) => {
    analytics.trackQuizAnswer(questionId, selectedAnswers, isCorrect)
    trackInteraction('quiz_answer', { question_id: questionId, is_correct: isCorrect })
  }

  const trackQuizComplete = (moduleId: string, score: number, totalQuestions: number, answers: any[]) => {
    const timeSpent = Date.now() - startTimeRef.current
    const quizAnalytics: QuizAnalytics = {
      quiz_id: `${moduleId}_quiz`,
      score,
      total_questions: totalQuestions,
      time_spent: timeSpent,
      answers
    }
    analytics.trackQuizComplete(moduleId, quizAnalytics)
  }

  // Email Comparison analytics
  const trackEmailComparisonStart = (moduleId: string, exerciseId: string = 'email_comparison') => {
    analytics.trackEmailComparisonStart(moduleId, exerciseId)
    startTimeRef.current = Date.now()
  }

  const trackDifferenceFound = (differenceId: string, moduleId: string) => {
    analytics.trackEmailComparisonDifference(differenceId, moduleId)
    trackInteraction('difference_found', { difference_id: differenceId })
  }

  const trackHintUsed = (moduleId: string, hintIndex: number) => {
    analytics.trackEmailComparisonHint(moduleId, hintIndex)
    trackInteraction('hint_used', { hint_index: hintIndex })
  }

  const trackEmailComparisonComplete = (
    moduleId: string, 
    differencesFound: string[], 
    totalDifferences: number, 
    hintsUsed: number
  ) => {
    const timeSpent = Date.now() - startTimeRef.current
    const completionRate = (differencesFound.length / totalDifferences) * 100
    
    const emailAnalytics: EmailComparisonAnalytics = {
      exercise_id: 'email_comparison',
      differences_found: differencesFound,
      total_differences: totalDifferences,
      hints_used: hintsUsed,
      time_spent: timeSpent,
      completion_rate: completionRate
    }
    analytics.trackEmailComparisonComplete(moduleId, emailAnalytics)
  }

  // Lesson analytics
  const trackLessonStart = (moduleId: string, lessonId: string) => {
    analytics.trackLessonStart(moduleId, lessonId)
    startTimeRef.current = Date.now()
  }

  const trackLessonComplete = (moduleId: string, lessonId: string, status: 'completed' | 'abandoned' = 'completed') => {
    const timeSpent = Date.now() - startTimeRef.current
    const lessonAnalytics: LessonAnalytics = {
      lesson_id: lessonId,
      module_id: moduleId,
      time_spent: timeSpent,
      completion_status: status,
      interactions: interactionCountRef.current
    }
    analytics.trackLessonComplete(lessonAnalytics)
  }

  // Session analytics
  const trackSessionStart = () => {
    analytics.trackSessionStart()
  }

  const trackSessionEnd = () => {
    analytics.trackSessionEnd()
  }

  return {
    // Generic
    trackInteraction,
    
    // Quiz
    trackQuizStart,
    trackQuizAnswer,
    trackQuizComplete,
    
    // Email Comparison
    trackEmailComparisonStart,
    trackDifferenceFound,
    trackHintUsed,
    trackEmailComparisonComplete,
    
    // Lessons
    trackLessonStart,
    trackLessonComplete,
    
    // Session
    trackSessionStart,
    trackSessionEnd,
    
    // Utilities
    getTimeSpent: () => Date.now() - startTimeRef.current,
    getInteractionCount: () => interactionCountRef.current
  }
} 