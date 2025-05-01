import { ComponentType } from 'react';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import LoadingSpinner from '@/components/LoadingSpinner';

type UserRole = 'admin' | 'manager' | 'user';

interface WithRoleAccessProps {
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
}

export function withRoleAccess<P extends object>(
  WrappedComponent: ComponentType<P>,
  { requiredRole, redirectTo = '/dashboard' }: WithRoleAccessProps = {}
) {
  return function WithRoleAccessWrapper(props: P) {
    const { hasAccess, loading } = useRoleAccess({
      requiredRole,
      redirectTo,
    });

    if (loading) {
      return <LoadingSpinner />;
    }

    if (!hasAccess) {
      return null; // The useRoleAccess hook will handle the redirect
    }

    return <WrappedComponent {...props} />;
  };
} 