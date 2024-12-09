import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const CacheMetricsCard = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['cache-metrics'],
    queryFn: async () => {
      // This would be replaced with actual Redis metrics in production
      return {
        hitRate: 85,
        memoryUsage: 45,
        totalRequests: 15000,
        cachedKeys: 2500
      };
    },
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  if (isLoading || !metrics) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[200px]">
          <Activity className="w-6 h-6 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Cache Metrics</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hit Rate</span>
              <span>{metrics.hitRate}%</span>
            </div>
            <Progress value={metrics.hitRate} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Memory Usage</span>
              <span>{metrics.memoryUsage}%</span>
            </div>
            <Progress value={metrics.memoryUsage} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/10 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Requests</div>
              <div className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-secondary/10 rounded-lg">
              <div className="text-sm text-muted-foreground">Cached Keys</div>
              <div className="text-2xl font-bold">{metrics.cachedKeys.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};