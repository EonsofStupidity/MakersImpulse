import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const pinSchema = z.object({
  pin: z
    .string()
    .length(4, "PIN must be exactly 4 digits")
    .regex(/^\d+$/, "PIN must contain only numbers"),
  confirmPin: z.string(),
}).refine((data) => data.pin === data.confirmPin, {
  message: "PINs don't match",
  path: ["confirmPin"],
});

type PinFormData = z.infer<typeof pinSchema>;

export const PinSetup = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
  });

  const onSubmit = async (data: PinFormData) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.rpc('setup_pin', {
        p_user_id: user.id,
        p_pin: data.pin,
        p_ip_address: null, // Could be implemented with an IP detection service
        p_user_agent: navigator.userAgent
      });

      if (error) throw error;

      if (result.success) {
        toast.success("PIN setup successfully");
        reset();
      } else {
        toast.error(result.message || "Failed to set up PIN");
      }
    } catch (error) {
      console.error('PIN setup error:', error);
      toast.error("Failed to set up PIN");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>PIN Setup</CardTitle>
        <CardDescription>
          Set up a 4-digit PIN for quick login. You'll still need to use your password occasionally for security.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pin">PIN (4 digits)</Label>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter PIN"
              {...register("pin")}
              className="w-full"
            />
            {errors.pin && (
              <p className="text-sm text-red-500">{errors.pin.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPin">Confirm PIN</Label>
            <Input
              id="confirmPin"
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Confirm PIN"
              {...register("confirmPin")}
              className="w-full"
            />
            {errors.confirmPin && (
              <p className="text-sm text-red-500">{errors.confirmPin.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up PIN...
              </>
            ) : (
              "Set PIN"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};