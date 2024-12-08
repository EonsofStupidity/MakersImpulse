import { Card } from "@/components/ui/card";

interface OnboardingStepPreviewProps {
  steps: any[];
}

export const OnboardingStepPreview = ({ steps }: OnboardingStepPreviewProps) => {
  const activeSteps = steps.filter(step => step.is_active && step.status === 'published')
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Preview Mode</h3>
        <div className="space-y-8">
          {activeSteps.map((step, index) => (
            <div key={step.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <h4 className="text-lg font-medium">{step.title}</h4>
              </div>
              {step.description && (
                <p className="text-muted-foreground">{step.description}</p>
              )}
              <div className="prose dark:prose-invert max-w-none mt-4">
                {step.content}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};