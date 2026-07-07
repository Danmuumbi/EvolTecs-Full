import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiClock, 
  FiMail, 
  FiBell,
  FiCode,
  FiZap,
  FiStar
} from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  estimatedDate?: string;
  features?: string[];
}

export const ComingSoon = ({ 
  title = "Coming Soon",
  description = "We're working on something amazing. Stay tuned for updates!",
  icon = <FiCode className="w-16 h-16" />,
  estimatedDate = "Coming Q1 2025",
  features = [
    "Innovative features",
    "User-friendly interface",
    "Seamless integration",
    "Premium experience"
  ]
}: ComingSoonProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("You'll be notified when we launch!");
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden pt-20">
      <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-primary-900/10 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="glass-effect rounded-3xl p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-3xl blur-2xl"></div>
                <div className="relative text-accent-400">
                  {icon}
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
                {estimatedDate}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                {description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            >
              {features.map((feature, index) => (
                <div key={index} className="glass-effect rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300">
                  <FiZap className="w-6 h-6 text-accent-400 mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs text-gray-300">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Notify Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-effect rounded-2xl p-8 max-w-xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <FiBell className="w-5 h-5 text-accent-400" />
                <h3 className="text-lg font-semibold text-white">Get Notified</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to get updates when we launch
              </p>
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-accent-400 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-6 py-3 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FiMail className="w-4 h-4" />
                      Notify Me
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <FiArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated Elements */}
        <div className="absolute bottom-20 left-10 opacity-20 hidden lg:block">
          <FiCode className="w-24 h-24 text-accent-400 animate-float" />
        </div>
        <div className="absolute top-40 right-10 opacity-20 hidden lg:block">
          <FiStar className="w-16 h-16 text-primary-400 animate-float delay-1000" />
        </div>
      </div>
    </div>
  );
};