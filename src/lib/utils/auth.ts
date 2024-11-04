// src/lib/utils/auth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const checkAuthStatus = async () => {
  const supabase = createClientComponentClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) throw error
    
    return {
      isAuthenticated: !!session,
      user: session?.user || null,
      error: null
    }
  } catch (error) {
    console.error('Auth check failed:', error)
    return {
      isAuthenticated: false,
      user: null,
      error
    }
  }
}

export const signOut = async () => {
  const supabase = createClientComponentClient()
  
  try {
    await supabase.auth.signOut()
    return { error: null }
  } catch (error) {
    console.error('Sign out failed:', error)
    return { error }
  }
}