import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface OnboardingStep {
  key: string;
  title: string;
  description: string | null;
  content: string | null;
  order_index: number;
  is_required: boolean;
}

export const OnboardingWizardContent = () => {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const { data: stepsData, error } = await supabase
          .from('onboarding_steps')
          .select('*')
          .eq('is_active', true)
          .order('order_index');

        if (error) throw error;
        setSteps(stepsData || []);
      } catch (error) {
        console.error('Error fetching onboarding steps:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load onboarding steps"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, [toast]);

  const handleNext = async () => {
    const currentStep = steps[currentStepIndex];
    
    try {
      // Record step completion
      await supabase
        .from('user_onboarding_progress')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          step_key: currentStep.key,
          status: 'completed',
          completed_at: new Date().toISOString()
        });

      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Update profile when onboarding is complete
        await supabase
          .from('profiles')
          .update({ 
            onboarding_completed: true,
            onboarding_last_step: currentStep.key
          })
          .eq('id', (await supabase.auth.getUser()).data.user?.id);

        toast({
          title: "Onboarding Complete!",
          description: "You're all set to start using the platform."
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating onboarding progress:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save progress"
      });
    }
  };

  const handleSkip = async () => {
    const currentStep = steps[currentStepIndex];
    
    if (currentStep.is_required) {
      toast({
        variant: "destructive",
        title: "Required Step",
        description: "This step cannot be skipped"
      });
      return;
    }

    try {
      // Record step skip
      await supabase
        .from('user_onboarding_progress')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          step_key: currentStep.key,
          status: 'skipped',
          skipped_at: new Date().toISOString()
        });

      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error skipping step:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to skip step"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-2 bg-secondary rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{currentStep.title}</h2>
          {currentStep.description && (
            <p className="text-muted-foreground">{currentStep.description}</p>
          )}
          {currentStep.content && (
            <div className="prose dark:prose-invert max-w-none">
              {currentStep.content}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6">
          {!currentStep.is_required && (
            <Button variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button onClick={handleNext}>
              {currentStepIndex === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};