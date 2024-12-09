import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database, Server, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const RedisStatusCard = () => {
  const navigate = useNavigate();
  
  const { data: status } = useQuery({
    queryKey: ['redis-status'],
    queryFn: async () => {
      // This would be replaced with actual Redis status fetching
      return {
        enabled: true,
        mode: 'full',
        memoryUsage: 42,
        memoryLimit: 128,
        keys: 5232,
        uptime: '3 days, 12 hours'
      };
    },
    refetchInterval: 5000
  });

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Services Overview
        </CardTitle>
        <Badge variant={status?.enabled ? "default" : "destructive"}>
          {status?.enabled ? "Enabled" : "Disabled"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Server className="h-4 w-4" />
              Mode
            </div>
            <p className="text-lg font-semibold">{status?.mode === 'full' ? 'Full' : 'Restricted'}</p>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Uptime
            </div>
            <p className="text-lg font-semibold">{status?.uptime}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Memory Usage</span>
            <span>{status?.memoryUsage} MB / {status?.memoryLimit} MB</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(status?.memoryUsage / status?.memoryLimit) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/redis/configure')}
          >
            Configure Redis
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/admin/redis/metrics')}
          >
            View Metrics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};