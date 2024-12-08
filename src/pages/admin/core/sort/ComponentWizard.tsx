import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ComponentForm } from "./form/ComponentForm";
import { ComponentReview } from "./review/ComponentReview";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import type { ComponentType, ComponentFormData } from "@/types/components";

interface ComponentResponse {
  id: string;
  [key: string]: any;
}

const ComponentWizard = () => {
  const [currentComponentId, setCurrentComponentId] = useState<string | null>(null);
  const [componentType, setComponentType] = useState<ComponentType>("base_product");
  const [progress, setProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Save progress to localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('componentWizardProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
    localStorage.setItem('componentWizardProgress', JSON.stringify(newProgress));
  };

  const handleSubmit = async (data: ComponentFormData) => {
    try {
      const baseInsertData = {
        name: data.name,
        manufacturer: data.manufacturer,
        cost_usd: parseFloat(data.cost_usd),
        summary: data.summary,
        image_url: data.image_url,
        today_trending: "stable" as const,
        value_rating: "good" as const,
        compatibility: data.compatibility,
      };

      let insertData;
      if (componentType === "bearings" && data.bearing_type) {
        insertData = { ...baseInsertData, bearing_type: data.bearing_type };
      } else if (componentType === "addons" && data.addon_type) {
        insertData = { ...baseInsertData, addon_type: data.addon_type };
      } else if (componentType === "extruders" && data.extruder_type) {
        insertData = { ...baseInsertData, extruder_type: data.extruder_type };
      } else {
        insertData = baseInsertData;
      }

      // Only insert into valid component tables
      if (["base_product", "bearings", "extruders", "addons"].includes(componentType)) {
        const { data: component, error } = await supabase
          .from(componentType as "base_product" | "bearings" | "extruders" | "addons")
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;

        if (component) {
          setCurrentComponentId((component as ComponentResponse).id);
          updateProgress(100);
          
          toast({
            title: "Component submitted",
            description: "Your component has been submitted for review",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit component",
        variant: "destructive",
      });
    }
  };

  const handleReviewComplete = () => {
    setCurrentComponentId(null);
    updateProgress(0);
    localStorage.removeItem('componentWizardProgress');
  };

  const MobileNavigation = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[50vh]">
        <div className="space-y-4 py-4">
          <Button
            onClick={() => setComponentType("base_product")}
            variant={componentType === "base_product" ? "default" : "outline"}
            className="w-full"
          >
            Base Product
          </Button>
          <Button
            onClick={() => setComponentType("bearings")}
            variant={componentType === "bearings" ? "default" : "outline"}
            className="w-full"
          >
            Bearings
          </Button>
          <Button
            onClick={() => setComponentType("extruders")}
            variant={componentType === "extruders" ? "default" : "outline"}
            className="w-full"
          >
            Extruders
          </Button>
          <Button
            onClick={() => setComponentType("addons")}
            variant={componentType === "addons" ? "default" : "outline"}
            className="w-full"
          >
            Addons
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Component Wizard</h2>
        <MobileNavigation />
      </div>

      <Progress value={progress} className="w-full" />

      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={() => updateProgress(Math.max(0, progress - 25))}
          disabled={progress === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          variant="ghost"
          onClick={() => updateProgress(Math.min(100, progress + 25))}
          disabled={progress === 100}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {currentComponentId ? (
        <ComponentReview
          componentId={currentComponentId}
          componentType={componentType}
          onReviewComplete={handleReviewComplete}
        />
      ) : (
        <ComponentForm onSubmit={handleSubmit} type={componentType} />
      )}
    </div>
  );
};

export default ComponentWizard;