import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onSelect }: TemplateSelectorProps) => {
  const { data: templates, isLoading } = useQuery({
    queryKey: ["page-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_templates")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading templates...</div>;

  return (
    <RadioGroup
      value={selectedTemplate}
      onValueChange={onSelect}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {templates?.map((template) => (
        <Card
          key={template.id}
          className={`relative p-4 cursor-pointer transition-all ${
            selectedTemplate === template.id ? "ring-2 ring-primary" : ""
          }`}
        >
          <RadioGroupItem
            value={template.id}
            id={template.id}
            className="absolute right-4 top-4"
          />
          <div className="mb-4">
            <Label htmlFor={template.id} className="font-medium">
              {template.name}
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              {template.description}
            </p>
          </div>
        </Card>
      ))}
    </RadioGroup>
  );
};

export default TemplateSelector;