import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { AchievementCard } from "./AchievementCard";
import { LevelProgress } from "./LevelProgress";
import { PointsSummary } from "./PointsSummary";

export const GamificationUI = () => {
  const session = useSession();

  const { data: userProfile } = useQuery({
    queryKey: ["profile-gamification"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("points, current_level, next_level_points, total_points")
        .eq('id', session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="space-y-6">
      <LevelProgress profile={userProfile} />
      <PointsSummary profile={userProfile} />
      <AchievementCard />
    </div>
  );
};