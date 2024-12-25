import React from 'react';
import { AuthUser } from '@/types';

interface ProfileViewProps {
  user: AuthUser;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{user.displayName || user.email}</h2>
        <p className="text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="space-y-2">
        {user.bio && (
          <p>{user.bio}</p>
        )}
        {user.website && (
          <p>Website: {user.website}</p>
        )}
        {user.location && (
          <p>Location: {user.location}</p>
        )}
      </div>
    </div>
  );
};