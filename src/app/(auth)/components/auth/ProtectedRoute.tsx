'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthGuardProps } from '@/lib/types/auth';
import { getTabSpecificSupabaseClient, getCurrentUser, getCurrentTabId } from '@/lib/supabase/client';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

const ProtectedRoute = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Get tab-specific Supabase client
  const supabase = getTabSpecificSupabaseClient();

  useEffect(() => {
    // Always clear cookies on load to prevent cross-tab contamination
    if (typeof window !== 'undefined') {
      document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      document.cookie = 'sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      document.cookie = 'supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    }

    const tabId = getCurrentTabId();
    console.log(`ProtectedRoute initialized for tab: ${tabId}`);

    const checkAuth = async () => {
      try {
        // First check if we have a user in sessionStorage (faster)
        const user = getCurrentUser();
        
        if (user) {
          console.log(`Found user in sessionStorage for tab ${tabId}:`, user.email);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
        
        // Fallback to checking with the client
        const { data: { user: clientUser }, error } = await supabase.auth.getUser();
        
        if (error || !clientUser) {
          console.log(`No user found with Supabase client for tab ${tabId}`);
          router.replace('/login');
          return;
        }
        
        console.log(`Found user with Supabase client for tab ${tabId}:`, clientUser.email);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_OUT' || !session) {
          setIsAuthenticated(false);
          router.replace('/login');
        } else if (event === 'SIGNED_IN' && session) {
          // Double check user authentication after sign in
          const { data: { user }, error } = await supabase.auth.getUser();
          if (error || !user) {
            router.replace('/login');
            return;
          }
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated
  return <>{children}</>;
};

export default ProtectedRoute;