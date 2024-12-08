import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldMappingSection } from "./sections/FieldMappingSection";
import { ValidationRulesSection } from "./sections/ValidationRulesSection";
import { CrossFieldValidation } from "./sections/CrossFieldValidation";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const VisualTemplateBuilder = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("field-mapping");

  useEffect(() => {
    loadTemplate();
  }, [templateId]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('data_maestro_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) throw error;
      setTemplate(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load template",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updates: any) => {
    try {
      const { error } = await supabase
        .from('data_maestro_templates')
        .update(updates)
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{template?.name || 'Visual Template Builder'}</h1>
        <Button variant="outline" onClick={() => navigate('/admin/templates')}>
          Back to Templates
        </Button>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="field-mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="validation">Validation Rules</TabsTrigger>
            <TabsTrigger value="cross-field">Cross-field Validation</TabsTrigger>
          </TabsList>

          <TabsContent value="field-mapping">
            <FieldMappingSection 
              template={template}
              onSave={handleSave}
            />
          </TabsContent>

          <TabsContent value="validation">
            <ValidationRulesSection 
              template={template}
              onSave={handleSave}
            />
          </TabsContent>

          <TabsContent value="cross-field">
            <CrossFieldValidation 
              template={template}
              onSave={handleSave}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};