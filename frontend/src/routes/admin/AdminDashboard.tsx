import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiUsers, 
  FiGlobe, 
  FiServer, 
  FiCreditCard, 
  FiHelpCircle,
  FiTrendingUp,
  FiClock,
  FiDollarSign,
  FiShoppingCart,
  FiActivity,
  FiRefreshCw,
  FiUserPlus,
  FiMail,
  FiAlertCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface AdminStats {
  totalUsers: number;
  totalDomains: number;
  totalHosting: number;
  totalPayments: number;
  totalSupportTickets: number;
  totalRevenue: number;
  recentOrders: any[];
  recentUsers: any[];
}

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('📊 Fetching admin stats...');
      console.log('🔑 Token:', localStorage.getItem('auth_token')?.substring(0, 20) + '...');
      
      const response = await apiClient.get('/admin/stats');
      console.log('✅ Admin stats received:', response.data);
      setStats(response.data);
    } catch (error: any) {
      console.error('❌ Failed to fetch admin stats:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      
      let message = 'Failed to load admin dashboard';
      if (error.response?.status === 403) {
        message = 'Admin access required. Please make sure you have the right permissions.';
      } else if (error.response?.status === 401) {
        message = 'Please log in again to access the admin dashboard.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <FiAlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 font-medium">{error}</p>
          <button 
            onClick={fetchAdminStats}
            className="mt-4 btn-primary text-sm px-4 py-2 inline-flex items-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button 
            onClick={() => window.location.href = '/logout'}
            className="mt-2 ml-2 btn-secondary text-sm px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400">No data available</p>
          <button 
            onClick={fetchAdminStats}
            className="mt-4 btn-primary text-sm px-4 py-2 inline-flex items-center gap-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    { icon: FiUsers, label: 'Total Users', value: stats.totalUsers || 0, color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10' },
    { icon: FiGlobe, label: 'Domains', value: stats.totalDomains || 0, color: 'from-purple-500 to-pink-400', bg: 'bg-purple-500/10' },
    { icon: FiServer, label: 'Hosting Plans', value: stats.totalHosting || 0, color: 'from-green-500 to-emerald-400', bg: 'bg-green-500/10' },
    { icon: FiDollarSign, label: 'Revenue (KSH)', value: `KSH ${(stats.totalRevenue || 0).toLocaleString()}`, color: 'from-orange-500 to-yellow-400', bg: 'bg-orange-500/10' },
    { icon: FiCreditCard, label: 'Payments', value: stats.totalPayments || 0, color: 'from-red-500 to-rose-400', bg: 'bg-red-500/10' },
    { icon: FiHelpCircle, label: 'Support Tickets', value: stats.totalSupportTickets || 0, color: 'from-indigo-500 to-violet-400', bg: 'bg-indigo-500/10' },
  ];

  const quickActions = [
    { icon: FiUserPlus, label: 'Add User', path: '/admin/users', color: 'from-blue-500 to-cyan-400' },
    { icon: FiMail, label: 'Invite Admin', path: '/admin/users', color: 'from-purple-500 to-pink-400' },
    { icon: FiShoppingCart, label: 'View Orders', path: '/admin/payments', color: 'from-green-500 to-emerald-400' },
    { icon: FiRefreshCw, label: 'Refresh Data', action: fetchAdminStats, color: 'from-orange-500 to-yellow-400' },
  ];

  const recentOrders = stats.recentOrders || [];
  const recentUsers = stats.recentUsers || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <FiActivity className="w-8 h-8 text-accent-400" />
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, {user?.firstName}! Here's what's happening with your platform.
          </p>
          {user?.role === 'admin' && (
            <span className="inline-flex items-center gap-1 text-xs text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full mt-1">
              Admin
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-effect rounded-xl px-4 py-2 flex items-center gap-2 border border-white/5">
            <FiClock className="w-4 h-4 text-accent-400" />
            <span className="text-sm text-white">
              {currentTime.toLocaleString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <button
            onClick={fetchAdminStats}
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            title="Refresh"
          >
            <FiRefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass-effect rounded-xl p-4 border border-white/5 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions - Only Super Admin can see invite */}
      <div className="glass-effect rounded-2xl p-6 border border-white/5">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FiTrendingUp className="w-5 h-5 text-accent-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            // Hide "Invite Admin" from non-super admins
            if (action.label === 'Invite Admin' && (user as any)?.role !== 'admin') {
              return null;
            }
            return (
              <button
                key={index}
                onClick={action.action || (() => {})}
                className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 group border border-white/5 hover:border-accent-400/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-0.5 mx-auto mb-3`}>
                  <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white">{action.label}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {user?.adminType === 'super' && (
  <button
    onClick={async () => {
      try {
        const response = await apiClient.post('/admin/notifications/trigger-domain-check');
        toast.success('Domain expiry check triggered successfully!');
        console.log('Response:', response.data);
      } catch (error) {
        toast.error('Failed to trigger domain check');
        console.error('Error:', error);
      }
    }}
    className="glass-effect rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 group border border-white/5 hover:border-accent-400/20"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 p-0.5 mx-auto mb-3">
      <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <FiMail className="w-6 h-6 text-white" />
      </div>
    </div>
    <h3 className="text-sm font-medium text-white">Send Domain Reminders</h3>
    <p className="text-[10px] text-gray-500 mt-0.5">Check expiring domains</p>
  </button>
)}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="glass-effect rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5 text-accent-400" />
            Recent Orders
          </h2>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.slice(0, 5).map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-accent-400">KSH {order.totalAmount}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                      order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="glass-effect rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FiUsers className="w-5 h-5 text-accent-400" />
            Recent Users
          </h2>
          <div className="space-y-3">
            {recentUsers.length > 0 ? (
              recentUsers.slice(0, 5).map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs">
                      {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || ''}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">No recent users</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};