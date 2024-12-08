import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  user_id: string;
  activity_type: string;
  content: string;
  metadata: any;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
    display_name: string;
  };
}

const ActivityFeed = () => {
  const session = useSession();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("activity_feed")
        .select(`
          *,
          profiles:profiles (
            username,
            avatar_url,
            display_name
          )
        `)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        setActivities(data as ActivityItem[]);
      }
    };

    fetchActivities();

    // Subscribe to new activities
    const channel = supabase
      .channel("activity_feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "activity_feed",
        },
        async (payload) => {
          if (payload.new) {
            // Fetch the complete activity with profile data
            const { data, error } = await supabase
              .from("activity_feed")
              .select(`
                *,
                profiles:profiles (
                  username,
                  avatar_url,
                  display_name
                )
              `)
              .eq("id", payload.new.id)
              .single();

            if (!error && data) {
              setActivities(prev => [data as ActivityItem, ...prev].slice(0, 50));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={activity.profiles.avatar_url} />
                  <AvatarFallback>
                    {activity.profiles.display_name?.[0] || activity.profiles.username?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {activity.profiles.display_name || activity.profiles.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ActivityFeed;