import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const useAnalytics = () => {
  const supabase = createClientComponentClient()

  const trackInteraction = async ({
    interactionType,
    moduleId,
    lessonId,
    componentType,
    details,
    isCorrect = null,
  }: {
    interactionType: string
    moduleId: string
    lessonId: string
    componentType: string
    details?: any
    isCorrect?: boolean | null
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from('user_interactions').insert({
        user_id: user.id,
        module_id: moduleId,
        lesson_id: lessonId,
        component_type: componentType,
        interaction_type: interactionType,
        is_correct: isCorrect,
        details,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track interaction:', error)
    }
  }

  const trackCompletion = async ({
    moduleId,
    lessonId,
    componentType,
    score = null,
    details = null
  }: {
    moduleId: string
    lessonId: string
    componentType: string
    score?: number | null
    details?: any
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from('user_completions').insert({
        user_id: user.id,
        module_id: moduleId,
        lesson_id: lessonId,
        component_type: componentType,
        score,
        details,
        completion_time: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track completion:', error)
    }
  }

  return {
    trackInteraction,
    trackCompletion
  }
} 