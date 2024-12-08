import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Profile } from "./types";

interface ProfileFormProps {
  profile: Profile | null;
  formData: Profile | null;
  isEditing: boolean;
  setFormData: (data: Profile) => void;
  handleUpdate: () => void;
}

const ProfileForm = ({ profile, formData, isEditing, setFormData, handleUpdate }: ProfileFormProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="displayName">Display Name</Label>
      <Input
        id="displayName"
        value={formData?.display_name || ""}
        onChange={(e) =>
          setFormData({
            ...formData!,
            display_name: e.target.value
          })
        }
        disabled={!isEditing}
        placeholder="Enter your display name"
      />
    </div>

    <div>
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        value={formData?.bio || ""}
        onChange={(e) =>
          setFormData({
            ...formData!,
            bio: e.target.value
          })
        }
        disabled={!isEditing}
        placeholder="Tell us about yourself"
        className="h-24"
      />
    </div>

    <div>
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        value={formData?.location || ""}
        onChange={(e) =>
          setFormData({
            ...formData!,
            location: e.target.value
          })
        }
        disabled={!isEditing}
        placeholder="Where are you from?"
      />
    </div>

    <div>
      <Label htmlFor="interests">Interests (comma-separated)</Label>
      <Input
        id="interests"
        value={formData?.interests?.join(", ") || ""}
        onChange={(e) => {
          const interests = e.target.value.split(",").map(interest => interest.trim());
          setFormData({
            ...formData!,
            interests
          });
        }}
        disabled={!isEditing}
        placeholder="3D printing, electronics, robotics"
      />
    </div>

    <div>
      <Label htmlFor="signature">Forum Signature</Label>
      <Textarea
        id="signature"
        value={formData?.signature || ""}
        onChange={(e) =>
          setFormData({
            ...formData!,
            signature: e.target.value
          })
        }
        disabled={!isEditing}
        placeholder="Your forum signature"
        className="h-20"
      />
    </div>

    {isEditing && (
      <Button onClick={handleUpdate} className="w-full">
        Save Changes
      </Button>
    )}
  </div>
);

export default ProfileForm;