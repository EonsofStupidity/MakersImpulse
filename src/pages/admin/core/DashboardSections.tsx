import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ActivityOverview } from "./ActivityOverview";
import SiteMetrics from "./SiteMetrics";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const DashboardSections = () => {
  const { data: lastThreadDate } = useQuery({
    queryKey: ["last-thread"],
    queryFn: async () => {
      const { data } = await supabase
        .from("forum_threads")
        .select("created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data?.created_at || null;
    }
  });

  const { data: lastReplyDate } = useQuery({
    queryKey: ["last-reply"],
    queryFn: async () => {
      const { data } = await supabase
        .from("forum_replies")
        .select("created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data?.created_at || null;
    }
  });

  const { data: lastBuildDate } = useQuery({
    queryKey: ["last-build"],
    queryFn: async () => {
      const { data } = await supabase
        .from("printer_builds")
        .select("created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data?.created_at || null;
    }
  });

  return (
    <>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your platform's content, users, and settings
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ActivityOverview
            lastThreadDate={lastThreadDate}
            lastReplyDate={lastReplyDate}
            lastBuildDate={lastBuildDate}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <SiteMetrics />
          </Card>
        </motion.div>
      </div>
    </>
  );
};