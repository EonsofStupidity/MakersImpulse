import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import { useActivityLogger } from './useActivityLogger';
import { useActivityPoints } from './useActivityPoints';
import { useActivityMetrics } from './useActivityMetrics';
import { useDailyPoints } from './useDailyPoints';

export const useActivityCore = () => {
  const location = useLocation();
  const session = useSession();
  const { logActivity } = useActivityLogger();
  const { recordActivityPoints } = useActivityPoints();
  const { recordActivityMetrics } = useActivityMetrics();
  const { updateDailyPoints } = useDailyPoints();

  useEffect(() => {
    if (!session?.user?.id) {
      console.log('No user session found for activity tracking', {
        sessionExists: !!session,
        userId: session?.user?.id,
        path: location.pathname
      });
      return;
    }

    console.log('Activity tracking initialized', {
      userId: session.user.id,
      path: location.pathname
    });

    return () => {
      console.log('Cleaning up activity tracking', {
        userId: session.user.id,
        path: location.pathname
      });
    };
  }, [location.pathname, session?.user?.id]);

  return {
    session,
    logActivity,
    recordActivityPoints,
    recordActivityMetrics,
    updateDailyPoints
  };
};