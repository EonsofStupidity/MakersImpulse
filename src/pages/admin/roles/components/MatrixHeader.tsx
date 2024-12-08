import { AlertTriangle } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AdminRoleAssignment } from "../types";

interface MatrixHeaderProps {
  roles: AdminRoleAssignment[];
}

export const MatrixHeader = ({ roles }: MatrixHeaderProps) => {
  const isSuperAdmin = (role: AdminRoleAssignment) => role.role === 'super_admin';

  return (
    <TableHeader>
      <TableRow>
        <TableHead>Feature</TableHead>
        {roles.map((role) => (
          <TableHead key={role.id}>
            <div className="flex items-center gap-2">
              {role.role}
              {isSuperAdmin(role) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Super Admin permissions cannot be modified
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};