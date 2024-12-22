import React from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SecuritySettings } from '@/types/security';

export const SessionSecuritySection = () => {
  const { register, handleSubmit } = useForm<SecuritySettings>();

  const onSubmit = async (data: SecuritySettings) => {
    try {
      // Logic to update security settings
      toast.success("Security settings updated successfully");
    } catch (error) {
      toast.error("Failed to update security settings");
    }
  };

  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="ip_blacklist">IP Blacklist</Label>
          <Input
            id="ip_blacklist"
            {...register("ip_blacklist")}
            placeholder="Enter IP addresses separated by commas"
          />
        </div>
        <div>
          <Label htmlFor="ip_whitelist">IP Whitelist</Label>
          <Input
            id="ip_whitelist"
            {...register("ip_whitelist")}
            placeholder="Enter IP addresses separated by commas"
          />
        </div>
        <div>
          <Label htmlFor="max_login_attempts">Max Login Attempts</Label>
          <Input
            id="max_login_attempts"
            type="number"
            {...register("max_login_attempts")}
          />
        </div>
        <div>
          <Label htmlFor="rate_limit_requests">Rate Limit Requests</Label>
          <Input
            id="rate_limit_requests"
            type="number"
            {...register("rate_limit_requests")}
          />
        </div>
        <div>
          <Label htmlFor="session_timeout_minutes">Session Timeout (minutes)</Label>
          <Input
            id="session_timeout_minutes"
            type="number"
            {...register("session_timeout_minutes")}
          />
        </div>
        <div>
          <Label htmlFor="lockout_duration_minutes">Lockout Duration (minutes)</Label>
          <Input
            id="lockout_duration_minutes"
            type="number"
            {...register("lockout_duration_minutes")}
          />
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </Card>
  );
};
