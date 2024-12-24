import React from 'react';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeColorPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeColorPreview: React.FC<ThemeColorPreviewProps> = ({ colors }) => {
  // Handle both nested and flat structures
  const getColor = (key: string) => {
    if (colors.colors) {
      // New nested structure
      switch (key) {
        case 'primary': return colors.colors.primary;
        case 'secondary': return colors.colors.secondary;
        case 'accent': return colors.colors.accent;
        case 'text_primary': return colors.colors.text?.primary;
        case 'text_secondary': return colors.colors.text?.secondary;
        case 'text_heading': return colors.colors.text?.heading;
        case 'neon_cyan': return colors.colors.neon?.cyan;
        case 'neon_pink': return colors.colors.neon?.pink;
        case 'neon_purple': return colors.colors.neon?.purple;
        default: return undefined;
      }
    } else {
      // Legacy flat structure
      switch (key) {
        case 'primary': return (colors as any).primary_color;
        case 'secondary': return (colors as any).secondary_color;
        case 'accent': return (colors as any).accent_color;
        case 'text_primary': return (colors as any).text_primary_color;
        case 'text_secondary': return (colors as any).text_secondary_color;
        case 'text_heading': return (colors as any).text_heading_color;
        case 'neon_cyan': return (colors as any).neon_cyan;
        case 'neon_pink': return (colors as any).neon_pink;
        case 'neon_purple': return (colors as any).neon_purple;
        default: return undefined;
      }
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Brand Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('primary') }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('secondary') }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('accent') }}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('text_primary') }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('text_secondary') }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('text_heading') }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Neon Effects</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('neon_cyan') }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('neon_pink') }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('neon_purple') }}
          />
        </div>
      </div>
    </div>
  );
};