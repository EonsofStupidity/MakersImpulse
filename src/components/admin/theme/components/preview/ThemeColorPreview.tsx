import React from 'react';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeColorPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeColorPreview: React.FC<ThemeColorPreviewProps> = ({ colors }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Brand Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.primary }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.secondary }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.accent }}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.text.primary }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.text.secondary }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.text.heading }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Neon Effects</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.neon.cyan }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.neon.pink }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: colors.colors?.neon.purple }}
          />
        </div>
      </div>
    </div>
  );
};