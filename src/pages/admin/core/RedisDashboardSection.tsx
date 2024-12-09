import React from 'react';
import { RedisStatusCard } from '@/components/admin/redis/overview/RedisStatusCard';
import { RedisConnectionForm } from '@/components/admin/redis/config/RedisConnectionForm';
import { RedisFeatureToggles } from '@/components/admin/redis/config/RedisFeatureToggles';

export const RedisDashboardSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Redis Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RedisStatusCard />
        <div className="space-y-6">
          <RedisConnectionForm />
          <RedisFeatureToggles />
        </div>
      </div>
    </div>
  );
};