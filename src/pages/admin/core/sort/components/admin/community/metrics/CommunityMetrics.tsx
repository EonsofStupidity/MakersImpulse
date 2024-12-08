import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface SiteMetric {
  metric_name: string;
  metric_value: {
    active_users: number;
    new_posts: number;
    engagement_rate: string;
  };
  recorded_at: string;
}

const CommunityMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["community-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_metrics")
        .select("*")
        .order("recorded_at", { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      
      // Parse the JSON string if needed
      const parsedData = {
        ...data,
        metric_value: typeof data.metric_value === 'string' 
          ? JSON.parse(data.metric_value)
          : data.metric_value
      } as SiteMetric;
      
      return parsedData;
    },
  });

  if (isLoading) return <div>Loading metrics...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground">Active Users</h4>
        <p className="text-2xl font-bold">{metrics?.metric_value?.active_users || 0}</p>
      </Card>
      
      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground">New Posts Today</h4>
        <p className="text-2xl font-bold">{metrics?.metric_value?.new_posts || 0}</p>
      </Card>
      
      <Card className="p-4">
        <h4 className="text-sm font-medium text-muted-foreground">Engagement Rate</h4>
        <p className="text-2xl font-bold">{metrics?.metric_value?.engagement_rate || "0%"}</p>
      </Card>
    </div>
  );
};

export default CommunityMetrics;