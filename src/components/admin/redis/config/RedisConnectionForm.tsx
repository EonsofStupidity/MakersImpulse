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
    <Card className="bg-black/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Server className="h-5 w-5 text-neon-cyan" />
          Connection Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Redis Host</label>
          <Input 
            placeholder="your-redis-host.com" 
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Port</label>
          <Input 
            type="number" 
            placeholder="6379" 
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Password (optional)</label>
          <Input 
            type="password" 
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>

        <Button 
          className="w-full bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 transition-colors" 
          onClick={handleTestConnection}
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </Button>
      </CardContent>
    </Card>
  );
};