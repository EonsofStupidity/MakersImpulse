import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Leaderboard = () => {
  const { data: topBuilders, isLoading } = useQuery({
    queryKey: ["top-builders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('points', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  const getRankBadge = (index: number) => {
    switch(index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="font-bold text-lg">{index + 1}</span>;
    }
  };

  if (isLoading) {
    return <div>Loading leaderboard...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Community Leaderboard</h1>
      <div className="grid gap-4">
        {topBuilders?.map((builder, index) => (
          <Card key={builder.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10">
                  {getRankBadge(index)}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={builder.avatar_url} />
                  <AvatarFallback>{builder.username?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{builder.display_name || builder.username}</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{builder.points} points</Badge>
                    <Badge variant="outline">Level {builder.current_level}</Badge>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {builder.achievements_count} achievements
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;