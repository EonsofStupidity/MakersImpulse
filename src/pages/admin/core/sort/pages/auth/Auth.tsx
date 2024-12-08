import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const AuthPage = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-[#0F1114] flex flex-col">
      <div className="flex-1 flex flex-col p-4 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-xl p-6 rounded-lg shadow-lg border border-border/40"
        >
          <h2 className="text-[#fa19a7] text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to access all features
          </p>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              extend: true,
              variables: {
                default: {
                  colors: {
                    brand: '#34ebbd',
                    brandAccent: '#fa19a7',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#34ebbd',
                    defaultButtonBackgroundHover: '#fa19a7',
                    defaultButtonBorder: 'transparent',
                    defaultButtonText: 'white',
                    dividerBackground: '#2D2D2D',
                    inputBackground: 'transparent',
                    inputBorder: '#2D2D2D',
                    inputBorderHover: '#4D4D4D',
                    inputBorderFocus: '#34ebbd',
                    inputText: 'white',
                    inputLabelText: '#666',
                    inputPlaceholder: '#444',
                  },
                },
              },
              className: {
                container: 'space-y-4',
                button: 'w-full h-12 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium',
                label: 'text-sm font-medium text-gray-400',
                input: 'h-12 bg-black/40 border-border/40 text-white rounded-lg px-4',
                message: 'text-red-500 text-sm',
                divider: 'bg-border/40',
                anchor: 'text-primary hover:text-primary/80 transition-colors',
              },
            }}
            theme="dark"
            providers={['github', 'google', 'discord']}
            redirectTo={`${window.location.origin}/`}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;