import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import { ThemeColorPreview } from "./ThemeColorPreview";
import { ThemeTextPreview } from "./ThemeTextPreview";
import { ThemeAnimationPreview } from "./ThemeAnimationPreview";
import { ThemeBase } from "@/types/theme/core/types";
import { motion } from "framer-motion";

interface PreviewContainerProps {
  settings: ThemeBase;
}

export const PreviewContainer = memo(({ settings }: PreviewContainerProps) => {
  const previewStyle = {
    backdropFilter: `blur(${settings.effects?.backdrop.blur || '0px'})`,
    transition: `all ${settings.effects?.transition.duration || '0.3s'} ${settings.effects?.transition.type || 'ease'}`,
  };

  return (
    <Card className="p-6 space-y-8 bg-gray-800/50 border border-white/10" style={previewStyle}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: settings.animations?.defaultDuration ? settings.animations.defaultDuration / 1000 : 0.3 }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Color Preview</h3>
          <ThemeColorPreview colors={settings} />
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Typography Preview</h3>
          <ThemeTextPreview colors={settings} />
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Animation Preview</h3>
          <ThemeAnimationPreview colors={settings} />
        </div>

        {settings.preview_preferences && (
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-white/5">
            <h4 className="text-sm font-medium text-white mb-2">Preview Preferences</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Real-time updates: {settings.preview_preferences.real_time_updates ? 'Enabled' : 'Disabled'}</p>
              <p>Animations: {settings.preview_preferences.animation_enabled ? 'Enabled' : 'Disabled'}</p>
              <p>Glass effect: {settings.preview_preferences.glass_effect_level}</p>
            </div>
          </div>
        )}
      </motion.div>
    </Card>
  );
});

PreviewContainer.displayName = "PreviewContainer";