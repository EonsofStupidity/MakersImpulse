import { useCallback } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";

export const useActivityLogger = () => {
  const session = useSession();

  const logActivity = useCallback(async (activityType: string, metadata: any = {}) => {
    if (!session?.user?.id) {
      console.log('No user session found for activity logging');
      return;
    }

    try {
      const { error } = await supabase
        .from('activity_feed')
        .insert({
          user_id: session.user.id,
          activity_type: activityType,
          content: `User performed ${activityType}`,
          metadata
        });

      if (error) {
        console.error('Error logging activity:', error);
      } else {
        console.log('Activity logged successfully:', {
          activityType,
          userId: session.user.id,
          metadata
        });
      }
    } catch (error) {
      console.error('Exception logging activity:', error);
    }
  }, [session?.user?.id]);

  return { logActivity };
};