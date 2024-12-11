import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store/auth-store';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string | string[];
  fallbackPath?: string;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = true,
  requiredRole,
  fallbackPath = '/login'
}: AuthGuardProps) => {
  const navigate = useNavigate();
  const { session, user, isLoading } = useAuthStore();

  useEffect(() => {
    console.log('AuthGuard: Checking access', {
      requireAuth,
      requiredRole,
      hasSession: !!session,
      userRole: user?.role
    });

    if (!isLoading) {
      if (requireAuth && !session) {
        console.log('AuthGuard: No session, redirecting to', fallbackPath);
        toast.error('Please sign in to continue', {
          description: 'You need to be authenticated to access this page'
        });
        navigate(fallbackPath);
        return;
      }

      if (requiredRole && user) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(user.role as string)) {
          console.log('AuthGuard: Insufficient permissions');
          toast.error('Access Denied', {
            description: 'You do not have permission to access this page'
          });
          navigate(fallbackPath);
          return;
        }
      }
    }
  }, [session, user, isLoading, requireAuth, requiredRole, navigate, fallbackPath]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="flex flex-col items-center gap-4 p-8 rounded-lg bg-black/40 border border-white/10"
        >
          <Loader2 className="h-8 w-8 animate-spin text-[#41f0db]" />
          <p className="text-white/80 text-sm">Verifying access...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};