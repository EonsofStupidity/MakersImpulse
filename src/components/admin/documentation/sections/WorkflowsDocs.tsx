import React from 'react';
import { Card } from "@/components/ui/card";

export const WorkflowsDocs = () => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Theme Workflows</h2>
      <div className="prose prose-invert max-w-none">
        <h3>Theme Update Flow</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>User modifies theme settings in the UI</li>
          <li>Changes are validated against ThemeBase type</li>
          <li>Updates are sent to Supabase</li>
          <li>Changes are reflected in real-time preview</li>
          <li>State is synchronized across components</li>
        </ol>
      </div>
    </Card>
  );
};