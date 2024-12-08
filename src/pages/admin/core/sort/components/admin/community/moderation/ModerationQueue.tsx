import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface ModerationItem {
  id: string;
  target_type: string;
  target_id: string;
  action_type: string;
  reason: string;
  created_at: string;
  metadata: {
    content?: string;
    status?: string;
  };
  moderator: {
    username: string;
  };
}

const ModerationQueue = () => {
  const { data: items, isLoading } = useQuery({
    queryKey: ["moderation-queue"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("moderation_actions")
        .select(`
          *,
          moderator:profiles(username)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as ModerationItem[];
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Moderation Queue</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.target_type}</TableCell>
              <TableCell className="max-w-md truncate">
                {item.metadata?.content}
              </TableCell>
              <TableCell>{item.moderator?.username}</TableCell>
              <TableCell>
                <Badge>{item.metadata?.status || 'pending'}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModerationQueue;