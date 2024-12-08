import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface ContentVersionsProps {
  contentId: string;
}

const ContentVersions = ({ contentId }: ContentVersionsProps) => {
  const { data: versions, isLoading } = useQuery({
    queryKey: ["content-versions", contentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_versions")
        .select(`
          *,
          created_by:profiles(username)
        `)
        .eq("content_id", contentId)
        .order("version_number", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading versions...</div>;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Version History</h3>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {versions?.map((version) => (
            <Card key={version.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge>Version {version.version_number}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    By {version.created_by?.username || "Unknown user"}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(version.created_at), "PPp")}
                </p>
              </div>
              <div className="mt-2">
                <pre className="text-sm bg-muted p-2 rounded-md overflow-auto">
                  {JSON.stringify(version.metadata, null, 2)}
                </pre>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ContentVersions;