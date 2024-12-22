import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Build } from "@/types/builds";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const BuildsList = () => {
  const navigate = useNavigate();
  
  const { data: builds, isLoading, error } = useQuery({
    queryKey: ['builds'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mi3dp_builds')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Convert database JSON to typed interfaces and transform snake_case to camelCase
      return (data as any[]).map(build => ({
        id: build.id,
        userId: build.user_id,
        name: build.name,
        description: build.description,
        buildVolume: build.build_volume,
        parts: build.parts,
        images: build.images,
        createdAt: build.created_at
      })) as Build[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load builds");
    return (
      <div className="text-center text-red-500">
        Failed to load builds. Please try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {builds?.map((build) => (
        <motion.div
          key={build.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate(`/maker-space/builds/${build.id}`)}
        >
          <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{build.name}</h3>
            {build.description && (
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {build.description}
              </p>
            )}
            {build.buildVolume && (
              <div className="text-sm text-gray-400">
                Volume: {build.buildVolume.x}x{build.buildVolume.y}x{build.buildVolume.z} {build.buildVolume.units}
              </div>
            )}
            <div className="text-sm text-gray-400 mt-2">
              Parts: {build.parts?.length || 0}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};