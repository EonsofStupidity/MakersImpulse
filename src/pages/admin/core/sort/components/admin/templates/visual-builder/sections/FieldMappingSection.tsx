import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DragDropFieldMapping } from "@/components/admin/data-maestro/import/components/field-mapping/DragDropFieldMapping";
import { supabase } from "@/integrations/supabase/client";

interface FieldMappingSectionProps {
  template: any;
  onSave: (updates: any) => Promise<void>;
}

export const FieldMappingSection = ({ template, onSave }: FieldMappingSectionProps) => {
  const [sourceFields, setSourceFields] = useState<string[]>([]);
  const [targetFields, setTargetFields] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>(template?.field_mappings || {});
  const { toast } = useToast();

  useEffect(() => {
    loadFieldSuggestions();
  }, []);

  const loadFieldSuggestions = async () => {
    try {
      const { data: suggestions, error } = await supabase
        .from('field_mapping_suggestions')
        .select('source_field, suggested_target_field')
        .order('confidence_score', { ascending: false });

      if (error) throw error;

      const uniqueSourceFields = [...new Set(suggestions?.map(s => s.source_field) || [])];
      const uniqueTargetFields = [...new Set(suggestions?.map(s => s.suggested_target_field) || [])];

      setSourceFields(uniqueSourceFields);
      setTargetFields(uniqueTargetFields);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load field suggestions",
        variant: "destructive"
      });
    }
  };

  const handleUpdateMapping = async (newMappings: Record<string, string>) => {
    try {
      await onSave({
        field_mappings: newMappings,
        updated_at: new Date().toISOString()
      });
      setMappings(newMappings);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update mappings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Field Mapping</h3>
        <DragDropFieldMapping
          sourceFields={sourceFields}
          targetFields={targetFields}
          mappings={mappings}
          onUpdateMapping={handleUpdateMapping}
        />
      </Card>
    </div>
  );
};
