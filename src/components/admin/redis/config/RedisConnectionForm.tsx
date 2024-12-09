import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Server } from 'lucide-react';

export const RedisConnectionForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual connection testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Redis connection successful');
    } catch (error) {
      toast.error('Failed to connect to Redis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          Connection Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Redis Host</label>
          <Input placeholder="your-redis-host.com" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Port</label>
          <Input type="number" placeholder="6379" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Password (optional)</label>
          <Input type="password" />
        </div>

        <Button 
          className="w-full" 
          onClick={handleTestConnection}
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </Button>
      </CardContent>
    </Card>
  );
};