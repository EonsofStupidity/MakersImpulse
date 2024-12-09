import React from 'react';
import { RedisConfigCard } from '@/components/admin/cache/RedisConfigCard';
import { RedisMetricsCard } from '@/components/admin/cache/RedisMetricsCard';
import { Card } from '@/components/ui/card';

export const CacheManagementSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-white/90">Cache Management</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RedisConfigCard />
        <RedisMetricsCard />
      </div>
    </motion.div>
  );
};