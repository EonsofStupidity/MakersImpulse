import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "./FollowButton";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
}

const UserRecommendations = () => {
  const session = useSession();
  const [recommendations, setRecommendations] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchRecommendations = async () => {
      // Get users with similar interests or who have built similar printers
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, bio')
        .neq('id', session.user.id)
        .limit(5);

      if (!error && data) {
        setRecommendations(data);
      }
    };

    fetchRecommendations();
  }, [session?.user?.id]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Suggested Users</h3>
      <ScrollArea className="h-[300px]">
        {recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground">No recommendations available</p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar_url || undefined} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    {user.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-1">{user.bio}</p>
                    )}
                  </div>
                </div>
                <FollowButton userId={user.id} />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default UserRecommendations;