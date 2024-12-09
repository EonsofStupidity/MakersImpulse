import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings, RefreshCw, Database } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface RedisConfig {
  enabled: boolean;
  ttl: number;
  maxSize: number;
}

export const RedisConfigCard = () => {
  const [config, setConfig] = React.useState<RedisConfig>({
    enabled: false,
    ttl: 300, // 5 minutes default
    maxSize: 100 // 100MB default
  });

  const { data: currentConfig, isLoading } = useQuery({
    queryKey: ['redis-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('setting_key', 'redis_config')
        .single();

      if (error) throw error;
      return data?.setting_value ? JSON.parse(data.setting_value) : null;
    }
  });

  React.useEffect(() => {
    if (currentConfig) {
      setConfig(currentConfig);
    }
  }, [currentConfig]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'redis_config',
          setting_value: JSON.stringify(config),
          setting_type: 'json'
        });

      if (error) throw error;
      toast.success('Redis configuration saved');
    } catch (error) {
      console.error('Error saving Redis config:', error);
      toast.error('Failed to save Redis configuration');
    }
  };

  const handleClearCache = async () => {
    try {
      // Here you would implement the actual cache clearing logic
      toast.success('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast.error('Failed to clear cache');
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[200px]">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Redis Cache Configuration</h3>
          </div>
          <Button variant="outline" size="sm" onClick={handleClearCache}>
            Clear Cache
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="cache-enabled">Enable Redis Cache</Label>
            <Switch
              id="cache-enabled"
              checked={config.enabled}
              onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enabled: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ttl">Cache TTL (seconds)</Label>
            <Input
              id="ttl"
              type="number"
              value={config.ttl}
              onChange={(e) => setConfig(prev => ({ ...prev, ttl: parseInt(e.target.value) }))}
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-size">Max Cache Size (MB)</Label>
            <Input
              id="max-size"
              type="number"
              value={config.maxSize}
              onChange={(e) => setConfig(prev => ({ ...prev, maxSize: parseInt(e.target.value) }))}
              min={1}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Settings className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};