import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Loader2 } from "lucide-react";

const SiteMetrics = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["site-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_metrics")
        .select("*")
        .order("recorded_at", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Site Metrics</h2>
      <div className="h-[400px]">
        <LineChart width={800} height={400} data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="recorded_at" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="metric_value.users" name="Users" stroke="#8884d8" />
          <Line type="monotone" dataKey="metric_value.builds" name="Builds" stroke="#82ca9d" />
          <Line type="monotone" dataKey="metric_value.parts" name="Parts" stroke="#ffc658" />
        </LineChart>
      </div>
    </Card>
  );
};

export default SiteMetrics;