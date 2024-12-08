import { TableDefinitionStep } from "../steps/TableDefinitionStep";
import { FieldMappingStep } from "../steps/FieldMappingStep";
import { ValidationRulesStep } from "../steps/ValidationRulesStep";
import { PreviewStep } from "../steps/PreviewStep";
import { ImportConfig, ImportSession } from "../../types";

interface StepContentProps {
  currentStep: number;
  config: ImportConfig;
  setConfig: (config: ImportConfig) => void;
  session: ImportSession | null;
  onNext: () => void;
  onBack: () => void;
}

export const StepContent = ({
  currentStep,
  config,
  setConfig,
  session,
  onNext,
  onBack
}: StepContentProps) => {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <TableDefinitionStep
            config={config}
            onUpdate={setConfig}
            onNext={onNext}
          />
        );
      case 1:
        return (
          <FieldMappingStep
            config={config}
            onUpdate={setConfig}
            onNext={onNext}
            onBack={onBack}
          />
        );
      case 2:
        return (
          <ValidationRulesStep
            config={config}
            onUpdate={setConfig}
            onNext={onNext}
            onBack={onBack}
          />
        );
      case 3:
        return (
          <PreviewStep
            config={config}
            onUpdate={setConfig}
            session={session}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[400px]">
      {renderStep()}
    </div>
  );
};