import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const ModerationPanel = () => {
  const { data: actions, isLoading } = useQuery({
    queryKey: ["moderation-actions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("moderation_actions")
        .select(`
          *,
          moderator:profiles(username)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading moderation actions...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Moderation Actions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Moderator</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions?.map((action) => (
              <TableRow key={action.id}>
                <TableCell>{action.moderator?.username}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      action.action_type === 'warn' ? 'default' :
                      action.action_type === 'delete' ? 'destructive' :
                      'outline'
                    }
                  >
                    {action.action_type}
                  </Badge>
                </TableCell>
                <TableCell>{action.target_type}</TableCell>
                <TableCell>{action.reason}</TableCell>
                <TableCell>{new Date(action.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ModerationPanel;