import React from "react";

interface SettingsPreviewProps {
  settings: {
    site_title: string;
    tagline?: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    logo_url?: string;
    favicon_url?: string;
  };
}

export const SettingsPreview: React.FC<SettingsPreviewProps> = ({ settings }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
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
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div
            className="w-16 h-16 rounded-lg"
            style={{ backgroundColor: settings.primary_color }}
          />
          <div
            className="w-16 h-16 rounded-lg"
            style={{ backgroundColor: settings.secondary_color }}
          />
          <div
            className="w-16 h-16 rounded-lg"
            style={{ backgroundColor: settings.accent_color }}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Sample Text Colors:</p>
          <p style={{ color: settings.primary_color }}>Primary Color Text</p>
          <p style={{ color: settings.secondary_color }}>Secondary Color Text</p>
          <p style={{ color: settings.accent_color }}>Accent Color Text</p>
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