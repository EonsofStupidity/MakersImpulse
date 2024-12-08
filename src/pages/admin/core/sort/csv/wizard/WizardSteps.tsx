import { ValidationProvider } from "../validation/ValidationContext";
import { DocumentationSearch } from "../help/DocumentationSearch";
import { RelationshipVisualizer } from "../relationship-mapping/RelationshipVisualizer";
import { ValidationSummary } from "../ValidationSummary";
import { StepHelp } from "../help/StepHelp";
import { TagsSection } from "../parsing/TagsSection";
import { TableDefinitionForm } from "../table/TableDefinitionForm";
import { FieldMappingForm } from "../field-mapping/FieldMappingForm";
import { ValidationRulesForm } from "../validation/ValidationRulesForm";
import { ReviewSection } from "../review/ReviewSection";
import { WelcomeStep } from "../steps/WelcomeStep";
import { ImportConfig } from "../types";

export const WIZARD_STEPS = [
  {
    title: "Welcome",
    component: WelcomeStep,
  },
  {
    title: "Table Definition",
    component: TableDefinitionForm,
  },
  {
    title: "Field Mapping",
    component: FieldMappingForm,
  },
  {
    title: "Relationships",
    component: RelationshipVisualizer,
  },
  {
    title: "Validation",
    component: ValidationRulesForm,
  },
  {
    title: "Tags",
    component: TagsSection,
  },
  {
    title: "Review",
    component: ReviewSection,
  },
];

interface WizardStepsComponentProps {
  currentStep: number;
  config: ImportConfig;
  setConfig: (config: ImportConfig) => void;
  helpContent: any;
}

export const WizardStepsComponent = ({ currentStep, config, setConfig, helpContent }: WizardStepsComponentProps) => {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep 
            onNext={() => setConfig({ ...config })}
            helpContent={helpContent?.find((h: any) => h.step_key === 'welcome')}
          />
        );
      case 1:
        return (
          <>
            <DocumentationSearch />
            <StepHelp content={helpContent?.find((h: any) => h.step_key === 'table-definition')} />
            <TableDefinitionForm
              value={config.tableName}
              onChange={(tableName) => setConfig({ ...config, tableName })}
            />
          </>
        );
      case 3:
        return (
          <RelationshipVisualizer
            tables={[]}
            relationships={config.relationships}
            onRelationshipChange={(relationships) => setConfig({ ...config, relationships })}
            tableName={config.tableName}
          />
        );
      case 5:
        return (
          <TagsSection
            tags={config.tags}
            onUpdateTags={(tags) => setConfig({ ...config, tags })}
          />
        );
      default:
        return null;
    }
  };

  return renderStep();
};
