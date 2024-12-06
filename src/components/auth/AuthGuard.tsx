import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && requireAuth) {
      navigate('/login');
    }
  }, [session, requireAuth, navigate]);

  if (!session && requireAuth) {
    return null;
  }

  return <>{children}</>;
};