import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploadZone } from "@/components/uploads";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { ColorPicker } from "./components/ColorPicker";
import { SettingsPreview } from "./components/SettingsPreview";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const settingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  accent_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export const SettingsForm = () => {
  const {
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
  } = useSettingsForm();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      site_title: settings?.site_title || "",
      tagline: settings?.tagline || "",
      primary_color: settings?.primary_color || "#7FFFD4",
      secondary_color: settings?.secondary_color || "#FFB6C1",
      accent_color: settings?.accent_color || "#E6E6FA",
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <form onSubmit={form.handleSubmit(handleSettingsUpdate)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Site Title</label>
              <div>
                <Input
                  {...form.register("site_title")}
                  className={`mt-1 ${form.formState.errors.site_title ? "border-red-500" : ""}`}
                />
                {form.formState.errors.site_title && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.site_title.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Tagline</label>
              <div>
                <Input
                  {...form.register("tagline")}
                  className={`mt-1 ${form.formState.errors.tagline ? "border-red-500" : ""}`}
                />
                {form.formState.errors.tagline && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.tagline.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-white">Theme Colors</label>
              <div className="grid gap-4">
                <ColorPicker
                  label="Primary Color"
                  value={form.watch("primary_color")}
                  onChange={(color) => form.setValue("primary_color", color)}
                />
                <ColorPicker
                  label="Secondary Color"
                  value={form.watch("secondary_color")}
                  onChange={(color) => form.setValue("secondary_color", color)}
                />
                <ColorPicker
                  label="Accent Color"
                  value={form.watch("accent_color")}
                  onChange={(color) => form.setValue("accent_color", color)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-white">Logo</label>
              <ImageUploadZone
                images={logoFile ? [logoFile] : []}
                onImagesChange={(files) => handleLogoUpload(files[0])}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-white">Favicon</label>
              <ImageUploadZone
                images={faviconFile ? [faviconFile] : []}
                onImagesChange={(files) => handleFaviconUpload(files[0])}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isDirty || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Card>

      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
        <SettingsPreview
          settings={{
            ...settings,
            ...form.watch(),
            logo_url: logoFile ? URL.createObjectURL(logoFile) : settings?.logo_url,
            favicon_url: faviconFile ? URL.createObjectURL(faviconFile) : settings?.favicon_url,
          }}
        />
      </Card>
    </div>
  );
};