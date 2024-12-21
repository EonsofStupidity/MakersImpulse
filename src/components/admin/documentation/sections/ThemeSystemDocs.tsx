import React from 'react';
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const ThemeSystemDocs = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Theme System Architecture</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="core-types">
            <AccordionTrigger className="text-white">Core Types</AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">ThemeBase</h3>
                <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  {`interface ThemeBase {
  id?: string;
  site_title: string;
  tagline: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  text_primary_color: string;
  text_secondary_color: string;
  text_link_color: string;
  text_heading_color: string;
  neon_cyan: string;
  neon_pink: string;
  neon_purple: string;
  font_family_heading: string;
  font_family_body: string;
  font_size_base: string;
  font_weight_normal: string;
  font_weight_bold: string;
  line_height_base: string;
  letter_spacing: string;
  border_radius: string;
  spacing_unit: string;
  transition_duration: string;
  shadow_color: string;
  hover_scale: string;
  box_shadow: string;
  backdrop_blur: string;
  theme_mode: ThemeMode;
  transition_type: TransitionType;
  component_type?: ThemeComponentType;
  real_time_toggle: boolean;
  animations_enabled: boolean;
  default_animation_duration: number;
  preview_preferences: PreviewPreferences;
  parent_theme_id?: string;
  inheritance_strategy: ThemeInheritanceStrategy;
  inherited_settings: Record<string, unknown>;
}`}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Type Enums</h3>
                <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  {`type ThemeMode = 'light' | 'dark' | 'system';
type ThemeComponentType = 'color' | 'typography' | 'layout' | 'animation' | 'effect';
type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
type ThemeInheritanceStrategy = 'merge' | 'override' | 'replace';
type GlassEffectLevel = 'low' | 'medium' | 'high';`}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Preview Preferences</h3>
                <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  {`interface PreviewPreferences {
  real_time_updates: boolean;
  animation_enabled: boolean;
  glass_effect_level: GlassEffectLevel;
  update_debounce_ms: number;
}`}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="state-management">
            <AccordionTrigger className="text-white">State Management</AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Theme Store (Zustand)</h3>
                <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  {`interface ThemeStore {
  theme: ThemeBase | null;
  isLoading: boolean;
  error: Error | null;
  fetchTheme: () => Promise<void>;
  updateTheme: (updates: Partial<ThemeBase>) => Promise<void>;
  resetTheme: () => Promise<void>;
}`}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="database-integration">
            <AccordionTrigger className="text-white">Database Integration</AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Database Types</h3>
                <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  {`interface DatabaseSettingsRow extends ThemeBase {
  id: string;
  updated_at?: string;
  updated_by?: string;
  state_version?: number;
  last_sync?: string;
}`}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="component-types">
            <AccordionTrigger className="text-white">Component Types</AccordionTrigger>
            <AccordionContent className="text-gray-300 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Form Types</h3>
                <pre className="bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                  {`interface ThemeFormData extends ThemeBase {
  // Form-specific fields
}`}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};