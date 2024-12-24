import React from 'react';
import { motion } from 'framer-motion';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeAnimationPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeAnimationPreview: React.FC<ThemeAnimationPreviewProps> = ({ colors }) => {
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
              backgroundColor: colors.colors?.primary,
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
            style={{ backgroundColor: colors.colors?.secondary }}
          >
            Fade Animation
          </motion.div>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.colors?.accent }}
          >
            Slide Animation
          </motion.div>
        </div>
      </div>
    </div>
  );
};