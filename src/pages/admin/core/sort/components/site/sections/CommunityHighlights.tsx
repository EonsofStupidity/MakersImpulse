import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
  display_name: string | null;
}

interface CommunityHighlight {
  id: string;
  title: string;
  description: string | null;
  highlight_type: string;
  profiles: {
    username: string | null;
    display_name: string | null;
  };
  achievement_data: any;
  content_reference_id: string;
  content_type: string;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  user_id: string;
}

const CommunityHighlights = () => {
  const { data: highlights, isLoading } = useQuery({
    queryKey: ["community-highlights"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_highlights")
        .select(`
          *,
          profiles:user_id (
            username,
            display_name
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as unknown as CommunityHighlight[];
    },
  });

  if (isLoading) return null;

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Trophy className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Community Highlights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights?.map((highlight) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  {highlight.highlight_type === "achievement" && (
                    <Star className="w-5 h-5 text-yellow-500" />
                  )}
                  {highlight.highlight_type === "build_of_week" && (
                    <Trophy className="w-5 h-5 text-primary" />
                  )}
                  {highlight.highlight_type === "contribution" && (
                    <Award className="w-5 h-5 text-purple-500" />
                  )}
                  <Badge variant="outline">{highlight.highlight_type}</Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  {highlight.description}
                </p>
                
                <div className="text-sm text-muted-foreground">
                  by {highlight.profiles?.display_name || highlight.profiles?.username}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;