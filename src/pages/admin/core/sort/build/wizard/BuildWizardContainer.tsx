import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { BuildWizardHeader } from "./BuildWizardHeader";
import { BuildWizardSummary } from "./BuildWizardSummary";
import { KinematicsStep } from "./steps/KinematicsStep";
import { PrinterDetailsStep } from "./steps/PrinterDetailsStep";
import { CoreComponentsStep } from "./steps/CoreComponentsStep";
import { AddonsStep } from "./steps/AddonsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { useBuildWizard } from "@/hooks/useBuildWizard";
import type { BuildConfig } from "@/types/build";

const TOTAL_STEPS = 5;

export const BuildWizardContainer = () => {
  const {
    currentStep,
    setCurrentStep,
    saving,
    lastSaved,
    buildConfig,
    setBuildConfig,
    handleSaveProgress,
  } = useBuildWizard();

  const { toast } = useToast();

  const handleUpdate = (data: Partial<BuildConfig>) => {
    setBuildConfig({ ...buildConfig, ...data });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BuildWizardHeader
          buildName={buildConfig.name}
          onBuildNameChange={(name) => handleUpdate({ name })}
          onSave={handleSaveProgress}
          saving={saving}
          lastSaved={lastSaved}
        />

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <Card className="p-6">
              <div className="mb-8">
                <Progress 
                  value={((currentStep + 1) / TOTAL_STEPS) * 100} 
                  className="h-2" 
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>Kinematics</span>
                  <span>Details</span>
                  <span>Components</span>
                  <span>Add-ons</span>
                  <span>Review</span>
                </div>
              </div>

              {currentStep === 0 && (
                <KinematicsStep
                  data={buildConfig}
                  onUpdate={handleUpdate}
                  onNext={() => setCurrentStep(currentStep + 1)}
                />
              )}
              {currentStep === 1 && (
                <PrinterDetailsStep
                  data={buildConfig}
                  onUpdate={handleUpdate}
                  onNext={() => setCurrentStep(currentStep + 1)}
                  onBack={() => setCurrentStep(currentStep - 1)}
                />
              )}
              {currentStep === 2 && (
                <CoreComponentsStep
                  data={buildConfig}
                  onUpdate={handleUpdate}
                  onNext={() => setCurrentStep(currentStep + 1)}
                  onBack={() => setCurrentStep(currentStep - 1)}
                />
              )}
              {currentStep === 3 && (
                <AddonsStep
                  data={buildConfig}
                  onUpdate={handleUpdate}
                  onNext={() => setCurrentStep(currentStep + 1)}
                  onBack={() => setCurrentStep(currentStep - 1)}
                />
              )}
              {currentStep === 4 && (
                <ReviewStep
                  data={buildConfig}
                  onBack={() => setCurrentStep(currentStep - 1)}
                  onSubmit={handleSaveProgress}
                  isSubmitting={saving}
                />
              )}
            </Card>
          </div>

          <BuildWizardSummary buildConfig={buildConfig} />
        </div>
      </motion.div>
    </div>
  );
};