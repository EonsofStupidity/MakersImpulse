import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface WishlistItemCardProps {
  item: {
    id: string;
    component_type: string;
    component_id: string;
    price_at_add: number | null;
    target_price: number | null;
    notify_on_price_drop: boolean;
    notify_on_stock: boolean;
    component: {
      name: string;
      cost_usd: number | null;
      manufacturer: string | null;
    };
  };
  onToggleNotification: (id: string, type: 'price' | 'stock') => void;
  onRemove: (id: string) => void;
}

const WishlistItemCard = ({ item, onToggleNotification, onRemove }: WishlistItemCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{item.component.name}</CardTitle>
            {item.component.manufacturer && (
              <p className="text-sm text-muted-foreground">{item.component.manufacturer}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleNotification(item.id, 'price')}
            >
              {item.notify_on_price_drop ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span>Current Price:</span>
            <Badge variant="secondary">
              {item.component.cost_usd ? formatCurrency(item.component.cost_usd) : 'N/A'}
            </Badge>
          </div>
          {item.target_price && (
            <div className="flex items-center justify-between">
              <span>Target Price:</span>
              <Badge variant="outline">{formatCurrency(item.target_price)}</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistItemCard;