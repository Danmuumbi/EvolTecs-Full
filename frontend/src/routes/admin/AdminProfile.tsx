import { useEffect, useState } from 'react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiLock,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { apiClient } from '../../api/client';
import { useAuth } from '../../context/AuthContext/useAuth';

export const AdminProfile = () => {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhone(user.phone || '');
      setCompany(user.company || '');
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setProfileMessage('');
    setProfileError('');
    setIsSavingProfile(true);

    try {
      const response = await apiClient.put('/admin/users/profile', {
        firstName,
        lastName,
        phone,
        company,
      });

      setProfileMessage(
        response.data.message || 'Profile updated successfully'
      );
    } catch (error: any) {
      setProfileError(
        error.response?.data?.message ||
          'Failed to update profile'
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordMessage('');
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        'New password must be at least 8 characters long'
      );
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await apiClient.put(
        '/admin/users/profile/password',
        {
          currentPassword,
          newPassword,
        }
      );

      setPasswordMessage(
        response.data.message ||
          'Password changed successfully'
      );

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setPasswordError(
        error.response?.data?.message ||
          'Failed to change password'
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your administrator profile and account security.
        </p>
      </div>

      {/* Profile Information */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <FiUser className="w-6 h-6 text-primary-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Profile Information
            </h2>

            <p className="text-sm text-gray-400">
              Update your personal information.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleProfileUpdate}
          className="space-y-6"
        >

          {/* First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary-500"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Email address cannot be changed.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Phone Number
            </label>

            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter phone number"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Company
            </label>

            <div className="relative">
              <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="Enter company name"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Success Message */}
          {profileMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-green-400">
              <FiCheckCircle />
              {profileMessage}
            </div>
          )}

          {/* Error Message */}
          {profileError && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400">
              <FiAlertCircle />
              {profileError}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSavingProfile}
            className="btn-primary flex items-center gap-2"
          >
            <FiSave />

            {isSavingProfile
              ? 'Saving...'
              : 'Save Profile'}
          </button>

        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
            <FiLock className="w-6 h-6 text-accent-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Change Password
            </h2>

            <p className="text-sm text-gray-400">
              Keep your administrator account secure.
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePasswordChange}
          className="space-y-6"
        >

          {/* Current Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-500"
            />
          </div>

          {/* Success Message */}
          {passwordMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-green-400">
              <FiCheckCircle />
              {passwordMessage}
            </div>
          )}

          {/* Error Message */}
          {passwordError && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400">
              <FiAlertCircle />
              {passwordError}
            </div>
          )}

          {/* Change Password Button */}
          <button
            type="submit"
            disabled={isChangingPassword}
            className="btn-primary flex items-center gap-2"
          >
            <FiLock />

            {isChangingPassword
              ? 'Changing Password...'
              : 'Change Password'}
          </button>

        </form>
      </div>

    </div>
  );
};