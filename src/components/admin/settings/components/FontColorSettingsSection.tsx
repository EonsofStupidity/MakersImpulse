import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ColorPicker } from "./ColorPicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { ThemeBase } from "@/types/theme/core/types";

export const FontColorSettingsSection = ({ form }: { form: UseFormReturn<ThemeBase> }) => {
  return (
    <AccordionItem value="font-colors">
      <AccordionTrigger className="text-lg font-semibold text-white">
        Font Colors
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-4">
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text Colors</TabsTrigger>
            <TabsTrigger value="neon">Neon Effects</TabsTrigger>
            <TabsTrigger value="brand">Brand Colors</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4 mt-4">
            <ColorPicker
              label="Primary Text"
              cssVar="--foreground"
              value={form.watch("colors.text.primary")}
              onChange={(color) => form.setValue("colors.text.primary", color)}
            />
            <ColorPicker
              label="Secondary Text"
              cssVar="--muted-foreground"
              value={form.watch("colors.text.secondary")}
              onChange={(color) => form.setValue("colors.text.secondary", color)}
            />
            <ColorPicker
              label="Link Text"
              cssVar="--link"
              value={form.watch("colors.text.link")}
              onChange={(color) => form.setValue("colors.text.link", color)}
            />
            <ColorPicker
              label="Heading Text"
              cssVar="--heading"
              value={form.watch("colors.text.heading")}
              onChange={(color) => form.setValue("colors.text.heading", color)}
            />
          </TabsContent>

          <TabsContent value="neon" className="space-y-4 mt-4">
            <ColorPicker
              label="Neon Cyan"
              cssVar="--neon-cyan"
              value={form.watch("colors.neon.cyan")}
              onChange={(color) => form.setValue("colors.neon.cyan", color)}
            />
            <ColorPicker
              label="Neon Pink"
              cssVar="--neon-pink"
              value={form.watch("colors.neon.pink")}
              onChange={(color) => form.setValue("colors.neon.pink", color)}
            />
            <ColorPicker
              label="Neon Purple"
              cssVar="--neon-purple"
              value={form.watch("colors.neon.purple")}
              onChange={(color) => form.setValue("colors.neon.purple", color)}
            />
          </TabsContent>

          <TabsContent value="brand" className="space-y-4 mt-4">
            <ColorPicker
              label="Primary Color"
              cssVar="--primary"
              value={form.watch("colors.primary")}
              onChange={(color) => form.setValue("colors.primary", color)}
            />
            <ColorPicker
              label="Secondary Color"
              cssVar="--secondary"
              value={form.watch("colors.secondary")}
              onChange={(color) => form.setValue("colors.secondary", color)}
            />
            <ColorPicker
              label="Accent Color"
              cssVar="--accent"
              value={form.watch("colors.accent")}
              onChange={(color) => form.setValue("colors.accent", color)}
            />
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};