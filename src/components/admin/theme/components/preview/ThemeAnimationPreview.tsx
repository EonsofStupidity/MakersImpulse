import React from 'react';
import { motion } from 'framer-motion';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeAnimationPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeAnimationPreview: React.FC<ThemeAnimationPreviewProps> = ({ colors }) => {
  const getColor = (key: string) => {
    if (colors.colors) {
      // New nested structure
      switch (key) {
        case 'primary': return colors.colors.primary;
        case 'secondary': return colors.colors.secondary;
        case 'accent': return colors.colors.accent;
        default: return undefined;
      }
    } else {
      // Legacy flat structure
      switch (key) {
        case 'primary': return (colors as any).primary_color;
        case 'secondary': return (colors as any).secondary_color;
        case 'accent': return (colors as any).accent_color;
        default: return undefined;
      }
    }
  };

  const animationEnabled = colors.animations?.enabled ?? true;
  const duration = colors.animations?.defaultDuration ? colors.animations.defaultDuration / 1000 : 0.3;
  const hoverScale = parseFloat(colors.effects?.hover.scale || '1.05');

  if (!animationEnabled) {
    return (
      <div className="p-4 rounded-lg bg-gray-800/50">
        <p className="text-white text-sm">Animations are currently disabled</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Animation Effects</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: hoverScale }}
            transition={{ duration }}
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: getColor('primary'),
              backdropFilter: `blur(${colors.effects?.backdrop.blur || '0px'})`,
              boxShadow: colors.effects?.shadow.boxShadow
            }}
          >
            Hover Scale Effect
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: getColor('secondary') }}
          >
            Fade Animation
          </motion.div>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: getColor('accent') }}
          >
            Slide Animation
          </motion.div>
        </div>
      </div>
    </div>
  );
};