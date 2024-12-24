import React from 'react';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeTextPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeTextPreview: React.FC<ThemeTextPreviewProps> = ({ colors }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Styles</h3>
        <div className="space-y-2">
          <p style={{ color: colors.colors?.text.primary }}>
            Primary Text Color Sample
          </p>
          <p style={{ color: colors.colors?.text.secondary }}>
            Secondary Text Color Sample
          </p>
          <p style={{ color: colors.colors?.text.link }}>
            Link Text Color Sample
          </p>
          <h4 style={{ color: colors.colors?.text.heading }}>
            Heading Text Color Sample
          </h4>
        </div>
      </div>
    </div>
  );
};