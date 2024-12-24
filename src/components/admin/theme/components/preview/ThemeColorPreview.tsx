import React from 'react';
import { ThemeBase } from '@/types/theme';
import { useThemePreview } from '@/hooks/theme/useThemePreview';

interface ThemeColorPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeColorPreview: React.FC<ThemeColorPreviewProps> = ({ colors }) => {
  const { getColor } = useThemePreview();

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Brand Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('primary', colors) }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('secondary', colors) }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('accent', colors) }}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Text Colors</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('text_primary', colors) }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('text_secondary', colors) }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('text_heading', colors) }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Neon Effects</h3>
        <div className="space-y-2">
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('neon_cyan', colors) }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('neon_pink', colors) }}
          />
          <div 
            className="w-full h-16 rounded-lg transition-colors"
            style={{ backgroundColor: getColor('neon_purple', colors) }}
          />
        </div>
      </div>
    </div>
  );
};