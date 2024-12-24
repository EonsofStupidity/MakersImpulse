import React from 'react';
import { motion } from 'framer-motion';
import { ThemeBase } from '@/types/theme/core/types';

interface ThemeAnimationPreviewProps {
  colors: Partial<ThemeBase>;
}

export const ThemeAnimationPreview: React.FC<ThemeAnimationPreviewProps> = ({ colors }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Animation Effects</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.colors?.primary }}
          >
            Hover Scale Effect
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.colors?.secondary }}
          >
            Fade Animation
          </motion.div>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
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