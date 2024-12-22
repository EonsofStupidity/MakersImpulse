import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ColorPreview } from "./ColorPreview";
import { TextPreview } from "./TextPreview";
import { AnimationPreview } from "./AnimationPreview";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useThemeInheritance } from "@/hooks/useThemeInheritance";

interface SettingsPreviewProps {
  settings: {
    site_title: string;
    tagline?: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    neon_cyan?: string;
    neon_pink?: string;
    neon_purple?: string;
    logo_url?: string;
    favicon_url?: string;
    parent_theme_id?: string;
    inheritance_strategy?: 'merge' | 'override' | 'replace';
  };
  isLoading?: boolean;
  error?: Error | null;
}

export const SettingsPreview: React.FC<SettingsPreviewProps> = ({ 
  settings,
  isLoading,
  error
}) => {
  const { parentTheme, isParentLoading } = useThemeInheritance(settings.parent_theme_id);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading theme settings: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading || isParentLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const effectiveSettings = settings.parent_theme_id && parentTheme ? {
    ...parentTheme,
    ...settings
  } : settings;

  return (
    <AnimatePresence mode="wait">
      <div className="space-y-6">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={effectiveSettings.primary_color}
        >
          {effectiveSettings.logo_url && (
            <img
              src={effectiveSettings.logo_url}
              alt="Logo"
              className="w-12 h-12 object-contain rounded"
            />
          )}
          <div>
            <h2 className="text-xl font-bold" style={{ color: effectiveSettings.primary_color }}>
              {effectiveSettings.site_title}
            </h2>
            {effectiveSettings.tagline && (
              <p className="text-sm" style={{ color: effectiveSettings.secondary_color }}>
                {effectiveSettings.tagline}
              </p>
            )}
          </div>
        </motion.div>

        {settings.parent_theme_id && parentTheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <Alert>
              <AlertDescription>
                Inheriting settings from theme: {parentTheme.site_title}
                <br />
                Strategy: {settings.inheritance_strategy || 'merge'}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="space-y-4">
          <ColorPreview colors={effectiveSettings} />
          <TextPreview colors={effectiveSettings} />
          <AnimationPreview colors={effectiveSettings} />
        </div>

        {effectiveSettings.favicon_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-400 mb-2">Favicon Preview:</p>
            <img
              src={effectiveSettings.favicon_url}
              alt="Favicon"
              className="w-8 h-8 object-contain"
            />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};