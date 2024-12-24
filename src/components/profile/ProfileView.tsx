import React from 'react';
import { User, Globe, MapPin, Calendar } from "lucide-react";
import { AuthUser } from '@/types/auth/types';

interface ProfileViewProps {
  user: AuthUser;
}

export const ProfileView = ({ user }: ProfileViewProps) => {
  return (
    <div className="space-y-6">
      {user.username && (
        <div className="flex items-center gap-2 text-white/80">
          <User className="w-4 h-4" />
          @{user.username}
        </div>
      )}
      
      {user.bio && (
        <div className="text-white/80 border-t border-white/10 pt-4">
          {user.bio}
        </div>
      )}

      {(user.website || user.location) && (
        <div className="border-t border-white/10 pt-4 space-y-2">
          {user.website && (
            <div className="flex items-center gap-2 text-white/80">
              <Globe className="w-4 h-4" />
              <a href={user.website} target="_blank" rel="noopener noreferrer" 
                 className="hover:text-[#41f0db] transition-colors">
                {user.website}
              </a>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              {user.location}
            </div>
          )}
        </div>
      )}

      {user.created_at && (
        <div className="flex items-center gap-2 text-white/60 border-t border-white/10 pt-4">
          <Calendar className="w-4 h-4" />
          Joined {new Date(user.created_at).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};