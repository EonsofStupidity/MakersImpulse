import React from 'react';
import { RedisConfigCard } from '@/components/admin/cache/RedisConfigCard';
import { CacheMetricsCard } from '@/components/admin/cache/CacheMetricsCard';

export const CacheManagementSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RedisConfigCard />
      <CacheMetricsCard />
    </div>
  );
};