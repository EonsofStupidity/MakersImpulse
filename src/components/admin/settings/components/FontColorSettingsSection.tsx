import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ColorPicker } from "./ColorPicker";

export const FontColorSettingsSection = ({ form }: { form: any }) => {
  return (
    <AccordionItem value="font-colors">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Font Colors
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <div className="grid gap-4">
          <ColorPicker
            label="Primary Text"
            cssVar="--foreground"
            value={form.watch("text_primary_color")}
            onChange={(color) => form.setValue("text_primary_color", color)}
          />
          <ColorPicker
            label="Secondary Text"
            cssVar="--muted-foreground"
            value={form.watch("text_secondary_color")}
            onChange={(color) => form.setValue("text_secondary_color", color)}
          />
          <ColorPicker
            label="Link Text"
            cssVar="--link"
            value={form.watch("text_link_color")}
            onChange={(color) => form.setValue("text_link_color", color)}
          />
          <ColorPicker
            label="Heading Text"
            cssVar="--heading"
            value={form.watch("text_heading_color")}
            onChange={(color) => form.setValue("text_heading_color", color)}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};