import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";

export const useActivityTracking = () => {
  const location = useLocation();
  const session = useSession();

  useEffect(() => {
    if (!session?.user?.id) {
      console.log('No authenticated user found for activity tracking');
      return;
    }

    let startTime = Date.now();
    let activityTimeout: NodeJS.Timeout;
    let lastRecordedTime = startTime;

    const handleActivity = async () => {
      if (!session?.user?.id) return;

      const currentTime = Date.now();
      const timeSinceLastRecord = currentTime - lastRecordedTime;
      
      console.log('Activity detected', {
        userId: session.user.id,
        timeSinceLastRecord,
        path: location.pathname
      });

      // Only record if enough time has passed (1 minute)
      if (timeSinceLastRecord >= 60000) {
        try {
          // Record activity points
          const { error: pointsError } = await supabase
            .from('user_activity_points')
            .insert({
              user_id: session.user.id,
              activity_type: 'page_visit',
              points: 2,
              metadata: {
                page_path: location.pathname,
                duration: timeSinceLastRecord
              }
            });

          if (pointsError) {
            console.error('Error recording activity points:', pointsError);
          } else {
            console.log('Activity points recorded successfully', {
              userId: session.user.id,
              points: 2,
              path: location.pathname
            });
          }

          // Update daily points
          const today = new Date().toISOString().split('T')[0];
          const { error: dailyError } = await supabase
            .from('daily_point_totals')
            .upsert({
              user_id: session.user.id,
              date: today,
              activity_type: 'page_visit',
              points_earned: 2,
              consecutive_days: 1
            }, {
              onConflict: 'user_id,activity_type,date'
            });

          if (dailyError) {
            console.error('Error updating daily points:', dailyError);
          } else {
            console.log('Daily points updated successfully', {
              userId: session.user.id,
              date: today
            });
          }

        } catch (error) {
          console.error('Error in activity tracking:', error);
        }

        lastRecordedTime = currentTime;
      }

      // Reset timeout
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        handleActivity();
      }, 60000); // Check every minute
    };

    // Add event listeners
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    // Initial activity record
    handleActivity();

    // Cleanup
    return () => {
      clearTimeout(activityTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [location.pathname, session?.user?.id]);
};