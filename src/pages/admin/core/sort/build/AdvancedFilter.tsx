import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface FilterPreferences {
  priceRange: [number, number];
  showCompatibleOnly: boolean;
  searchQuery: string;
  sortBy: string;
}

interface AdvancedFilterProps {
  onFilterChange: (filters: FilterPreferences) => void;
  compatibleWith?: string[];
  type: string;
  initialFilters?: FilterPreferences;
}

const AdvancedFilter = ({
  onFilterChange,
  compatibleWith,
  type,
  initialFilters
}: AdvancedFilterProps) => {
  const { toast } = useToast();
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [0, 1000]
  );
  const [showCompatibleOnly, setShowCompatibleOnly] = useState(
    initialFilters?.showCompatibleOnly || false
  );

  const handlePriceRangeChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    updateFilters({ priceRange: range });
  };

  const handleCompatibilityChange = (checked: boolean) => {
    setShowCompatibleOnly(checked);
    updateFilters({ showCompatibleOnly: checked });
  };

  const updateFilters = (updates: Partial<FilterPreferences>) => {
    onFilterChange({
      priceRange,
      showCompatibleOnly,
      searchQuery: initialFilters?.searchQuery || "",
      sortBy: initialFilters?.sortBy || "name",
      ...updates
    });
  };

  const savePreferences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your preferences",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          component_type: type,
          preferences: {
            priceRange,
            showCompatibleOnly,
            searchQuery: initialFilters?.searchQuery,
            sortBy: initialFilters?.sortBy
          }
        });

      if (error) throw error;

      toast({
        title: "Preferences saved",
        description: "Your filter preferences have been saved"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-4 space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Price Range (USD)</Label>
          <div className="pt-2 px-2">
            <Slider
              min={0}
              max={1000}
              step={10}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceRangeChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {compatibleWith && compatibleWith.length > 0 && (
          <div className="flex items-center space-x-2">
            <Switch
              id="compatibility"
              checked={showCompatibleOnly}
              onCheckedChange={handleCompatibilityChange}
            />
            <Label htmlFor="compatibility">Show only compatible items</Label>
          </div>
        )}

        <Button 
          variant="secondary" 
          className="w-full"
          onClick={savePreferences}
        >
          Save Preferences
        </Button>
      </div>
    </Card>
  );
};

export default AdvancedFilter;