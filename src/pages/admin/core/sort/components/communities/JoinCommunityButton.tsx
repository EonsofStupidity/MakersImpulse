import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";

interface JoinCommunityButtonProps {
  communityId: string;
  isPrivate?: boolean;
}

export const JoinCommunityButton = ({ communityId, isPrivate }: JoinCommunityButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  const handleJoin = async () => {
    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to join communities",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("community_memberships")
        .insert({
          community_id: communityId,
          user_id: session.user.id,
          role: "member",
          status: isPrivate ? "pending" : "approved"
        });

      if (error) throw error;

      toast({
        title: isPrivate ? "Join Request Sent" : "Joined Successfully",
        description: isPrivate 
          ? "Your request to join has been sent to the community administrators"
          : "You have successfully joined the community"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join community. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleJoin} 
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isPrivate ? "Request to Join" : "Join Community"}
    </Button>
  );
};