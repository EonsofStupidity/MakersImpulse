import React from 'react';
import { Card } from "@/components/ui/card";

export const DatabaseSchemaDocs = () => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Database Schema</h2>
      <div className="prose prose-invert max-w-none">
        <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
{`Core Tables:

profiles
├── id: uuid (PK, FK -> auth.users.id)
├── username: text
├── display_name: text
├── avatar_url: text
├── role: user_role ENUM
├── bio: text
├── website: text
├── location: text
├── metadata: jsonb
└── security settings (2FA, PIN, etc.)

theme_configuration
├── id: uuid (PK)
├── site_title: text
├── tagline: text
├── colors (primary, secondary, accent)
├── typography settings
├── animation settings
├── preview_preferences: jsonb
└── inheritance settings

unified_settings
├── id: uuid (PK)
├── category: setting_type
├── key: text
├── value: jsonb
└── metadata: jsonb

security_logs
├── id: uuid (PK)
├── user_id: uuid (FK)
├── event_type: text
├── severity: text
├── metadata: jsonb
└── timestamps

cms_content
├── id: uuid (PK)
├── title: text
├── content: jsonb
├── metadata: jsonb
├── version: integer
└── workflow state

workflow_templates
├── id: uuid (PK)
├── name: text
├── stages: jsonb
├── triggers: jsonb
└── configuration`}
        </pre>

        <h3 className="mt-6">Key Relationships</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Profiles are linked to Supabase auth.users</li>
          <li>Theme inheritance through parent_theme_id</li>
          <li>Content versioning through revision history</li>
          <li>Workflow stages with content items</li>
        </ul>

        <h3 className="mt-6">Security Features</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Row Level Security (RLS) on all tables</li>
          <li>Role-based access control</li>
          <li>Audit logging triggers</li>
          <li>Automated backup systems</li>
        </ul>
      </div>
    </Card>
  );
};