import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

const ProfileForumActivity = () => {
  const session = useSession();

  const { data: threads } = useQuery({
    queryKey: ["user-threads", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_threads")
        .select("*")
        .eq("author_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: replies } = useQuery({
    queryKey: ["user-replies", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forum_replies")
        .select("*, thread:forum_threads(title)")
        .eq("author_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Threads</h3>
        <ScrollArea className="h-[200px]">
          {threads?.map((thread) => (
            <Card key={thread.id} className="p-4 mb-2">
              <h4 className="font-medium">{thread.title}</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(thread.created_at).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </ScrollArea>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Your Replies</h3>
        <ScrollArea className="h-[200px]">
          {replies?.map((reply) => (
            <Card key={reply.id} className="p-4 mb-2">
              <h4 className="font-medium">Reply to: {reply.thread?.title}</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(reply.created_at).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProfileForumActivity;