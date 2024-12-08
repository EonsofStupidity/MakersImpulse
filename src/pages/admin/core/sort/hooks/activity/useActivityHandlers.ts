import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { ActivityData } from './types';

export const useActivityHandlers = (userId: string | undefined) => {
  const recordActivity = useCallback(async (duration: number, path: string) => {
    if (!userId) {
      console.log('No user ID available for recording activity');
      return;
    }

    console.log('Recording activity', { 
      duration,
      userId,
      path
    });

    try {
      if (duration >= 30000) { // Only record if duration is at least 30 seconds
        const today = new Date().toISOString().split('T')[0];
        const pointsToAward = Math.min(Math.floor(duration / 60000) * 2, 10);

        console.log('Calculating points', {
          duration,
          pointsToAward,
          today,
          userId
        });

        // Get current daily points
        const { data: dailyPoints, error: dailyFetchError } = await supabase
          .from('daily_point_totals')
          .select('points_earned, consecutive_days')
          .eq('user_id', userId)
          .eq('date', today)
          .eq('activity_type', 'page_visit')
          .single();

        if (dailyFetchError && dailyFetchError.code !== 'PGRST116') {
          console.error('Error fetching daily points:', dailyFetchError);
          return;
        }

        const currentDailyPoints = dailyPoints?.points_earned || 0;

        console.log('Current daily points:', {
          currentDailyPoints,
          dailyPoints,
          userId
        });

        // Only award points if under daily cap
        if (currentDailyPoints < 100) {
          // Record activity points
          const { error: pointsError } = await supabase
            .from('user_activity_points')
            .insert({
              user_id: userId,
              activity_type: 'page_visit',
              points: pointsToAward,
              metadata: {
                page_path: path,
                duration_seconds: Math.floor(duration / 1000)
              }
            });

          if (pointsError) {
            console.error('Error recording activity points:', pointsError);
            return;
          }

          console.log('Activity points recorded successfully', {
            pointsToAward,
            userId
          });

          // Update daily points
          const { error: dailyError } = await supabase
            .from('daily_point_totals')
            .upsert({
              user_id: userId,
              date: today,
              activity_type: 'page_visit',
              points_earned: Math.min(currentDailyPoints + pointsToAward, 100),
              consecutive_days: dailyPoints?.consecutive_days || 1
            }, {
              onConflict: 'user_id,activity_type,date'
            });

          if (dailyError) {
            console.error('Error updating daily points:', dailyError);
            return;
          }

          console.log('Daily points updated successfully', {
            newTotal: Math.min(currentDailyPoints + pointsToAward, 100),
            userId
          });
        } else {
          console.log('Daily point cap reached', {
            currentDailyPoints,
            userId
          });
        }
      } else {
        console.log('Duration too short to record', {
          duration,
          userId
        });
      }
    } catch (error) {
      console.error('Error recording activity:', error);
    }
  }, [userId]);

  return { recordActivity };
};