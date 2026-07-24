import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
// import { FiCheckCircle, FiXCircle, FiLoader, FiMail } from 'react-icons/fi';
import { FiCheckCircle, FiXCircle, FiLoader} from 'react-icons/fi';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('No verification token provided.');
        return;
      }

      try {
        const response = await apiClient.get(`/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully!');
        toast.success('Email verified! You can now log in.');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: any) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed. The link may be expired.');
        toast.error('Verification failed');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-effect rounded-2xl p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiLoader className="w-10 h-10 text-accent-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verifying Your Email</h2>
            <p className="text-gray-400">Please wait while we verify your email address...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Email Verified! 🎉</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
            <Link
              to="/login"
              className="mt-4 inline-block btn-primary px-6 py-2 text-sm"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiXCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full btn-primary px-6 py-2 text-sm text-center"
              >
                Go to Login
              </Link>
              <Link
                to="/resend-verification"
                className="block w-full btn-secondary px-6 py-2 text-sm text-center"
              >
                Resend Verification Email
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};