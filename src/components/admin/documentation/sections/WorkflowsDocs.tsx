import React from 'react';
import { Card } from "@/components/ui/card";

export const WorkflowsDocs = () => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">System Workflows</h2>
      <div className="prose prose-invert max-w-none">
        <h3>Content Management Workflow</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Content creation with versioning</li>
          <li>Automated validation checks</li>
          <li>Review and approval stages</li>
          <li>Publishing with scheduling</li>
          <li>Revision history tracking</li>
        </ol>

        <h3 className="mt-6">Theme Management</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Theme customization interface</li>
          <li>Real-time preview system</li>
          <li>Theme inheritance handling</li>
          <li>Version control and rollback</li>
          <li>Performance optimization</li>
        </ol>

        <h3 className="mt-6">Security Processes</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>User authentication flows</li>
          <li>Two-factor setup process</li>
          <li>PIN authentication system</li>
          <li>Security event monitoring</li>
          <li>Audit trail generation</li>
        </ol>

        <h3 className="mt-6">Data Management</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Automated backups</li>
          <li>Data validation pipelines</li>
          <li>Cache management</li>
          <li>Storage optimization</li>
          <li>Performance monitoring</li>
        </ol>
      </div>
    </Card>
  );
};