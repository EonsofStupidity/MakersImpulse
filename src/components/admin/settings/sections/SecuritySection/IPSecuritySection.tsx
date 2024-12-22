import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SecuritySettings } from '@/types/theme';

const IPSecuritySection = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('security_settings')
        .single();

      if (error) throw error;
      return data.security_settings as SecuritySettings;
    }
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: SecuritySettings) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ security_settings: newSettings })
        .eq('id', (await supabase.from('site_settings').select('id').single()).data.id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('IP security settings updated successfully');
    },
    onError: (error) => {
      console.error('Error updating IP security settings:', error);
      toast.error('Failed to update IP security settings');
    }
  });

  const handleUpdate = (key: keyof SecuritySettings, value: string) => {
    if (!settings) return;

    const updatedSettings = {
      ...settings,
      [key]: value
    };
    updateSettings.mutate(updatedSettings);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <div className="space-y-6">
        <div>
          <Label htmlFor="allowed-ips">Allowed IPs</Label>
          <Input
            id="allowed-ips"
            type="text"
            value={settings?.allowed_ips || ''}
            onChange={(e) => handleUpdate('allowed_ips', e.target.value)}
            className="mt-1"
          />
          <p className="text-sm text-gray-400 mt-1">
            Comma-separated list of allowed IP addresses.
          </p>
        </div>

        <div>
          <Label htmlFor="blocked-ips">Blocked IPs</Label>
          <Input
            id="blocked-ips"
            type="text"
            value={settings?.blocked_ips || ''}
            onChange={(e) => handleUpdate('blocked_ips', e.target.value)}
            className="mt-1"
          />
          <p className="text-sm text-gray-400 mt-1">
            Comma-separated list of blocked IP addresses.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default IPSecuritySection;
