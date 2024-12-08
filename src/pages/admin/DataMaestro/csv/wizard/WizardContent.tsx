import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ImportConfig } from "../types";
import { WIZARD_STEPS, WizardStepsComponent } from "./WizardSteps";
import { WorkflowEditor } from "../workflow/WorkflowEditor";
import { ImportProgress } from "./ImportProgress";

interface WizardContentProps {
  currentStep: number;
  config: ImportConfig;
  setConfig: (config: ImportConfig) => void;
  helpContent: any;
  status: string;
  progress: number;
  onRollback: () => void;
}

export const WizardContent = ({
  currentStep,
  config,
  setConfig,
  helpContent,
  status,
  progress,
  onRollback,
}: WizardContentProps) => {
  return (
    <Card className="p-6">
      <ImportProgress 
        status={status} 
        progress={progress} 
        onRollback={onRollback} 
      />

      {currentStep === 0 ? (
        <WorkflowEditor
          templateId={config.importId}
          onSave={async (nodes, edges) => {}}
        />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">{WIZARD_STEPS[currentStep].title}</h2>
          <WizardStepsComponent 
            currentStep={currentStep}
            config={config}
            setConfig={setConfig}
            helpContent={helpContent}
          />
        </>
      )}

      {currentStep === WIZARD_STEPS.length - 1 && (
        <Alert>
          <AlertTitle>Review Your Configuration</AlertTitle>
          <AlertDescription>
            Please review your configuration carefully before proceeding. 
            This will create your import configuration and prepare the system for data import.
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
};