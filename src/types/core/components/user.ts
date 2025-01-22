import { UserRole } from '../auth';
import { Profile } from '../auth';

export interface UserTableRowActionsProps {
  onRoleChange: (userId: string, newRole: UserRole) => void;
  user: Profile;
}
