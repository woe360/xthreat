interface AnalyticsEvent {
  event_type: string
  user_id?: string
  module_id?: string
  lesson_id?: string
  component_type: string
  data: Record<string, any>
  timestamp: string
}

interface QuizAnalytics {
  quiz_id: string
  score: number
  total_questions: number
  time_spent: number
  answers: Array<{
    question_id: string
    selected_answers: number[]
    is_correct: boolean
  }>
}

interface EmailComparisonAnalytics {
  exercise_id: string
  differences_found: string[]
  total_differences: number
  hints_used: number
  time_spent: number
  completion_rate: number
}

interface LessonAnalytics {
  lesson_id: string
  module_id: string
  time_spent: number
  completion_status: 'started' | 'completed' | 'abandoned'
  interactions: number
}

class AnalyticsService {
  private events: AnalyticsEvent[] = []
  private sessionStart: number = Date.now()

  // Generic event tracking
  async trackEvent(eventType: string, componentType: string, data: Record<string, any>) {
    const event: AnalyticsEvent = {
      event_type: eventType,
      user_id: await this.getCurrentUserId(),
      component_type: componentType,
      data,
      timestamp: new Date().toISOString()
    }

    this.events.push(event)
    
    // Send to your backend/database
    try {
      await this.sendToBackend(event)
    } catch (error) {
      console.error('Analytics tracking failed:', error)
    }
  }

  // Quiz-specific tracking
  async trackQuizStart(moduleId: string, quizId: string) {
    await this.trackEvent('quiz_started', 'quiz', {
      module_id: moduleId,
      quiz_id: quizId,
      start_time: Date.now()
    })
  }

  async trackQuizComplete(moduleId: string, analytics: QuizAnalytics) {
    await this.trackEvent('quiz_completed', 'quiz', {
      module_id: moduleId,
      ...analytics,
      session_duration: Date.now() - this.sessionStart
    })
  }

  async trackQuizAnswer(questionId: string, selectedAnswers: number[], isCorrect: boolean) {
    await this.trackEvent('quiz_answer', 'quiz', {
      question_id: questionId,
      selected_answers: selectedAnswers,
      is_correct: isCorrect,
      timestamp: Date.now()
    })
  }

  // Email Comparison tracking
  async trackEmailComparisonStart(moduleId: string, exerciseId: string) {
    await this.trackEvent('email_comparison_started', 'email_comparison', {
      module_id: moduleId,
      exercise_id: exerciseId,
      start_time: Date.now()
    })
  }

  async trackEmailComparisonDifference(differenceId: string, moduleId: string) {
    await this.trackEvent('difference_found', 'email_comparison', {
      module_id: moduleId,
      difference_id: differenceId,
      timestamp: Date.now()
    })
  }

  async trackEmailComparisonHint(moduleId: string, hintIndex: number) {
    await this.trackEvent('hint_used', 'email_comparison', {
      module_id: moduleId,
      hint_index: hintIndex,
      timestamp: Date.now()
    })
  }

  async trackEmailComparisonComplete(moduleId: string, analytics: EmailComparisonAnalytics) {
    await this.trackEvent('email_comparison_completed', 'email_comparison', {
      module_id: moduleId,
      ...analytics,
      session_duration: Date.now() - this.sessionStart
    })
  }

  // Lesson/Module tracking
  async trackLessonStart(moduleId: string, lessonId: string) {
    await this.trackEvent('lesson_started', 'lesson', {
      module_id: moduleId,
      lesson_id: lessonId,
      start_time: Date.now()
    })
  }

  async trackLessonComplete(analytics: LessonAnalytics) {
    await this.trackEvent('lesson_completed', 'lesson', {
      ...analytics,
      session_duration: Date.now() - this.sessionStart
    })
  }

  // User engagement tracking
  async trackUserInteraction(componentType: string, action: string, data?: Record<string, any>) {
    await this.trackEvent('user_interaction', componentType, {
      action,
      ...data,
      timestamp: Date.now()
    })
  }

  // Session tracking
  async trackSessionStart() {
    this.sessionStart = Date.now()
    await this.trackEvent('session_started', 'session', {
      start_time: this.sessionStart,
      user_agent: navigator.userAgent,
      url: window.location.href
    })
  }

  async trackSessionEnd() {
    await this.trackEvent('session_ended', 'session', {
      duration: Date.now() - this.sessionStart,
      events_count: this.events.length
    })
  }

  // Private methods
  private async getCurrentUserId(): Promise<string | undefined> {
    try {
      const { getTabSpecificSupabaseClient } = await import('@/lib/supabase/client')
      const supabase = getTabSpecificSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      return user?.id
    } catch (error) {
      console.error('Failed to get current user ID:', error)
      return undefined
    }
  }

  private async sendToBackend(event: AnalyticsEvent) {
    console.log('📊 Sending analytics event:', event)
    console.log('📊 Making request to:', '/api/analytics')
    
    try {
      // Send to your Supabase database or analytics service
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      })

      console.log('📊 Response status:', response.status)
      console.log('📊 Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Analytics API error:', response.status, errorText)
        throw new Error(`Failed to send analytics event: ${response.status} ${errorText}`)
      }
      
      const responseData = await response.json()
      console.log('✅ Analytics event sent successfully')
      console.log('✅ Response data:', responseData)
    } catch (fetchError) {
      console.error('❌ Fetch error:', fetchError)
      throw fetchError
    }
  }

  // Get analytics data for dashboards
  getSessionEvents(): AnalyticsEvent[] {
    return this.events
  }

  getEventsByType(eventType: string): AnalyticsEvent[] {
    return this.events.filter(event => event.event_type === eventType)
  }
}

// Export singleton instance
export const analytics = new AnalyticsService()

// Export types for components to use
export type { QuizAnalytics, EmailComparisonAnalytics, LessonAnalytics, AnalyticsEvent } 