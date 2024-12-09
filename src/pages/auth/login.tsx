import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/auth/SessionContext";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();

  console.log("Login page render:", { session, isLoading });

  useEffect(() => {
    const handleAuthChange = (event: string, currentSession: any) => {
      console.log("Auth state changed in login:", event, currentSession?.user?.id);
      
      if (event === 'SIGNED_IN' && currentSession) {
        console.log("User signed in, redirecting to home");
        toast.success("Successfully signed in!");
        navigate("/");
      }
    };

    // Check for existing session
    if (session) {
      console.log("Existing session found, redirecting");
      navigate("/");
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      console.log("Cleaning up auth listener");
      subscription.unsubscribe();
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
      <div className="sticky top-0 z-50 flex items-center p-4 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2 text-white hover:text-[#41f0db]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#41f0db] to-[#ff0abe] text-transparent bg-clip-text">
          Sign In
        </h1>
      </div>

      <div className="flex-1 flex flex-col p-4 items-center justify-center">
        <div className="w-full max-w-md bg-black/60 backdrop-blur-xl p-6 rounded-lg shadow-lg border border-white/10">
          <Auth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              extend: true,
              variables: {
                default: {
                  colors: {
                    brand: '#41f0db',
                    brandAccent: '#ff0abe',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#41f0db',
                    defaultButtonBackgroundHover: '#ff0abe',
                    defaultButtonBorder: 'transparent',
                    defaultButtonText: 'white',
                    inputBackground: 'transparent',
                    inputBorder: '#2D2D2D',
                    inputBorderHover: '#4D4D4D',
                    inputBorderFocus: '#41f0db',
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
            providers={['github', 'google', 'discord']}
            redirectTo={`${window.location.origin}/`}
            magicLink={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;