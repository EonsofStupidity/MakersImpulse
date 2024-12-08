import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { BasicSettingsSection } from "./components/BasicSettingsSection";
import { FontSettingsSection } from "./components/FontSettingsSection";
import { TransitionSettingsSection } from "./components/TransitionSettingsSection";
import { settingsSchema, type SettingsFormData } from "./types";
import { AnimationsSection } from "./components/AnimationsSection";
import { SettingsPreview } from "./components/SettingsPreview";
import { FontColorSettingsSection } from "./components/FontColorSettingsSection";
import { NeonColorsSection } from "./components/NeonColorsSection";
import { AdvancedCSSSection } from "./components/AdvancedCSSSection";
import { ResetDialog } from "./components/ResetDialog";
import { toast } from "sonner";
import { Settings } from "./types";
import { useTheme } from "@/components/theme/ThemeContext";

export const SettingsForm = () => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { theme, updateTheme } = useTheme();

  const {
    settings,
    isLoading,
    isSaving,
    logoFile,
    faviconFile,
    handleLogoUpload,
    handleFaviconUpload,
    handleSettingsUpdate,
    handleResetToDefault,
  } = useSettingsForm();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      site_title: settings?.site_title || "MakersImpulse",
      tagline: settings?.tagline || "Create, Share, Inspire",
      primary_color: settings?.primary_color || "#7FFFD4",
      secondary_color: settings?.secondary_color || "#FFB6C1",
      accent_color: settings?.accent_color || "#E6E6FA",
      neon_cyan: settings?.neon_cyan || "#41f0db",
      neon_pink: settings?.neon_pink || "#ff0abe",
      neon_purple: settings?.neon_purple || "#8000ff",
      text_primary_color: settings?.text_primary_color || "#FFFFFF",
      text_secondary_color: settings?.text_secondary_color || "#A1A1AA",
      text_link_color: settings?.text_link_color || "#3B82F6",
      text_heading_color: settings?.text_heading_color || "#FFFFFF",
      border_radius: settings?.border_radius || "0.5rem",
      spacing_unit: settings?.spacing_unit || "1rem",
      transition_duration: settings?.transition_duration || "0.3s",
      shadow_color: settings?.shadow_color || "#000000",
      hover_scale: settings?.hover_scale || "1.05",
      font_family_heading: settings?.font_family_heading || "Inter",
      font_family_body: settings?.font_family_body || "Inter",
      font_size_base: settings?.font_size_base || "16px",
      font_weight_normal: settings?.font_weight_normal || "400",
      font_weight_bold: settings?.font_weight_bold || "700",
      line_height_base: settings?.line_height_base || "1.5",
      letter_spacing: settings?.letter_spacing || "normal",
      box_shadow: settings?.box_shadow || "none",
      backdrop_blur: settings?.backdrop_blur || "0",
    },
  });

  // Watch all form fields for changes
  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change") {
        const formValues = form.getValues();
        // Ensure all required fields are present before updating
        const settingsUpdate: Settings = {
          site_title: formValues.site_title || "MakersImpulse",
          primary_color: formValues.primary_color || "#7FFFD4",
          secondary_color: formValues.secondary_color || "#FFB6C1",
          accent_color: formValues.accent_color || "#E6E6FA",
          text_primary_color: formValues.text_primary_color || "#FFFFFF",
          text_secondary_color: formValues.text_secondary_color || "#A1A1AA",
          text_link_color: formValues.text_link_color || "#3B82F6",
          text_heading_color: formValues.text_heading_color || "#FFFFFF",
          neon_cyan: formValues.neon_cyan || "#41f0db",
          neon_pink: formValues.neon_pink || "#ff0abe",
          neon_purple: formValues.neon_purple || "#8000ff",
          border_radius: formValues.border_radius || "0.5rem",
          spacing_unit: formValues.spacing_unit || "1rem",
          transition_duration: formValues.transition_duration || "0.3s",
          shadow_color: formValues.shadow_color || "#000000",
          hover_scale: formValues.hover_scale || "1.05",
          font_family_heading: formValues.font_family_heading || "Inter",
          font_family_body: formValues.font_family_body || "Inter",
          font_size_base: formValues.font_size_base || "16px",
          font_weight_normal: formValues.font_weight_normal || "400",
          font_weight_bold: formValues.font_weight_bold || "700",
          line_height_base: formValues.line_height_base || "1.5",
          letter_spacing: formValues.letter_spacing || "normal",
          ...formValues, // Add any optional fields
        };
        
        // Update both the local preview and the global theme
        handleSettingsUpdate(settingsUpdate);
        updateTheme(settingsUpdate);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, handleSettingsUpdate, updateTheme]);

  const handleReset = async () => {
    if (resetConfirmation.toUpperCase() !== "IMPULSE" || !confirmCheckbox) {
      toast.error("Please type IMPULSE and check the confirmation box");
      return;
    }

    setIsResetting(true);
    toast.loading("Resetting settings to default...");

    try {
      await handleResetToDefault();
      toast.success("Settings reset successfully");
      setShowResetDialog(false);
      setResetConfirmation("");
      setConfirmCheckbox(false);
      form.reset(settings || undefined);
    } catch (error) {
      toast.error("Failed to reset settings");
    } finally {
      setIsResetting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleReset();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-[5%]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-6 bg-gray-800/50 border border-white/10">
          <div className="flex justify-end mb-4">
            <Button 
              variant="destructive"
              onClick={() => setShowResetDialog(true)}
              className="bg-secondary hover:bg-secondary/80"
            >
              Reset to Default
            </Button>
          </div>

          <form className="space-y-6">
            {isSaving && (
              <div className="fixed bottom-4 right-4 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-primary">Saving changes...</span>
              </div>
            )}
            <Accordion type="single" collapsible className="space-y-4">
              <BasicSettingsSection 
                register={form.register} 
                formState={form.formState}
              />
              <FontColorSettingsSection form={form} />
              <NeonColorsSection form={form} />
              <AdvancedCSSSection form={form} />
              <FontSettingsSection form={form} />
              <TransitionSettingsSection />
              <AnimationsSection />
            </Accordion>
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

      <ResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onReset={handleReset}
        isResetting={isResetting}
        resetConfirmation={resetConfirmation}
        onResetConfirmationChange={setResetConfirmation}
        confirmCheckbox={confirmCheckbox}
        onConfirmCheckboxChange={setConfirmCheckbox}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};
