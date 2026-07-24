import { useAuth } from '../../context/AuthContext/useAuth';
import { 
  FiGlobe, 
  FiServer, 
  FiMail, 
  FiDollarSign,
  FiShoppingCart,
  FiActivity,
  FiClock,
  FiTrendingUp,
  FiBox,
  FiZap,
  FiArrowUpRight,
  FiMoreHorizontal,
  FiCheckCircle,
  FiAlertCircle,
  // FiLoader
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { dashboardApi, DashboardStats, ResourceUsage } from '../../api/dashboard';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [resources, setResources] = useState<ResourceUsage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsData, resourcesData] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getResources(),
        ]);
        setStats(statsData);
        setResources(resourcesData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-accent-400/30 border-t-accent-400 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400">Unable to load dashboard data</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary text-sm px-4 py-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    { 
      icon: FiGlobe, 
      label: 'Active Domains', 
      value: stats.stats.domains,
      color: 'from-blue-500 to-cyan-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    { 
      icon: FiServer, 
      label: 'Hosting Plans', 
      value: stats.stats.hosting,
      color: 'from-purple-500 to-pink-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    { 
      icon: FiMail, 
      label: 'Email Accounts', 
      value: stats.stats.emails,
      color: 'from-green-500 to-emerald-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20'
    },
    { 
      icon: FiDollarSign, 
      label: 'Total Spent', 
      value: `KSH ${stats.stats.totalSpent.toLocaleString()}`,
      color: 'from-orange-500 to-yellow-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },
  ];

  const quickActions = [
    { icon: FiGlobe, label: 'Find Domain', path: '/domains', color: 'from-blue-500 to-cyan-400' },
    { icon: FiServer, label: 'Get Hosting', path: '/hosting', color: 'from-purple-500 to-pink-400' },
    { icon: FiMail, label: 'Create Email', path: '/my-emails', color: 'from-green-500 to-emerald-400' },
    { icon: FiShoppingCart, label: 'View Orders', path: '/invoices', color: 'from-orange-500 to-yellow-400' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
              <span className="text-2xl font-bold text-white">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Welcome back, <span className="gradient-text">{user?.firstName}</span>
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span className="capitalize">{user?.role}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-effect rounded-xl px-4 py-2 flex items-center gap-2 border border-white/5">
            <FiClock className="w-4 h-4 text-accent-400" />
            <span className="text-sm text-white">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <div className="glass-effect rounded-xl px-4 py-2 border border-white/5">
            <span className="text-sm font-medium text-accent-400">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`glass-effect rounded-2xl p-5 border ${stat.border} hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
              </div>
              <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <FiCheckCircle className="w-3 h-3" />
                Active
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="glass-effect rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FiZap className="w-5 h-5 text-accent-400" />
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 group border border-white/5 hover:border-accent-400/20"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-0.5 mx-auto mb-3`}>
                    <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-white">{action.label}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Click to start</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-effect rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FiActivity className="w-5 h-5 text-accent-400" />
                Recent Activity
              </h2>
              <span className="text-xs text-gray-500">
                {stats.recentActivity.length} activities
              </span>
            </div>
            <div className="space-y-4">
              {stats.recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">No recent activity</p>
                  <p className="text-gray-500 text-xs mt-1">Start using our services to see activity here</p>
                </div>
              ) : (
                stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                      <FiGlobe className="w-5 h-5 text-accent-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{activity.action}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          activity.status === 'ACTIVE' || activity.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{activity.detail}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <span>{new Date(activity.time).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      <FiMoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Resources & Status */}
        <div className="space-y-6">
          {/* Resource Usage */}
          <div className="glass-effect rounded-2xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiBox className="w-5 h-5 text-accent-400" />
              Resource Usage
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Storage Used</span>
                  <span className="text-white">
                    {resources?.emailUsage ? 
                      `${(resources.emailUsage.used / 1024).toFixed(1)} GB / ${(resources.emailUsage.total / 1024).toFixed(1)} GB` 
                      : '0 GB / 0 GB'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${resources?.emailUsage?.percentage || 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Active Services</span>
                  <span className="text-white">{stats.stats.domains + stats.stats.hosting + stats.stats.emails}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.stats.domains + stats.stats.hosting + stats.stats.emails) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Total Orders</span>
                  <span className="text-white">{stats.stats.orders}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(stats.stats.orders * 5, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="glass-effect rounded-2xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FiTrendingUp className="w-5 h-5 text-accent-400" />
              Account Overview
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-gray-400">Total Spent</span>
                <span className="text-white font-medium">KSH {stats.stats.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className="text-gray-400">Invoices</span>
                <span className="text-white">{stats.stats.invoices} ({stats.stats.paidInvoices} paid)</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-400">Email Verified</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Yes
                </span>
              </div>
            </div>
          </div>

          {/* Support */}
          <Link to="/support" className="block glass-effect rounded-2xl p-6 border border-white/5 hover:border-accent-400/20 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiTrendingUp className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Need Help?</h3>
                  <p className="text-xs text-gray-400">24/7 Support Available</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-400/20 transition-colors">
                <FiArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-accent-400" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};