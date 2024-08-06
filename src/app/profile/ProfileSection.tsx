import { updateProfile } from "../actions/profile";
import { ProfileForm } from "./ProfileForm";

export const ProfileSection = () => {
  return (
    <div className="w-full">
      <h1>Profile Settings</h1>

      <ProfileForm editProfile={updateProfile} />
    </div>
  );
};
