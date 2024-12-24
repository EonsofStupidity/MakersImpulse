import React from 'react';
import { UserAvatar } from "@/components/shared/ui/avatar/UserAvatar";
import { Mail } from "lucide-react";
import { AuthUser } from '@/types/auth/types';

interface ProfileHeaderProps {
  user: AuthUser;
  isEditing: boolean;
}

export const ProfileHeader = ({ user, isEditing }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <UserAvatar size="lg" className="w-24 h-24 mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">
        {isEditing ? 'Edit Profile' : (user.displayName || 'Your Profile')}
      </h1>
      {!isEditing && user.email && (
        <div className="text-white/60 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {user.email}
        </div>
      )}
    </div>
  );
};