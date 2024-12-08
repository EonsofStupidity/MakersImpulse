import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ComponentSelector from "../../ComponentSelector";
import { useComponentCompatibility } from "@/hooks/useComponentCompatibility";
import type { BuildConfig, ComponentData, CoreComponentType } from "@/types/build";
import type { ComponentType } from "@/types/components";

interface CoreComponentsStepProps {
  data: BuildConfig;
  onUpdate: (data: Partial<BuildConfig>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CoreComponentsStep = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: CoreComponentsStepProps) => {
  const { toast } = useToast();
  const { checkCompatibility } = useComponentCompatibility();
  const [currentComponent, setCurrentComponent] = useState<CoreComponentType>("mcu");

  const handleComponentSelect = async (type: CoreComponentType, component: ComponentData) => {
    // Check compatibility with existing components
    let isCompatible = true;
    const existingComponents = Object.values(data.components || {}).filter(c => c?.id);
    
    for (const existing of existingComponents) {
      if (existing && existing.id !== component.id) {
        const compatible = await checkCompatibility(component.id, existing.id);
        if (!compatible) {
          isCompatible = false;
          break;
        }
      }
    }

    if (!isCompatible) {
      toast({
        title: "Compatibility Warning",
        description: "This component may not be compatible with your current selection.",
        variant: "destructive"
      });
      return;
    }

    onUpdate({
      components: {
        ...data.components,
        [type]: component
      }
    });
  };

  const getComponentType = (coreType: CoreComponentType): ComponentType => {
    switch (coreType) {
      case "extruder":
        return "extruders";
      case "mcu":
      case "thermistor":
      case "heatbed":
      case "hotend":
      case "power_supply":
      case "sbc":
        return "base_product";
      default:
        return "base_product";
    }
  };

  const isStepComplete = () => {
    const requiredComponents = ["mcu", "hotend", "extruder"];
    return requiredComponents.every(
      (type) => data.components?.[type as CoreComponentType]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Core Components</h3>
        <p className="text-sm text-muted-foreground">
          Select the core components for your printer
        </p>
      </div>

      <div className="space-y-8">
        <ComponentSelector
          type={getComponentType(currentComponent)}
          onSelect={(component) => handleComponentSelect(currentComponent, component)}
          selectedId={data.components?.[currentComponent]?.id}
        />
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
        <Button 
          onClick={onNext} 
          disabled={!isStepComplete()}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
