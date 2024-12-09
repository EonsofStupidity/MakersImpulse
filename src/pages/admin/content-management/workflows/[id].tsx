import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminNav } from "@/components/admin/dashboard/AdminNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface WorkflowStep {
  id: string;
  name: string;
  type: string;
  config: Record<string, any>;
}

interface WorkflowFormData {
  name: string;
  description: string;
  steps: WorkflowStep[];
}

const WorkflowEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewWorkflow = id === "new";

  const [formData, setFormData] = React.useState<WorkflowFormData>({
    name: "",
    description: "",
    steps: [],
  });

  // Fetch existing workflow if editing
  const { data: workflow, isLoading } = useQuery({
    queryKey: ['workflow', id],
    queryFn: async () => {
      if (isNewWorkflow) return null;
      
      console.log('Fetching workflow:', id);
      const { data, error } = await supabase
        .from('cms_workflows')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching workflow:', error);
        throw error;
      }

      return data;
    },
    enabled: !isNewWorkflow,
  });

  // Update form data when workflow is loaded
  React.useEffect(() => {
    if (workflow) {
      setFormData({
        name: workflow.name,
        description: workflow.description || "",
        steps: Array.isArray(workflow.steps) ? workflow.steps : [],
      });
    }
  }, [workflow]);

  // Save workflow mutation
  const { mutate: saveWorkflow, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      const workflowData = {
        name: formData.name,
        description: formData.description,
        steps: formData.steps,
      };

      if (isNewWorkflow) {
        const { data, error } = await supabase
          .from('cms_workflows')
          .insert([workflowData])
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('cms_workflows')
          .update(workflowData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      toast.success(`Workflow ${isNewWorkflow ? 'created' : 'updated'} successfully`);
      navigate('/admin/content-management/workflows');
    },
    onError: (error) => {
      console.error('Error saving workflow:', error);
      toast.error('Failed to save workflow');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Workflow name is required');
      return;
    }
    saveWorkflow();
  };

  if (!isNewWorkflow && isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pt-20 p-8">
        <AdminNav />
        <div className="container mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-20 p-8">
      <AdminNav />
      <div className="container mx-auto">
        <Card className="glass border-white/10 p-6 bg-black/40 backdrop-blur-xl shadow-[0_0_15px_rgba(65,240,219,0.2)] animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-white/60 hover:text-white"
                onClick={() => navigate('/admin/content-management/workflows')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-white">
                {isNewWorkflow ? 'Create New Workflow' : 'Edit Workflow'}
              </h1>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
              disabled={isSaving}
            >
              {isSaving ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Workflow
                </>
              )}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Workflow Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter workflow name"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter workflow description"
                className="bg-white/5 border-white/10 text-white"
                rows={4}
              />
            </div>

            {/* Steps editor will be implemented in the next iteration */}
            <div className="border border-white/10 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-white mb-4">Workflow Steps</h2>
              <p className="text-white/60">Step configuration will be available in the next update.</p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowEditor;