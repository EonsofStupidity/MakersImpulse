import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface RoleApplication {
  id: string;
  user: {
    username: string | null;
    display_name: string | null;
  };
  role: string;
  status: string;
  submitted_at: string;
  reviewer?: {
    username: string | null;
  };
  reason?: string;
}

export const RoleApplicationList = () => {
  const { toast } = useToast();

  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ["role-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("role_applications")
        .select(`
          *,
          user:profiles(username, display_name),
          reviewer:profiles!role_applications_reviewed_by_fkey(username)
        `)
        .order("submitted_at", { ascending: false });

      if (error) throw error;
      return data as RoleApplication[];
    },
  });

  const handleApplicationAction = async (id: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("role_applications")
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq("id", id);

      if (error) throw error;

      await refetch();

      toast({
        title: `Application ${status === "approved" ? "Approved" : "Rejected"}`,
        description: `The role application has been ${status}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update application status.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Role Applications</h3>
        <Badge variant="outline">{applications?.length || 0} Total</Badge>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Requested Role</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Reviewed By</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.user?.display_name || app.user?.username}</TableCell>
              <TableCell className="font-medium">{app.role}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {app.reason || "-"}
              </TableCell>
              <TableCell>
                <Badge variant={
                  app.status === "approved" ? "default" :
                  app.status === "rejected" ? "destructive" :
                  "secondary"
                }>
                  {app.status}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(app.submitted_at), "PPp")}</TableCell>
              <TableCell>{app.reviewer?.username || "-"}</TableCell>
              <TableCell>
                {app.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApplicationAction(app.id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleApplicationAction(app.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
          {!applications?.length && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                No role applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};