import React from 'react';
import { ThemeBase } from '@/types/theme';

interface ThemeTextPreviewProps {
  theme: Partial<ThemeBase>;
}

export const ThemeTextPreview: React.FC<ThemeTextPreviewProps> = ({ theme }) => {
  const typographyStyle = {
    fontFamily: theme.font_family_body,
    fontSize: theme.font_size_base,
    lineHeight: theme.line_height_base,
    letterSpacing: theme.letter_spacing,
  };

  const headingStyle = {
    ...typographyStyle,
    fontFamily: theme.font_family_heading,
    fontWeight: theme.font_weight_bold,
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Styles</h3>
        <div className="space-y-2">
          <p style={{ ...typographyStyle, color: theme.text_primary_color }}>
            Primary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: theme.text_secondary_color }}>
            Secondary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: theme.text_link_color }}>
            Link Text Color Sample
          </p>
          <h4 style={{ ...headingStyle, color: theme.text_heading_color }}>
            Heading Text Color Sample
          </h4>
        </div>
      </div>
    </div>
  );
};