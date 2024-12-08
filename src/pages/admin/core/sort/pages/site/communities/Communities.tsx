import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CommunityList from "@/components/communities/CommunityList";
import CreateCommunityDialog from "@/components/communities/CreateCommunityDialog";
import { useState } from "react";
import { ProtectedRoute } from "@/features/auth";

const Communities = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [communities, setCommunities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ProtectedRoute>
      <Card className="p-4">
        <h1 className="text-2xl font-bold mb-4">Communities</h1>
        <Button onClick={() => setIsOpen(true)}>Create Community</Button>
        <CreateCommunityDialog open={isOpen} onOpenChange={setIsOpen} />
        <CommunityList communities={communities} isLoading={isLoading} />
      </Card>
    </ProtectedRoute>
  );
};

export default Communities;