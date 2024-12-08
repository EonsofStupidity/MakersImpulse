import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface UserAuditLogsProps {
  userId: string;
}

const UserAuditLogs = ({ userId }: UserAuditLogsProps) => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["user-audit-logs", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_audit_logs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading audit logs...</div>;

  return (
    <Card className="p-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">User Audit Logs</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs?.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.action_type}</TableCell>
              <TableCell>{JSON.stringify(log.action_details)}</TableCell>
              <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UserAuditLogs;