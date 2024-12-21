import React from 'react';
import { Card } from "@/components/ui/card";

export const TechnicalConfigDocs = () => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Technical Configuration</h2>
      <div className="prose prose-invert max-w-none">
        <h3>Theme System Integration</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Zustand store for state management</li>
          <li>React Query for data fetching</li>
          <li>Real-time updates via Supabase</li>
          <li>Type-safe theme configuration</li>
        </ul>
      </div>
    </Card>
  );
};