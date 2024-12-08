import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useRoleAccess } from "@/hooks/useRoleAccess";

export const GamificationProfile = () => {
  const { toast } = useToast();
  const session = useSession();
  const { hasAccess } = useRoleAccess('subscriber');

  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ["profile-gamification", session?.user?.id],
    queryFn: async () => {
      // First get total points
      const { data: pointsData, error: pointsError } = await supabase
        .from("user_activity_points")
        .select("points")
        .eq('user_id', session?.user?.id);

      if (pointsError) {
        toast({
          title: "Error loading points",
          description: pointsError.message,
          variant: "destructive"
        });
        throw pointsError;
      }

      const totalPoints = pointsData?.reduce((sum, record) => sum + (record.points || 0), 0) || 0;
      const currentLevel = Math.floor(totalPoints / 100) + 1;
      const nextLevelPoints = currentLevel * 100;

      // Update profile with calculated values
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          total_points: totalPoints,
          current_level: currentLevel,
          next_level_points: nextLevelPoints
        })
        .eq('id', session?.user?.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
      }

      return {
        points: totalPoints,
        current_level: currentLevel,
        next_level_points: nextLevelPoints,
        total_points: totalPoints
      };
    },
    enabled: !!session?.user?.id && hasAccess,
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const { data: achievements } = useQuery({
    queryKey: ["user-achievements", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_achievements")
        .select(`
          achievement_id,
          completed_at,
          display_settings,
          achievement:achievements (
            id,
            name,
            description,
            badge_icon,
            icon_color,
            category
          )
        `)
        .eq('user_id', session?.user?.id)
        .order("completed_at", { ascending: false });

      if (error) {
        toast({
          title: "Error loading achievements",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id && hasAccess,
  });

  const levelProgress = profile ? 
    ((profile.points || 0) / (profile.next_level_points || 100)) * 100 : 0;

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Level Progress Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">Level {profile?.current_level || 1}</h3>
            <p className="text-sm text-muted-foreground">
              {profile?.points || 0} / {profile?.next_level_points || 100} points
            </p>
          </div>
          <Trophy className="w-8 h-8 text-primary" />
        </div>
        <Progress value={levelProgress} className="h-2" />
      </Card>

      {/* Total Stats */}
      <Card className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h4 className="font-semibold">Total Points</h4>
            <p className="text-2xl font-bold text-primary">{profile?.total_points || 0}</p>
          </div>
          <div>
            <h4 className="font-semibold">Level</h4>
            <p className="text-2xl font-bold text-primary">{profile?.current_level || 1}</p>
          </div>
          <div>
            <h4 className="font-semibold">Achievements</h4>
            <p className="text-2xl font-bold text-primary">{achievements?.length || 0}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};