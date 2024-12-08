import { Badge } from "@/components/ui/badge";

interface UserStatusBadgeProps {
  status: string;
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const variant = status === 'active' ? 'default' : 
                 status === 'suspended' ? 'secondary' : 
                 'destructive';
                 
  return (
    <Badge variant={variant}>
      {status}
    </Badge>
  );
};

export default UserStatusBadge;