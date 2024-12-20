import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Settings } from '@/types/theme';
import { useAuthStore } from '@/lib/store/auth-store';

export const useUserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuthStore();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

      if (error) throw error;

      toast.success('User role updated successfully');
      await fetchUsers();
    } catch (err) {
      console.error('Error updating user role:', err);
      toast.error('Failed to update user role');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast.success('User deleted successfully');
      await fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user');
    }
  };

  const updateUserSettings = async (userId: string, settings: Partial<Settings>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ settings })
        .eq('id', userId);

      if (error) throw error;

      toast.success('User settings updated successfully');
      await fetchUsers();
    } catch (err) {
      console.error('Error updating user settings:', err);
      toast.error('Failed to update user settings');
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchUsers();
    }
  }, [session]);

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    updateUserRole,
    deleteUser,
    updateUserSettings,
  };
};