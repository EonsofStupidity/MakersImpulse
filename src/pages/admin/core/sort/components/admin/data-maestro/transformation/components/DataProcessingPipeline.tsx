import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
}

export const DataProcessingPipeline = () => {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: '1', name: 'Data Validation', status: 'pending', progress: 0 },
    { id: '2', name: 'Transformation', status: 'pending', progress: 0 },
    { id: '3', name: 'Quality Check', status: 'pending', progress: 0 },
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { toast } = useToast();

  const updateStepProgress = (stepId: string, progress: number) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, progress } : step
    ));
  };

  const updateStepStatus = (stepId: string, status: ProcessingStep['status']) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
  };

  const processNextStep = async () => {
    const currentStep = steps[currentStepIndex];
    updateStepStatus(currentStep.id, 'processing');

    try {
      // Simulate processing with progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        updateStepProgress(currentStep.id, progress);
      }

      updateStepStatus(currentStep.id, 'completed');
      
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }

      toast({
        title: "Step Completed",
        description: `${currentStep.name} completed successfully`,
      });
    } catch (error) {
      updateStepStatus(currentStep.id, 'error');
      toast({
        title: "Error",
        description: `Failed to process ${currentStep.name}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {step.status === 'completed' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {step.status === 'error' && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="font-medium">{step.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {step.progress}%
              </span>
            </div>
            <Progress value={step.progress} className="h-2" />
          </div>
        ))}

        {currentStepIndex < steps.length && (
          <Button 
            onClick={processNextStep}
            disabled={steps[currentStepIndex].status === 'processing'}
          >
            Process Next Step
          </Button>
        )}

        {currentStepIndex === steps.length && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Processing Complete</AlertTitle>
            <AlertDescription>
              All steps have been processed successfully
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};