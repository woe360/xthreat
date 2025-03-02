import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Get the domain for cookie settings
const getDomain = () => {
  if (typeof window === 'undefined') return '';
  return '';  // Always return empty string to use default cookie domain
}

// Force disable all cookie-based storage for Supabase sessions
// This is crucial to prevent cross-tab contamination
if (typeof window !== 'undefined') {
  // Clear any existing auth cookies on load
  document.cookie = `sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  document.cookie = `sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  document.cookie = `supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

// Create a map to store tab-specific Supabase clients
const clientsMap = new Map();

// Generate a secure tab ID that's guaranteed to be unique per tab
function generateSecureTabId() {
  return `tab_${Date.now()}_${Math.random().toString(36).slice(2)}_${Math.random().toString(36).slice(2)}`;
}

// This function initializes or retrieves the tab ID
function getTabId() {
  if (typeof window === 'undefined') return null;
  
  // Try to get existing tab ID
  let tabId = sessionStorage.getItem('secure_tab_id');
  
  // If no tab ID exists, create one
  if (!tabId) {
    tabId = generateSecureTabId();
    sessionStorage.setItem('secure_tab_id', tabId);
    console.log(`Generated new tab ID: ${tabId}`);
  }
  
  return tabId;
}

export function getTabSpecificSupabaseClient() {
  // For server-side rendering, return a standard client
  if (typeof window === 'undefined') {
    return createClientComponentClient();
  }

  // Get the tab ID
  const tabId = getTabId();
  if (!tabId) {
    console.error('Failed to generate or retrieve tab ID');
    // Fallback to a default client if we can't get a tab ID
    return createClientComponentClient({
      isSingleton: false,
      options: {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          cookieOptions: {
            path: '/'
          }
        }
      } as any
    });
  }
  
  // If the client already exists for this tab, return it
  if (clientsMap.has(tabId)) {
    return clientsMap.get(tabId);
  }
  
  // ALWAYS clear cookies before creating a new client to prevent interference
  document.cookie = `sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  document.cookie = `sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  document.cookie = `supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  
  console.log(`Creating new Supabase client for tab: ${tabId}`);
  
  // Create a new client with session persistence disabled
  const client = createClientComponentClient({
    isSingleton: false,
    options: {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        storageKey: `sb-session-${tabId}`,
        cookieOptions: {
          path: '/'
        }
      }
    } as any
  });
  
  // Try to restore the session from sessionStorage
  const sessionKey = `sb-session-${tabId}`;
  const userKey = `sb-user-${tabId}`;
  const storedSessionStr = sessionStorage.getItem(sessionKey);
  
  if (storedSessionStr) {
    try {
      const session = JSON.parse(storedSessionStr);
      if (session?.access_token && session?.refresh_token) {
        console.log(`Restoring session for tab: ${tabId}`);
        
        // Set the session in the client
        client.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token
        }).then(({ data, error }) => {
          if (error) {
            console.error('Error restoring session:', error);
            sessionStorage.removeItem(sessionKey);
            sessionStorage.removeItem(userKey);
          } else if (data?.user) {
            // Update the user data
            sessionStorage.setItem(userKey, JSON.stringify(data.user));
            console.log(`Successfully restored session for user: ${data.user.email}`);
          }
        });
      }
    } catch (error) {
      console.error('Error parsing stored session:', error);
      sessionStorage.removeItem(sessionKey);
      sessionStorage.removeItem(userKey);
    }
  }
  
  // Handle auth state changes
  client.auth.onAuthStateChange((event, session) => {
    if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
      console.log(`Auth event: ${event} for tab: ${tabId}`);
      
      // Store session data in sessionStorage
      sessionStorage.setItem(sessionKey, JSON.stringify({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at
      }));
      
      // Store user data
      if (session.user) {
        sessionStorage.setItem(userKey, JSON.stringify(session.user));
      }
      
      // ALWAYS clear cookies to prevent cross-tab contamination
      document.cookie = `sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
      document.cookie = `sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
      document.cookie = `supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    } else if (event === 'SIGNED_OUT') {
      console.log(`Auth event: ${event} for tab: ${tabId}`);
      sessionStorage.removeItem(sessionKey);
      sessionStorage.removeItem(userKey);
    }
  });
  
  // Store the client in the map
  clientsMap.set(tabId, client);
  
  return client;
}

// Get current user based on tab ID
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  
  const tabId = getTabId();
  if (!tabId) return null;
  
  const userStr = sessionStorage.getItem(`sb-user-${tabId}`);
  return userStr ? JSON.parse(userStr) : null;
}

// Clear session for the current tab
export function clearCurrentSession() {
  if (typeof window === 'undefined') return;
  
  const tabId = getTabId();
  if (!tabId) return;
  
  const client = clientsMap.get(tabId);
  if (client) {
    // Sign out only from this client instance
    client.auth.signOut({ scope: 'local' });
    clientsMap.delete(tabId);
  }
  
  sessionStorage.removeItem(`sb-session-${tabId}`);
  sessionStorage.removeItem(`sb-user-${tabId}`);
  console.log(`Cleared session for tab: ${tabId}`);
}

// Function to get current tab ID - useful for debugging
export function getCurrentTabId() {
  return typeof window !== 'undefined' ? getTabId() : null;
} 