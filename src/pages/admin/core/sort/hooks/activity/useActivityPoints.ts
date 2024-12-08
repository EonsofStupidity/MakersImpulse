import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useActivityLogger } from "./useActivityLogger";

export const useActivityPoints = () => {
  const session = useSession();
  const { logActivity } = useActivityLogger();

  const recordActivityPoints = async (activityData: {
    duration: number;
    path: string;
    pointsToAward: number;
  }) => {
    if (!session?.user?.id) {
      console.error('No user session found for activity points', { 
        sessionExists: !!session,
        userId: session?.user?.id
      });
      return false;
    }

    try {
      console.log('Recording activity points', {
        userId: session.user.id,
        ...activityData
      });

      const { error: activityError } = await supabase
        .from('user_activity_points')
        .insert({
          user_id: session.user.id,
          activity_type: 'page_visit',
          points: activityData.pointsToAward,
          metadata: {
            page_path: activityData.path,
            duration_seconds: Math.floor(activityData.duration / 1000)
          }
        });

      if (activityError) {
        console.error('Error recording activity points:', activityError);
        return false;
      }

      console.log('Activity points recorded successfully', {
        userId: session.user.id,
        pointsAwarded: activityData.pointsToAward
      });

      return true;
    } catch (error) {
      console.error('Exception recording activity points:', error);
      return false;
    }
  };

  return { recordActivityPoints };
};