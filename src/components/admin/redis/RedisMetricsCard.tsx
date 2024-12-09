import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Server, Database, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RedisLogViewer, type LogEntry } from './RedisLogViewer';

export const RedisMetricsCard = () => {
  const { data: metrics, error } = useQuery({
    queryKey: ['cache-metrics'],
    queryFn: async () => {
      // This would be replaced with actual Redis metrics fetching
      const mockData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        hitRate: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        keys: Math.floor(Math.random() * 1000),
        commands: Math.floor(Math.random() * 500),
      }));
      return mockData;
    },
    refetchInterval: 5000
  });

  const { data: logs } = useQuery({
    queryKey: ['redis-logs'],
    queryFn: async () => {
      // Mock logs data with correct types
      const mockLogs: LogEntry[] = [
        { level: 'info', message: 'Redis connection established', timestamp: new Date().toISOString() },
        { level: 'warn', message: 'High memory usage detected', timestamp: new Date().toISOString() },
        { level: 'error', message: 'Failed to execute command', timestamp: new Date().toISOString() }
      ];
      return mockLogs;
    },
    refetchInterval: 5000
  });

  const { data: healthStatus } = useQuery({
    queryKey: ['redis-health'],
    queryFn: async () => {
      // This would be replaced with actual Redis health check
      return {
        status: 'healthy',
        uptime: '5d 12h 30m',
        connectedClients: 12,
        lastError: null,
      };
    },
    refetchInterval: 10000
  });

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to fetch Redis metrics. Please check your connection.
        </AlertDescription>
      </Alert>
    );
  }

  const latestMetrics = metrics?.[metrics.length - 1];

  return (
    <div className="space-y-6">
      <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Cache Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Server className="w-4 h-4" />
                Status
              </div>
              <p className="text-xl font-bold text-green-500">
                {healthStatus?.status === 'healthy' ? 'Connected' : 'Disconnected'}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Uptime
              </div>
              <p className="text-xl font-bold">{healthStatus?.uptime}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Database className="w-4 h-4" />
                Memory
              </div>
              <p className="text-xl font-bold">
                {latestMetrics?.memoryUsage.toFixed(1)}%
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4" />
                Hit Rate
              </div>
              <p className="text-xl font-bold">
                {latestMetrics?.hitRate.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-[200px]">
              <p className="text-sm text-muted-foreground mb-2">Memory & Hit Rate</p>
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

            <div className="h-[200px]">
              <p className="text-sm text-muted-foreground mb-2">Operations</p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics}>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="keys" fill="#8884d8" name="Total Keys" />
                  <Bar dataKey="commands" fill="#82ca9d" name="Commands/min" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {logs && <RedisLogViewer logs={logs} />}
    </div>
  );
};