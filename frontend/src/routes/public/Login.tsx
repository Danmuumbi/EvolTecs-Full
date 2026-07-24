import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { apiClient } from '../../api/client';

export const Login = () => {
  const [email, setEmail] = useState(''); // ← Remove pre-filled credentials
  const [password, setPassword] = useState(''); // ← Remove pre-filled credentials
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { login, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/dashboard';

  // Debug: Log user state
  useEffect(() => {
    console.log('🔍 Login page - User:', user);
    console.log('🔍 Login page - Auth loading:', authLoading);
  }, [user, authLoading]);

  // If already logged in, redirect based on role
  useEffect(() => {
    if (!authLoading && user) {
      console.log('👤 User already logged in, role:', user.role);
      if (user.role === 'admin') {
        console.log('🔑 Redirecting to admin dashboard');
        navigate('/admin', { replace: true });
      } else {
        console.log('👤 Redirecting to customer dashboard:', from);
        navigate(from, { replace: true });
      }
    }
  }, [user, authLoading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRequiresVerification(false);
    setResendSuccess(false);
    console.log('🔐 Login attempt with email:', email);
    setIsLoading(true);
    
    try {
      await login(email, password);
      console.log('✅ Login successful!');
    } catch (error: any) {
      console.error('❌ Login error:', error.response?.data || error.message);
      
      if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
        setRequiresVerification(true);
        setError('Please verify your email before logging in. Check your inbox for the verification link.');
      } else {
        setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.error('Please enter your email address first');
      return;
    }

    setIsResending(true);
    setResendSuccess(false);
    
    try {
      await apiClient.post('/auth/resend-verification', { email });
      setResendSuccess(true);
      toast.success('Verification email sent! Check your inbox.');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send verification email';
      toast.error(message);
    } finally {
      setIsResending(false);
    }
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-[#0a0a0a]">
      <div className="max-w-md w-full glass-effect rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your EvolTech account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg flex flex-col gap-3 ${
            requiresVerification 
              ? 'bg-yellow-500/10 border border-yellow-500/30' 
              : 'bg-red-500/10 border border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              <FiAlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                requiresVerification ? 'text-yellow-400' : 'text-red-400'
              }`} />
              <div className="flex-1">
                <p className={`text-sm ${requiresVerification ? 'text-yellow-400' : 'text-red-400'}`}>
                  {error}
                </p>
              </div>
            </div>
            
            {requiresVerification && (
              <div className="flex flex-col gap-2 pl-8">
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="inline-flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors font-medium disabled:opacity-50"
                >
                  {isResending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-accent-400/30 border-t-accent-400 rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Resend Verification Email
                    </>
                  )}
                </button>
                {resendSuccess && (
                  <p className="text-xs text-green-400">
                    ✅ Verification email sent! Please check your inbox.
                  </p>
                )}
                <Link 
                  to="/resend-verification" 
                  state={{ email }} 
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Or go to resend page →
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-400">
              <input type="checkbox" className="rounded border-white/10 bg-white/5" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-accent-400 hover:text-accent-300 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" state={{ from }} className="text-accent-400 hover:text-accent-300 transition-colors font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};