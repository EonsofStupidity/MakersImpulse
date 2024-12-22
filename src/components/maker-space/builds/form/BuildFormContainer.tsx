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
      buildVolume: {
        x: 200,
        y: 200,
        z: 200,
        units: "mm"
      },
      parts: [],
      images: []
    }
  });

  const onSubmit = async (formData: BuildFormData) => {
    try {
      setIsSubmitting(true);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user');

      // Transform camelCase to snake_case for database
      const buildData = {
        user_id: user.id,
        name: formData.name,
        description: formData.description,
        build_volume: formData.buildVolume ? JSON.parse(JSON.stringify(formData.buildVolume)) : null,
        parts: formData.parts ? JSON.parse(JSON.stringify(formData.parts)) : null,
        images: formData.images ? JSON.parse(JSON.stringify(formData.images)) : null
      };

      const { error: insertError } = await supabase
        .from('mi3dp_builds')
        .insert(buildData);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

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