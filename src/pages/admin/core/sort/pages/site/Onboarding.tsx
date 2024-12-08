import { OnboardingWizardContent } from "@/components/onboarding/OnboardingWizardContent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Onboarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      // Check if onboarding is already completed
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', session.user.id)
        .single();

      if (profile?.onboarding_completed) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return <OnboardingWizardContent />;
};

export default Onboarding;