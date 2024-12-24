import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CSSEffectsControl } from "./CSSEffectsControl";
import { UseFormReturn } from "react-hook-form";
import { ThemeBase } from "@/types/theme/core/types";

interface FontSettingsSectionProps {
  form: UseFormReturn<ThemeBase>;
}

export const FontSettingsSection: React.FC<FontSettingsSectionProps> = ({ form }) => {
  return (
    <AccordionItem value="font-settings">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Typography & Fonts
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <CSSEffectsControl
          label="Heading Font Family"
          type="select"
          value={form.watch("typography.fontFamily.heading")}
          options={[
            { label: "Inter", value: "Inter" },
            { label: "System UI", value: "system-ui" },
            { label: "Roboto", value: "Roboto" },
            { label: "Helvetica", value: "Helvetica" }
          ]}
          onChange={(value) => form.setValue("typography.fontFamily.heading", value as string)}
          description="Font family for headings"
        />
        <CSSEffectsControl
          label="Body Font Family"
          type="select"
          value={form.watch("typography.fontFamily.body")}
          options={[
            { label: "Inter", value: "Inter" },
            { label: "System UI", value: "system-ui" },
            { label: "Roboto", value: "Roboto" },
            { label: "Helvetica", value: "Helvetica" }
          ]}
          onChange={(value) => form.setValue("typography.fontFamily.body", value as string)}
          description="Font family for body text"
        />
        <CSSEffectsControl
          label="Base Font Size"
          type="input"
          value={form.watch("typography.fontSize")}
          onChange={(value) => form.setValue("typography.fontSize", value as string)}
          description="Base font size (e.g., 16px)"
        />
        <CSSEffectsControl
          label="Normal Font Weight"
          type="select"
          value={form.watch("typography.fontWeight.normal")}
          options={[
            { label: "Light (300)", value: "300" },
            { label: "Regular (400)", value: "400" },
            { label: "Medium (500)", value: "500" }
          ]}
          onChange={(value) => form.setValue("typography.fontWeight.normal", value as string)}
          description="Font weight for normal text"
        />
        <CSSEffectsControl
          label="Bold Font Weight"
          type="select"
          value={form.watch("typography.fontWeight.bold")}
          options={[
            { label: "Semi-Bold (600)", value: "600" },
            { label: "Bold (700)", value: "700" },
            { label: "Extra Bold (800)", value: "800" }
          ]}
          onChange={(value) => form.setValue("typography.fontWeight.bold", value as string)}
          description="Font weight for bold text"
        />
        <CSSEffectsControl
          label="Line Height"
          type="input"
          value={form.watch("typography.lineHeight")}
          onChange={(value) => form.setValue("typography.lineHeight", value as string)}
          description="Base line height (e.g., 1.5)"
        />
        <CSSEffectsControl
          label="Letter Spacing"
          type="select"
          value={form.watch("typography.letterSpacing")}
          options={[
            { label: "Normal", value: "normal" },
            { label: "Tight", value: "-0.025em" },
            { label: "Wide", value: "0.025em" }
          ]}
          onChange={(value) => form.setValue("typography.letterSpacing", value as string)}
          description="Letter spacing for text"
        />
      </AccordionContent>
    </AccordionItem>
  );
};