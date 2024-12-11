import { supabase } from "@/integrations/supabase/client";

export const handleSecurityEvent = async (
  userId: string,
  eventType: string,
  severity: 'low' | 'medium' | 'high',
  details?: Record<string, any>
) => {
  try {
    const { error } = await supabase
      .from('security_events')
      .insert({
        user_id: userId,
        event_type: eventType,
        severity: severity,
        details: details || {},
        ip_address: null // In a real app, you'd get this from the request
      });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

export const handleSessionTimeout = (callback: () => Promise<void>) => {
  const timeoutDuration = 30 * 60 * 1000; // 30 minutes
  return setTimeout(callback, timeoutDuration);
};