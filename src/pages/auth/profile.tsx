import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuthStore } from '@/lib/store/auth-store';
import { supabase } from "@/integrations/supabase/client";
import { UserAvatar } from "@/components/shared/ui/avatar/UserAvatar";
import { Loader2, MapPin, Globe, Mail, User, Calendar } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    display_name: user?.display_name || '',
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
        .update(formData)
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
        <div className="flex flex-col items-center mb-8">
          <UserAvatar size="lg" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            {isEditing ? 'Edit Profile' : (formData.display_name || 'Your Profile')}
          </h1>
          {!isEditing && (
            <div className="text-white/60 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleInputChange}
                    className="bg-black/20 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-black/20 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-black/20 border-white/10 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="bg-black/20 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="bg-black/20 border-white/10"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {formData.username && (
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="w-4 h-4" />
                    @{formData.username}
                  </div>
                )}
                
                {formData.bio && (
                  <div className="text-white/80 border-t border-white/10 pt-4">
                    {formData.bio}
                  </div>
                )}

                {(formData.website || formData.location) && (
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    {formData.website && (
                      <div className="flex items-center gap-2 text-white/80">
                        <Globe className="w-4 h-4" />
                        <a href={formData.website} target="_blank" rel="noopener noreferrer" 
                           className="hover:text-[#41f0db] transition-colors">
                          {formData.website}
                        </a>
                      </div>
                    )}
                    {formData.location && (
                      <div className="flex items-center gap-2 text-white/80">
                        <MapPin className="w-4 h-4" />
                        {formData.location}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 text-white/60 border-t border-white/10 pt-4">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(user.created_at || Date.now()).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>

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