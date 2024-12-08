import { useQuery } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PersonalizedRecommendations = () => {
  const session = useSession();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('build_recommendations')
        .select(`
          *,
          profiles!build_recommendations_user_id_fkey (
            username,
            display_name
          )
        `)
        .eq('user_id', session.user.id)
        .order('score', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;
  if (!recommendations) return null;

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
      <ScrollArea className="h-[300px]">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{rec.component_type}</h4>
                <p className="text-sm text-muted-foreground">{rec.reason}</p>
              </div>
              <Badge variant="secondary">Score: {rec.score.toFixed(1)}</Badge>
            </div>
          </Card>
        ))}
      </ScrollArea>
    </Card>
  );
};

export default PersonalizedRecommendations;