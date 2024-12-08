import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { CategoryForm } from "./category/CategoryForm";
import { CategoryConfiguration } from "./category/CategoryConfiguration";
import { CategorySuccess } from "./category/CategorySuccess";

interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  icon?: string;
  sort_order?: number;
  is_public?: boolean;
}

export const CategoryManagementWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    slug: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("part_categories")
        .insert(formData);

      if (error) throw error;

      toast({
        title: "Category created",
        description: "The category has been created successfully.",
      });
      
      setStep(3);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Progress value={step * 33.33} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Basic Info</span>
          <span>Configuration</span>
          <span>Review</span>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <CategoryForm 
              formData={formData}
              setFormData={setFormData}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <CategoryConfiguration
              formData={formData}
              setFormData={setFormData}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
            />
          )}

          {step === 3 && (
            <CategorySuccess
              onReset={() => {
                setStep(1);
                setFormData({ name: "", slug: "" });
              }}
            />
          )}
        </form>
      </Card>
    </div>
  );
};