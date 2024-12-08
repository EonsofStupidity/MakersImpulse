import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";

interface WishlistCardProps {
  wishlist: {
    id: string;
    name: string;
    description: string | null;
    is_public: boolean;
    created_at: string;
    updated_at: string;
  };
  onSelect: (id: string) => void;
}

const WishlistCard = ({ wishlist, onSelect }: WishlistCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => onSelect(wishlist.id)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{wishlist.name}</CardTitle>
          <Badge variant={wishlist.is_public ? "default" : "secondary"}>
            {wishlist.is_public ? "Public" : "Private"}
          </Badge>
        </div>
        <CardDescription>
          Last updated {formatDistance(new Date(wishlist.updated_at), new Date(), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {wishlist.description && <p className="text-muted-foreground">{wishlist.description}</p>}
      </CardContent>
    </Card>
  );
};

export default WishlistCard;