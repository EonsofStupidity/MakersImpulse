interface OnboardingStepProps {
  step: {
    title: string;
    description: string | null;
    content?: string;
  };
}

export const OnboardingContent = ({ step }: OnboardingStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{step.title}</h2>
      {step.description && (
        <p className="text-muted-foreground">{step.description}</p>
      )}
      {step.content && (
        <div className="prose dark:prose-invert max-w-none">
          {step.content}
        </div>
      )}
    </div>
  );
};