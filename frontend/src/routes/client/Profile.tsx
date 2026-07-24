import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiShield,
  FiLock,
  FiSave,
  FiCheckCircle,
  FiXCircle,
  FiCalendar
} from "react-icons/fi";

import toast from "react-hot-toast";

import { apiClient } from "../../api/client";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  company: string | null;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export const Profile = () => {

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    role: "",
    emailVerified: false,
    createdAt: "",
    updatedAt: ""
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response = await apiClient.get("/auth/me");

      setProfile(response.data.user);

    } catch (error) {

      toast.error("Failed to load profile.");

    } finally {

      setLoading(false);

    }

  };

    const handleProfileUpdate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setSaving(true);

    try {

      await apiClient.put("/auth/update", {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        company: profile.company
      });

      toast.success("Profile updated successfully.");

      fetchProfile();

    }

    catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update profile."
      );

    }

    finally {

      setSaving(false);

    }

  };



  const handlePasswordChange = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {

      toast.error("Passwords do not match.");

      return;

    }

    if (
      passwords.newPassword.length < 6
    ) {

      toast.error(
        "Password must be at least 6 characters."
      );

      return;

    }

    setChangingPassword(true);

    try {

      await apiClient.put(
        "/auth/change-password",
        {
          currentPassword:
            passwords.currentPassword,

          newPassword:
            passwords.newPassword
        }
      );

      toast.success(
        "Password changed successfully."
      );

      setPasswords({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

      });

    }

    catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Failed to change password."
      );

    }

    finally {

      setChangingPassword(false);

    }

  };



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

          <p className="mt-4 text-gray-400">

            Loading profile...

          </p>

        </div>

      </div>

    );

  }

  return (
  <div className="max-w-7xl mx-auto p-6">

    <div className="mb-8">

      <h1 className="text-3xl font-bold text-white">
        My Profile
      </h1>

      <p className="text-gray-400 mt-2">
        Manage your account information and security.
      </p>

    </div>

    <div className="grid lg:grid-cols-3 gap-6">

      {/* LEFT COLUMN */}

      <div className="space-y-6">

        <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold text-white">

              {profile.firstName.charAt(0).toUpperCase()}

            </div>

            <h2 className="text-2xl font-bold text-white mt-5">

              {profile.firstName} {profile.lastName}

            </h2>

            <p className="text-gray-400">

              {profile.email}

            </p>

            <span
              className={`mt-4 px-4 py-2 rounded-full text-sm font-medium ${
                profile.emailVerified
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >

              {profile.emailVerified
                ? "Verified"
                : "Not Verified"}

            </span>

          </div>

        </div>

        <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">

          <h3 className="text-xl font-semibold text-white mb-5">

            Account Information

          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <FiShield className="text-blue-400"/>

              <div>

                <p className="text-gray-400 text-sm">
                  Role
                </p>

                <p className="text-white capitalize">
                  {profile.role}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <FiCalendar className="text-blue-400"/>

              <div>

                <p className="text-gray-400 text-sm">
                  Member Since
                </p>

                <p className="text-white">

                  {new Date(profile.createdAt)
                    .toLocaleDateString()}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              {profile.emailVerified
                ? <FiCheckCircle className="text-green-400"/>
                : <FiXCircle className="text-red-400"/>}

              <div>

                <p className="text-gray-400 text-sm">
                  Email Status
                </p>

                <p className="text-white">

                  {profile.emailVerified
                    ? "Verified"
                    : "Pending Verification"}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT COLUMN */}

      <div className="lg:col-span-2 space-y-6">

        <form
          onSubmit={handleProfileUpdate}
          className="bg-[#111827] rounded-xl border border-gray-800 p-6"
        >

          <h2 className="text-2xl font-semibold text-white mb-6">

            Personal Information

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm text-gray-400 mb-2">

                First Name

              </label>

              <div className="relative">

                <FiUser className="absolute left-3 top-3.5 text-gray-500"/>

                <input
                  className="w-full bg-[#1f2937] rounded-lg border border-gray-700 py-3 pl-10 pr-4 text-white"
                  value={profile.firstName}
                  onChange={(e)=>
                    setProfile({
                      ...profile,
                      firstName:e.target.value
                    })
                  }
                />

              </div>

            </div>

            <div>

              <label className="block text-sm text-gray-400 mb-2">

                Last Name

              </label>

              <div className="relative">

                <FiUser className="absolute left-3 top-3.5 text-gray-500"/>

                <input
                  className="w-full bg-[#1f2937] rounded-lg border border-gray-700 py-3 pl-10 pr-4 text-white"
                  value={profile.lastName}
                  onChange={(e)=>
                    setProfile({
                      ...profile,
                      lastName:e.target.value
                    })
                  }
                />

              </div>

            </div>

            <div>

              <label className="block text-sm text-gray-400 mb-2">

                Email

              </label>

              <div className="relative">

                <FiMail className="absolute left-3 top-3.5 text-gray-500"/>

                <input
                  disabled
                  className="w-full bg-gray-900 rounded-lg border border-gray-700 py-3 pl-10 pr-4 text-gray-500"
                  value={profile.email}
                />

              </div>

            </div>

            <div>

              <label className="block text-sm text-gray-400 mb-2">

                Phone

              </label>

              <div className="relative">

                <FiPhone className="absolute left-3 top-3.5 text-gray-500"/>

                <input
                  className="w-full bg-[#1f2937] rounded-lg border border-gray-700 py-3 pl-10 pr-4 text-white"
                  value={profile.phone || ""}
                  onChange={(e)=>
                    setProfile({
                      ...profile,
                      phone:e.target.value
                    })
                  }
                />

              </div>

            </div>

            <div className="md:col-span-2">

              <label className="block text-sm text-gray-400 mb-2">

                Company

              </label>

              <div className="relative">

                <FiBriefcase className="absolute left-3 top-3.5 text-gray-500"/>

                <input
                  className="w-full bg-[#1f2937] rounded-lg border border-gray-700 py-3 pl-10 pr-4 text-white"
                  value={profile.company || ""}
                  onChange={(e)=>
                    setProfile({
                      ...profile,
                      company:e.target.value
                    })
                  }
                />

              </div>

            </div>

          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-8 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white flex items-center gap-2"
          >

            <FiSave/>

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </form>

              <form
        onSubmit={handlePasswordChange}
        className="bg-[#111827] rounded-xl border border-gray-800 p-6"
      >

        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">

          <FiLock />

          Change Password

        </h2>

        <div className="space-y-5">

          <div>

            <label className="block text-sm text-gray-400 mb-2">

              Current Password

            </label>

            <input
              type="password"
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg py-3 px-4 text-white"
              value={passwords.currentPassword}
              onChange={(e)=>
                setPasswords({
                  ...passwords,
                  currentPassword:e.target.value
                })
              }
            />

          </div>

          <div>

            <label className="block text-sm text-gray-400 mb-2">

              New Password

            </label>

            <input
              type="password"
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg py-3 px-4 text-white"
              value={passwords.newPassword}
              onChange={(e)=>
                setPasswords({
                  ...passwords,
                  newPassword:e.target.value
                })
              }
            />

          </div>

          <div>

            <label className="block text-sm text-gray-400 mb-2">

              Confirm Password

            </label>

            <input
              type="password"
              className="w-full bg-[#1f2937] border border-gray-700 rounded-lg py-3 px-4 text-white"
              value={passwords.confirmPassword}
              onChange={(e)=>
                setPasswords({
                  ...passwords,
                  confirmPassword:e.target.value
                })
              }
            />

          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg text-white flex items-center gap-2"
          >

            <FiLock />

            {changingPassword
              ? "Changing Password..."
              : "Change Password"}

          </button>

        </div>

      </form>

      <div className="bg-[#111827] rounded-xl border border-gray-800 p-6">

        <h2 className="text-xl font-semibold text-white mb-4">

          Account Security

        </h2>

        <div className="space-y-3 text-gray-300">

          <div className="flex justify-between">

            <span>Email Verification</span>

            <span className={profile.emailVerified ? "text-green-400" : "text-red-400"}>

              {profile.emailVerified ? "Verified" : "Not Verified"}

            </span>

          </div>

          <div className="flex justify-between">

            <span>Role</span>

            <span className="capitalize">

              {profile.role}

            </span>

          </div>

          <div className="flex justify-between">

            <span>Account Created</span>

            <span>

              {new Date(profile.createdAt).toLocaleString()}

            </span>

          </div>

          <div className="flex justify-between">

            <span>Last Updated</span>

            <span>

              {new Date(profile.updatedAt).toLocaleString()}

            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

);
};