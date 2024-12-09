import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const CacheMetricsCard = () => {
  const { data: metrics } = useQuery({
    queryKey: ['cache-metrics'],
    queryFn: async () => {
      // This would be replaced with actual Redis metrics fetching
      const mockData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        hitRate: Math.random() * 100,
        memoryUsage: Math.random() * 100,
      }));
      return mockData;
    },
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Cache Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <XAxis dataKey="time" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hitRate"
                stroke="#8884d8"
                strokeWidth={2}
                name="Hit Rate (%)"
              />
              <Line
                type="monotone"
                dataKey="memoryUsage"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Memory Usage (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Cache Hit Rate</p>
            <p className="text-2xl font-bold">
              {metrics?.[metrics.length - 1]?.hitRate.toFixed(1)}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Memory Usage</p>
            <p className="text-2xl font-bold">
              {metrics?.[metrics.length - 1]?.memoryUsage.toFixed(1)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};