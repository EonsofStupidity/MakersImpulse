import { FormatSelector } from "../formats/FormatSelector";
import { FormatSettings } from "../formats/FormatSettings";
import { TableDefinitionStep } from "../wizard-steps/TableDefinitionStep";
import { FieldMappingStep } from "../wizard-steps/FieldMappingStep";
import { ValidationRulesStep } from "../wizard-steps/ValidationRulesStep";
import { PreviewStep } from "../wizard-steps/PreviewStep";
import { ReviewStep } from "../wizard-steps/ReviewStep";

export const WIZARD_STEPS = [
  { id: 1, name: "Format Selection" },
  { id: 2, name: "Table Definition" },
  { id: 3, name: "Field Mapping" },
  { id: 4, name: "Validation Rules" },
  { id: 5, name: "Preview" },
  { id: 6, name: "Review" }
] as const;

interface WizardStepsProps {
  currentStep: number;
  config: any;
  onUpdateConfig: (config: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const WizardSteps = ({ 
  currentStep, 
  config = {}, // Provide default empty object
  onUpdateConfig, 
  onNext, 
  onBack 
}: WizardStepsProps) => {
  const handleFormatChange = (format: string) => {
    onUpdateConfig({ 
      ...config, 
      format, 
      formatSettings: {} 
    });
  };

  const handleFormatSettingsChange = (settings: Record<string, any>) => {
    onUpdateConfig({ 
      ...config, 
      formatSettings: settings 
    });
  };

  // Ensure config and its properties have default values
  const safeConfig = {
    format: 'csv',
    formatSettings: {},
    ...config
  };

  switch (currentStep) {
    case 1:
      return (
        <div className="space-y-6">
          <FormatSelector 
            value={safeConfig.format} 
            onChange={handleFormatChange} 
          />
          <FormatSettings
            format={safeConfig.format}
            settings={safeConfig.formatSettings}
            onUpdateSettings={handleFormatSettingsChange}
          />
        </div>
      );
    case 2:
      return (
        <TableDefinitionStep 
          config={safeConfig} 
          onUpdate={onUpdateConfig} 
          onNext={onNext} 
        />
      );
    case 3:
      return (
        <FieldMappingStep 
          config={safeConfig} 
          onUpdate={onUpdateConfig} 
          onNext={onNext} 
          onBack={onBack} 
        />
      );
    case 4:
      return (
        <ValidationRulesStep 
          config={safeConfig} 
          onUpdate={onUpdateConfig} 
          onNext={onNext} 
          onBack={onBack} 
        />
      );
    case 5:
      return (
        <PreviewStep 
          config={safeConfig} 
          onUpdate={onUpdateConfig} 
          onNext={onNext} 
          onBack={onBack} 
        />
      );
    case 6:
      return (
        <ReviewStep 
          config={safeConfig} 
          onBack={onBack} 
          onSave={() => {}} 
        />
      );
    default:
      return null;
  }
};