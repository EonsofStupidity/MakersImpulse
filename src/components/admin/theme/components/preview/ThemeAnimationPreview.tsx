import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeAnimationPreviewProps {
  colors: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    neon_cyan?: string;
    neon_pink?: string;
    neon_purple?: string;
  };
}

export const ThemeAnimationPreview = memo(({ colors }: ThemeAnimationPreviewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-white mb-4">Animation Preview</h3>
        <div className="grid gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "p-4 rounded-lg",
              "bg-gradient-to-r from-black/20 to-black/10",
              "border border-white/10"
            )}
            style={{
              backgroundColor: `${colors.primary_color}10`
            }}
          >
            <p className="text-sm" style={{ color: colors.primary_color }}>
              Fade In Animation
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "p-4 rounded-lg",
              "bg-gradient-to-r from-black/20 to-black/10",
              "border border-white/10"
            )}
            style={{
              backgroundColor: `${colors.secondary_color}10`
            }}
          >
            <p className="text-sm" style={{ color: colors.secondary_color }}>
              Scale Animation
            </p>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "p-4 rounded-lg",
              "bg-gradient-to-r from-black/20 to-black/10",
              "border border-white/10"
            )}
            style={{
              backgroundColor: `${colors.accent_color}10`
            }}
          >
            <p className="text-sm" style={{ color: colors.accent_color }}>
              Slide Animation
            </p>
          </motion.div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-4">Hover Effects</h3>
        <div className="grid gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
              "p-4 rounded-lg cursor-pointer",
              "bg-gradient-to-r from-black/20 to-black/10",
              "border border-white/10",
              "transition-colors duration-200"
            )}
            style={{
              backgroundColor: `${colors.neon_cyan || colors.primary_color}10`
            }}
          >
            <p className="text-sm" style={{ color: colors.neon_cyan || colors.primary_color }}>
              Scale on Hover
            </p>
          </motion.div>

          <motion.div
            whileHover={{ 
              backgroundColor: `${colors.neon_pink || colors.secondary_color}20`,
              transition: { duration: 0.2 }
            }}
            className={cn(
              "p-4 rounded-lg cursor-pointer",
              "bg-gradient-to-r from-black/20 to-black/10",
              "border border-white/10",
              "transition-colors duration-200"
            )}
            style={{
              backgroundColor: `${colors.neon_pink || colors.secondary_color}10`
            }}
          >
            <p className="text-sm" style={{ color: colors.neon_pink || colors.secondary_color }}>
              Color Shift on Hover
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

ThemeAnimationPreview.displayName = "ThemeAnimationPreview";
