import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const LeaderboardDisplay = () => {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_leaderboard')
        .select('*')
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  const getRankBadge = (rank: number) => {
    switch(rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="font-bold text-lg">{rank}</span>;
    }
  };

  if (isLoading) return <div>Loading leaderboard...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      {leaderboard?.map((user) => (
        <Card key={user.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10">
                {getRankBadge(user.rank)}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>{user.username?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.display_name || user.username}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">{user.total_points} points</Badge>
                  <Badge variant="outline">Level {user.current_level}</Badge>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {user.completed_achievements} achievements
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};