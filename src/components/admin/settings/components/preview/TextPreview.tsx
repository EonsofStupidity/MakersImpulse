import React from "react";
import { motion } from "framer-motion";
import { ThemeBase } from "@/types/theme/core/base";

type TextPreviewProps = {
  colors: Pick<ThemeBase, 
    | 'primary_color'
    | 'secondary_color'
    | 'accent_color'
    | 'text_primary_color'
    | 'text_secondary_color'
    | 'text_link_color'
    | 'text_heading_color'
    | 'neon_cyan'
    | 'neon_pink'
    | 'neon_purple'
  >;
};

export const TextPreview: React.FC<TextPreviewProps> = ({ colors }) => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Text Colors:</p>
        <p style={{ color: colors.text_primary_color }}>Primary Text Color (--text-primary)</p>
        <p style={{ color: colors.text_secondary_color }}>Secondary Text Color (--text-secondary)</p>
        <p style={{ color: colors.text_link_color }}>Link Text Color (--text-link)</p>
        <p style={{ color: colors.text_heading_color }}>Heading Text Color (--text-heading)</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-400">Brand Colors:</p>
        <p style={{ color: colors.primary_color }}>Primary Brand Color (--primary)</p>
        <p style={{ color: colors.secondary_color }}>Secondary Brand Color (--secondary)</p>
        <p style={{ color: colors.accent_color }}>Accent Brand Color (--accent)</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-400">Neon Effects:</p>
        <p style={{ color: colors.neon_cyan }}>Neon Cyan Text (--neon-cyan)</p>
        <p style={{ color: colors.neon_pink }}>Neon Pink Text (--neon-pink)</p>
        <p style={{ color: colors.neon_purple }}>Neon Purple Text (--neon-purple)</p>
      </div>
    </motion.div>
  );
};