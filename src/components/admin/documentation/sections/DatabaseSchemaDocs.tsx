import React from 'react';
import { Card } from "@/components/ui/card";

export const DatabaseSchemaDocs = () => {
  return (
    <Card className="p-6 bg-gray-800/50 border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-4">Database Schema</h2>
      <div className="prose prose-invert max-w-none">
        <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
          {`Table: theme_configuration
Columns:
- id: uuid (PK)
- site_title: text
- tagline: text
- primary_color: text
- secondary_color: text
- accent_color: text
- text_primary_color: text
- text_secondary_color: text
- text_link_color: text
- text_heading_color: text
- font_family_heading: text
- font_family_body: text
- font_size_base: text
- font_weight_normal: text
- font_weight_bold: text
- line_height_base: text
- letter_spacing: text
- border_radius: text
- spacing_unit: text
- shadow_color: text
- hover_scale: text
- transition_duration: text
- neon_cyan: text
- neon_pink: text
- neon_purple: text
- transition_type: text
- box_shadow: text
- backdrop_blur: text
- theme_mode: theme_mode_type
- preview_preferences: jsonb
- real_time_toggle: boolean
- animations_enabled: boolean
- default_animation_duration: integer
- parent_theme_id: uuid (FK)
- inheritance_strategy: theme_inheritance_strategy
- inherited_settings: jsonb`}
        </pre>
      </div>
    </Card>
  );
};