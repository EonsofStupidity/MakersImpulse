import React, { useState } from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { motion } from "framer-motion";
import { Loader2, User } from "lucide-react";
import { useProfiles } from "@/hooks/useProfiles";
import { useUserMetrics } from "@/hooks/useUserMetrics";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/shared/error-handling/ErrorState";
import { UserMetrics } from "@/components/admin/users/UserMetrics";
import { RoleSelector } from "@/components/admin/users/RoleSelector";
import { BanUserDialog } from "@/components/admin/users/BanUserDialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/components/auth/types";

const UserManagement = () => {
  const { data: profiles, isLoading, error, refetch } = useProfiles();
  const { data: metrics, isLoading: isLoadingMetrics } = useUserMetrics();
  const [selectedUser, setSelectedUser] = useState<{ id: string; username: string } | null>(null);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast.success('Role updated successfully');
      refetch();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleBanUser = async (reason: string) => {
    if (!selectedUser) return;
    
    // TODO: Implement ban functionality
    toast.success(`User ${selectedUser.username} has been banned`);
    setSelectedUser(null);
  };

  const getRoleBadgeColor = (role: string | null) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'admin':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      case 'maker':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  if (isLoading || isLoadingMetrics) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 p-8">
        <AdminNav />
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-[#ff0abe] animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 p-8">
        <AdminNav />
        <ErrorState 
          title="Failed to load users" 
          message="There was an error loading the user list. Please try again." 
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 p-8">
      <AdminNav />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">User Management</h1>
        </div>

        {metrics && <UserMetrics data={metrics} />}

        <div className="bg-gray-800/50 border border-white/10 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white">User</TableHead>
                <TableHead className="text-white">Role</TableHead>
                <TableHead className="text-white">Location</TableHead>
                <TableHead className="text-white">Last Seen</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles?.map((profile) => (
                <TableRow 
                  key={profile.id}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium text-white">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-white/10">
                        <AvatarImage src={profile.avatar_url || undefined} />
                        <AvatarFallback className="bg-gray-700 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{profile.display_name || 'Unnamed User'}</div>
                        {profile.username && (
                          <div className="text-sm text-gray-400">@{profile.username}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleSelector
                      currentRole={profile.role || 'subscriber'}
                      onRoleChange={(role) => handleRoleChange(profile.id, role)}
                    />
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {profile.location || 'Not specified'}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {profile.last_seen 
                      ? new Date(profile.last_seen).toLocaleDateString()
                      : 'Never'
                    }
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => setSelectedUser({ id: profile.id, username: profile.username || 'Unnamed User' })}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      Ban User
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {selectedUser && (
        <BanUserDialog
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onConfirm={handleBanUser}
          username={selectedUser.username}
        />
      )}
    </div>
  );
};

export default UserManagement;