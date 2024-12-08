import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

export const WorkflowInstanceList = () => {
  const { data: instances, isLoading } = useQuery({
    queryKey: ["workflow-instances"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workflow_instances")
        .select(`
          *,
          workflow:workflow_templates(name),
          current_step:workflow_step_definitions(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading instances...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Workflow Instances</h2>
      
      <div className="grid gap-4">
        {instances?.map((instance) => (
          <Card key={instance.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{instance.workflow?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Current step: {instance.current_step?.name || "Not started"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Started {formatDistanceToNow(new Date(instance.started_at))} ago
                </p>
              </div>
              <Badge variant={instance.status === "active" ? "default" : "secondary"}>
                {instance.status}
              </Badge>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {instance.status === "active" && (
                <Button size="sm">
                  Continue Workflow
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};