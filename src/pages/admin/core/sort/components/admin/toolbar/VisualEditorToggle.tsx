import { Switch } from "@/components/ui/switch";
import { ToggleLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

interface VisualEditorToggleProps {
  enabled: boolean;
  userId: string;
  className?: string;
}

export const VisualEditorToggle = ({ enabled, userId, className }: VisualEditorToggleProps) => {
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateVisualEditor = useMutation({
    mutationFn: async (enabled: boolean) => {
      const { error } = await supabase
        .from("profiles")
        .update({ visual_editor_enabled: enabled })
        .eq("id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Visual Editor",
        description: `Visual editor has been ${enabled ? "disabled" : "enabled"}`,
      });
    },
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={enabled ? "expanded" : "collapsed"}
        initial={enabled ? { y: -20, opacity: 0 } : { y: 0, opacity: 0 }}
        animate={enabled ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        exit={enabled ? { y: -20, opacity: 0 } : { y: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${className} transition-all duration-300`}
      >
        <div className={enabled ? "flex flex-col space-y-2 w-full" : "flex items-center space-x-2"}>
          <motion.span 
            className="text-sm font-medium"
            animate={{ color: enabled ? "#00E9FF" : "#6B8AFF" }}
          >
            Visual Editor
          </motion.span>
          <div className="flex items-center space-x-2">
            <ToggleLeft className={`h-4 w-4 ${enabled ? "text-[#00E9FF]" : "text-[#6B8AFF]"}`} />
            <Switch
              checked={enabled}
              onCheckedChange={(checked) => updateVisualEditor.mutate(checked)}
              className={`${enabled ? "bg-[#00E9FF]" : "bg-[#6B8AFF]"}`}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};