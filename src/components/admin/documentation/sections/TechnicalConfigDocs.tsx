import React from 'react';
import { Card } from "@/components/ui/card";

export const TechnicalConfigDocs = () => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Technical Configuration</h2>
      <div className="prose prose-invert max-w-none">
        <h3>Core Architecture</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>React with TypeScript for type-safe development</li>
          <li>Zustand store for state management</li>
          <li>React Query for data fetching</li>
          <li>Real-time updates via Supabase</li>
          <li>Type-safe theme configuration</li>
          <li>Comprehensive audit logging system</li>
          <li>Role-based access control (RBAC)</li>
        </ul>

        <h3 className="mt-6">Security Implementation</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Row Level Security (RLS) policies for data access</li>
          <li>Two-factor authentication support</li>
          <li>PIN-based authentication option</li>
          <li>Rate limiting on sensitive operations</li>
          <li>Security event logging and monitoring</li>
          <li>IP-based access controls</li>
        </ul>

        <h3 className="mt-6">Data Management</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Versioned content management</li>
          <li>Theme inheritance system</li>
          <li>Real-time collaboration features</li>
          <li>Automated backup and recovery</li>
          <li>Data validation and sanitization</li>
        </ul>

        <h3 className="mt-6">Integration Points</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Supabase Edge Functions for serverless operations</li>
          <li>Redis caching layer for performance</li>
          <li>Media storage and CDN integration</li>
          <li>Workflow automation system</li>
        </ul>
      </div>
    </Card>
  );
};