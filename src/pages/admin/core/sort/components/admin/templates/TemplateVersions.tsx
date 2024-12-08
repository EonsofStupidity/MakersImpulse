import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { VersionComparison } from "./VersionComparison";
import { RevisionHistory } from "@/components/common/RevisionHistory";
import { TemplateVersion } from "./types";

interface TemplateVersionsProps {
  templateId: string;
}

export const TemplateVersions = ({ templateId }: TemplateVersionsProps) => {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showRollbackDialog, setShowRollbackDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: versions, isLoading } = useQuery({
    queryKey: ["template-versions", templateId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("template_version_history")
        .select("*, created_by:profiles(username)")
        .eq("template_id", templateId)
        .order("version_number", { ascending: false });
      
      if (error) throw error;

      return (data as any[]).map(version => ({
        ...version,
        content: version.content as TemplateVersion['content']
      })) as TemplateVersion[];
    },
  });

  const { data: comparisonData } = useQuery({
    queryKey: ["version-comparison", ...selectedVersions],
    enabled: selectedVersions.length === 2,
    queryFn: async () => {
      const [v1, v2] = await Promise.all(
        selectedVersions.map(async (versionId) => {
          const { data } = await supabase
            .from("template_version_history")
            .select("content")
            .eq("id", versionId)
            .single();
          return data?.content as TemplateVersion['content'];
        })
      );
      return { v1, v2 };
    },
  });

  const rollbackMutation = useMutation({
    mutationFn: async (versionId: string) => {
      const { data: versionData } = await supabase
        .from("template_version_history")
        .select("content")
        .eq("id", versionId)
        .single();

      if (!versionData) throw new Error("Version not found");
      const content = versionData.content as TemplateVersion['content'];

      const { error } = await supabase
        .from("data_maestro_templates")
        .update({
          field_mappings: content.field_mappings,
          validation_rules: content.validation_rules,
          metadata: content.metadata
        })
        .eq("id", templateId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["template-versions"] });
      queryClient.invalidateQueries({ queryKey: ["data-maestro-template"] });
      toast({
        title: "Success",
        description: "Template has been rolled back to the selected version",
      });
      setShowRollbackDialog(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to rollback template. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRollback = (versionId: string) => {
    rollbackMutation.mutate(versionId);
  };

  const handleCompare = (selectedVersions: any[]) => {
    setSelectedVersions(selectedVersions.map(v => v.id));
    setShowComparison(true);
  };

  if (isLoading) return <div>Loading versions...</div>;

  return (
    <Card className="p-4">
      <RevisionHistory
        revisions={versions || []}
        onRestoreRevision={(version) => {
          setSelectedVersions([version.id]);
          setShowRollbackDialog(true);
        }}
        showVersionNumbers
        compareMode
        onCompare={handleCompare}
      />

      {showComparison && comparisonData && (
        <VersionComparison
          originalContent={JSON.stringify(comparisonData.v1, null, 2)}
          modifiedContent={JSON.stringify(comparisonData.v2, null, 2)}
          onClose={() => setShowComparison(false)}
        />
      )}

      <AlertDialog open={showRollbackDialog} onOpenChange={setShowRollbackDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Rollback</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to rollback to this version? This action will override the current template configuration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedVersions[0] && handleRollback(selectedVersions[0])}
              className="bg-destructive text-destructive-foreground"
            >
              Rollback
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};