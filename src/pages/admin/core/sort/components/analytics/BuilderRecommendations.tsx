import { useQuery } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsLoading } from "./components/AnalyticsLoading";

const BuilderRecommendations = () => {
  const session = useSession();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["builder-recommendations", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("build_recommendations")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("score", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (isLoading) {
    return <AnalyticsLoading title="Personalized Recommendations" />;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {recommendations?.map((rec) => (
            <Card key={rec.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{rec.component_type}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rec.reason}
                  </p>
                </div>
                <Badge variant="secondary">Score: {rec.score.toFixed(1)}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default BuilderRecommendations;