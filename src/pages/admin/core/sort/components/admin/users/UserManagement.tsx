import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import UserStatusBadge from "./UserStatusBadge";
import UserStatusDialog from "./UserStatusDialog";
import UserAuditLogs from "./UserAuditLogs";

const UserManagement = () => {
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
      <Accordion type="single" collapsible className="space-y-4">
        {users?.map((user) => (
          <AccordionItem key={user.id} value={user.id}>
            <AccordionTrigger className="px-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <span>{user.username}</span>
                  <Badge variant="outline">{user.role}</Badge>
                  <UserStatusBadge status={user.status} />
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last status change: {user.status_changed_at ? new Date(user.status_changed_at).toLocaleString() : 'Never'}
                    </p>
                    {user.status_reason && (
                      <p className="text-sm text-muted-foreground">
                        Reason: {user.status_reason}
                      </p>
                    )}
                  </div>
                  <UserStatusDialog
                    userId={user.id}
                    currentStatus={user.status}
                    onStatusChange={refetch}
                  />
                </div>
                <UserAuditLogs userId={user.id} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default UserManagement;