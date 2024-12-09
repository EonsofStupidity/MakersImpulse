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
    <div className="min-h-screen bg-gradient-to-br from-[#0F1114] to-[#1A1F2C] flex flex-col">
      <div className="sticky top-0 z-50 flex items-center p-4 bg-black/40 backdrop-blur-xl border-b border-[#41f0db]/20">
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
        <div className="w-full max-w-md bg-black/30 backdrop-blur-2xl p-8 rounded-xl shadow-xl border border-[#41f0db]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#41f0db]/5 to-transparent pointer-events-none" />
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
                    defaultButtonBackground: 'rgba(65, 240, 219, 0.1)',
                    defaultButtonBackgroundHover: 'rgba(65, 240, 219, 0.2)',
                    defaultButtonBorder: '#41f0db',
                    defaultButtonText: '#41f0db',
                    inputBackground: 'rgba(0, 0, 0, 0.3)',
                    inputBorder: 'rgba(65, 240, 219, 0.2)',
                    inputBorderHover: 'rgba(65, 240, 219, 0.4)',
                    inputBorderFocus: '#41f0db',
                    inputText: 'white',
                    inputPlaceholder: 'rgba(255, 255, 255, 0.4)',
                  },
                },
              },
              className: {
                container: 'space-y-4',
                button: 'w-full h-12 rounded-lg transition-all duration-300 backdrop-blur-sm border border-[#41f0db]/20 hover:border-[#41f0db]/40 hover:bg-[#41f0db]/10',
                label: 'text-sm font-medium text-[#41f0db]',
                input: 'h-12 w-full bg-black/20 backdrop-blur-sm border border-[#41f0db]/20 hover:border-[#41f0db]/40 focus:border-[#41f0db] text-white rounded-lg px-4',
                message: 'text-red-400 text-sm',
                anchor: 'text-[#41f0db] hover:text-[#ff0abe] transition-colors',
                divider: 'bg-[#41f0db]/20',
              },
            }}
            theme="dark"
            providers={['github', 'google', 'discord']}
            redirectTo={`${window.location.origin}/`}
            magicLink={true}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  email_input_placeholder: 'Enter your email',
                  password_input_placeholder: 'Enter your password',
                  button_label: 'Sign in',
                  loading_button_label: 'Signing in ...',
                  social_provider_text: 'Sign in with {{provider}}',
                  link_text: 'Already have an account? Sign in',
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;