import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import { ThemeColorPreview } from "./preview/ThemeColorPreview";
import { ThemeTextPreview } from "./preview/ThemeTextPreview";
import { ThemeAnimationPreview } from "./preview/ThemeAnimationPreview";
import { ThemeBase } from "@/types/theme";

interface ThemePreviewContainerProps {
  settings: ThemeBase;
}

export const ThemePreviewContainer = memo(({ settings }: ThemePreviewContainerProps) => {
  return (
    <Card className="p-6 space-y-8 bg-gray-800/50 border border-white/10">
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
    </Card>
  );
});

ThemePreviewContainer.displayName = "ThemePreviewContainer";
