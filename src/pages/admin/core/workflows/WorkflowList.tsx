import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { Play, Pause, Settings2 } from "lucide-react";

interface WorkflowListProps {
  onWorkflowAction: (action: string, workflowId: string) => void;
}

export const WorkflowList = ({ onWorkflowAction }: WorkflowListProps) => {
  const { data: workflows, isLoading } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_workflows")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading workflows...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Workflow Templates</h3>
        <Button onClick={() => onWorkflowAction("create", "new")}>
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-4">
        {workflows?.map((workflow) => (
          <Card key={workflow.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{workflow.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {workflow.description || "No description"}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge>
                    {workflow.steps?.nodes?.length || 0} steps
                  </Badge>
                  <Badge variant="outline">
                    Updated {formatDistanceToNow(new Date(workflow.updated_at))} ago
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onWorkflowAction("start", workflow.id)}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onWorkflowAction("pause", workflow.id)}
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onWorkflowAction("edit", workflow.id)}
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};