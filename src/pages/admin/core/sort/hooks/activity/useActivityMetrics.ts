import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useActivityLogger } from "./useActivityLogger";
import { ActivityMetrics } from "./types";

export const useActivityMetrics = () => {
  const session = useSession();
  const { logActivity } = useActivityLogger();

  const recordActivityMetrics = async (metrics: ActivityMetrics) => {
    if (!session?.user?.id) {
      console.error('No user session found for activity metrics', {
        sessionExists: !!session,
        userId: session?.user?.id
      });
      return false;
    }

    try {
      console.log('Recording activity metrics', {
        userId: session.user.id,
        metrics
      });

      const { error } = await supabase
        .from('user_activity_metrics')
        .insert({
          user_id: session.user.id,
          ...metrics
        });

      if (error) {
        console.error('Error recording activity metrics:', error);
        return false;
      }

      console.log('Activity metrics recorded successfully', {
        userId: session.user.id,
        metrics
      });

      return true;
    } catch (error) {
      console.error('Exception recording activity metrics:', error);
      return false;
    }
  };

  return { recordActivityMetrics };
};