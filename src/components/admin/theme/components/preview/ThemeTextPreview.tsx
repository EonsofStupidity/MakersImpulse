import React from 'react';
import { ThemeBase } from '@/types/theme';
import { useThemePreview } from '@/hooks/theme/useThemePreview';
import { useThemeTypography } from '@/hooks/theme/useThemeTypography';

interface ThemeTextPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeTextPreview: React.FC<ThemeTextPreviewProps> = ({ colors }) => {
  const { getColor } = useThemePreview();
  const { getTypographyStyles } = useThemeTypography();
  
  const typographyStyle = getTypographyStyles(colors);
  const headingStyle = {
    ...typographyStyle,
    fontFamily: typographyStyle.headingFont,
    fontWeight: typographyStyle.fontWeightBold,
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Styles</h3>
        <div className="space-y-2">
          <p style={{ ...typographyStyle, color: getColor('text_primary', colors) }}>
            Primary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: getColor('text_secondary', colors) }}>
            Secondary Text Color Sample
          </p>
          <p style={{ ...typographyStyle, color: getColor('text_link', colors) }}>
            Link Text Color Sample
          </p>
          <h4 style={{ ...headingStyle, color: getColor('text_heading', colors) }}>
            Heading Text Color Sample
          </h4>
        </div>
      </div>
    </div>
  );
};