import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploadZone } from "@/components/uploads";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { ColorPicker } from "./components/ColorPicker";
import { CSSEffectsControl } from "./components/CSSEffectsControl";
import { SettingsPreview } from "./components/SettingsPreview";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { AnimationsSection } from "./components/AnimationsSection";

const settingsSchema = z.object({
  site_title: z.string().min(1, "Site title is required"),
  tagline: z.string().optional(),
  primary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  secondary_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  accent_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_cyan: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_pink: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
  neon_purple: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format"),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export const SettingsForm = () => {
  console.log("SettingsForm rendered");
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
      site_title: settings?.site_title || "MakersImpulse",
      tagline: settings?.tagline || "Create, Share, Inspire",
      primary_color: settings?.primary_color || "#7FFFD4",
      secondary_color: settings?.secondary_color || "#FFB6C1",
      accent_color: settings?.accent_color || "#E6E6FA",
      neon_cyan: "#41f0db",
      neon_pink: "#ff0abe",
      neon_purple: "#8000ff",
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-[2.5%]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gray-800/50 border border-white/10">
          <form onSubmit={form.handleSubmit(handleSettingsUpdate)} className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="basic-settings">
                <AccordionTrigger className="text-lg font-semibold text-white">
                  Basic Settings
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium text-white">Site Title</label>
                    <Input
                      {...form.register("site_title")}
                      className="mt-1 bg-gray-700/50 border-gray-600"
                    />
                    {form.formState.errors.site_title && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.site_title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white">Tagline</label>
                    <Input
                      {...form.register("tagline")}
                      className="mt-1 bg-gray-700/50 border-gray-600"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="theme-colors">
                <AccordionTrigger className="text-lg font-semibold text-white">
                  Theme Colors
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <ColorPicker
                      label="Primary Color"
                      cssVar="--primary"
                      value={form.watch("primary_color")}
                      onChange={(color) => form.setValue("primary_color", color)}
                    />
                    <ColorPicker
                      label="Secondary Color"
                      cssVar="--secondary"
                      value={form.watch("secondary_color")}
                      onChange={(color) => form.setValue("secondary_color", color)}
                    />
                    <ColorPicker
                      label="Accent Color"
                      cssVar="--accent"
                      value={form.watch("accent_color")}
                      onChange={(color) => form.setValue("accent_color", color)}
                    />
                    <ColorPicker
                      label="Neon Cyan"
                      cssVar="--neon-cyan"
                      value={form.watch("neon_cyan")}
                      onChange={(color) => form.setValue("neon_cyan", color)}
                    />
                    <ColorPicker
                      label="Neon Pink"
                      cssVar="--neon-pink"
                      value={form.watch("neon_pink")}
                      onChange={(color) => form.setValue("neon_pink", color)}
                    />
                    <ColorPicker
                      label="Neon Purple"
                      cssVar="--neon-purple"
                      value={form.watch("neon_purple")}
                      onChange={(color) => form.setValue("neon_purple", color)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="css-effects">
                <AccordionTrigger className="text-lg font-semibold text-white">
                  CSS Effects & Animations
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <CSSEffectsControl
                    label="Neon Glow Intensity"
                    value={1}
                    min={0}
                    max={2}
                    onChange={(value) => console.log("Neon glow intensity:", value)}
                  />
                  <CSSEffectsControl
                    label="Animation Speed"
                    value={1}
                    min={0.5}
                    max={2}
                    onChange={(value) => console.log("Animation speed:", value)}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="animations">
                <AccordionTrigger className="text-lg font-semibold text-white">
                  Animations & Transitions
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <AnimationsSection />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="branding">
                <AccordionTrigger className="text-lg font-semibold text-white">
                  Branding Assets
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>
    </div>
  );
};
