import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Grid, Layout, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ERDControlsProps {
  onLayoutChange: (layout: string) => void;
  onSaveLayout: () => void;
  onToggleGrid: () => void;
  showGrid: boolean;
}

export const ERDControls = ({ onLayoutChange, onSaveLayout, onToggleGrid, showGrid }: ERDControlsProps) => {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('erd_visualizations')
        .insert({
          name: 'Saved Layout',
          diagram_data: {}, // This will be populated with actual layout data
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Layout saved",
        description: "Your ERD layout has been saved successfully",
      });

      onSaveLayout();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save layout",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Select onValueChange={onLayoutChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="horizontal">Horizontal Tree</SelectItem>
          <SelectItem value="vertical">Vertical Tree</SelectItem>
          <SelectItem value="dagre">Dagre</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" onClick={onToggleGrid}>
        <Grid className="w-4 h-4 mr-2" />
        {showGrid ? "Hide Grid" : "Show Grid"}
      </Button>

      <Button variant="outline" size="sm" onClick={handleSave}>
        <Save className="w-4 h-4 mr-2" />
        Save Layout
      </Button>

      <Button variant="outline" size="sm">
        <History className="w-4 h-4 mr-2" />
        History
      </Button>
    </div>
  );
};