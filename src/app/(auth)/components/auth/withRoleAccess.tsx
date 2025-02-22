import { ComponentType } from 'react';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import LoadingSpinner from '@/components/LoadingSpinner';

interface WithRoleAccessProps {
  requiredRole?: string | string[];
  redirectTo?: string;
}

export function withRoleAccess<P extends object>(
  WrappedComponent: ComponentType<P>,
  { requiredRole, redirectTo = '/dashboard' }: WithRoleAccessProps = {}
) {
  return function WithRoleAccessWrapper(props: P) {
    const { hasAccess, loading } = useRoleAccess({
      requiredRole: requiredRole as any,
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