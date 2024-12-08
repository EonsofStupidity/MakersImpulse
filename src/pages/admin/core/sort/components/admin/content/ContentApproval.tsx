import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define valid component types based on available tables
type ValidComponentType = "printer_builds" | "forum_threads" | "cms_content" | "build_submissions";

interface ComponentReviewProps {
  componentId: string;
  componentType: ValidComponentType;
  authorId: string;
  onReviewComplete: () => void;
}

export const ComponentReview = ({
  componentId,
  componentType,
  authorId,
  onReviewComplete,
}: ComponentReviewProps) => {
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleReview = async (status: "approved" | "rejected") => {
    try {
      setIsSubmitting(true);

      // Update content status
      const { error: approvalError } = await supabase
        .from(componentType)
        .update({ status: status, approved_at: new Date().toISOString() })
        .eq('id', componentId);

      if (approvalError) throw approvalError;

      if (status === 'approved') {
        // First, record the activity points
        const { error: activityError } = await supabase
          .from('user_activity_points')
          .insert({
            user_id: authorId,
            activity_type: 'content_approved',
            points: 25,
            metadata: {
              content_type: componentType,
              content_id: componentId
            }
          });

        if (activityError) throw activityError;

        // Then, get current daily points
        const today = new Date().toISOString().split('T')[0];
        const { data: existingPoints, error: fetchError } = await supabase
          .from('daily_point_totals')
          .select('points_earned')
          .eq('user_id', authorId)
          .eq('activity_type', 'content_approved')
          .eq('date', today)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        const currentPoints = existingPoints?.points_earned || 0;
        const newPoints = currentPoints + 25;

        // Update daily points using upsert with a proper match condition
        const { error: pointsError } = await supabase
          .from('daily_point_totals')
          .upsert({
            user_id: authorId,
            activity_type: 'content_approved',
            points_earned: newPoints,
            date: today,
            consecutive_days: 1,
            streak_multiplier: 1.0
          }, {
            onConflict: 'user_id,activity_type,date'
          });

        if (pointsError) {
          console.error('Points error:', pointsError);
          toast({
            title: "Warning",
            description: "Content approved but there was an issue updating points.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Content Approved",
            description: "The content has been approved and points awarded."
          });
        }
      } else {
        toast({
          title: "Content Rejected",
          description: "The content has been rejected."
        });
      }

      onReviewComplete();
    } catch (error) {
      console.error('Review error:', error);
      toast({
        title: "Error",
        description: "Failed to process content review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Review Component</h3>
      <div className="space-y-4">
        <Textarea
          placeholder="Add review comments..."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex gap-4">
          <Button
            onClick={() => handleReview("approved")}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Approve
          </Button>
          <Button
            onClick={() => handleReview("rejected")}
            disabled={isSubmitting}
            variant="destructive"
            className="flex-1"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <X className="h-4 w-4 mr-2" />
            )}
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
};