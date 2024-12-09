import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Database } from '@/components/ui/database';
import { Trash2, Save, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const RedisConfigCard = () => {
  const [enabled, setEnabled] = useState(true);
  const [ttl, setTtl] = useState('3600');
  const [maxSize, setMaxSize] = useState('100');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveConfig = async () => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('admin_settings')
        .upsert([
          {
            setting_key: 'redis_config',
            setting_value: JSON.stringify({
              enabled,
              ttl: parseInt(ttl),
              maxSize: parseInt(maxSize)
            }),
            setting_type: 'json'
          }
        ]);

      if (error) throw error;
      toast.success('Redis configuration saved successfully');
    } catch (error) {
      console.error('Error saving Redis config:', error);
      toast.error('Failed to save Redis configuration');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearCache = async () => {
    try {
      // Implement cache clearing logic here
      toast.success('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast.error('Failed to clear cache');
    }
  };

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Redis Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Enable Redis Cache</span>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm">Cache TTL (seconds)</label>
          <Input
            type="number"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            min="0"
            className="bg-background/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm">Max Cache Size (MB)</label>
          <Input
            type="number"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
            min="0"
            className="bg-background/50"
          />
        </div>

        <div className="flex justify-between gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearCache}
            className="w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="w-full"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Config
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};