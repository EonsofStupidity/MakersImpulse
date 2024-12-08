import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

const Settings = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRestartOnboarding = async () => {
    if (!session?.user?.id) return;

    try {
      // Reset onboarding progress
      await supabase
        .from('profiles')
        .update({ 
          onboarding_completed: false,
          onboarding_last_step: null,
          onboarding_started_at: null
        })
        .eq('id', session.user.id);

      // Clear progress tracking
      await supabase
        .from('user_onboarding_progress')
        .delete()
        .eq('user_id', session.user.id);

      toast({
        title: "Success",
        description: "Onboarding progress has been reset"
      });

      navigate('/onboarding');
    } catch (error) {
      console.error('Error resetting onboarding:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset onboarding progress"
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Onboarding</h2>
          <p className="text-muted-foreground mb-4">
            Need a refresher? You can restart the onboarding process at any time.
          </p>
          <Button 
            onClick={handleRestartOnboarding}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Restart Onboarding
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;