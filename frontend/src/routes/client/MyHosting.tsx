import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiServer, 
  FiSearch, 
  FiPlus, 
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  // FiMoreVertical,
  // FiExternalLink,
  FiCopy,
  FiTrash2,
  FiEdit,
  FiCalendar,
  // FiShield,
  FiHardDrive,
  FiGlobe,
  FiMail,
  // FiZap,
  FiTrendingUp,
  // FiDatabase,
  FiCpu,
  FiBox,
  FiCloud
} from 'react-icons/fi';
import toast from 'react-hot-toast';

interface HostingPlan {
  id: string;
  planName: string;
  diskSpace: number;
  bandwidth: number;
  domains: number;
  emailAccounts: number;
  price: number;
  billingCycle: string;
  startDate: string;
  expiryDate: string;
  status: string;
  autoRenew: boolean;
  createdAt: string;
}

export const MyHosting = () => {
  // const { user } = useAuth();
  const [hostingPlans, setHostingPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchHostingPlans();
  }, []);

  const fetchHostingPlans = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/hosting');
      setHostingPlans(response.data.hostingPlans || []);
    } catch (error) {
      console.error('Failed to fetch hosting plans:', error);
      toast.error('Failed to load hosting plans');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPlanName = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success('Plan name copied to clipboard!');
  };

  const handleToggleAutoRenew = async (planId: string, currentStatus: boolean) => {
    try {
      await apiClient.put(`/hosting/${planId}/auto-renew`, {
        autoRenew: !currentStatus
      });
      toast.success(`Auto-renew ${!currentStatus ? 'enabled' : 'disabled'}`);
      fetchHostingPlans();
    } catch (error) {
      console.error('Failed to update auto-renew:', error);
      toast.error('Failed to update auto-renew status');
    }
  };

  const filteredPlans = hostingPlans.filter(plan => {
    const matchesSearch = plan.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return { color: 'bg-emerald-500/20 text-emerald-400', icon: FiCheckCircle, label: 'Active' };
      case 'EXPIRED':
        return { color: 'bg-red-500/20 text-red-400', icon: FiAlertCircle, label: 'Expired' };
      case 'SUSPENDED':
        return { color: 'bg-yellow-500/20 text-yellow-400', icon: FiClock, label: 'Suspended' };
      case 'CANCELLED':
        return { color: 'bg-gray-500/20 text-gray-400', icon: FiAlertCircle, label: 'Cancelled' };
      default:
        return { color: 'bg-gray-500/20 text-gray-400', icon: FiClock, label: status };
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPlanIcon = (planName: string) => {
    const name = planName.toLowerCase();
    if (name.includes('starter') || name.includes('basic')) return FiBox;
    if (name.includes('professional') || name.includes('pro')) return FiServer;
    if (name.includes('business') || name.includes('enterprise')) return FiCloud;
    if (name.includes('premium') || name.includes('ultimate')) return FiCpu;
    return FiServer;
  };

  const getPlanColor = (planName: string) => {
    const name = planName.toLowerCase();
    if (name.includes('starter') || name.includes('basic')) return 'from-blue-500 to-cyan-400';
    if (name.includes('professional') || name.includes('pro')) return 'from-purple-500 to-pink-400';
    if (name.includes('business') || name.includes('enterprise')) return 'from-green-500 to-emerald-400';
    if (name.includes('premium') || name.includes('ultimate')) return 'from-orange-500 to-yellow-400';
    return 'from-gray-500 to-gray-400';
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 GB';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your hosting plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <FiServer className="w-8 h-8 text-accent-400" />
            My Hosting
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage all your hosting plans in one place
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchHostingPlans}
            className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <Link
            to="/hosting"
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiPlus className="w-4 h-4" />
            Get New Hosting
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 border border-white/5">
          <div className="text-2xl font-bold text-white">{hostingPlans.length}</div>
          <div className="text-sm text-gray-400">Total Plans</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-emerald-500/20">
          <div className="text-2xl font-bold text-emerald-400">
            {hostingPlans.filter(p => p.status === 'ACTIVE').length}
          </div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-400">
            {hostingPlans.filter(p => p.status === 'EXPIRED' || p.status === 'SUSPENDED').length}
          </div>
          <div className="text-sm text-gray-400">Expiring/Expired</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-400">
            {hostingPlans.filter(p => p.autoRenew).length}
          </div>
          <div className="text-sm text-gray-400">Auto-Renew Enabled</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hosting plans..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-accent-400 transition-colors"
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="EXPIRED">Expired</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Hosting Plans List */}
      {filteredPlans.length === 0 ? (
        <div className="glass-effect rounded-2xl p-12 text-center border border-white/5">
          <FiServer className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Hosting Plans Found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'No plans match your search criteria'
              : 'You haven\'t purchased any hosting plans yet'}
          </p>
          <Link to="/hosting" className="btn-primary inline-flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            Get Your First Hosting Plan
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlans.map((plan, index) => {
            const statusInfo = getStatusBadge(plan.status);
            const daysUntilExpiry = getDaysUntilExpiry(plan.expiryDate);
            const StatusIcon = statusInfo.icon;
            const PlanIcon = getPlanIcon(plan.planName);
            const planColor = getPlanColor(plan.planName);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-effect rounded-xl p-5 border border-white/5 hover:border-accent-400/20 transition-all duration-300"
              >
                {/* Plan Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${planColor} p-0.5 flex-shrink-0`}>
                      <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                        <PlanIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {plan.planName}
                      </h3>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyPlanName(plan.planName)}
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    title="Copy plan name"
                  >
                    <FiCopy className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Plan Details */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FiHardDrive className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{formatBytes(plan.diskSpace)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiGlobe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{plan.domains} Domains</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiMail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{plan.emailAccounts} Emails</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FiTrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{formatBytes(plan.bandwidth)} Bandwidth</span>
                  </div>
                </div>

                {/* Pricing & Billing */}
                <div className="mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-accent-400">
                        KSH {plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 ml-1">
                        /{plan.billingCycle}
                      </span>
                    </div>
                    <div className="text-right">
                      {daysUntilExpiry > 0 && daysUntilExpiry <= 30 && (
                        <span className="text-xs text-yellow-400 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          Expires in {daysUntilExpiry} days
                        </span>
                      )}
                      {daysUntilExpiry > 30 && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          {new Date(plan.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                      {daysUntilExpiry <= 0 && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          Expired
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {plan.autoRenew ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        Auto-Renew ON
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        Auto-Renew OFF
                      </span>
                    )}
                    <button
                      onClick={() => handleToggleAutoRenew(plan.id, plan.autoRenew)}
                      className="p-1 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                      title="Toggle auto-renew"
                    >
                      <FiRefreshCw className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/hosting`}
                      className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                      title="Upgrade plan"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-red-400"
                      title="Cancel plan"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Footer Stats */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredPlans.length} of {hostingPlans.length} hosting plans
      </div>
    </div>
  );
};