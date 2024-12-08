import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  threadCount?: number;
  lastActivity?: string;
}

const CategoryCard = ({
  id,
  name,
  description,
  icon,
  color,
  threadCount = 0,
  lastActivity,
}: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-6 hover:bg-accent transition-colors cursor-pointer group"
      onClick={() => navigate(`/forum/category/${id}`)}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
          style={{ backgroundColor: color || "#3b82f6" }}
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-1 truncate">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span>{threadCount} threads</span>
            {lastActivity && (
              <>
                <span>•</span>
                <span>Last activity: {lastActivity}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;