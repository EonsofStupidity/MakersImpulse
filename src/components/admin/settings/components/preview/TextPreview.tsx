import React from "react";
import { motion } from "framer-motion";
import { ThemeBase } from "@/types/theme/core/base";

interface TextPreviewProps {
  colors: Pick<ThemeBase, 
    | 'primary_color'
    | 'secondary_color'
    | 'accent_color'
    | 'neon_cyan'
    | 'neon_pink'
    | 'neon_purple'
  >;
}

export const TextPreview: React.FC<TextPreviewProps> = ({ colors }) => {
  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      key={`text-${colors.primary_color}`}
    >
      <p className="text-sm text-gray-400">Sample Text Colors:</p>
      <p style={{ color: colors.primary_color }}>Primary Color Text</p>
      <p style={{ color: colors.secondary_color }}>Secondary Color Text</p>
      <p style={{ color: colors.accent_color }}>Accent Color Text</p>
      <p style={{ color: colors.neon_cyan }}>Neon Cyan Text</p>
      <p style={{ color: colors.neon_pink }}>Neon Pink Text</p>
      <p style={{ color: colors.neon_purple }}>Neon Purple Text</p>
    </motion.div>
  );
};