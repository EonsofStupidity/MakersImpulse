import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmActionDialog } from "../roles/components/ConfirmActionDialog";
import { Edit2, Trash2, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TemplateDetailsProps {
  template: any;
  onEdit: () => void;
  onDeleted: () => void;
}

export const TemplateDetails = ({ template, onEdit, onDeleted }: TemplateDetailsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('data_maestro_templates')
        .delete()
        .eq('id', template.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template deleted successfully"
      });

      onDeleted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{template.name}</h2>
          <p className="text-muted-foreground mt-1">{template.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={template.is_public ? "default" : "secondary"}>
            {template.is_public ? "Public" : "Private"}
          </Badge>
          <Badge variant="outline">Version {template.version}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Created</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(template.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Last Updated</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(template.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <ConfirmActionDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Template"
        description="Are you sure you want to delete this template? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </Card>
  );
};