import React from "react";
import { UseFormReturn, ThemeBase } from '@/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CSSEffectsControl } from "../../components/CSSEffectsControl";

interface TextStylesSectionProps {
  form: UseFormReturn<ThemeBase>;
}

export const TextStylesSection: React.FC<TextStylesSectionProps> = ({ form }) => {
  return (
    <AccordionItem value="text-styles">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Text & Typography
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="grid gap-4">
          <CSSEffectsControl
            label="Heading Font Family"
            type="select"
            value={form.watch("font_family_heading")}
            options={[
              { label: "Inter", value: "Inter" },
              { label: "System UI", value: "system-ui" },
              { label: "Roboto", value: "Roboto" },
              { label: "Helvetica", value: "Helvetica" }
            ]}
            onChange={(value) => form.setValue("font_family_heading", value)}
            description="Font family for headings"
          />
          <CSSEffectsControl
            label="Body Font Family"
            type="select"
            value={form.watch("font_family_body")}
            options={[
              { label: "Inter", value: "Inter" },
              { label: "System UI", value: "system-ui" },
              { label: "Roboto", value: "Roboto" },
              { label: "Helvetica", value: "Helvetica" }
            ]}
            onChange={(value) => form.setValue("font_family_body", value)}
            description="Font family for body text"
          />
          <CSSEffectsControl
            label="Base Font Size"
            type="input"
            value={form.watch("font_size_base")}
            onChange={(value) => form.setValue("font_size_base", value)}
            description="Base font size (e.g., 16px)"
          />
          <CSSEffectsControl
            label="Normal Font Weight"
            type="select"
            value={form.watch("font_weight_normal")}
            options={[
              { label: "Light (300)", value: "300" },
              { label: "Regular (400)", value: "400" },
              { label: "Medium (500)", value: "500" }
            ]}
            onChange={(value) => form.setValue("font_weight_normal", value)}
            description="Font weight for normal text"
          />
          <CSSEffectsControl
            label="Bold Font Weight"
            type="select"
            value={form.watch("font_weight_bold")}
            options={[
              { label: "Semi-Bold (600)", value: "600" },
              { label: "Bold (700)", value: "700" },
              { label: "Extra Bold (800)", value: "800" }
            ]}
            onChange={(value) => form.setValue("font_weight_bold", value)}
            description="Font weight for bold text"
          />
          <CSSEffectsControl
            label="Line Height"
            type="input"
            value={form.watch("line_height_base")}
            onChange={(value) => form.setValue("line_height_base", value)}
            description="Base line height (e.g., 1.5)"
          />
          <CSSEffectsControl
            label="Letter Spacing"
            type="select"
            value={form.watch("letter_spacing")}
            options={[
              { label: "Normal", value: "normal" },
              { label: "Tight", value: "-0.025em" },
              { label: "Wide", value: "0.025em" }
            ]}
            onChange={(value) => form.setValue("letter_spacing", value)}
            description="Letter spacing for text"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
