import { useSession } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedContentProps {
  contentId: string;
  contentType: string;
  authorId: string;
  isFeatured?: boolean;
}

export const FeaturedContent = ({ contentId, contentType, authorId, isFeatured = false }: FeaturedContentProps) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const featureMutation = useMutation({
    mutationFn: async () => {
      if (isFeatured) {
        // Remove from featured content
        const { error } = await supabase
          .from('featured_content')
          .delete()
          .eq('content_id', contentId);

        if (error) throw error;
      } else {
        // Add to featured content and award points
        const { error: featureError } = await supabase
          .from('featured_content')
          .insert({
            content_id: contentId,
            content_type: contentType,
            featured_from: new Date().toISOString(),
            featured_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
          });

        if (featureError) throw featureError;

        // Award featured content bonus points
        const { error: pointsError } = await supabase
          .from('user_activity_points')
          .insert({
            user_id: authorId,
            activity_type: 'content_featured',
            points: 50,
            metadata: {
              content_type: contentType,
              content_id: contentId
            }
          });

        if (pointsError) throw pointsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', contentId] });
      toast({
        title: isFeatured ? "Content Unfeatured" : "Content Featured",
        description: isFeatured 
          ? "The content has been removed from featured." 
          : "The content has been featured and bonus points awarded."
      });
    }
  });

  return (
    <Button
      variant={isFeatured ? "default" : "outline"}
      size="sm"
      onClick={() => featureMutation.mutate()}
      disabled={featureMutation.isPending}
    >
      <Star className="w-4 h-4 mr-2" />
      {isFeatured ? "Unfeature" : "Feature"}
    </Button>
  );
};