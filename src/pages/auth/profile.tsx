import React from 'react';
import { Card } from "@/components/ui/card";
import { useAuthStore } from '@/lib/store/auth-store';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto p-8">
      <Card className="p-6 bg-gray-800/50 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <p className="text-white">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Role</label>
            <p className="text-white capitalize">{user?.role}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;