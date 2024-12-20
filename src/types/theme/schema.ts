import { z } from 'zod';
import { ThemeMode, ThemeComponentType } from './core/types';

export const settingsSchema = z.object({
  id: z.string().optional(),
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    text: z.object({
      primary: z.string(),
      secondary: z.string(),
      link: z.string(),
      heading: z.string()
    }),
    neon: z.object({
      cyan: z.string(),
      pink: z.string(),
      purple: z.string()
    })
  }),
  typography: z.object({
    fontFamily: z.object({
      heading: z.string(),
      body: z.string()
    }),
    fontSize: z.string(),
    fontWeight: z.object({
      normal: z.string(),
      bold: z.string()
    }),
    lineHeight: z.string(),
    letterSpacing: z.string()
  }),
  effects: z.object({
    borderRadius: z.string(),
    spacing: z.string(),
    transitions: z.object({
      duration: z.string(),
      type: z.enum(['fade', 'slide', 'scale', 'blur'])
    }),
    shadows: z.object({
      color: z.string(),
      boxShadow: z.string().optional(),
      backdropBlur: z.string().optional()
    }),
    hoverScale: z.string()
  }),
  theme_mode: z.enum(['light', 'dark', 'system']).optional(),
  component_type: z.enum(['color', 'typography', 'layout', 'animation', 'effect']).optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().optional(),
  security_settings: z.object({
    ip_blacklist: z.array(z.string()),
    ip_whitelist: z.array(z.string()),
    max_login_attempts: z.number(),
    rate_limit_requests: z.number(),
    session_timeout_minutes: z.number(),
    lockout_duration_minutes: z.number(),
    rate_limit_window_minutes: z.number()
  }).optional(),
  state_version: z.number().optional(),
  last_sync: z.string().optional()
});

export type SettingsFormData = z.infer<typeof settingsSchema>;