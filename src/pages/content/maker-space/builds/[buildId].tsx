import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Build } from "@/types/builds";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageCarousel } from "@/components/shared/content-blocks/ImageCarousel";

const BuildDetails = () => {
  const { buildId } = useParams();

  const { data: build, isLoading, error } = useQuery({
    queryKey: ['build', buildId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mi3dp_builds')
        .select('*')
        .eq('id', buildId)
        .single();
      
      if (error) throw error;

      // Convert database JSON to typed interfaces
      return {
        ...data,
        build_volume: data.build_volume as Build['build_volume'],
        parts: data.parts as Build['parts'],
        images: data.images as Build['images']
      } as Build;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !build) {
    toast.error("Failed to load build details");
    return (
      <div className="text-center text-red-500">
        Failed to load build details. Please try again.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6 space-y-8"
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{build.name}</h1>
        {build.description && (
          <p className="text-gray-500 text-lg">{build.description}</p>
        )}
      </div>

      {build.images && build.images.length > 0 && (
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          <ImageCarousel 
            images={build.images.map(img => img.url)} 
            className="w-full"
          />
        </Card>
      )}

      {build.build_volume && (
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Build Volume</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Width (X)</p>
              <p className="text-lg font-medium">{build.build_volume.x} {build.build_volume.units}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Depth (Y)</p>
              <p className="text-lg font-medium">{build.build_volume.y} {build.build_volume.units}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Height (Z)</p>
              <p className="text-lg font-medium">{build.build_volume.z} {build.build_volume.units}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Units</p>
              <p className="text-lg font-medium capitalize">{build.build_volume.units}</p>
            </div>
          </div>
        </Card>
      )}

      {build.parts && build.parts.length > 0 && (
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Parts List</h2>
          <div className="space-y-4">
            {build.parts.map((part, index) => (
              <div 
                key={part.id} 
                className="flex items-start justify-between p-4 bg-gray-900/50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{part.name}</h3>
                  {part.notes && (
                    <p className="text-sm text-gray-500 mt-1">{part.notes}</p>
                  )}
                  {part.attributes && Object.entries(part.attributes).map(([key, value]) => (
                    <div key={key} className="text-sm text-gray-400 mt-1">
                      {key}: {value.toString()}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-400">
                  Quantity: {part.quantity}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default BuildDetails;