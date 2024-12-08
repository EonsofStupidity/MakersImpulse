import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check, Image, Info, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WizardSteps } from "./WizardSteps";
import { WizardNavigation } from "./WizardNavigation";
import type { BuildSubmissionData } from "./types";

export const BuildSubmissionWizard = () => {
  const [currentStep, setCurrentStep] = useState("basic-info");
  const [formData, setFormData] = useState<BuildSubmissionData>({
    name: "",
    components: {
      frame: null,
      motion: null,
      electronics: null,
      extras: null
    },
    title: "",
    description: "",
    build_type: "basic",
    estimated_cost: 0,
    images: [],
    verification_responses: [],
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async (data: BuildSubmissionData) => {
      const { data: submission, error: submissionError } = await supabase
        .from("build_submissions")
        .insert({
          title: data.title,
          description: data.description,
          build_type: data.build_type,
          estimated_cost: data.estimated_cost,
          difficulty_level: data.difficulty_level,
          build_time_hours: data.build_time_hours,
        })
        .select()
        .single();

      if (submissionError) throw submissionError;

      // Insert images
      if (data.images.length > 0) {
        const { error: imagesError } = await supabase
          .from("build_submission_images")
          .insert(
            data.images.map((img) => ({
              submission_id: submission.id,
              image_url: img.url,
              annotations: img.annotations,
              step_number: img.step_number,
              caption: img.caption,
            }))
          );

        if (imagesError) throw imagesError;
      }

      // Insert verification responses
      if (data.verification_responses.length > 0) {
        const { error: verificationError } = await supabase
          .from("build_verification_responses")
          .insert(
            data.verification_responses.map((response) => ({
              submission_id: submission.id,
              ...response,
            }))
          );

        if (verificationError) throw verificationError;
      }

      return submission;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["build-submissions"] });
      toast({
        title: "Success",
        description: "Your build has been submitted successfully",
      });
      navigate("/builds");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit build. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStepComplete = (stepData: Partial<BuildSubmissionData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    
    // Move to next step
    switch (currentStep) {
      case "basic-info":
        setCurrentStep("images");
        break;
      case "images":
        setCurrentStep("verification");
        break;
      case "verification":
        setCurrentStep("review");
        break;
      case "review":
        submitMutation.mutate(formData);
        break;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6">
          <Tabs value={currentStep} className="space-y-6">
            <WizardNavigation currentStep={currentStep} />
            <WizardSteps 
              currentStep={currentStep}
              formData={formData}
              onStepComplete={handleStepComplete}
              isSubmitting={submitMutation.isPending}
              onBack={() => setCurrentStep("verification")}
            />
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};
