import React from 'react';
import { RedisConfigCard } from '@/components/admin/cache/RedisConfigCard';
import { CacheMetricsCard } from '@/components/admin/cache/CacheMetricsCard';

export const CacheManagementSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cache Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RedisConfigCard />
        <CacheMetricsCard />
      </div>
    </div>
  );
};