import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ImageUploadZone } from "@/components/uploads";
import { useSettingsForm } from "./hooks/useSettingsForm";
import { ColorPicker } from "./components/ColorPicker";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent 
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { BasicSettingsSection } from "./components/BasicSettingsSection";
import { FontSettingsSection } from "./components/FontSettingsSection";
import { TransitionSettingsSection } from "./components/TransitionSettingsSection";
import { settingsSchema, type SettingsFormData } from "./types";
import { AnimationsSection } from "./components/AnimationsSection";
import { SettingsPreview } from "./components/SettingsPreview";
import { FontColorSettingsSection } from "./components/FontColorSettingsSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const SettingsForm = () => {
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

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
      neon_cyan: "#41f0db",
      neon_pink: "#ff0abe",
      neon_purple: "#8000ff",
      text_primary_color: settings?.text_primary_color || "#FFFFFF",
      text_secondary_color: settings?.text_secondary_color || "#A1A1AA",
      text_link_color: settings?.text_link_color || "#3B82F6",
      text_heading_color: settings?.text_heading_color || "#FFFFFF",
    },
  });

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

          <form onSubmit={form.handleSubmit(handleSettingsUpdate)} className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              <BasicSettingsSection 
                register={form.register} 
                formState={form.formState}
              />

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
                  </div>
                </AccordionContent>
              </AccordionItem>

              <FontColorSettingsSection form={form} />
              <FontSettingsSection />
              <TransitionSettingsSection />
              <AnimationsSection />

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

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-gray-800/95 border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Reset Settings to Default</DialogTitle>
            <DialogDescription className="text-gray-400">
              This action will reset all settings to their default values. Type IMPULSE and check the box to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-confirmation" className="text-white">Type IMPULSE to confirm</Label>
              <Input
                id="reset-confirmation"
                value={resetConfirmation}
                onChange={(e) => setResetConfirmation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-700/50 border-gray-600"
                placeholder="IMPULSE"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirm-reset"
                checked={confirmCheckbox}
                onCheckedChange={(checked) => setConfirmCheckbox(checked as boolean)}
              />
              <Label htmlFor="confirm-reset" className="text-white">
                I understand this will reset all settings
              </Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReset}
                disabled={isResetting}
              >
                {isResetting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Settings"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};