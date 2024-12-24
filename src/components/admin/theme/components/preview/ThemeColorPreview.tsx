import React from 'react';
import { ThemeBase } from '@/types/theme';

interface ThemeColorPreviewProps {
  theme: Partial<ThemeBase>;
}

export const ThemeColorPreview: React.FC<ThemeColorPreviewProps> = ({ theme }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Brand Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.primary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.secondary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.accent_color }}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.text_primary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.text_secondary_color }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.text_heading_color }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Neon Effects</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.neon_cyan }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.neon_pink }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: theme.neon_purple }}
          />
        </div>
      </div>
    </div>
  );
};