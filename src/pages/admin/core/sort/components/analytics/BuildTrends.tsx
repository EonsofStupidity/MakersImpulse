import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalyticsLoading } from "./components/AnalyticsLoading";
import { AnalyticsProps } from "./types";

const BuildTrends = ({ dateRange, isAdmin }: AnalyticsProps) => {
  const { data: trends, isLoading } = useQuery({
    queryKey: ["build-trends", dateRange, isAdmin],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("build_success_metrics")
        .select("*")
        .gte("created_at", dateRange.from.toISOString())
        .lte("created_at", dateRange.to.toISOString());

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <AnalyticsLoading title="Build Success Trends" />;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Build Success Trends</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="build_type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completion_rate" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BuildTrends;