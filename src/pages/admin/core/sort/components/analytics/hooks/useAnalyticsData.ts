import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DateRange } from "../types";

export const useAnalyticsData = (dateRange: DateRange, isAdmin: boolean) => {
  const { data: buildMetrics } = useQuery({
    queryKey: ["build-metrics", dateRange, isAdmin],
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

  const { data: popularComponents } = useQuery({
    queryKey: ["popular-components", dateRange, isAdmin],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("build_component_analytics")
        .select("*")
        .gte("created_at", dateRange.from.toISOString())
        .lte("created_at", dateRange.to.toISOString())
        .order("usage_count", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  const { data: recommendations } = useQuery({
    queryKey: ["builder-recommendations", dateRange, isAdmin],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("build_recommendations")
        .select("*")
        .order("score", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return {
    buildMetrics,
    popularComponents,
    recommendations,
  };
};