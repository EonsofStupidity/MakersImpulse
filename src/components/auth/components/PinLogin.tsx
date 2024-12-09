import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { PinLoginResponse } from "@/integrations/supabase/types/auth";

const pinLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  pin: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d+$/, "PIN must contain only numbers"),
});

type PinLoginFormData = z.infer<typeof pinLoginSchema>;

interface PinLoginProps {
  onSwitchToPassword: () => void;
}

export const PinLogin = ({ onSwitchToPassword }: PinLoginProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PinLoginFormData>({
    resolver: zodResolver(pinLoginSchema),
  });

  const onSubmit = async (data: PinLoginFormData) => {
    setIsLoading(true);
    try {
      // First get the user profile from the profiles table
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', data.email)
        .single();

      if (profileError || !profiles?.id) {
        setError("email", { message: "Email not found" });
        return;
      }

      const userId = profiles.id;

      // Verify PIN
      const { data: result, error } = await supabase.rpc('verify_pin_login', {
        p_user_id: userId,
        p_pin: data.pin,
        p_ip_address: null, // Could be implemented with IP detection
        p_user_agent: navigator.userAgent
      }) as { data: PinLoginResponse | null, error: Error | null };

      if (error) throw error;

      if (result?.success) {
        // Sign in the user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.pin // Use PIN as temporary password for this session
        });

        if (signInError) throw signInError;

        toast.success("Successfully logged in with PIN");
        navigate("/");
      } else {
        if (result?.locked_until) {
          const lockoutTime = new Date(result.locked_until);
          toast.error(`Account locked until ${lockoutTime.toLocaleTimeString()}`);
          setError("pin", { 
            message: "Too many failed attempts. Try password login or wait." 
          });
        } else {
          setError("pin", { message: result?.message || "Invalid PIN" });
        }
      }
    } catch (error) {
      console.error('PIN login error:', error);
      toast.error("Failed to log in with PIN");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          PIN Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and PIN to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pin">PIN</Label>
          <Input
            id="pin"
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="Enter your PIN"
            {...register("pin")}
          />
          {errors.pin && (
            <p className="text-sm text-red-500">{errors.pin.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Login with PIN
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={onSwitchToPassword}
        >
          Use Password Instead
        </Button>
      </form>
    </div>
  );
};