import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { OnboardingContent } from "./OnboardingContent";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { OnboardingProgress } from "./OnboardingProgress";

interface OnboardingStep {
  id: string;
  key: string;
  title: string;
  description: string | null;
  content?: string; // Made optional since it might not be present in all steps
  order_index: number;
  is_required: boolean;
  completion_points: number;
}

export const OnboardingWizard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      navigate("/auth");
      return;
    }

    const fetchSteps = async () => {
      try {
        const { data: stepsData, error } = await supabase
          .from('onboarding_steps')
          .select('*')
          .order('order_index');

        if (error) throw error;

        // Get user's current progress
        const { data: progressData } = await supabase
          .from('user_onboarding_progress')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (progressData?.step_key) {
          const stepIndex = stepsData.findIndex(step => step.key === progressData.step_key);
          if (stepIndex !== -1) {
            setCurrentStepIndex(stepIndex);
          }
        }

        setSteps(stepsData);
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
  }, [session, navigate, toast]);

  const updateProgress = async (stepKey: string, status: 'completed' | 'skipped' = 'completed') => {
    if (!session?.user?.id) return;

    try {
      await supabase
        .from('user_onboarding_progress')
        .upsert({
          user_id: session.user.id,
          step_key: stepKey,
          status,
          completed_at: status === 'completed' ? new Date().toISOString() : null,
          skipped_at: status === 'skipped' ? new Date().toISOString() : null
        });

      await supabase
        .from('profiles')
        .update({ 
          onboarding_last_step: stepKey,
          onboarding_started_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update progress"
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
        <OnboardingProgress 
          currentStep={currentStepIndex + 1} 
          totalSteps={steps.length} 
          progress={progress} 
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <OnboardingContent step={currentStep} />
          </motion.div>
        </AnimatePresence>

        <OnboardingNavigation
          currentStep={currentStep}
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
          onNext={async () => {
            await updateProgress(steps[currentStepIndex].key);
            if (currentStepIndex < steps.length - 1) {
              setCurrentStepIndex(prev => prev + 1);
            } else {
              navigate('/');
            }
          }}
          onPrevious={() => {
            if (currentStepIndex > 0) {
              setCurrentStepIndex(prev => prev - 1);
            }
          }}
          onSkip={async () => {
            if (!currentStep.is_required) {
              await updateProgress(currentStep.key, 'skipped');
              if (currentStepIndex < steps.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
              } else {
                navigate('/');
              }
            }
          }}
        />

        <div className="flex justify-center gap-2 pt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentStepIndex ? "bg-primary" : 
                index < currentStepIndex ? "bg-primary/50" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};