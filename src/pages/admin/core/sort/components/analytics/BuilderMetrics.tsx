import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ChartBar, TrendingUp, Users, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsLoading } from "./components/AnalyticsLoading";
import { AnalyticsProps } from "./types";

const BuilderMetrics = ({ dateRange, isAdmin }: AnalyticsProps) => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["builder-metrics", dateRange, isAdmin],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("builder_statistics")
        .select("*")
        .gte("created_at", dateRange.from.toISOString())
        .lte("created_at", dateRange.to.toISOString());

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <AnalyticsLoading title="Builder Metrics" />;
  }

  const aggregatedMetrics = metrics?.reduce(
    (acc, curr) => ({
      total_views: (acc.total_views || 0) + curr.total_views,
      total_likes: (acc.total_likes || 0) + curr.total_likes,
      total_comments: (acc.total_comments || 0) + curr.total_comments,
      engagement_rate: (acc.engagement_rate || 0) + curr.engagement_rate,
    }),
    {} as any
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Total Views</h3>
        </div>
        <p className="text-2xl font-bold mt-2">
          {aggregatedMetrics?.total_views?.toLocaleString() || 0}
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Engagement Rate</h3>
        </div>
        <p className="text-2xl font-bold mt-2">
          {(aggregatedMetrics?.engagement_rate || 0).toFixed(2)}%
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold">Total Likes</h3>
        </div>
        <p className="text-2xl font-bold mt-2">
          {aggregatedMetrics?.total_likes?.toLocaleString() || 0}
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold">Total Comments</h3>
        </div>
        <p className="text-2xl font-bold mt-2">
          {aggregatedMetrics?.total_comments?.toLocaleString() || 0}
        </p>
      </Card>
    </div>
  );
};

export default BuilderMetrics;