import React, { useState } from "react";
import { MoreHorizontal, UserCog, Ban, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BanUserDialog } from "./BanUserDialog";
import { PasswordResetDialog } from "../settings/components/PasswordResetDialog";

interface UserTableRowActionsProps {
  user: {
    id: string;
    email?: string;
    is_banned?: boolean;
    username?: string;
  };
  onBanStatusChange: () => void;
}

export const UserTableRowActions = ({ user, onBanStatusChange }: UserTableRowActionsProps) => {
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-zinc-950 text-zinc-50 border-zinc-800">
          <DropdownMenuItem
            className="cursor-pointer hover:bg-zinc-800/50"
            onClick={() => setShowResetDialog(true)}
          >
            <KeyRound className="mr-2 h-4 w-4" />
            Reset Password
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-zinc-800/50"
            onClick={() => setShowBanDialog(true)}
          >
            <Ban className="mr-2 h-4 w-4" />
            {user.is_banned ? 'Unban User' : 'Ban User'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {user.email && (
        <PasswordResetDialog
          open={showResetDialog}
          onOpenChange={setShowResetDialog}
          userEmail={user.email}
        />
      )}

      <BanUserDialog
        isOpen={showBanDialog}
        onClose={() => setShowBanDialog(false)}
        onConfirm={(reason) => {
          // Handle ban confirmation
          onBanStatusChange();
        }}
        username={user.username || 'Unknown User'}
      />
    </>
  );
};