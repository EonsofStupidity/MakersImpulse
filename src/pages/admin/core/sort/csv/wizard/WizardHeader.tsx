import { Progress } from "@/components/ui/progress";
import { WIZARD_STEPS } from "./WizardSteps";

export const WizardHeader = ({ currentStep }: { currentStep: number }) => {
  return (
    <>
      <Progress value={(currentStep / (WIZARD_STEPS.length - 1)) * 100} />
      
      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        {WIZARD_STEPS.map((step, index) => (
          <span
            key={index}
            className={`${currentStep >= index ? "text-primary" : ""}`}
          >
            {step.title}
          </span>
        ))}
      </div>
    </>
  );
};