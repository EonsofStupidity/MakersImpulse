import React from 'react';
import { ThemeBase } from '@/types';

interface TextPreviewProps {
  colors: Partial<ThemeBase>;
}

export const TextPreview: React.FC<TextPreviewProps> = ({ colors }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Styles</h3>
        <div className="space-y-2">
          <p style={{ color: colors.text_primary_color }}>
            Primary Text Color Sample
          </p>
          <p style={{ color: colors.text_secondary_color }}>
            Secondary Text Color Sample
          </p>
          <p style={{ color: colors.text_link_color }}>
            Link Text Color Sample
          </p>
          <h4 style={{ color: colors.text_heading_color }}>
            Heading Text Color Sample
          </h4>
        </div>
      </div>
    </div>
  );
};