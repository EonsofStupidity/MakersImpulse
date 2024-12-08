import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { ComponentType } from "@/types/components";

interface SingleComponentFormProps {
  type: ComponentType;
}

const componentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  manufacturer: z.string().min(2, "Manufacturer must be at least 2 characters"),
  component_type: z.string(),
  cost_usd: z.string().transform(Number),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  image_url: z.string().url("Must be a valid URL").optional(),
});

type FormData = z.infer<typeof componentSchema>;

export const SingleComponentForm = ({ type }: SingleComponentFormProps) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(componentSchema),
  });

  const progress = (step / 4) * 100;

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('component_import_sessions')
        .insert({
          import_mode: 'single',
          component_type: data.component_type,
          metadata: { form_data: data },
          status: 'completed'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Component has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add component. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label>Component Type</Label>
              <Select onValueChange={(value) => register("component_type").onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select component type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="base_product">Base Product</SelectItem>
                  <SelectItem value="bearings">Bearings</SelectItem>
                  <SelectItem value="extruders">Extruders</SelectItem>
                  <SelectItem value="addons">Addons</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label>Manufacturer</Label>
              <Input {...register("manufacturer")} />
              {errors.manufacturer && (
                <p className="text-sm text-red-500 mt-1">{errors.manufacturer.message}</p>
              )}
            </div>
            <div>
              <Label>Cost (USD)</Label>
              <Input type="number" step="0.01" {...register("cost_usd")} />
              {errors.cost_usd && (
                <p className="text-sm text-red-500 mt-1">{errors.cost_usd.message}</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label>Summary</Label>
              <Textarea {...register("summary")} />
              {errors.summary && (
                <p className="text-sm text-red-500 mt-1">{errors.summary.message}</p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label>Image URL</Label>
              <Input {...register("image_url")} />
              {errors.image_url && (
                <p className="text-sm text-red-500 mt-1">{errors.image_url.message}</p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Progress value={progress} className="mb-4" />
        
        {renderStep()}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          {step < 4 ? (
            <Button
              type="button"
              onClick={() => setStep(Math.min(4, step + 1))}
            >
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Card>
  );
};