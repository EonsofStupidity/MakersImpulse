import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PinDisplay } from "./PinDisplay";
import type { PinVerificationResponse } from "../../types/pin-auth";

interface PinLoginFormProps {
  email: string;
  onSwitchToPassword: () => void;
}

export const PinLoginForm = ({ email, onSwitchToPassword }: PinLoginFormProps) => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const handlePinSubmit = async (pin: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.rpc<PinVerificationResponse, { 
        p_user_id: string | undefined;
        p_pin: string;
        p_ip_address: string | null;
        p_user_agent: string;
      }>('verify_pin_login', {
        p_user_id: user?.id,
        p_pin: pin,
        p_ip_address: null,
        p_user_agent: navigator.userAgent,
      });

      if (error) throw error;

      if (data?.success) {
        toast.success("PIN verified successfully!");
        navigate("/");
      } else {
        if (data?.locked_until) {
          toast.error(`Account locked until ${new Date(data.locked_until).toLocaleTimeString()}`);
        } else {
          toast.error(data?.message || "Invalid PIN");
        }
      }
    } catch (error) {
      console.error("PIN verification error:", error);
      toast.error("Failed to verify PIN");
    }
  };

  return (
    <div className="space-y-4">
      <PinDisplay currentPin={pin} />
      <Input
        type="email"
        value={email}
        disabled
        className="text-center bg-muted"
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={onSwitchToPassword}
        >
          Use Password Instead
        </Button>
      </div>
    </div>
  );
};