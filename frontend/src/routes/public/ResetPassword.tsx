import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { apiClient } from '../../api/client';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      await apiClient.post('/auth/reset-password', {
        token,
        password
      });

      toast.success('Password reset successfully.');

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        'Failed to reset password.'
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">

      <div className="glass-effect rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Enter your new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 text-sm">
              New Password
            </label>

            <div className="relative">

              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>

              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff/> : <FiEye/>}
              </button>

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm">
              Confirm Password
            </label>

            <div className="relative">

              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg"
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FiEyeOff/> : <FiEye/>}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading
              ? 'Resetting...'
              : 'Reset Password'}
          </button>

        </form>

      </div>

    </div>
  );
};