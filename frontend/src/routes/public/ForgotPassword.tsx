import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { apiClient } from "../../api/client";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await apiClient.post("/auth/forgot-password", {
        email,
      });

      setSent(true);

      toast.success("Password reset email sent.");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Failed to send reset email."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="glass-effect rounded-2xl p-8 max-w-md w-full">

        <h1 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="text-center">

            <p className="text-green-400 mb-6">
              Check your email for the password reset link.
            </p>

            <Link
              to="/login"
              className="btn-primary px-6 py-3"
            >
              Back to Login
            </Link>

          </div>
        ) : (

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>

              <label className="block mb-2 text-sm">
                Email Address
              </label>

              <div className="relative">

                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full pl-10 py-3 bg-white/5 rounded-lg border border-white/10"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

            <div className="text-center">

              <Link
                to="/login"
                className="text-accent-400"
              >
                Back to Login
              </Link>

            </div>

          </form>

        )}

      </div>
    </div>
  );
};