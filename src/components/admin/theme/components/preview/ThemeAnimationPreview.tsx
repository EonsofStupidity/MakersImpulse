import React from 'react';
import { motion } from 'framer-motion';
import { ThemeBase } from '@/types';

interface AnimationPreviewProps {
  colors: Partial<ThemeBase>;
}

export const AnimationPreview: React.FC<AnimationPreviewProps> = ({ colors }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Animation Effects</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.primary_color }}
          >
            Hover Scale Effect
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.secondary_color }}
          >
            Fade Animation
          </motion.div>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.accent_color }}
          >
            Slide Animation
          </motion.div>
        </div>
      </div>
    </div>
  );
};
