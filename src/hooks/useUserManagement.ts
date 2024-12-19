import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useUserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const banUser = async (userId: string, reason: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.rpc('ban_user', {
        p_user_id: userId,
        p_reason: reason
      });

      if (error) throw error;
      toast.success('User banned successfully');
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    banUser,
    isLoading
  };
};