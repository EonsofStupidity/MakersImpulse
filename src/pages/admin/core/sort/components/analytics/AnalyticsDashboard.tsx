import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AnalyticsHeader } from "./components/AnalyticsHeader";
import { AnalyticsTabs } from "./components/AnalyticsTabs";
import { AnalyticsErrorBoundary } from "./components/AnalyticsErrorBoundary";
import BuilderMetrics from "./BuilderMetrics";
import BuildTrends from "./BuildTrends";
import PopularComponents from "./PopularComponents";
import BuilderRecommendations from "./BuilderRecommendations";
import { useAnalyticsData } from "./hooks/useAnalyticsData";
import { DateRange } from "./types";

interface AnalyticsDashboardProps {
  isAdmin: boolean;
}

export const AnalyticsDashboard = ({ isAdmin }: AnalyticsDashboardProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({ 
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
    to: new Date() 
  });

  const { buildMetrics, popularComponents, recommendations } = useAnalyticsData(dateRange, isAdmin);

  return (
    <div className="space-y-6 p-6">
      <AnalyticsHeader 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isAdmin={isAdmin}
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <AnalyticsTabs />

        <TabsContent value="overview">
          <AnalyticsErrorBoundary componentName="Builder Metrics">
            <BuilderMetrics dateRange={dateRange} isAdmin={isAdmin} />
          </AnalyticsErrorBoundary>
        </TabsContent>

        <TabsContent value="trends">
          <AnalyticsErrorBoundary componentName="Build Trends">
            <BuildTrends dateRange={dateRange} isAdmin={isAdmin} />
          </AnalyticsErrorBoundary>
        </TabsContent>

        <TabsContent value="components">
          <AnalyticsErrorBoundary componentName="Popular Components">
            <PopularComponents dateRange={dateRange} isAdmin={isAdmin} />
          </AnalyticsErrorBoundary>
        </TabsContent>

        <TabsContent value="recommendations">
          <AnalyticsErrorBoundary componentName="Builder Recommendations">
            <BuilderRecommendations />
          </AnalyticsErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  );
};