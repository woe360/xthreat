import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'manager' | 'user';

interface UseRoleAccessProps {
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
}

export function useRoleAccess({ requiredRole, redirectTo = '/dashboard' }: UseRoleAccessProps = {}) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function checkAccess() {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        // Get user role from the database
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error || !userData) {
          console.error('Error fetching user role:', error);
          router.push('/login');
          return;
        }

        const userRole = userData.role as UserRole || 'user';
        setRole(userRole);

        // If no specific role is required, grant access
        if (!requiredRole) {
          setHasAccess(true);
          setLoading(false);
          return;
        }

        // Check if user has required role
        const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        const hasRequiredRole = userRole === 'admin' || requiredRoles.includes(userRole);

        if (!hasRequiredRole && redirectTo) {
          router.push(redirectTo);
        }

        setHasAccess(hasRequiredRole);
        setLoading(false);

      } catch (error) {
        console.error('Error checking role access:', error);
        setHasAccess(false);
        setLoading(false);
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    }

    checkAccess();
  }, [requiredRole, redirectTo, router, supabase]);

  return { role, hasAccess, loading };
}

// Helper function to check if user has required role
export function hasRequiredRole(userRole: string | null, requiredRole: string | string[]): boolean {
  if (!userRole) return false;
  if (userRole === 'admin') return true;
  
  const required = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return required.includes(userRole);
} 