import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Create a Supabase client that uses sessionStorage instead of cookies
// sessionStorage is already tab-specific by design
export function getTabSpecificSupabaseClient() {
  // For server-side rendering, return a standard client
  if (typeof window === 'undefined') {
    return createClientComponentClient();
  }

  // Create a client with cookies disabled and sessionStorage enabled
  return createClientComponentClient({
    isSingleton: false, // Don't reuse global instance across calls
    options: {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        storage: window.sessionStorage, // Use built-in sessionStorage
        detectSessionInUrl: false
      }
    } as any
  });
}

// Helper function for debugging
export function getCurrentTabId() {
  return typeof window !== 'undefined' ? 
    window.sessionStorage.getItem('supabase-auth-token') ? 'has-session' : 'no-session' 
    : null;
}

// Get current user - relies on sessionStorage's built-in tab isolation
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  
  try {
    const json = sessionStorage.getItem('supabase.auth.token');
    if (!json) return null;
    
    const data = JSON.parse(json);
    return data?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Clear session for the current tab
export function clearCurrentSession() {
  if (typeof window === 'undefined') return;
  
  const client = getTabSpecificSupabaseClient();
  client.auth.signOut();
} 