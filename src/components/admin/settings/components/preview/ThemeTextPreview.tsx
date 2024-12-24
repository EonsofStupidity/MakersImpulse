import React from 'react';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeTextPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeTextPreview: React.FC<ThemeTextPreviewProps> = ({ colors }) => {
  const typographyStyle = {
    fontFamily: colors.typography?.fontFamily.body,
    fontSize: colors.typography?.fontSize,
    lineHeight: colors.typography?.lineHeight,
    letterSpacing: colors.typography?.letterSpacing,
  };

  const headingStyle = {
    ...typographyStyle,
    fontFamily: colors.typography?.fontFamily.heading,
    fontWeight: colors.typography?.fontWeight.bold,
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Styles</h3>
        <div className="space-y-2">
          <p style={{ ...typographyStyle, color: colors.colors?.text.primary }}>
            Primary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: colors.colors?.text.secondary }}>
            Secondary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: colors.colors?.text.link }}>
            Link Text Color Sample
          </p>
          <h4 style={{ ...headingStyle, color: colors.colors?.text.heading }}>
            Heading Text Color Sample
          </h4>
        </div>
      </div>
    </div>
  );
};