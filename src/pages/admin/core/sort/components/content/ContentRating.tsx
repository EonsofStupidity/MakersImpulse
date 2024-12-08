import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContentRatingProps {
  contentId: string;
  contentType: 'forum' | 'blog' | 'build';
  currentUpvotes?: number;
  isFeatured?: boolean;
}

export const ContentRating = ({ contentId, contentType, currentUpvotes = 0, isFeatured = false }: ContentRatingProps) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [upvotes, setUpvotes] = useState(currentUpvotes);

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      // Record the upvote
      const { error: reactionError } = await supabase
        .from('reactions')
        .insert({
          user_id: session?.user?.id,
          target_type: contentType,
          target_id: contentId,
          reaction_type: 'upvote'
        });

      if (reactionError) throw reactionError;

      // Award points to content creator
      const { error: pointsError } = await supabase
        .from('user_activity_points')
        .insert({
          user_id: session?.user?.id,
          activity_type: 'content_upvoted',
          points: 5,
          metadata: {
            content_type: contentType,
            content_id: contentId
          }
        });

      if (pointsError) throw pointsError;
    },
    onSuccess: () => {
      setUpvotes(prev => prev + 1);
      queryClient.invalidateQueries({ queryKey: ['content', contentId] });
      toast({
        title: "Content Upvoted",
        description: "Thank you for your feedback!"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upvote content. You may have already voted.",
        variant: "destructive"
      });
    }
  });

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => upvoteMutation.mutate()}
        disabled={!session || upvoteMutation.isPending}
      >
        <ThumbsUp className="w-4 h-4 mr-2" />
        {upvotes}
      </Button>
      
      {isFeatured && (
        <div className="flex items-center text-yellow-500">
          <Star className="w-4 h-4 mr-1" />
          <span className="text-sm">Featured</span>
        </div>
      )}
    </div>
  );
};