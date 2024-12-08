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

interface Report {
  id: string;
  target_type: string;
  reason: string;
  created_at: string;
  metadata: {
    status?: string;
  };
  reporter: {
    username: string;
  };
}

const ReportsList = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ["community-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("moderation_actions")
        .select(`
          *,
          reporter:profiles(username)
        `)
        .eq("action_type", "report")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Report[];
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Reports</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reporter</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports?.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.reporter?.username}</TableCell>
              <TableCell>{report.target_type}</TableCell>
              <TableCell>{report.reason}</TableCell>
              <TableCell>
                <Badge>{report.metadata?.status || 'pending'}</Badge>
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

export default ReportsList;