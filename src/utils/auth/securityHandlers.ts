import { supabase } from "@/integrations/supabase/client";

export const validateSession = async (session: any) => {
  if (!session?.user?.id) {
    throw new Error('Invalid session');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_banned')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error) throw error;
  
  // If no profile exists or if banned
  if (!profile) {
    console.log('No profile found for user:', session.user.id);
    return true; // Allow access while profile is being created
  }
  
  if (profile.is_banned) {
    throw new Error('Account is banned');
  }

  return true;
};

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

    if (error) {
      console.error('Failed to log security event:', error);
      throw error;
    }
    
    console.log('Security event logged:', { userId, eventType, severity, details });
  } catch (error) {
    console.error('Failed to log security event:', error);
    // Don't throw here - we don't want security logging to break core functionality
  }
};

export const handleSessionTimeout = (callback: () => Promise<void>) => {
  const timeoutDuration = 30 * 60 * 1000; // 30 minutes
  return setTimeout(callback, timeoutDuration);
};