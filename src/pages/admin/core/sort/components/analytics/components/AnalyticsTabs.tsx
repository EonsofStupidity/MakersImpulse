import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, ChartLine, ChartPie, Database, TrendingUp } from "lucide-react";

export const AnalyticsTabs = () => {
  return (
    <TabsList>
      <TabsTrigger value="overview" className="flex items-center gap-2">
        <ChartPie className="h-4 w-4" />
        Overview
      </TabsTrigger>
      <TabsTrigger value="trends" className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        Trends
      </TabsTrigger>
      <TabsTrigger value="components" className="flex items-center gap-2">
        <Database className="h-4 w-4" />
        Components
      </TabsTrigger>
      <TabsTrigger value="recommendations" className="flex items-center gap-2">
        <ChartLine className="h-4 w-4" />
        Recommendations
      </TabsTrigger>
    </TabsList>
  );
};