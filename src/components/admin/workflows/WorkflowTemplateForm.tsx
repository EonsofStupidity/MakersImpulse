import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface WorkflowStage {
  id: string;
  name: string;
  description?: string;
  order: number;
}

interface WorkflowTemplate {
  id?: string;
  name: string;
  description: string;
  stages: WorkflowStage[];
  is_active: boolean;
}

export const WorkflowTemplateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNewTemplate = !id;

  const [formData, setFormData] = useState<WorkflowTemplate>({
    name: '',
    description: '',
    stages: [],
    is_active: true
  });

  const { data: template, isLoading } = useQuery({
    queryKey: ['workflow-template', id],
    queryFn: async () => {
      if (isNewTemplate) return null;
      
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !isNewTemplate,
    onSuccess: (data) => {
      if (data) {
        setFormData(data);
      }
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: WorkflowTemplate) => {
      if (isNewTemplate) {
        const { data: newTemplate, error } = await supabase
          .from('workflow_templates')
          .insert([data])
          .select()
          .single();

        if (error) throw error;
        return newTemplate;
      } else {
        const { data: updatedTemplate, error } = await supabase
          .from('workflow_templates')
          .update(data)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return updatedTemplate;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow-templates'] });
      toast.success(`Template ${isNewTemplate ? 'created' : 'updated'} successfully`);
      navigate('/admin/workflows/templates');
    },
    onError: (error) => {
      console.error('Error saving template:', error);
      toast.error(`Failed to ${isNewTemplate ? 'create' : 'update'} template`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Template name is required');
      return;
    }
    mutation.mutate(formData);
  };

  const addStage = () => {
    const newStage: WorkflowStage = {
      id: crypto.randomUUID(),
      name: '',
      order: formData.stages.length
    };
    setFormData(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }));
  };

  const removeStage = (stageId: string) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.filter(stage => stage.id !== stageId)
    }));
  };

  const updateStage = (stageId: string, updates: Partial<WorkflowStage>) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map(stage => 
        stage.id === stageId ? { ...stage, ...updates } : stage
      )
    }));
  };

  if (!isNewTemplate && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white"
            onClick={() => navigate('/admin/workflows/templates')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold text-white">
            {isNewTemplate ? 'Create New Template' : 'Edit Template'}
          </h2>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
        >
          {mutation.isPending ? (
            <LoadingSpinner />
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </>
          )}
        </Button>
      </div>

      <Card className="p-6 bg-black/40 backdrop-blur-xl border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Template Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter template name"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter template description"
              className="bg-white/5 border-white/10 text-white"
              rows={4}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <label className="text-white">Active Template</label>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Workflow Stages</h3>
              <Button
                type="button"
                onClick={addStage}
                className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Stage
              </Button>
            </div>

            <div className="space-y-4">
              {formData.stages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-4">
                      <div>
                        <Input
                          value={stage.name}
                          onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                          placeholder={`Stage ${index + 1} name`}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Textarea
                          value={stage.description || ''}
                          onChange={(e) => updateStage(stage.id, { description: e.target.value })}
                          placeholder="Stage description (optional)"
                          className="bg-white/5 border-white/10 text-white"
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeStage(stage.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}

              {formData.stages.length === 0 && (
                <div className="text-center py-8 text-white/60">
                  No stages added yet. Click "Add Stage" to create your first workflow stage.
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};