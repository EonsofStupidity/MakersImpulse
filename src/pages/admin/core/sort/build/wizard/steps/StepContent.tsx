import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BuildConfig } from "@/types/build";
import { KinematicsStep } from "./KinematicsStep";
import { PrinterDetailsStep } from "./PrinterDetailsStep";
import { CoreComponentsStep } from "./CoreComponentsStep";
import { AddonsStep } from "./AddonsStep";
import { ReviewStep } from "./ReviewStep";

interface StepContentProps {
  currentStep: number;
  buildConfig: BuildConfig;
  onComponentSelect: (type: "frame" | "motion" | "electronics" | "extras", component: any) => void;
  getCompatibilityArray: () => string[];
  onUpdate: (data: Partial<BuildConfig>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const StepContent = ({
  currentStep,
  buildConfig,
  onComponentSelect,
  getCompatibilityArray,
  onUpdate,
  onNext,
  onBack,
  onSubmit,
  isSubmitting
}: StepContentProps) => {
  const steps = ["kinematics", "details", "core", "addons", "review"];
  
  return (
    <Tabs value={steps[currentStep]} className="space-y-6">
      <TabsContent value="kinematics">
        <KinematicsStep
          data={buildConfig}
          onNext={onNext}
          onUpdate={onUpdate}
        />
      </TabsContent>

      <TabsContent value="details">
        <PrinterDetailsStep
          data={buildConfig}
          onNext={onNext}
          onBack={onBack}
          onUpdate={onUpdate}
        />
      </TabsContent>

      <TabsContent value="core">
        <CoreComponentsStep
          data={buildConfig}
          onNext={onNext}
          onBack={onBack}
          onUpdate={onUpdate}
        />
      </TabsContent>

      <TabsContent value="addons">
        <AddonsStep
          data={buildConfig}
          onNext={onNext}
          onBack={onBack}
          onUpdate={onUpdate}
        />
      </TabsContent>

      <TabsContent value="review">
        <ReviewStep 
          data={buildConfig}
          onBack={onBack}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </TabsContent>
    </Tabs>
  );
};