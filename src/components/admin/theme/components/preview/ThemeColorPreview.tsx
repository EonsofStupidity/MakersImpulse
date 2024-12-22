import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeColorPreviewProps {
  colors: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    neon_cyan?: string;
    neon_pink?: string;
    neon_purple?: string;
  };
}

export const ThemeColorPreview = memo(({ colors }: ThemeColorPreviewProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={`colors-${colors.primary_color}`}
      >
        <p className="text-sm text-gray-400 mb-2">Brand Colors</p>
        <div className="space-y-2">
          <motion.div
            className="w-full h-16 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: colors.primary_color }}
            whileHover={{ scale: 1.02 }}
            key={colors.primary_color}
          />
          <motion.div
            className="w-full h-16 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: colors.secondary_color }}
            whileHover={{ scale: 1.02 }}
            key={colors.secondary_color}
          />
          <motion.div
            className="w-full h-16 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: colors.accent_color }}
            whileHover={{ scale: 1.02 }}
            key={colors.accent_color}
          />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={`neon-${colors.neon_cyan}`}
      >
        <p className="text-sm text-gray-400 mb-2">Neon Effects</p>
        <div className="space-y-2">
          {colors.neon_cyan && (
            <motion.div
              className="w-full h-16 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: colors.neon_cyan }}
              whileHover={{ scale: 1.02 }}
              key={colors.neon_cyan}
            />
          )}
          {colors.neon_pink && (
            <motion.div
              className="w-full h-16 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: colors.neon_pink }}
              whileHover={{ scale: 1.02 }}
              key={colors.neon_pink}
            />
          )}
          {colors.neon_purple && (
            <motion.div
              className="w-full h-16 rounded-lg transition-colors duration-300"
              style={{ backgroundColor: colors.neon_purple }}
              whileHover={{ scale: 1.02 }}
              key={colors.neon_purple}
            />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={`gradient-${colors.primary_color}-${colors.neon_cyan}`}
      >
        <p className="text-sm text-gray-400 mb-2">Gradients</p>
        <motion.div
          className={cn(
            "w-full h-52 rounded-lg",
            "animate-gradient bg-gradient-to-br"
          )}
          style={{
            backgroundImage: `linear-gradient(-45deg, ${colors.neon_cyan || colors.primary_color}, ${colors.neon_pink || colors.secondary_color}, ${colors.neon_purple || colors.accent_color})`,
            backgroundSize: "200% 200%",
          }}
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>
    </div>
  );
});

ThemeColorPreview.displayName = "ThemeColorPreview";
