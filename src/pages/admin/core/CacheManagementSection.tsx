import React from 'react';
import { RedisConfigCard } from '@/components/admin/cache/RedisConfigCard';
import { RedisMetricsCard } from '@/components/admin/cache/RedisMetricsCard';

export const CacheManagementSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cache Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RedisConfigCard />
        <RedisMetricsCard />
      </div>
    </div>
  );
};