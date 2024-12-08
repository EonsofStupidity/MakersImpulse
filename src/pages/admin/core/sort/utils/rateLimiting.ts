import { supabase } from "@/integrations/supabase/client";

export const checkRateLimit = async (actionType: string, maxCount: number, timeWindow: string) => {
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.rpc('check_rate_limit', {
    p_user_id: userId,
    p_action_type: actionType,
    p_max_count: maxCount,
    p_time_window: timeWindow
  });

  if (error) {
    throw error;
  }

  return data;
};