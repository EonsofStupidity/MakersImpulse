import React, { memo } from "react";
import { motion } from "framer-motion";

interface ThemeTextPreviewProps {
  colors: {
    text_primary_color: string;
    text_secondary_color: string;
    text_link_color: string;
    text_heading_color: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    neon_cyan?: string;
    neon_pink?: string;
    neon_purple?: string;
  };
}

export const ThemeTextPreview = memo(({ colors }: ThemeTextPreviewProps) => {
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
        {colors.neon_cyan && (
          <p style={{ color: colors.neon_cyan }}>Neon Cyan Text (--neon-cyan)</p>
        )}
        {colors.neon_pink && (
          <p style={{ color: colors.neon_pink }}>Neon Pink Text (--neon-pink)</p>
        )}
        {colors.neon_purple && (
          <p style={{ color: colors.neon_purple }}>Neon Purple Text (--neon-purple)</p>
        )}
      </div>
    </motion.div>
  );
});

ThemeTextPreview.displayName = "ThemeTextPreview";