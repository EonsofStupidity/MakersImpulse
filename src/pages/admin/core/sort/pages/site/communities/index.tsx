import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommunityList from "@/components/communities/CommunityList";
import CreateCommunityDialog from "@/components/communities/CreateCommunityDialog";
import { useState } from "react";
import { ProtectedRoute } from "@/features/auth";

const Communities = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Communities</h1>
          <Button onClick={() => setIsOpen(true)}>Create Community</Button>
        </div>
        <Card className="p-6">
          <CommunityList communities={[]} isLoading={false} />
          <CreateCommunityDialog open={isOpen} onOpenChange={setIsOpen} />
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Communities;