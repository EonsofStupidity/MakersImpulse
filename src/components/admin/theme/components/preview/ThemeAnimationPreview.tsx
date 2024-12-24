import React from 'react';
import { motion } from 'framer-motion';
import { ThemeBase } from '@/types/theme';

interface ThemeAnimationPreviewProps {
  theme: Partial<ThemeBase>;
}

export const ThemeAnimationPreview: React.FC<ThemeAnimationPreviewProps> = ({ theme }) => {
  const animationDuration = theme.default_animation_duration || 300;
  const isEnabled = theme.animations_enabled ?? true;
  const transitionDuration = theme.transition_duration || '0.3s';
  const hoverScale = theme.hover_scale || '1.05';

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
            style={{ backgroundColor: theme.primary_color }}
          >
            Hover Scale Effect
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animationDuration / 1000 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.secondary_color }}
          >
            Fade Animation
          </motion.div>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: animationDuration / 1000 }}
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: theme.accent_color,
              backdropFilter: `blur(${theme.backdrop_blur || '0px'})`,
              boxShadow: theme.box_shadow
            }}
          >
            Slide Animation with Effects
          </motion.div>
        </div>
      </div>
    </div>
  );
};