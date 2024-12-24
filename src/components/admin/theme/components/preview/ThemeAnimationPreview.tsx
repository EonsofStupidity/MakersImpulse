import React from 'react';
import { motion } from 'framer-motion';
import { ThemeBase } from '@/types/theme';
import { useThemePreview } from '@/hooks/theme/useThemePreview';
import { useThemeAnimation } from '@/hooks/theme/useThemeAnimation';

interface ThemeAnimationPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeAnimationPreview: React.FC<ThemeAnimationPreviewProps> = ({ colors }) => {
  const { getColor } = useThemePreview();
  const { getAnimationConfig } = useThemeAnimation();
  
  const {
    enabled: animationEnabled,
    duration,
    hoverScale,
    backdropBlur,
    boxShadow
  } = getAnimationConfig(colors);

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
              backgroundColor: getColor('primary', colors),
              backdropFilter: `blur(${backdropBlur})`,
              boxShadow
            }}
          >
            Hover Scale Effect
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: getColor('secondary', colors) }}
          >
            Fade Animation
          </motion.div>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: getColor('accent', colors) }}
          >
            Slide Animation
          </motion.div>
        </div>
      </div>
    </div>
  );
};