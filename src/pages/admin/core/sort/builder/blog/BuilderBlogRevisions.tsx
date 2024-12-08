import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

interface BuilderBlogRevisionsProps {
  postId: string;
}

const BuilderBlogRevisions = ({ postId }: BuilderBlogRevisionsProps) => {
  const { data: revisions, isLoading } = useQuery({
    queryKey: ["blog-revisions", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builder_blog_revisions")
        .select(`
          *,
          created_by:profiles(username)
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading revision history...</div>;

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Revision History</h3>
      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          {revisions?.map((revision) => (
            <Card key={revision.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{revision.title}</p>
                  <p className="text-sm text-muted-foreground">
                    By {revision.created_by?.username || "Unknown user"}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(revision.created_at), "PPp")}
                </p>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: revision.content }} />
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default BuilderBlogRevisions;