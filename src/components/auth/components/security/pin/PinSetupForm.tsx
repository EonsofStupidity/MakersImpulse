import React, { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PinDisplay } from "../../pin/PinDisplay";
import type { PinSetupResponse } from "../../../types/pin-auth";

const NumberPad = ({ onDigitPress, disabled }: { onDigitPress: (digit: string) => void; disabled?: boolean }) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div className="grid grid-cols-3 gap-4">
      {digits.map((digit, index) => (
        <Button
          key={index}
          variant={digit === 'del' ? "destructive" : "outline"}
          className={`h-16 text-2xl font-bold ${!digit && 'invisible'}`}
          onClick={() => digit && onDigitPress(digit)}
          disabled={disabled}
        >
          {digit === 'del' ? '⌫' : digit}
        </Button>
      ))}
    </div>
  );
};

export const PinSetupForm = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [stage, setStage] = useState<"enter" | "confirm">("enter");
  const [isLoading, setIsLoading] = useState(false);

  const handleDigitPress = (digit: string) => {
    if (digit === 'del') {
      if (stage === "enter") {
        setPin(prev => prev.slice(0, -1));
      } else {
        setConfirmPin(prev => prev.slice(0, -1));
      }
      return;
    }

    if (stage === "enter" && pin.length < 4) {
      setPin(prev => {
        const newPin = prev + digit;
        if (newPin.length === 4) {
          setTimeout(() => setStage("confirm"), 500);
        }
        return newPin;
      });
    } else if (stage === "confirm" && confirmPin.length < 4) {
      setConfirmPin(prev => {
        const newConfirmPin = prev + digit;
        if (newConfirmPin.length === 4) {
          handlePinConfirmation(pin, newConfirmPin);
        }
        return newConfirmPin;
      });
    }
  };

  const handlePinConfirmation = async (originalPin: string, confirmedPin: string) => {
    if (originalPin !== confirmedPin) {
      toast.error("PINs don't match! Please try again.");
      setPin("");
      setConfirmPin("");
      setStage("enter");
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.rpc<PinSetupResponse>('setup_pin', {
        p_user_id: user?.id,
        p_pin: originalPin,
        p_ip_address: null,
        p_user_agent: navigator.userAgent
      });

      if (error) throw error;

      if (data?.success) {
        toast.success("PIN setup successfully! You can now use PIN login.");
      } else {
        toast.error(data?.message || "Failed to set up PIN");
      }
    } catch (error) {
      console.error("PIN setup error:", error);
      toast.error("Failed to set up PIN");
    } finally {
      setIsLoading(false);
      setPin("");
      setConfirmPin("");
      setStage("enter");
    }
  };

  return (
    <div className="space-y-6">
      <PinDisplay currentPin={stage === "enter" ? pin : confirmPin} />
      <NumberPad 
        onDigitPress={handleDigitPress}
        disabled={isLoading}
      />
    </div>
  );
};