import { WorkflowEditor } from "@/components/admin/cms/workflows/editor/WorkflowEditor";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const WorkflowManagementPage = () => {
  const { data: workflow } = useQuery({
    queryKey: ["workflow"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_workflows")
        .select("*")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const handleSave = async (nodes: any[], edges: any[]) => {
    const { error } = await supabase
      .from("cms_workflows")
      .update({
        steps: { nodes, edges },
      })
      .eq("id", workflow?.id);

    if (error) {
      console.error("Error saving workflow:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Workflow Management</h1>
      <WorkflowEditor
        workflowId={workflow?.id}
        initialNodes={workflow?.steps?.nodes || []}
        initialEdges={workflow?.steps?.edges || []}
        onSave={handleSave}
      />
    </div>
  );
};

export default WorkflowManagementPage;