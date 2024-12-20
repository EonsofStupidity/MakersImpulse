import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { buildSchema, type BuildFormData } from '@/types/builds';
import { Form } from '@/components/ui/form';
import BuildBasicSection from './BuildBasicSection';
import BuildVolumeSection from './BuildVolumeSection';
import BuildImagesSection from './BuildImagesSection';
import FormActions from './FormActions';

const BuildFormContainer = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<BuildFormData>({
    resolver: zodResolver(buildSchema),
    defaultValues: {
      name: "",
      description: "",
      build_volume: {
        x: 200,
        y: 200,
        z: 200,
        units: "mm"
      },
      parts: [],
    }
  });

  const onSubmit = async (data: BuildFormData) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('mi3dp_builds')
        .insert({
          ...data,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        });

      if (error) throw error;

      toast.success("Build created successfully!");
      navigate("/maker-space/builds");
    } catch (error) {
      console.error("Error creating build:", error);
      toast.error("Failed to create build. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BuildBasicSection form={form} />
        <BuildVolumeSection form={form} />
        <BuildImagesSection form={form} />
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default BuildFormContainer;