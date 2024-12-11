import { supabase } from '@/integrations/supabase/client';

export const applySecurityHeaders = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('security-headers');
    
    if (error) {
      console.error('Failed to apply security headers:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error applying security headers:', error);
    return false;
  }
};