// components/Profile.tsx
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../lib/AuthProvider";

interface ProfileForm {
  displayName: string;
  email: string; 
}

interface ProfileProps {
  isProfileOpen: boolean;
  onProfileClose: () => void;
}

const Profile = ({ isProfileOpen, onProfileClose }: ProfileProps) => {
  const authContext = useContext(AuthContext);
  const { user, updateUserProfile, loading } = authContext!;
  const { register, handleSubmit, setValue } = useForm<ProfileForm>();

  useEffect(() => {
    if (user) {
      setValue("displayName", user.displayName || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileForm) => {
    await updateUserProfile({
      displayName: data.displayName,
    });

    alert("Profile updated!");
    onProfileClose();
  };

  if (!isProfileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onProfileClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
                type="email"
                defaultValue={user?.email || ""}
                readOnly
                {...register("email")}
                className="border p-2 w-full rounded bg-gray-100  text-black cursor-not-allowed"
            />
          </div>


          <div>
            <label className="block text-sm font-medium">Display Name</label>
            <input
              type="text"
              {...register("displayName")}
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
