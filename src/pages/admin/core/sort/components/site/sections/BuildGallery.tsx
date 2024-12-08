import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ThumbsUp, Eye, Tag } from "lucide-react";

interface BuildProfile {
  username: string | null;
  display_name: string | null;
}

interface Build {
  id: string;
  printer_name: string;
  description: string | null;
  images: string[] | null;
  build_type: string | null;
  difficulty: string | null;
  likes_count: number | null;
  views_count: number | null;
  user_id: string | null;
  profiles: BuildProfile;
  tags: string[] | null;
  compatibility_summary: string | null;
}

const BuildGallery = () => {
  const navigate = useNavigate();
  
  const { data: recentBuilds, isLoading } = useQuery({
    queryKey: ["recent-builds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("printer_builds")
        .select(`
          id,
          printer_name,
          description,
          images,
          build_type,
          difficulty,
          likes_count,
          views_count,
          user_id,
          tags,
          compatibility_summary,
          profiles!printer_builds_user_id_fkey (
            username,
            display_name
          )
        `)
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return (data as unknown as Build[]) || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Build Gallery</h2>
            <p className="text-muted-foreground">
              Get inspired by the latest community builds
            </p>
          </div>
          <Button onClick={() => navigate("/builds")} variant="outline">
            View All Builds <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBuilds?.map((build) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group h-full flex flex-col"
                onClick={() => navigate(`/builds/${build.id}`)}
              >
                <div className="relative aspect-video">
                  <img
                    src={build.images?.[0] || "/placeholder.svg"}
                    alt={build.printer_name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {build.printer_name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {build.description?.slice(0, 100)}...
                  </p>

                  {build.compatibility_summary && (
                    <div className="mb-3 text-sm">
                      <span className="font-medium">Compatibility:</span>
                      <p className="text-muted-foreground">{build.compatibility_summary}</p>
                    </div>
                  )}

                  {build.tags && build.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {build.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm">
                      by {build.profiles?.display_name || build.profiles?.username}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {build.likes_count}
                      </span>
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-4 h-4 mr-1" />
                        {build.views_count}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildGallery;