import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

export const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      await apiClient.post('/auth/resend-verification', { email });
      setSuccess(true);
      toast.success('Verification email sent! Check your inbox.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-effect rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="w-10 h-10 text-accent-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Resend Verification</h2>
          <p className="text-gray-400">
            Enter your email address and we'll send you a new verification link.
          </p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email Sent! 📧</h3>
            <p className="text-gray-400 text-sm mb-6">
              A new verification link has been sent to <strong>{email}</strong>.
              Please check your inbox and spam folder.
            </p>
            <Link to="/login" className="btn-primary inline-block px-6 py-2 text-sm">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Send Verification Email
                </>
              )}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already verified?{' '}
              <Link to="/login" className="text-accent-400 hover:text-accent-300 transition-colors">
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};