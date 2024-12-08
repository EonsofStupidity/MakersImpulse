import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VisualEditor } from "./visual-editor/VisualEditor";

const AdminToolbar = () => {
  const session = useSession();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (!session || isLoading || !profile?.role || profile.role !== "admin") {
    return null;
  }

  return (
    <VisualEditor 
      userId={session.user.id}
      enabled={profile.visual_editor_enabled}
    />
  );
};

export default AdminToolbar;