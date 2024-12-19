import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { History, ArrowLeft, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { transformRevisionList } from "@/types/revisions/transformations";
import type { RevisionRecord } from "@/types/revisions/base";
import type { ContentRevision } from "@/types/revisions/queries";

interface RevisionHistoryProps {
  contentId: string;
  onRestore?: (revision: RevisionRecord) => void;
  onPreview?: (revision: RevisionRecord) => void;
}

export const RevisionHistory: React.FC<RevisionHistoryProps> = ({
  contentId,
  onRestore,
  onPreview,
}) => {
  const { data: revisions, isLoading } = useQuery({
    queryKey: ["content-revisions", contentId],
    queryFn: async () => {
      console.log("Fetching revisions for content:", contentId);
      
      const { data, error } = await supabase
        .from("cms_content_revisions")
        .select(`
          id,
          content,
          metadata,
          created_at,
          created_by,
          version_number,
          change_summary,
          profiles (
            display_name,
            avatar_url
          )
        `)
        .eq("content_id", contentId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching revisions:", error);
        toast.error("Failed to load revision history");
        throw error;
      }

      return transformRevisionList(data as ContentRevision[]);
    },
    enabled: !!contentId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!revisions?.length) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No revision history available
      </div>
    );
  }

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Revision History</h3>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-4">
          {revisions.map((revision, index) => (
            <motion.div
              key={revision.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-primary/10 rounded-lg p-4 bg-background/30"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(revision.timestamp), "PPpp")}
                  </p>
                  <p className="text-sm">
                    By: {revision.author.displayName}
                  </p>
                </div>
                <div className="flex gap-2">
                  {onPreview && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPreview(revision)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  )}
                  {onRestore && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRestore(revision)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Restore
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-2 text-sm">
                <pre className="bg-background/50 p-2 rounded overflow-x-auto">
                  {JSON.stringify(revision.content, null, 2)}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};