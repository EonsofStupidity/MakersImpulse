import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CommunityCard from "./CommunityCard";

interface Community {
  id: string;
  name: string;
  description: string | null;
  category: string;
  is_private: boolean;
  member_count: number;
  creator: { username: string | null } | null;
}

interface CommunityListProps {
  communities: Community[] | null;
  isLoading: boolean;
}

const CommunityList = ({ communities, isLoading }: CommunityListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-2/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    );
  }

  if (!communities?.length) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No communities found
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {communities.map((community) => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </div>
  );
};

export default CommunityList;