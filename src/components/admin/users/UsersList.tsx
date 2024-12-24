import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfiles } from "@/hooks/useProfiles";
import { UserRole } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserTableRowActions } from "./UserTableRowActions";
import { Search, UserPlus } from "lucide-react";

export const UsersList = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useProfiles();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  const filteredUsers = users?.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.username?.toLowerCase().includes(searchLower) ||
      user.display_name?.toLowerCase().includes(searchLower) ||
      user.role?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          onClick={() => navigate("/admin/users/new")}
          className="bg-[#41f0db]/10 hover:bg-[#41f0db]/20 text-[#41f0db]"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border border-white/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.display_name}</TableCell>
                <TableCell>
                  <span className="capitalize">{user.role}</span>
                </TableCell>
                <TableCell>
                  {user.last_seen
                    ? new Date(user.last_seen).toLocaleDateString()
                    : "Never"}
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <UserTableRowActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersList;