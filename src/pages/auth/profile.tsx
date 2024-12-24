import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfileView } from '@/components/profile/ProfileView';
import type { AuthUser } from '@/types/auth/types';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<AuthUser>>({
    displayName: user?.displayName || '',
    username: user?.username || '',
    bio: user?.bio || '',
    website: user?.website || '',
    location: user?.location || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          display_name: formData.displayName,
          bio: formData.bio,
          website: formData.website,
          location: formData.location,
        })
        .eq('id', user?.id);

      if (error) throw error;

      setUser({
        ...user!,
        ...formData
      });

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <Card className="max-w-2xl mx-auto bg-black/40 border border-white/10 backdrop-blur-sm p-6">
        <ProfileHeader user={user} isEditing={isEditing} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {isEditing ? (
            <ProfileForm formData={formData} onChange={handleInputChange} />
          ) : (
            <ProfileView user={user} />
          )}

          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-white/10 hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#41f0db]/10 hover:bg-[#41f0db]/20 text-[#41f0db]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-[#41f0db]/10 hover:bg-[#41f0db]/20 text-[#41f0db]"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
