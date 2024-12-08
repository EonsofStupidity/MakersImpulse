import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MessageSquare, Users, Box, Activity } from "lucide-react";

interface ActivityOverviewProps {
  lastThreadDate: string | null;
  lastReplyDate: string | null; 
  lastBuildDate: string | null;
}

export const ActivityOverview = ({ lastThreadDate, lastReplyDate, lastBuildDate }: ActivityOverviewProps) => {
  const stats = [
    {
      title: "Last Forum Thread",
      value: lastThreadDate ? new Date(lastThreadDate).toLocaleDateString() : "No threads yet",
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Last Forum Reply",
      value: lastReplyDate ? new Date(lastReplyDate).toLocaleDateString() : "No replies yet",
      icon: Users,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Last Printer Build",
      value: lastBuildDate ? new Date(lastBuildDate).toLocaleDateString() : "No builds yet",
      icon: Box,
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Platform Status",
      value: "Active",
      icon: Activity,
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 backdrop-blur-sm bg-card/50 hover:bg-card/60 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">Last 24h</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <p className="text-2xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    {stat.value}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};