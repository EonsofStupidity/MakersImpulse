import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsLoading } from "./components/AnalyticsLoading";
import { AnalyticsProps, PopularComponent } from "./types";

const PopularComponents = ({ dateRange, isAdmin }: AnalyticsProps) => {
  const { data: components, isLoading } = useQuery({
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
      return data as PopularComponent[];
    },
  });

  if (isLoading) {
    return <AnalyticsLoading title="Popular Components" />;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Popular Components</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {components?.map((component) => (
            <Card key={component.component_id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{component.component_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Used {component.usage_count} times
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Avg. Cost: ${component.avg_cost?.toFixed(2) || "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {component.unique_users} unique users
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default PopularComponents;