import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TwoFactorVerificationProps {
  email: string;
  password: string;
}

export const TwoFactorVerification = ({ email, password }: TwoFactorVerificationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  const generateDeviceHash = async () => {
    const userAgent = window.navigator.userAgent;
    const encoder = new TextEncoder();
    const data = encoder.encode(userAgent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleTrustDevice = async (userId: string) => {
    if (!trustDevice) return;
    
    const deviceHash = await generateDeviceHash();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // Trust device for 30 days

    await supabase
      .from('trusted_devices')
      .insert({
        user_id: userId,
        device_hash: deviceHash,
        device_name: window.navigator.userAgent,
        expires_at: expiresAt.toISOString()
      });
  };

  const handleVerification = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-2fa', {
        body: { email, password, token: code }
      });

      if (error) throw error;

      if (data.session) {
        const { data: { session }, error: sessionError } = await supabase.auth.setSession(data.session);
        if (sessionError) throw sessionError;

        if (session?.user) {
          await handleTrustDevice(session.user.id);
        }

        toast({
          title: "Success",
          description: "Successfully logged in with 2FA.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Invalid verification code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoveryCode = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-2fa', {
        body: { email, password, token: code, isRecoveryCode: true }
      });

      if (error) throw error;

      if (data.session) {
        const { data: { session }, error: sessionError } = await supabase.auth.setSession(data.session);
        if (sessionError) throw sessionError;

        toast({
          title: "Success",
          description: "Successfully logged in with recovery code.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Recovery Failed",
        description: "Invalid recovery code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {showRecovery ? "Enter Recovery Code" : "Two-Factor Verification"}
      </h2>
      <div className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder={showRecovery ? "Enter recovery code" : "Enter verification code"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        
        {!showRecovery && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trust-device"
              checked={trustDevice}
              onCheckedChange={(checked) => setTrustDevice(checked as boolean)}
            />
            <label
              htmlFor="trust-device"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Trust this device for 30 days
            </label>
          </div>
        )}

        <Button 
          className="w-full" 
          onClick={showRecovery ? handleRecoveryCode : handleVerification}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => setShowRecovery(!showRecovery)}
        >
          {showRecovery ? "Back to 2FA Code" : "Lost access to authenticator?"}
        </Button>
      </div>
    </Card>
  );
};
export default TwoFactorVerification;