import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateBuildButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate("/maker-space/builds/new")}
      className="flex items-center gap-2"
    >
      <PlusCircle className="w-4 h-4" />
      Create New Build
    </Button>
  );
};