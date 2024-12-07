import React from "react";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { motion } from "framer-motion";
import { Loader2, User } from "lucide-react";
import { useProfiles } from "@/hooks/useProfiles";
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

const UserManagement = () => {
  const { data: profiles, isLoading, error, refetch } = useProfiles();

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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-[#ff0abe] animate-spin" />
          </div>
        ) : error ? (
          <ErrorState 
            title="Failed to load users" 
            message="There was an error loading the user list. Please try again." 
            onRetry={() => refetch()}
          />
        ) : (
          <div className="bg-gray-800/50 border border-white/10 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-white">User</TableHead>
                  <TableHead className="text-white">Role</TableHead>
                  <TableHead className="text-white">Location</TableHead>
                  <TableHead className="text-white">Last Seen</TableHead>
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
                      <Badge 
                        variant="secondary" 
                        className={getRoleBadgeColor(profile.role)}
                      >
                        {profile.role || 'subscriber'}
                      </Badge>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserManagement;