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
      // First get the user ID from the email
      const { data: { users }, error: userError } = await supabase.auth.admin.listUsers({
        filters: {
          email: data.email
        }
      });

      if (userError || !users?.length) {
        setError("email", { message: "Email not found" });
        return;
      }

      const userId = users[0].id;

      // Verify PIN
      const { data: result, error } = await supabase.rpc('verify_pin_login', {
        p_user_id: userId,
        p_pin: data.pin,
        p_ip_address: null, // Could be implemented with IP detection
        p_user_agent: navigator.userAgent
      });

      if (error) throw error;

      const response = result as { success: boolean; message: string; locked_until?: string };

      if (response.success) {
        // Sign in the user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.pin // Use PIN as temporary password for this session
        });

        if (signInError) throw signInError;

        toast.success("Successfully logged in with PIN");
        navigate("/");
      } else {
        if (response.locked_until) {
          const lockoutTime = new Date(response.locked_until);
          toast.error(`Account locked until ${lockoutTime.toLocaleTimeString()}`);
          setError("pin", { 
            message: "Too many failed attempts. Try password login or wait." 
          });
        } else {
          setError("pin", { message: response.message });
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