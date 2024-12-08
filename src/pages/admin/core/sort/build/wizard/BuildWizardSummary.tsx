import { Card } from "@/components/ui/card";
import { BuildConfig } from "@/types/build";

interface BuildWizardSummaryProps {
  buildConfig: BuildConfig;
}

export const BuildWizardSummary = ({ buildConfig }: BuildWizardSummaryProps) => {
  return (
    <Card className="p-6 sticky top-24">
      <h2 className="text-2xl font-semibold mb-4">Build Summary</h2>
      <div className="space-y-4">
        <div className="text-xl font-semibold text-primary">
          Total Cost: ${buildConfig.estimated_cost.toFixed(2)}
        </div>
        <div className="space-y-2">
          {Object.entries(buildConfig.components).map(([type, component]) => (
            component && (
              <div key={type} className="flex justify-between items-center py-2 border-b border-border">
                <span className="capitalize">{type}:</span>
                <div className="text-right">
                  <div className="font-medium">{component.name}</div>
                  {component.cost_usd && (
                    <div className="text-sm text-muted-foreground">
                      ${component.cost_usd}
                    </div>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </Card>
  );
};