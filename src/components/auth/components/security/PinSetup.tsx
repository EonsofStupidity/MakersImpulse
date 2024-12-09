import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the type for the RPC response
type RPCResponse = {
  success: boolean;
  message?: string;
};

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

export const PinSetup = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [stage, setStage] = useState<"enter" | "confirm">("enter");

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPin("");
        setConfirmPin("");
        setStage("enter");
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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
      const { data, error } = await supabase.rpc<RPCResponse>('setup_pin', {
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

  const renderPinDisplay = (currentPin: string) => (
    <div className="flex justify-center gap-4 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: currentPin[i] ? 1 : 0.8,
            opacity: currentPin[i] ? 1 : 0.3
          }}
          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          {currentPin[i] && "*"}
        </motion.div>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#41f0db] via-[#ff0abe] to-[#8000ff] text-transparent bg-clip-text animate-gradient">
            MakersImpulse
          </h1>
          <h2 className="text-xl font-semibold text-primary">
            ULTRASECURE LOCKNKEY
          </h2>
          <CardDescription>
            {stage === "enter" ? "Enter your new 4-digit PIN" : "Confirm your PIN"}
          </CardDescription>
        </motion.div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {renderPinDisplay(stage === "enter" ? pin : confirmPin)}
            
            <NumberPad 
              onDigitPress={handleDigitPress}
              disabled={isLoading}
            />

            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
