import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const RoleList = () => {
  const { data: roles, isLoading } = useQuery({
    queryKey: ["admin-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_roles")
        .select(`
          *,
          user:profiles(username),
          assigned_by_user:profiles!admin_roles_assigned_by_fkey(username)
        `)
        .order("assigned_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading roles...</div>;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Assigned By</TableHead>
            <TableHead>Assigned At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.user?.username}</TableCell>
              <TableCell>
                <Badge>{role.role}</Badge>
              </TableCell>
              <TableCell>{role.assigned_by_user?.username || "-"}</TableCell>
              <TableCell>{new Date(role.assigned_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RoleList;