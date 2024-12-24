import React from 'react';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeTextPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeTextPreview: React.FC<ThemeTextPreviewProps> = ({ colors }) => {
  const getColor = (key: string) => {
    if (colors.colors) {
      // New nested structure
      switch (key) {
        case 'text_primary': return colors.colors.text?.primary;
        case 'text_secondary': return colors.colors.text?.secondary;
        case 'text_link': return colors.colors.text?.link;
        case 'text_heading': return colors.colors.text?.heading;
        default: return undefined;
      }
    } else {
      // Legacy flat structure
      switch (key) {
        case 'text_primary': return (colors as any).text_primary_color;
        case 'text_secondary': return (colors as any).text_secondary_color;
        case 'text_link': return (colors as any).text_link_color;
        case 'text_heading': return (colors as any).text_heading_color;
        default: return undefined;
      }
    }
  };

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
          <p style={{ ...typographyStyle, color: getColor('text_primary') }}>
            Primary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: getColor('text_secondary') }}>
            Secondary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: getColor('text_link') }}>
            Link Text Color Sample
          </p>
          <h4 style={{ ...headingStyle, color: getColor('text_heading') }}>
            Heading Text Color Sample
          </h4>
        </div>
      </div>
    </div>
  );
};