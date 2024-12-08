import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TemplateBrowser = () => {
  const { data: templates } = useQuery({
    queryKey: ["vdb-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vdb_template_library")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Template Library</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <Card key={template.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
              <Badge variant={template.is_public ? "default" : "secondary"}>
                {template.is_public ? "Public" : "Private"}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {template.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button size="sm">Use Template</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateBrowser;