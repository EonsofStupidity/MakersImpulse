import { TabsContent } from "@/components/ui/tabs";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { ImageUploadStep } from "./steps/ImageUploadStep";
import { VerificationStep } from "./steps/VerificationStep";
import { ReviewStep } from "./steps/ReviewStep";
import type { BuildSubmissionData } from "./types";

interface WizardStepsProps {
  currentStep: string;
  formData: BuildSubmissionData;
  onStepComplete: (data: Partial<BuildSubmissionData>) => void;
  isSubmitting?: boolean;
  onBack: () => void;
}

export const WizardSteps = ({
  currentStep,
  formData,
  onStepComplete,
  isSubmitting,
  onBack,
}: WizardStepsProps) => {
  return (
    <>
      <TabsContent value="basic-info">
        <BasicInfoStep
          initialData={formData}
          onComplete={onStepComplete}
        />
      </TabsContent>

      <TabsContent value="images">
        <ImageUploadStep
          initialData={formData}
          onComplete={onStepComplete}
        />
      </TabsContent>

      <TabsContent value="verification">
        <VerificationStep
          initialData={formData}
          onComplete={onStepComplete}
        />
      </TabsContent>

      <TabsContent value="review">
        <ReviewStep
          data={formData}
          onSubmit={() => onStepComplete({})}
          isSubmitting={isSubmitting}
          onBack={onBack}
        />
      </TabsContent>
    </>
  );
};