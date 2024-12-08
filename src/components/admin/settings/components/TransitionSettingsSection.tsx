import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CSSEffectsControl } from "./CSSEffectsControl";

export const TransitionSettingsSection = () => {
  return (
    <AccordionItem value="transition-settings">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Transitions & Motion
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <CSSEffectsControl
          label="Page Transition Duration"
          type="slider"
          value={0.3}
          min={0.1}
          max={1}
          step={0.1}
          onChange={(value) => console.log("Page transition:", value)}
          description="Duration of page transition animations"
          previewClass="animate-fade-in"
        />
        <CSSEffectsControl
          label="Element Transition Type"
          type="select"
          value="ease-out"
          options={[
            { label: "Ease Out", value: "ease-out" },
            { label: "Ease In", value: "ease-in" },
            { label: "Linear", value: "linear" }
          ]}
          onChange={(value) => console.log("Transition type:", value)}
          description="Default transition timing function"
        />
        <CSSEffectsControl
          label="Hover Scale Factor"
          type="slider"
          value={1.05}
          min={1}
          max={1.2}
          step={0.01}
          onChange={(value) => console.log("Hover scale:", value)}
          description="Scale factor for hover animations"
          previewClass="hover:scale-110"
        />
        <CSSEffectsControl
          label="Animation Preset"
          type="select"
          value="fade"
          options={[
            { label: "Fade", value: "fade" },
            { label: "Slide", value: "slide" },
            { label: "Scale", value: "scale" }
          ]}
          onChange={(value) => console.log("Animation preset:", value)}
          description="Default animation preset for elements"
        />
      </AccordionContent>
    </AccordionItem>
  );
};