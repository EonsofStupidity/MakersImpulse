import React from "react";
import { motion } from "framer-motion";

interface SettingsPreviewProps {
  settings: {
    site_title: string;
    tagline?: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    neon_cyan?: string;
    neon_pink?: string;
    neon_purple?: string;
    logo_url?: string;
    favicon_url?: string;
  };
}

export const SettingsPreview: React.FC<SettingsPreviewProps> = ({ settings }) => {
  console.log("SettingsPreview rendered with settings:", settings);

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {settings.logo_url && (
          <img
            src={settings.logo_url}
            alt="Logo"
            className="w-12 h-12 object-contain rounded"
          />
        )}
        <div>
          <h2 className="text-xl font-bold" style={{ color: settings.primary_color }}>
            {settings.site_title}
          </h2>
          {settings.tagline && (
            <p className="text-sm" style={{ color: settings.secondary_color }}>
              {settings.tagline}
            </p>
          )}
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Brand Colors</p>
            <div className="space-y-2">
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: settings.primary_color }}
              />
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: settings.secondary_color }}
              />
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: settings.accent_color }}
              />
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">Neon Effects</p>
            <div className="space-y-2">
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: settings.neon_cyan }}
              />
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: settings.neon_pink }}
              />
              <div
                className="w-full h-16 rounded-lg"
                style={{ backgroundColor: settings.neon_purple }}
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">Gradients</p>
            <div
              className="w-full h-52 rounded-lg animate-gradient"
              style={{
                backgroundImage: `linear-gradient(-45deg, ${settings.neon_cyan}, ${settings.neon_pink}, ${settings.neon_purple})`,
                backgroundSize: "200% 200%",
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Sample Text Colors:</p>
          <p style={{ color: settings.primary_color }}>Primary Color Text</p>
          <p style={{ color: settings.secondary_color }}>Secondary Color Text</p>
          <p style={{ color: settings.accent_color }}>Accent Color Text</p>
          <p style={{ color: settings.neon_cyan }}>Neon Cyan Text</p>
          <p style={{ color: settings.neon_pink }}>Neon Pink Text</p>
          <p style={{ color: settings.neon_purple }}>Neon Purple Text</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Animation Previews:</p>
          <div className="space-y-2">
            <p className="animate-neon-pulse" style={{ color: settings.neon_cyan }}>
              Neon Pulse Effect
            </p>
            <p className="animate-neon-glow" style={{ color: settings.neon_pink }}>
              Neon Glow Effect
            </p>
            <p className="animate-gradient-text" style={{ 
              backgroundImage: `linear-gradient(-45deg, ${settings.neon_cyan}, ${settings.neon_pink}, ${settings.neon_purple})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%'
            }}>
              Gradient Text Effect
            </p>
          </div>
        </div>
      </div>

      {settings.favicon_url && (
        <div>
          <p className="text-sm text-gray-400 mb-2">Favicon Preview:</p>
          <img
            src={settings.favicon_url}
            alt="Favicon"
            className="w-8 h-8 object-contain"
          />
        </div>
      )}
    </div>
  );
};