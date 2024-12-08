import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ComponentSelector from "../../ComponentSelector";
import type { BuildConfig, ComponentData } from "@/types/build";

interface AddonsStepProps {
  data: BuildConfig;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<BuildConfig>) => void;
}

export const AddonsStep = ({
  data,
  onNext,
  onBack,
  onUpdate,
}: AddonsStepProps) => {
  const handleAddonSelect = (component: ComponentData) => {
    const currentAddons = data.addons || [];
    const exists = currentAddons.some(addon => addon.id === component.id);
    
    if (!exists) {
      onUpdate({
        addons: [...currentAddons, component]
      });
    }
  };

  const handleRemoveAddon = (addonId: string) => {
    onUpdate({
      addons: (data.addons || []).filter(addon => addon.id !== addonId)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Optional Add-ons</h3>
        <p className="text-sm text-muted-foreground">
          Select additional components to enhance your printer
        </p>
      </div>

      <div className="space-y-4">
        <ComponentSelector
          type="addons"
          onSelect={handleAddonSelect}
        />

        {data.addons && data.addons.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Selected Add-ons</h4>
            <div className="space-y-2">
              {data.addons.map((addon) => (
                <div key={addon.id} className="flex justify-between items-center p-2 bg-secondary rounded">
                  <span>{addon.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAddon(addon.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button onClick={onNext} className="flex items-center gap-2">
          Review
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};