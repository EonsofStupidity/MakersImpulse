import React from 'react';
import { ThemeBase } from '@/types';

interface ColorPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ColorPreview: React.FC<ColorPreviewProps> = ({ colors }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Brand Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.primary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.secondary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.accent_color }}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.text_primary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.text_secondary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.text_heading_color }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Neon Effects</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.neon_cyan }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.neon_pink }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.neon_purple }}
          />
        </div>
      </div>
    </div>
  );
};
