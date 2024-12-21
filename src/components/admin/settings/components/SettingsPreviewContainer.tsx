import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SettingsPreview } from "./SettingsPreview";
import { ThemeBase } from "@/types/theme/core/base";

interface SettingsPreviewContainerProps {
  settings: ThemeBase | null;
  logoFile: File | null;
  faviconFile: File | null;
}

export const SettingsPreviewContainer: React.FC<SettingsPreviewContainerProps> = ({
  settings,
  logoFile,
  faviconFile
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-gray-800/50 border border-white/10 backdrop-blur-sm sticky top-4">
        <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
        {settings && (
          <SettingsPreview
            settings={{
              ...settings,
              logo_url: logoFile ? URL.createObjectURL(logoFile) : settings.logo_url,
              favicon_url: faviconFile ? URL.createObjectURL(faviconFile) : settings.favicon_url,
            }}
          />
        )}
      </Card>
    </motion.div>
  );
};