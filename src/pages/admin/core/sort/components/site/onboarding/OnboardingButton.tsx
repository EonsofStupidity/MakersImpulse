import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

export const OnboardingButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={() => navigate("/onboarding")}
    >
      <BookOpen className="w-4 h-4" />
      Restart Onboarding
    </Button>
  );
};