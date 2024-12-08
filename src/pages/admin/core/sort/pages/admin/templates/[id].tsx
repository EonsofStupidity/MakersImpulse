import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { TemplateEditor } from "@/components/admin/templates/TemplateEditor";
import { TemplateDetails } from "@/components/admin/templates/TemplateDetails";
import { supabase } from "@/integrations/supabase/client";

const TemplatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      loadTemplate();
    }
  }, [id]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('data_maestro_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setTemplate(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load template",
        variant: "destructive"
      });
      navigate("/admin/templates");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!template) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      {isEditing ? (
        <TemplateEditor
          templateId={id}
          onSave={() => {
            setIsEditing(false);
            loadTemplate();
          }}
        />
      ) : (
        <TemplateDetails
          template={template}
          onEdit={() => setIsEditing(true)}
          onDeleted={() => navigate("/admin/templates")}
        />
      )}
    </div>
  );
};

export default TemplatePage;