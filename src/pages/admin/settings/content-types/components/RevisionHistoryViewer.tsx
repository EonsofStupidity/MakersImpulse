import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { History, Calendar, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Profile {
  display_name: string | null;
}

interface Revision {
  id: string;
  content: any;
  created_at: string;
  created_by: string | null;
  profiles?: Profile;
}

interface RevisionHistoryViewerProps {
  contentId: string | null;
}

export const RevisionHistoryViewer: React.FC<RevisionHistoryViewerProps> = ({ contentId }) => {
  const { data: revisions, isLoading } = useQuery({
    queryKey: ["content-revisions", contentId],
    queryFn: async () => {
      if (!contentId) return null;
      
      console.log("Fetching revisions for content:", contentId);
      const { data, error } = await supabase
        .from("cms_content_revisions")
        .select(`
          id,
          content,
          created_at,
          created_by,
          profiles!cms_content_revisions_created_by_fkey (
            display_name
          )
        `)
        .eq("content_id", contentId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching revisions:", error);
        toast.error("Failed to load revision history");
        throw error;
      }

      console.log("Revisions fetched:", data);
      return data as Revision[];
    },
    enabled: !!contentId,
  });

  if (!contentId) {
    return (
      <div className="text-center text-white/60 py-8">
        <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Select content to view revision history</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-white">Revision History</h2>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {revisions?.map((revision) => (
            <div
              key={revision.id}
              className="p-4 rounded-lg bg-black/20 border border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(revision.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(revision.created_at).toLocaleTimeString()}
                </div>
              </div>
              <div className="text-sm text-white/80">
                By: {revision.profiles?.display_name || "Unknown"}
              </div>
              <pre className="text-xs bg-black/40 p-2 rounded overflow-x-auto">
                {JSON.stringify(revision.content, null, 2)}
              </pre>
            </div>
          ))}

          {revisions?.length === 0 && (
            <div className="text-center text-white/60 py-4">
              No revision history available
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};