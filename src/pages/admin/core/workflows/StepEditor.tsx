import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Plus, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StepEditorProps {
  workflowId: string;
}

export const StepEditor = ({ workflowId }: StepEditorProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: steps, isLoading } = useQuery({
    queryKey: ["workflow-steps", workflowId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workflow_steps")
        .select("*")
        .eq("workflow_id", workflowId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const createStep = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("workflow_steps")
        .insert([
          {
            workflow_id: workflowId,
            name: "New Step",
            step_type: "component_selection",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflow-steps"] });
      toast({
        title: "Step created successfully",
      });
    },
  });

  if (isLoading) {
    return <div>Loading steps...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Workflow Steps</h3>
        <Button
          size="sm"
          onClick={() => createStep.mutate()}
          disabled={createStep.isPending}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Step
        </Button>
      </div>

      <div className="space-y-2">
        {steps?.map((step) => (
          <div
            key={step.id}
            className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md"
          >
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">
              <Input
                value={step.name}
                onChange={() => {}}
                className="h-8"
              />
            </div>
            <Switch checked={step.is_required} />
          </div>
        ))}
      </div>
    </div>
  );
};