import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface FollowButtonProps {
  userId: string;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const session = useSession();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    if (!session?.user?.id) return;
    
    setIsLoading(true);
    try {
      if (isFollowing) {
        await supabase
          .from('user_connections')
          .delete()
          .eq('follower_id', session.user.id)
          .eq('following_id', userId);
      } else {
        await supabase
          .from('user_connections')
          .insert({
            follower_id: session.user.id,
            following_id: userId
          });
      }
      setIsFollowing(!isFollowing);
      
      toast({
        title: isFollowing ? "Unfollowed" : "Following",
        description: isFollowing ? "You are no longer following this user" : "You are now following this user",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleFollow}
      disabled={isLoading || !session}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;