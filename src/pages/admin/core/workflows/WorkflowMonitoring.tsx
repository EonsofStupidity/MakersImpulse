import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const WorkflowMonitoring = () => {
  const { data: metrics } = useQuery({
    queryKey: ["workflow-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workflow_instances")
        .select("status")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      const statusCounts = data.reduce((acc: Record<string, number>, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

      return statusCounts;
    },
  });

  const chartData = metrics
    ? Object.entries(metrics).map(([status, count]) => ({
        name: status,
        value: count,
      }))
    : [];

  const chartConfig = {
    workflow: {
      label: "Workflow Status",
      theme: {
        light: "#10B981",
        dark: "#059669",
      },
    },
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-medium mb-4">Workflow Status Distribution</h3>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
                <ChartLegend>
                  <ChartLegendContent />
                </ChartLegend>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Recent Workflow Performance</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Completion Rate</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Average Duration</span>
              <span className="text-sm font-medium">2.5 hours</span>
            </div>
            <Progress value={60} />
          </div>
        </div>
      </Card>
    </div>
  );
};