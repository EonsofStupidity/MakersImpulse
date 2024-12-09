import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/auth/SessionContext";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();

  useEffect(() => {
    if (session) {
      console.log("Active session found, redirecting to home");
      navigate("/");
      return;
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Auth state changed:", event, currentSession?.user?.id);
      
      if (event === 'SIGNED_IN' && currentSession) {
        toast.success("Successfully signed in!");
        navigate("/");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1114]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1114] flex flex-col">
      <div className="sticky top-0 z-50 flex items-center p-4 bg-black/80 backdrop-blur-lg border-b border-border/40">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#34ebbd] to-[#fa19a7] text-transparent bg-clip-text">
          Sign In
        </h1>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-black/60 backdrop-blur-xl p-6 rounded-lg shadow-lg border border-border/40">
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
                  anchor: 'text-primary hover:text-primary/80 transition-colors',
                },
              }}
              theme="dark"
              providers={[]}
              redirectTo={`${window.location.origin}/`}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;