import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CSSEffectsControl } from "./CSSEffectsControl";

export const FontSettingsSection = () => {
  return (
    <AccordionItem value="font-settings">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Typography & Fonts
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <CSSEffectsControl
          label="Base Font Size"
          type="slider"
          value={16}
          min={12}
          max={24}
          step={1}
          onChange={(value) => console.log("Base font size:", value)}
          description="Global base font size in pixels"
        />
        <CSSEffectsControl
          label="Heading Scale"
          type="slider"
          value={1.25}
          min={1}
          max={2}
          step={0.05}
          onChange={(value) => console.log("Heading scale:", value)}
          description="Scaling factor between heading levels"
        />
        <CSSEffectsControl
          label="Line Height"
          type="slider"
          value={1.5}
          min={1}
          max={2}
          step={0.1}
          onChange={(value) => console.log("Line height:", value)}
          description="Global line height multiplier"
        />
        <CSSEffectsControl
          label="Font Family"
          type="select"
          value="inter"
          options={[
            { label: "Inter", value: "inter" },
            { label: "System UI", value: "system-ui" },
            { label: "Roboto", value: "roboto" }
          ]}
          onChange={(value) => console.log("Font family:", value)}
          description="Primary font family for the site"
        />
      </AccordionContent>
    </AccordionItem>
  );
};