import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsErrorBoundary } from "./components/AnalyticsErrorBoundary";
import PopularComponents from "./PopularComponents";
import BuildTrends from "./BuildTrends";
import PersonalizedRecommendations from "./PersonalizedRecommendations";

const BuildAnalytics = () => {
  const session = useSession();
  const [dateRange, setDateRange] = useState({ 
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
    to: new Date() 
  });

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
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Build Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AnalyticsErrorBoundary componentName="Popular Components">
          <PopularComponents dateRange={dateRange} isAdmin={isAdmin} />
        </AnalyticsErrorBoundary>
        
        <AnalyticsErrorBoundary componentName="Build Trends">
          <BuildTrends dateRange={dateRange} isAdmin={isAdmin} />
        </AnalyticsErrorBoundary>
      </div>
      
      <AnalyticsErrorBoundary componentName="Personalized Recommendations">
        <PersonalizedRecommendations />
      </AnalyticsErrorBoundary>
    </div>
  );
};

export default BuildAnalytics;