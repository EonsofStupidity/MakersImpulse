import React, { useState } from 'react';
import { MoreHorizontal, Ban, Shield, Activity, UserCog, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUserManagement } from '@/hooks/useUserManagement';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { BanUserDialog } from './BanUserDialog';
import { UserRole } from '@/components/auth/types';

interface UserTableRowActionsProps {
  userId: string;
  currentRole: UserRole;
  isBanned?: boolean;
}

export function UserTableRowActions({ userId, currentRole, isBanned }: UserTableRowActionsProps) {
  const { updateRole, getUserActivity, getUserCMSActivity } = useUserManagement();
  const [showActivityDialog, setShowActivityDialog] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [activityData, setActivityData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewActivity = async () => {
    setIsLoading(true);
    try {
      const [activity, cmsActivity] = await Promise.all([
        getUserActivity(userId),
        getUserCMSActivity(userId)
      ]);
      setActivityData({ activity, cmsActivity });
      setShowActivityDialog(true);
    } catch (error) {
      console.error('Error fetching activity:', error);
      toast.error('Failed to load user activity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUpdate = async (newRole: UserRole) => {
    try {
      await updateRole.mutateAsync({ userId, newRole });
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleBanUser = async (reason: string) => {
    try {
      const { data: adminProfile } = await supabase.auth.getUser();
      
      if (!adminProfile?.user?.id) {
        throw new Error('Admin ID not found');
      }

      const { error } = await supabase.rpc('ban_user', {
        user_id: userId,
        reason: reason,
        admin_id: adminProfile.user.id
      });

      if (error) throw error;

      await supabase.rpc('record_user_activity', {
        p_user_id: userId,
        p_activity_type: 'user_banned',
        p_details: reason,
        p_metadata: { admin_id: adminProfile.user.id }
      });

      toast.success('User has been banned');
      setShowBanDialog(false);
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user');
    }
  };

  const handleUnbanUser = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_banned: false,
          ban_reason: null,
          banned_at: null,
          banned_by: null
        })
        .eq('id', userId);

      if (error) throw error;

      toast.success('User has been unbanned');
    } catch (error) {
      console.error('Error unbanning user:', error);
      toast.error('Failed to unban user');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          
          <DropdownMenuItem onClick={() => handleRoleUpdate('admin')}>
            <Shield className="mr-2 h-4 w-4" />
            Make Admin
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleUpdate('subscriber')}>
            <UserCog className="mr-2 h-4 w-4" />
            Make Subscriber
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleViewActivity}>
            <Activity className="mr-2 h-4 w-4" />
            View Activity
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {isBanned ? (
            <DropdownMenuItem onClick={handleUnbanUser}>
              <EyeOff className="mr-2 h-4 w-4" />
              Unban User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem 
              onClick={() => setShowBanDialog(true)}
              className="text-red-500 focus:text-red-500"
            >
              <Ban className="mr-2 h-4 w-4" />
              Ban User
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showActivityDialog} onOpenChange={setShowActivityDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Activity History</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[500px] p-4">
            {activityData && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">General Activity</h3>
                  {activityData.activity?.map((item: any) => (
                    <div key={item.id} className="mb-2 p-2 bg-black/20 rounded">
                      <p className="text-sm">{item.details}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">CMS Activity</h3>
                  {activityData.cmsActivity?.map((item: any) => (
                    <div key={item.id} className="mb-2 p-2 bg-black/20 rounded">
                      <p className="text-sm">
                        {item.activity_type} - {item.cms_content?.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <BanUserDialog
        isOpen={showBanDialog}
        onClose={() => setShowBanDialog(false)}
        onConfirm={handleBanUser}
        username={userId} // We should pass the actual username here
      />
    </>
  );
}