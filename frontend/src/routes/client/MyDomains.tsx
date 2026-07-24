import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiGlobe, 
  FiSearch, 
  FiPlus, 
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  // FiMoreVertical,
  FiExternalLink,
  FiCopy,
  // FiTrash2,
  // FiEdit,
  FiCalendar,
  // FiShield,
  FiLock,
  FiUnlock
} from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Domain {
  id: string;
  domainName: string;
  registrationDate: string;
  expiryDate: string;
  status: string;
  autoRenew: boolean;
  createdAt: string;
}

export const MyDomains = () => {
  // const { user } = useAuth();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/domains');
      setDomains(response.data.domains || []);
    } catch (error) {
      console.error('Failed to fetch domains:', error);
      toast.error('Failed to load domains');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyDomain = (domain: string) => {
    navigator.clipboard.writeText(domain);
    toast.success('Domain copied to clipboard!');
  };

  const handleToggleAutoRenew = async (domainId: string, currentStatus: boolean) => {
    try {
      await apiClient.put(`/domains/${domainId}/auto-renew`, {
        autoRenew: !currentStatus
      });
      toast.success(`Auto-renew ${!currentStatus ? 'enabled' : 'disabled'}`);
      fetchDomains(); // Refresh list
    } catch (error) {
      console.error('Failed to update auto-renew:', error);
      toast.error('Failed to update auto-renew status');
    }
  };

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.domainName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || domain.status === filterStatus;
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

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your domains...</p>
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
            <FiGlobe className="w-8 h-8 text-accent-400" />
            My Domains
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage all your registered domains in one place
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchDomains}
            className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <Link
            to="/domains"
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiPlus className="w-4 h-4" />
            Register New Domain
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 border border-white/5">
          <div className="text-2xl font-bold text-white">{domains.length}</div>
          <div className="text-sm text-gray-400">Total Domains</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-emerald-500/20">
          <div className="text-2xl font-bold text-emerald-400">
            {domains.filter(d => d.status === 'ACTIVE').length}
          </div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-400">
            {domains.filter(d => d.status === 'EXPIRED' || d.status === 'SUSPENDED').length}
          </div>
          <div className="text-sm text-gray-400">Expiring/Expired</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-400">
            {domains.filter(d => d.autoRenew).length}
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
            placeholder="Search domains..."
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

      {/* Domains List */}
      {filteredDomains.length === 0 ? (
        <div className="glass-effect rounded-2xl p-12 text-center border border-white/5">
          <FiGlobe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Domains Found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'No domains match your search criteria'
              : 'You haven\'t registered any domains yet'}
          </p>
          <Link to="/domains" className="btn-primary inline-flex items-center gap-2">
            <FiPlus className="w-4 h-4" />
            Register Your First Domain
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredDomains.map((domain, index) => {
            const statusInfo = getStatusBadge(domain.status);
            const daysUntilExpiry = getDaysUntilExpiry(domain.expiryDate);
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-effect rounded-xl p-5 border border-white/5 hover:border-accent-400/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Domain Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <FiGlobe className="w-5 h-5 text-accent-400 flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-white truncate">
                        {domain.domainName}
                      </h3>
                      <button
                        onClick={() => handleCopyDomain(domain.domainName)}
                        className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                        title="Copy domain"
                      >
                        <FiCopy className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                      {daysUntilExpiry > 0 && daysUntilExpiry <= 30 && (
                        <span className="text-xs text-yellow-400 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          Expires in {daysUntilExpiry} days
                        </span>
                      )}
                      {daysUntilExpiry > 30 && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          Expires: {new Date(domain.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                      {daysUntilExpiry <= 0 && (
                        <span className="text-xs text-red-400 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          Expired
                        </span>
                      )}
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        Registered: {new Date(domain.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>



                  {/* Actions */}
<div className="flex items-center gap-2">
  <Link
    to={`/domain/${domain.id}`}
    className="px-3 py-1.5 bg-accent-500/20 text-accent-400 rounded-lg text-sm font-medium hover:bg-accent-500/30 transition-colors"
  >
    Manage
  </Link>
  {(domain.status === 'ACTIVE' && daysUntilExpiry <= 30) && (
    <Link
      to={`/renew/${domain.id}`}
      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors"
    >
      Renew Early
    </Link>
  )}
  {domain.status === 'EXPIRED' && (
    <Link
      to={`/renew/${domain.id}`}
      className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors animate-pulse"
    >
      🔴 Renew Now
    </Link>
  )}
  {domain.autoRenew ? (
    <span className="text-xs text-emerald-400 flex items-center gap-1">
      <FiLock className="w-3 h-3" />
      Auto-Renew ON
    </span>
  ) : (
    <span className="text-xs text-gray-400 flex items-center gap-1">
      <FiUnlock className="w-3 h-3" />
      Auto-Renew OFF
    </span>
  )}
  <button
    onClick={() => handleToggleAutoRenew(domain.id, domain.autoRenew)}
    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
    title="Toggle auto-renew"
  >
    <FiRefreshCw className="w-4 h-4" />
  </button>
  <Link
    to={`https://${domain.domainName}`}
    target="_blank"
    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
    title="Visit website"
  >
    <FiExternalLink className="w-4 h-4" />
  </Link>
</div>

                  {/* Actions */}
{/* <div className="flex items-center gap-2">
  <Link
    to={`/domain/${domain.id}`}
    className="px-3 py-1.5 bg-accent-500/20 text-accent-400 rounded-lg text-sm font-medium hover:bg-accent-500/30 transition-colors"
  >
    Manage
  </Link>
  {domain.autoRenew ? (
    <span className="text-xs text-emerald-400 flex items-center gap-1">
      <FiLock className="w-3 h-3" />
      Auto-Renew ON
    </span>
  ) : (
    <span className="text-xs text-gray-400 flex items-center gap-1">
      <FiUnlock className="w-3 h-3" />
      Auto-Renew OFF
    </span>
  )}
  <button
    onClick={() => handleToggleAutoRenew(domain.id, domain.autoRenew)}
    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
    title="Toggle auto-renew"
  >
    <FiRefreshCw className="w-4 h-4" />
  </button>
  <Link
    to={`https://${domain.domainName}`}
    target="_blank"
    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
    title="Visit website"
  >
    <FiExternalLink className="w-4 h-4" />
  </Link>
</div> */}



                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Footer Stats */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredDomains.length} of {domains.length} domains
      </div>
    </div>
  );
};