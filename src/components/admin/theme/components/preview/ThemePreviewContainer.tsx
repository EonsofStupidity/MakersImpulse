import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import { ThemeColorPreview } from "./ThemeColorPreview";
import { ThemeTextPreview } from "./ThemeTextPreview";
import { ThemeAnimationPreview } from "./ThemeAnimationPreview";
import { ThemeBase } from "@/types/theme";
import { motion } from "framer-motion";

interface ThemePreviewContainerProps {
  settings: ThemeBase;
  logoFile?: File | null;
  faviconFile?: File | null;
}

export const ThemePreviewContainer = memo(({ settings, logoFile, faviconFile }: ThemePreviewContainerProps) => {
  return (
    <Card className="p-6 space-y-8 bg-gray-800/50 border border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Color Preview</h3>
          <ThemeColorPreview theme={settings} />
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Typography Preview</h3>
          <ThemeTextPreview theme={settings} />
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Animation Preview</h3>
          <ThemeAnimationPreview theme={settings} />
        </div>

        {settings.logo_url && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Logo Preview</h3>
            <img
              src={settings.logo_url}
              alt="Logo"
              className="max-w-[200px] h-auto"
            />
          </div>
        )}

        {settings.favicon_url && (
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Favicon Preview</h3>
            <img
              src={settings.favicon_url}
              alt="Favicon"
              className="w-8 h-8"
            />
          </div>
        )}
      </motion.div>
    </Card>
  );
});

ThemePreviewContainer.displayName = "ThemePreviewContainer";