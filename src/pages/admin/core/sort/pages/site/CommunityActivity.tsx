import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface ActivityWithProfile {
  id: string;
  content: string;
  created_at: string;
  activity_type: string;
  metadata: any;
  user_id: string;
  profiles: {
    username: string | null;
    avatar_url: string | null;
    display_name: string | null;
  };
}

const CommunityActivity = () => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["community-activity"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_feed')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url,
            display_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data as unknown as ActivityWithProfile[];
    }
  });

  if (isLoading) {
    return <div>Loading activity feed...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Community Activity</h1>
      <div className="grid gap-4">
        {activities?.map((activity) => (
          <Card key={activity.id} className="p-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.profiles?.avatar_url || undefined} />
                <AvatarFallback>
                  {activity.profiles?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">
                  {activity.profiles?.display_name || activity.profiles?.username}
                </p>
                <p className="text-muted-foreground">{activity.content}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityActivity;