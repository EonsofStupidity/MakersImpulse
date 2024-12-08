import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { Profile } from "./types";

interface ProfileHeaderProps {
  profile: Profile | null;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => (
  <div className="flex items-center space-x-4">
    <Avatar className="h-20 w-20">
      <AvatarImage src={profile?.avatar_url || undefined} />
      <AvatarFallback>
        <UserRound className="h-10 w-10" />
      </AvatarFallback>
    </Avatar>
    <div>
      <h3 className="text-lg font-medium">{profile?.username}</h3>
      <p className="text-sm text-muted-foreground">Member</p>
    </div>
  </div>
);

export default ProfileHeader;