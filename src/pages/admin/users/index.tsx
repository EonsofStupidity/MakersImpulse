import React, { useState } from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { motion } from "framer-motion";
import { Loader2, User, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { ErrorState } from "@/components/shared/error-handling/ErrorState";
import { UserMetrics } from "@/components/admin/users/UserMetrics";
import { RoleSelector } from "@/components/admin/users/RoleSelector";
import { UserTableRowActions } from "@/components/admin/users/UserTableRowActions";
import { toast } from "sonner";
import { UserRole } from "@/components/auth/types";

const UserManagement = () => {
  const { data: profiles, isLoading, error, refetch } = useProfiles();
  const { data: metrics, isLoading: isLoadingMetrics } = useUserMetrics();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfiles = profiles?.filter((profile) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      profile.username?.toLowerCase().includes(searchLower) ||
      profile.display_name?.toLowerCase().includes(searchLower) ||
      profile.role?.toLowerCase().includes(searchLower)
    );
  });

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
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800/50 border-white/10 text-white"
              icon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
        </div>

        {metrics && <UserMetrics data={metrics} />}

        <div className="bg-gray-800/50 border border-white/10 rounded-lg overflow-hidden mt-8">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white">User</TableHead>
                <TableHead className="text-white">Role</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Location</TableHead>
                <TableHead className="text-white">Last Seen</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles?.map((profile) => (
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
                  <TableCell>
                    {profile.is_banned ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
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
                    <UserTableRowActions 
                      userId={profile.id}
                      currentRole={profile.role || 'subscriber'}
                      isBanned={profile.is_banned}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
};

export default UserManagement;