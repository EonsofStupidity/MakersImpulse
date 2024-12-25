import { UserRole } from '@/types';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UserTableRowActionsProps {
  userId: string;
  userRole: UserRole;
  onRoleChange: (userId: string, newRole: UserRole) => void;
}

export const UserTableRowActions = ({ userId, userRole, onRoleChange }: UserTableRowActionsProps) => {
  const handleRoleChange = async (newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      onRoleChange(userId, newRole);
      toast.success('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={() => handleRoleChange('admin')} disabled={userRole === 'admin'}>
        Promote to Admin
      </Button>
      <Button onClick={() => handleRoleChange('subscriber')} disabled={userRole === 'subscriber'}>
        Demote to Subscriber
      </Button>
    </div>
  );
};