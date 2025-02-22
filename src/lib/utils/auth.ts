import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// export const checkAuthStatus = async () => {
//   const supabase = createClientComponentClient()
  
//   try {
//     const { data: { user }, error } = await supabase.auth.getUser()
    
//     if (error) throw error
    
//     return {
//       isAuthenticated: !!user,
//       user: user || null,
//       error: null
//     }
//   } catch (error) {
//     console.error('Auth check failed:', error)
//     return {
//       isAuthenticated: false,
//       user: null,
//       error
//     }
//   }
// }

export const checkAuthStatus = async () => {
  const supabase = createClientComponentClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) throw error
    
    if (user) {
      // Also check if user exists in users table
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (dbError || !dbUser) {
        console.error('User not in database:', dbError);
        return {
          isAuthenticated: false,
          user: null,
          error: new Error('User not found in database')
        }
      }
    }
    
    return {
      isAuthenticated: !!user,
      user: user || null,
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