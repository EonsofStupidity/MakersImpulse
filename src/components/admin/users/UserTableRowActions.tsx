import React from 'react';
import { MoreHorizontal, Ban, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUserManagement } from '@/hooks/useUserManagement';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UserTableRowActionsProps {
  userId: string;
  currentRole: string;
}

export function UserTableRowActions({ userId, currentRole }: UserTableRowActionsProps) {
  const { updateRole, getUserActivity, getUserCMSActivity } = useUserManagement();
  const [showActivityDialog, setShowActivityDialog] = useState(false);
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
    } finally {
      setIsLoading(false);
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
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => updateRole.mutate({ userId, newRole: 'admin' })}>
            <Shield className="mr-2 h-4 w-4" />
            Make Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateRole.mutate({ userId, newRole: 'subscriber' })}>
            <Shield className="mr-2 h-4 w-4" />
            Remove Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewActivity}>
            <Activity className="mr-2 h-4 w-4" />
            View Activity
          </DropdownMenuItem>
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
    </>
  );
}