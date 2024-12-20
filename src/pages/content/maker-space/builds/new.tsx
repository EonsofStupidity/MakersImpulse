import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { buildSchema, type BuildFormData } from "@/types/builds";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ImageUploadZone from "@/components/uploads/ImageUploadZone";

const NewBuild = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [images, setImages] = React.useState<File[]>([]);

  const form = useForm<BuildFormData>({
    resolver: zodResolver(buildSchema),
    defaultValues: {
      name: "",
      description: "",
      build_volume: {
        x: 200,
        y: 200,
        z: 200,
        units: "mm"
      },
      parts: [],
    }
  });

  const handleImageChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const onSubmit = async (data: BuildFormData) => {
    try {
      setIsSubmitting(true);

      // Upload images first
      const uploadedImages = await Promise.all(
        images.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const filePath = `${crypto.randomUUID()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath);

          return {
            url: publicUrl,
            alt: file.name,
            caption: "",
          };
        })
      );

      // Create the build with uploaded image URLs
      const { error } = await supabase
        .from('mi3dp_builds')
        .insert({
          ...data,
          images: uploadedImages,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        });

      if (error) throw error;

      toast.success("Build created successfully!");
      navigate("/maker-space/builds");
    } catch (error) {
      console.error("Error creating build:", error);
      toast.error("Failed to create build. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6"
    >
      <Card className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Build</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Build Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white/5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white/5" rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Build Volume</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="build_volume.x"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (X)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          className="bg-white/5"
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="build_volume.y"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depth (Y)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          className="bg-white/5"
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="build_volume.z"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (Z)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number" 
                          className="bg-white/5"
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="build_volume.units"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Units</FormLabel>
                      <FormControl>
                        <select 
                          {...field} 
                          className="w-full h-10 rounded-md border border-input bg-white/5 px-3 py-2"
                        >
                          <option value="mm">Millimeters (mm)</option>
                          <option value="cm">Centimeters (cm)</option>
                          <option value="inches">Inches</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Images</h2>
              <ImageUploadZone
                images={images}
                onImagesChange={handleImageChange}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/maker-space/builds")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-neon-cyan/20 text-white border border-neon-cyan/50 hover:bg-neon-cyan/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Build...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Build
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
};

export default NewBuild;