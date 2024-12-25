import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ColorPreview } from "./ColorPreview";
import { TextPreview } from "./TextPreview";
import { AnimationPreview } from "./AnimationPreview";
import { ThemeBase } from "@/types";

interface SettingsPreviewProps {
  settings: ThemeBase;
}

export const ThemePreview: React.FC<SettingsPreviewProps> = ({ settings }) => {
  React.useEffect(() => {
    toast.success("Preview updated with new colors");
  }, [settings.primary_color, settings.secondary_color, settings.accent_color]);

  return (
    <AnimatePresence mode="wait">
      <div className="space-y-6">
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={settings.primary_color}
        >
          {settings.logo_url && (
            <img
              src={settings.logo_url}
              alt="Logo"
              className="w-12 h-12 object-contain rounded"
            />
          )}
          <div>
            <h2 className="text-xl font-bold" style={{ color: settings.primary_color }}>
              {settings.site_title}
            </h2>
            {settings.tagline && (
              <p className="text-sm" style={{ color: settings.secondary_color }}>
                {settings.tagline}
              </p>
            )}
          </div>
        </motion.div>

        <div className="space-y-4">
          <ColorPreview colors={settings} />
          <TextPreview colors={settings} />
          <AnimationPreview colors={settings} />
        </div>

        {settings.favicon_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-400 mb-2">Favicon Preview:</p>
            <img
              src={settings.favicon_url}
              alt="Favicon"
              className="w-8 h-8 object-contain"
            />
          </motion.div>
        )}

        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-white/5">
          <h4 className="text-sm font-medium text-white mb-2">Current Theme CSS Variables</h4>
          <pre className="text-xs text-gray-400">
            {`
:root {
  --primary: ${settings.primary_color};
  --secondary: ${settings.secondary_color};
  --accent: ${settings.accent_color};
  --neon-cyan: ${settings.neon_cyan};
  --neon-pink: ${settings.neon_pink};
  --neon-purple: ${settings.neon_purple};
}
            `}
          </pre>
        </div>
      </div>
    </AnimatePresence>
  );
};
