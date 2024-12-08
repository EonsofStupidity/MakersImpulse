import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ComponentReviewProps {
  componentId: string;
  componentType: string;
  onReviewComplete: () => void;
}

export const ComponentReview = ({
  componentId,
  componentType,
  onReviewComplete,
}: ComponentReviewProps) => {
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleReview = async (status: "approved" | "rejected") => {
    try {
      setIsSubmitting(true);

      const { error } = await supabase.from("component_reviews").insert({
        component_id: componentId,
        component_type: componentType,
        status,
        comments,
      });

      if (error) throw error;

      toast({
        title: "Review submitted",
        description: `Component has been ${status}`,
      });

      onReviewComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
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