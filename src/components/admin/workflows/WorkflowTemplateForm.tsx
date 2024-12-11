import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { StagesManager } from './components/StagesManager';
import { WorkflowTemplate, WorkflowFormData, serializeStages, parseStages } from './types';

export const WorkflowTemplateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNewTemplate = !id;

  const [formData, setFormData] = useState<WorkflowFormData>({
    name: '',
    description: '',
    stages: [],
    is_active: true
  });

  const { data: template, isLoading } = useQuery({
    queryKey: ['workflow-template', id],
    queryFn: async () => {
      if (isNewTemplate) return null;
      
      try {
        const { data, error } = await supabase
          .from('workflow_templates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Parse the data into the correct type
        const parsedTemplate: WorkflowTemplate = {
          ...data,
          stages: parseStages(data.stages)
        };
        
        return parsedTemplate;
      } catch (error) {
        console.error('Error fetching template:', error);
        toast.error('Failed to fetch template');
        throw error;
      }
    },
    enabled: !isNewTemplate
  });

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        description: template.description || '',
        stages: template.stages,
        is_active: template.is_active
      });
    }
  }, [template]);

  const mutation = useMutation({
    mutationFn: async (data: WorkflowFormData) => {
      const templateData = {
        name: data.name,
        description: data.description,
        stages: serializeStages(data.stages),
        is_active: data.is_active
      };

      try {
        if (isNewTemplate) {
          const { data: newTemplate, error } = await supabase
            .from('workflow_templates')
            .insert([templateData])
            .select()
            .single();

          if (error) throw error;
          return newTemplate;
        } else {
          const { data: updatedTemplate, error } = await supabase
            .from('workflow_templates')
            .update(templateData)
            .eq('id', id)
            .select()
            .single();

          if (error) throw error;
          return updatedTemplate;
        }
      } catch (error) {
        console.error('Error saving template:', error);
        throw error;
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
            <StagesManager 
              stages={formData.stages}
              onChange={(stages) => setFormData(prev => ({ ...prev, stages }))}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};