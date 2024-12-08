import { useCallback } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import type { BuildConfig } from "@/types/build";
import type { BuildWizardConfig, BuildWizardStatus } from "@/types/buildWizard";
import type { Json } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

export const useBuildWizardDB = () => {
  const session = useSession();
  const { toast } = useToast();

  const saveToDatabase = useCallback(async (
    buildConfig: BuildConfig,
    currentStep: number,
    status: BuildWizardStatus
  ) => {
    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your build configuration.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const dbData = {
        name: buildConfig.name,
        kinematic_type: buildConfig.kinematic_type,
        build_volume: JSON.parse(JSON.stringify(buildConfig.build_volume)) as Json,
        core_components: JSON.parse(JSON.stringify(buildConfig.core_components)) as Json,
        addons: JSON.parse(JSON.stringify(buildConfig.addons)) as Json,
        estimated_cost: buildConfig.estimated_cost,
        last_step_completed: currentStep,
        status: status,
        user_id: session.user.id,
        metadata: { last_auto_save: new Date().toISOString() } as Json
      };

      const { error } = await supabase
        .from("build_wizard_configs")
        .upsert(dbData);

      if (error) throw error;
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save build configuration. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }, [session?.user, toast]);

  const loadFromDatabase = useCallback(async () => {
    if (!session?.user) return null;

    try {
      const { data, error } = await supabase
        .from("build_wizard_configs")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "draft")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (error) {
        // Only show error toast for actual errors, not for "no rows returned"
        if (!error.message.includes("PGRST116")) {
          toast({
            title: "Error",
            description: "Failed to load saved configuration.",
            variant: "destructive"
          });
        }
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error loading build config:", error);
      return null;
    }
  }, [session?.user, toast]);

  return {
    saveToDatabase,
    loadFromDatabase
  };
};