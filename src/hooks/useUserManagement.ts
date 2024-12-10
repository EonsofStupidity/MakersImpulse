import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { UserRole } from '@/components/auth/types';

export const useUserManagement = () => {
  const queryClient = useQueryClient();

  // Fetch users with their profiles and related CMS content
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      console.log('Fetching users with profiles and CMS data...');
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          banned_by(username),
          cms_content!cms_content_created_by_fkey(count),
          user_activity(count),
          user_activity_cms(count)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      return data;
    },
  });

  // Update user role with activity logging
  const updateRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: UserRole }) => {
      console.log('Updating user role:', { userId, newRole });
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Log the role change in user_activity
      const { error: activityError } = await supabase
        .from('user_activity')
        .insert({
          user_id: userId,
          activity_type: 'role_update',
          details: `Role updated to ${newRole}`,
          metadata: { previous_role: users?.find(u => u.id === userId)?.role }
        });

      if (activityError) throw activityError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User role updated successfully');
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  });

  // Ban user with activity logging
  const banUser = useMutation({
    mutationFn: async ({ userId, reason }: { userId: string; reason: string }) => {
      console.log('Banning user:', { userId, reason });

      const { error: banError } = await supabase.rpc('ban_user', {
        user_id: userId,
        reason: reason,
        admin_id: (await supabase.auth.getUser()).data.user?.id
      });

      if (banError) throw banError;

      // Log the ban in user_activity
      const { error: activityError } = await supabase
        .from('user_activity')
        .insert({
          user_id: userId,
          activity_type: 'user_banned',
          details: reason,
          metadata: { banned_at: new Date().toISOString() }
        });

      if (activityError) throw activityError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User banned successfully');
    },
    onError: (error) => {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user');
    }
  });

  // Get user activity history
  const getUserActivity = async (userId: string) => {
    console.log('Fetching user activity:', userId);
    
    const { data, error } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user activity:', error);
      throw error;
    }

    return data;
  };

  // Get user CMS activity
  const getUserCMSActivity = async (userId: string) => {
    console.log('Fetching user CMS activity:', userId);
    
    const { data, error } = await supabase
      .from('user_activity_cms')
      .select(`
        *,
        cms_content(
          id,
          title,
          type,
          status
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user CMS activity:', error);
      throw error;
    }

    return data;
  };

  return {
    users,
    isLoading,
    updateRole,
    banUser,
    getUserActivity,
    getUserCMSActivity
  };
};