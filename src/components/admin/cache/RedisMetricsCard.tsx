import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RedisMetricsGraph } from './metrics/RedisMetricsGraph';
import { RedisOperationsChart } from './metrics/RedisOperationsChart';
import { RedisLogViewer } from './logs/RedisLogViewer';
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the log level type
type LogLevel = 'info' | 'warn' | 'error';

// Define the log entry interface
interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
}

export const RedisMetricsCard = () => {
  const { data: metrics, error } = useQuery({
    queryKey: ['redis-metrics'],
    queryFn: async () => {
      // This would be replaced with actual Redis metrics fetching
      const mockData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        memoryUsage: Math.random() * 100,
        hitRate: Math.random() * 100,
        commands: Math.floor(Math.random() * 500),
        keys: Math.floor(Math.random() * 1000),
      }));
      return mockData;
    },
    refetchInterval: 5000
  });

  const { data: logs } = useQuery<LogEntry[]>({
    queryKey: ['redis-logs'],
    queryFn: async () => {
      // This would be replaced with actual Redis logs fetching
      const mockLogs: LogEntry[] = [
        { level: 'info', message: 'Redis connected successfully', timestamp: '2024-03-20 10:00:00' },
        { level: 'warn', message: 'High memory usage detected', timestamp: '2024-03-20 10:01:00' },
        { level: 'error', message: 'Connection timeout', timestamp: '2024-03-20 10:02:00' },
      ];
      return mockLogs;
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RedisMetricsGraph data={metrics || []} />
        <RedisOperationsChart data={metrics || []} />
      </div>
      <RedisLogViewer logs={logs || []} />
    </div>
  );
};