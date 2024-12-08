import { Card } from "@/components/ui/card";
import { Star, Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface PointsSummaryProps {
  profile?: {
    total_points?: number;
    current_level?: number;
    consecutive_days?: number;
    streak_multiplier?: number;
  };
}

export const PointsSummary = ({ profile }: PointsSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h4 className="font-semibold text-muted-foreground">Total Points</h4>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Star className="w-5 h-5 text-primary" />
              <p className="text-2xl font-bold">{profile?.total_points || 0}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-muted-foreground">Current Level</h4>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Trophy className="w-5 h-5 text-primary" />
              <p className="text-2xl font-bold">{profile?.current_level || 1}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-muted-foreground">Daily Streak</h4>
            <div className="flex items-center justify-center gap-2 mt-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div className="text-center">
                <p className="text-2xl font-bold">{profile?.consecutive_days || 0}</p>
                {profile?.streak_multiplier && profile.streak_multiplier > 1 && (
                  <p className="text-xs text-muted-foreground">
                    {((profile.streak_multiplier - 1) * 100).toFixed(0)}% Bonus
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};