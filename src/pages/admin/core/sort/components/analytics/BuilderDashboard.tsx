import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, ChartLine, ChartPie, Database, TrendingUp, TrendingDown, Filter } from "lucide-react";
import BuildTrends from "./BuildTrends";
import PopularComponents from "./PopularComponents";
import BuilderMetrics from "./BuilderMetrics";
import BuilderRecommendations from "./BuilderRecommendations";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const BuilderDashboard = () => {
  const session = useSession();
  const [dateRange, setDateRange] = useState({ from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), to: new Date() });

  const { data: userProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isAdmin = userProfile?.role === 'admin';

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">
            {isAdmin ? 'Site Analytics' : 'Builder Analytics'}
          </h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Analytics</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <DateRangePicker
                  from={dateRange.from}
                  to={dateRange.to}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to });
                    }
                  }}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
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

        <TabsContent value="overview">
          <BuilderMetrics dateRange={dateRange} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="trends">
          <BuildTrends dateRange={dateRange} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="components">
          <PopularComponents dateRange={dateRange} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="recommendations">
          <BuilderRecommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuilderDashboard;