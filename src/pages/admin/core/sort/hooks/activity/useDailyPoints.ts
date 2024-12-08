import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useActivityLogger } from "./useActivityLogger";
import { ActivityData } from "./types";

export const useDailyPoints = () => {
  const session = useSession();
  const { logActivity } = useActivityLogger();

  const updateDailyPoints = async (data: ActivityData) => {
    if (!session?.user?.id) {
      console.error('No user session found for daily points', {
        sessionExists: !!session,
        userId: session?.user?.id
      });
      return false;
    }

    try {
      console.log('Updating daily points', {
        userId: session.user.id,
        data
      });

      const { error: dailyError } = await supabase
        .from('daily_point_totals')
        .upsert({
          user_id: session.user.id,
          date: new Date().toISOString().split('T')[0],
          activity_type: 'page_visit',
          points_earned: Math.min(data.currentDailyPoints + data.pointsToAward, 100),
          consecutive_days: data.dailyPoints?.consecutive_days || 1
        }, {
          onConflict: 'user_id,activity_type,date'
        });

      if (dailyError) {
        console.error('Error updating daily points:', dailyError);
        return false;
      }

      console.log('Daily points updated successfully', {
        userId: session.user.id,
        newTotal: Math.min(data.currentDailyPoints + data.pointsToAward, 100)
      });

      return true;
    } catch (error) {
      console.error('Exception updating daily points:', error);
      return false;
    }
  };

  return { updateDailyPoints };
};