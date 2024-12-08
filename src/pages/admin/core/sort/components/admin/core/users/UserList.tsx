import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserStatusBadge from "./UserStatusBadge";
import UserStatusDialog from "./UserStatusDialog";
import UserAuditLogs from "./UserAuditLogs";
import { supabase } from "@/integrations/supabase/client";

const UserList = () => {
  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading users...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {users?.map((user) => (
        <div key={user.id} className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>{user.username}</span>
              <Badge variant="outline">{user.role}</Badge>
              <UserStatusBadge status={user.status} />
            </div>
            <UserStatusDialog
              userId={user.id}
              currentStatus={user.status}
              onStatusChange={refetch}
            />
          </div>
          <UserAuditLogs userId={user.id} />
        </div>
      ))}
    </Card>
  );
};

export default UserList;