import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Lock } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Community {
  id: string;
  name: string;
  description: string | null;
  category: string;
  is_private: boolean;
  member_count: number;
  creator: { username: string | null } | null;
}

interface CommunityCardProps {
  community: Community;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("community_memberships")
        .insert({
          community_id: community.id,
          user_id: session?.user?.id,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["member-communities"] });
      toast({
        title: "Joined community",
        description: `You have successfully joined ${community.name}`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error joining community",
        description: "Please try again later.",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {community.name}
              {community.is_private && <Lock className="w-4 h-4" />}
            </CardTitle>
            <CardDescription>Created by {community.creator?.username || "Unknown"}</CardDescription>
          </div>
          <Badge>{community.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            {community.member_count} members
          </div>
          {session && (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => joinMutation.mutate()}
              disabled={joinMutation.isPending || community.is_private}
            >
              {community.is_private ? "Private" : "Join"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;