import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BuildConfigStep {
  name: string;
  description: string;
}

const WIZARD_STEPS: BuildConfigStep[] = [
  {
    name: "Basic Info",
    description: "Name and describe your build"
  },
  {
    name: "Difficulty",
    description: "Set the complexity level"
  },
  {
    name: "Components",
    description: "Choose your components"
  },
  {
    name: "Review",
    description: "Review your configuration"
  }
];

const BuildConfigWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [buildConfig, setBuildConfig] = useState({
    name: "",
    description: "",
    difficulty_level: "beginner",
    components: {},
    estimated_cost: 0
  });
  const { toast } = useToast();

  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("build_configurations")
        .insert([buildConfig]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Build configuration saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save build configuration",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Create Build Configuration</h2>
        <p className="text-muted-foreground">
          {WIZARD_STEPS[currentStep].description}
        </p>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="flex justify-between text-sm text-muted-foreground">
        {WIZARD_STEPS.map((step, index) => (
          <span
            key={step.name}
            className={index <= currentStep ? "text-primary" : ""}
          >
            {step.name}
          </span>
        ))}
      </div>

      <Card className="p-6">
        {/* Step content will be implemented here */}
        <p className="text-center text-muted-foreground">
          Step {currentStep + 1}: {WIZARD_STEPS[currentStep].name}
        </p>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        {currentStep === WIZARD_STEPS.length - 1 ? (
          <Button onClick={handleSubmit}>
            Save Configuration
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BuildConfigWizard;