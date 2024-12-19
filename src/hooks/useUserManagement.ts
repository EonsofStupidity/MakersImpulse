import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserRole } from '@/components/admin/settings/types/settings';

export const useUserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: users, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const updateRole = useMutation({
    mutationFn: async (userId: string, newRole: UserRole) => {
      try {
        setIsLoading(true);
        const { error } = await supabase
          .from('profiles')
          .update({ role: newRole })
          .eq('id', userId);

      if (error) throw error;
      toast.success('User role updated successfully');
      refetch();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    } finally {
      setIsLoading(false);
    }
  });

  const banUser = async (userId: string, reason: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.rpc('ban_user', {
        p_user_id: userId,
        p_reason: reason
      });

      if (error) throw error;
      toast.success('User banned successfully');
      refetch();
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserActivity = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user activity:', error);
      toast.error('Failed to fetch user activity');
      return [];
    }
  };

  const getUserCMSActivity = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_activity_cms')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching CMS activity:', error);
      toast.error('Failed to fetch CMS activity');
      return [];
    }
  };

  return {
    users,
    error,
    isLoading,
    refetch,
    updateRole: updateRole.mutateAsync,
    banUser,
    getUserActivity,
    getUserCMSActivity
  };
};
