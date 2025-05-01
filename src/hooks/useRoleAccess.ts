import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'manager' | 'user';

interface UseRoleAccessProps {
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
}

export function useRoleAccess({ requiredRole, redirectTo = '/new-dashboard' }: UseRoleAccessProps = {}) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkAccess() {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          router.push('/login');
          return;
        }

        if (!session) {
          console.log('No active session');
          router.push('/login');
          return;
        }

        // Get user roles from the database - get all matches to handle duplicates
        const { data: userRecords, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('email', session.user.email);

        if (userError) {
          console.error('Error fetching user roles:', userError);
          router.push('/login');
          return;
        }

        // If no user records found, sign out and redirect to login
        if (!userRecords || userRecords.length === 0) {
          console.error('No user record found in database');
          await supabase.auth.signOut();
          router.push('/login?error=unauthorized&message=Account+not+found');
          return;
        }

        // Handle multiple user records - take the highest privilege role
        let effectiveRole: UserRole = 'user';
        // Priority: admin > manager > user
        if (userRecords.some(record => record.role === 'admin')) {
          effectiveRole = 'admin';
        } else if (userRecords.some(record => record.role === 'manager')) {
          effectiveRole = 'manager';
        }

        setRole(effectiveRole);

        // If no specific role is required, grant access
        if (!requiredRole) {
          setHasAccess(true);
          setLoading(false);
          return;
        }

        // Check if user has required role
        const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        const hasRequiredRole = effectiveRole === 'admin' || requiredRoles.includes(effectiveRole);

        setHasAccess(hasRequiredRole);
        if (!hasRequiredRole) {
          router.push(redirectTo);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error checking role access:', error);
        setHasAccess(false);
        setLoading(false);
        router.push(redirectTo);
      }
    }

    checkAccess();
  }, [router, supabase, requiredRole, redirectTo]);

  return { role, hasAccess, loading };
}

// Helper function to check if user has required role
export function hasRequiredRole(userRole: string | null, requiredRole: string | string[]): boolean {
  if (!userRole) return false;
  if (userRole === 'admin') return true;
  
  const required = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return required.includes(userRole);
} 