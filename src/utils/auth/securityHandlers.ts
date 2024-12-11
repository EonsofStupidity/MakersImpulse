import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const handleSecurityEvent = async (
  userId: string,
  eventType: string,
  severity: 'low' | 'medium' | 'high',
  details: Record<string, any> = {}
) => {
  try {
    const { error } = await supabase
      .from('security_events')
      .insert({
        user_id: userId,
        event_type: eventType,
        severity,
        details,
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error logging security event:', error);
  }
};

export const handleSessionTimeout = (callback: () => void, timeoutMinutes: number = 30) => {
  const timeoutMs = timeoutMinutes * 60 * 1000;
  return setTimeout(() => {
    toast.error('Session expired', {
      description: 'Please sign in again',
    });
    callback();
  }, timeoutMs);
};

export const validateSession = async (session: any) => {
  if (!session?.user?.id) return false;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_banned, lockout_until')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Profile validation error:', error);
    return false;
  }

  if (profile?.is_banned) {
    toast.error('Account banned', {
      description: 'This account has been suspended',
    });
    return false;
  }

  if (profile?.lockout_until && new Date(profile.lockout_until) > new Date()) {
    toast.error('Account locked', {
      description: 'Please try again later',
    });
    return false;
  }

  return true;
};