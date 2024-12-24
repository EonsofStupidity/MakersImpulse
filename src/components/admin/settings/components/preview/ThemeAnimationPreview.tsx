import React from 'react';
import { motion } from 'framer-motion';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeAnimationPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeAnimationPreview: React.FC<ThemeAnimationPreviewProps> = ({ colors }) => {
  const animationDuration = colors.animations?.defaultDuration || 300;
  const isEnabled = colors.animations?.enabled ?? true;
  const transitionDuration = colors.effects?.transition.duration || '0.3s';
  const hoverScale = colors.effects?.hover.scale || '1.05';

  if (!isEnabled) {
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
            whileHover={{ scale: parseFloat(hoverScale) }}
            transition={{ duration: parseFloat(transitionDuration) }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.colors?.primary }}
          >
            Hover Scale Effect
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animationDuration / 1000 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.colors?.secondary }}
          >
            Fade Animation
          </motion.div>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: animationDuration / 1000 }}
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: colors.colors?.accent,
              backdropFilter: `blur(${colors.effects?.backdrop.blur || '0px'})`,
              boxShadow: colors.effects?.shadow.boxShadow
            }}
          >
            Slide Animation with Effects
          </motion.div>
        </div>
      </div>
    </div>
  );
};