import { Card } from "@/components/ui/card";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { MFASettings } from "@/features/auth/components/MFASettings";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SecuritySettings = () => {
  const session = useSession();
  const navigate = useNavigate();

  const { data: auditLogs, isLoading } = useQuery({
    queryKey: ["security-audit-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("security_audit_logs")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (!session) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Security Settings</h1>
      
      <div className="space-y-6">
        <MFASettings />

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Security Activity</h2>
          {isLoading ? (
            <div>Loading activity...</div>
          ) : (
            <div className="space-y-4">
              {auditLogs?.map((log) => (
                <div key={log.id} className="flex justify-between items-center py-2 border-b border-border">
                  <div>
                    <p className="font-medium">{log.action_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {log.ip_address}
                  </div>
                </div>
              ))}
              {auditLogs?.length === 0 && (
                <p className="text-muted-foreground">No recent security activity</p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SecuritySettings;