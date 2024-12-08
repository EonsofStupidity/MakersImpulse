import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileForm from "./profile/ProfileForm";
import { useProfile } from "./profile/useProfile";

const UserProfile = () => {
  const {
    profile,
    formData,
    isLoading,
    isEditing,
    setFormData,
    setIsEditing,
    handleUpdate,
  } = useProfile();

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <div className="p-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <ProfileHeader profile={profile} />
          <Button
            variant="outline"
            onClick={() => {
              if (isEditing) {
                handleUpdate();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <ProfileForm
          profile={profile}
          formData={formData}
          isEditing={isEditing}
          setFormData={setFormData}
          handleUpdate={handleUpdate}
        />
      </div>
    </Card>
  );
};

export default UserProfile;