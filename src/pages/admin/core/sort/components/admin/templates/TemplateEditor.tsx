import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TemplateVersions } from "./TemplateVersions";
import { Template } from "./types";

interface TemplateEditorProps {
  templateId?: string;
  onSave?: () => void;
}

export const TemplateEditor = ({ templateId, onSave }: TemplateEditorProps) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const [template, setTemplate] = useState<Template>({
    name: "",
    description: "",
    is_public: false,
    version: 1,
    field_mappings: {},
    validation_rules: {},
    metadata: {}
  });

  useEffect(() => {
    if (templateId) {
      loadTemplate();
    }
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
      if (data) {
        setTemplate({
          ...data,
          field_mappings: data.field_mappings || {},
          validation_rules: data.validation_rules || {},
          metadata: data.metadata || {}
        } as Template);
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      // Create or update template
      const { error } = templateId 
        ? await supabase
            .from('data_maestro_templates')
            .update(template)
            .eq('id', templateId)
        : await supabase
            .from('data_maestro_templates')
            .insert([{ 
              ...template, 
              created_by: (await supabase.auth.getUser()).data.user?.id 
            }]);

      if (error) throw error;

      // If this is an update, create a new version
      if (templateId) {
        const { error: versionError } = await supabase
          .from('template_version_history')
          .insert([{
            template_id: templateId,
            version_number: (template.version || 0) + 1,
            content: {
              field_mappings: template.field_mappings,
              validation_rules: template.validation_rules,
              metadata: template.metadata
            },
            created_by: (await supabase.auth.getUser()).data.user?.id
          }]);

        if (versionError) throw versionError;
      }

      toast({
        title: "Success",
        description: `Template ${templateId ? 'updated' : 'created'} successfully`
      });

      if (onSave) onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={template.name}
              onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              placeholder="Enter template name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={template.description}
              onChange={(e) => setTemplate({ ...template, description: e.target.value })}
              placeholder="Enter template description"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={template.is_public}
              onCheckedChange={(checked) => setTemplate({ ...template, is_public: checked })}
            />
            <Label htmlFor="public">Make template public</Label>
          </div>

          <Button type="submit" disabled={saving} className="w-full">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saving ? "Saving..." : "Save Template"}
          </Button>
        </form>
      </Card>

      {templateId && (
        <Tabs defaultValue="versions">
          <TabsList>
            <TabsTrigger value="versions">Version History</TabsTrigger>
          </TabsList>
          <TabsContent value="versions">
            <TemplateVersions templateId={templateId} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};