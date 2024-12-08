import { ReactNode } from "react";

export type WizardStepKey = "tableDefinition" | "fieldMapping" | "relationships" | "validation" | "preview" | "review";

interface WizardStepProps {
  step: WizardStepKey;
  children: ReactNode;
}

export const WizardStep = ({ step, children }: WizardStepProps) => {
  return <div className="space-y-6">{children}</div>;
};