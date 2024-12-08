// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import type { AuthGuardProps } from '@/lib/types/auth';

// const ProtectedRoute = ({ children }: AuthGuardProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();
        
//         if (!session) {
//           router.replace('/login');
//           return;
//         }
        
//         setIsAuthenticated(true);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         router.replace('/login');
//       }
//     };

//     checkAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'SIGNED_OUT' || !session) {
//         setIsAuthenticated(false);
//         router.replace('/login');
//       } else if (event === 'SIGNED_IN' && session) {
//         setIsAuthenticated(true);
//         setIsLoading(false);
//       }
//     });

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [router, supabase]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-black">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AuthGuardProps } from '@/lib/types/auth';

const ProtectedRoute = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          router.replace('/login');
          return;
        }
        
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace('/login');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
    });

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