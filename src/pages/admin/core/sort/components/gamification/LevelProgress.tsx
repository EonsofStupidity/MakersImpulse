import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface LevelProgressProps {
  profile?: {
    current_level?: number;
    points?: number;
    next_level_points?: number;
  };
}

export const LevelProgress = ({ profile }: LevelProgressProps) => {
  const levelProgress = profile ? 
    ((profile.points || 0) / (profile.next_level_points || 100)) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
    </motion.div>
  );
};