import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/common/form/ImageUpload";
import { getComponentSchema } from "@/utils/validationSchemas";
import type { ComponentType, ComponentFormData } from "@/types/components";

interface ComponentFormProps {
  onSubmit: (data: ComponentFormData) => Promise<void>;
  type: ComponentType;
}

export const ComponentForm = ({ onSubmit, type }: ComponentFormProps) => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ComponentFormData>({
    resolver: zodResolver(getComponentSchema(type)),
  });

  const handleFormSubmit = async (data: ComponentFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit component. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            label="Component Name"
            name="name"
            register={register}
            error={errors.name}
          />

          <FormField
            label="Manufacturer"
            name="manufacturer"
            register={register}
            error={errors.manufacturer}
          />

          <FormField
            label="Cost (USD)"
            name="cost_usd"
            type="number"
            step="0.01"
            register={register}
            error={errors.cost_usd}
          />

          <FormField
            label="Summary"
            name="summary"
            register={register}
            error={errors.summary}
          />

          {type !== "base_product" && (
            <FormField
              label={`${type.charAt(0).toUpperCase() + type.slice(1)} Type`}
              name={`${type}_type`}
              register={register}
              error={errors[`${type}_type` as keyof typeof errors]}
            />
          )}

          <ImageUpload 
            type={type} 
            value={null}
            onChange={(url) => register("image_url").onChange({ target: { value: url } })}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          Submit Component
        </Button>
      </form>
    </Card>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  step?: string;
  register: any;
  error?: any;
}

const FormField = ({ label, name, type = "text", step, register, error }: FormFieldProps) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} type={type} step={step} {...register(name)} />
    {error && (
      <p className="text-sm text-red-500 mt-1">{error.message}</p>
    )}
  </div>
);