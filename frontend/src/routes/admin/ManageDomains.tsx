import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiGlobe, 
  FiSearch, 
  FiRefreshCw,
  // FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  // FiCalendar,
  // FiUser,
  // FiFilter,
  FiX,
  FiEye,
  // FiLock,
  // FiUnlock,
  // FiMoreVertical,
  FiExternalLink
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface Domain {
  id: string;
  domainName: string;
  userId: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  registrationDate: string;
  expiryDate: string;
  status: string;
  autoRenew: boolean;
  createdAt: string;
}

export const ManageDomains = () => {
  const { user } = useAuth();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Check if user is Super Admin
  const isSuperAdmin = user?.role === 'admin' && user?.adminType === 'super';

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/admin/domains');
      setDomains(response.data.domains || []);
    } catch (error) {
      console.error('Failed to fetch domains:', error);
      toast.error('Failed to load domains');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDomain = async (domainId: string, domainName: string) => {
    if (!confirm(`Are you sure you want to delete domain ${domainName}?`)) return;
    
    try {
      await apiClient.delete(`/admin/domains/${domainId}`);
      toast.success(`Domain ${domainName} deleted successfully`);
      fetchDomains();
    } catch (error: any) {
      console.error('Failed to delete domain:', error);
      toast.error(error.response?.data?.message || 'Failed to delete domain');
    }
  };

  const handleToggleAutoRenew = async (domainId: string, currentStatus: boolean) => {
    try {
      await apiClient.put(`/admin/domains/${domainId}/auto-renew`, {
        autoRenew: !currentStatus
      });
      toast.success(`Auto-renew ${!currentStatus ? 'enabled' : 'disabled'}`);
      fetchDomains();
    } catch (error: any) {
      console.error('Failed to update auto-renew:', error);
      toast.error(error.response?.data?.message || 'Failed to update auto-renew');
    }
  };

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

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.domainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domain.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || domain.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading domains...</p>
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
            Manage Domains
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View and manage all domains registered on the platform
          </p>
          {isSuperAdmin && (
            <span className="inline-flex items-center gap-1 text-xs text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full mt-1">
              Super Admin Access
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchDomains}
            className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
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
            placeholder="Search domains by name, owner email or name..."
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

      {/* Domains Table */}
      <div className="glass-effect rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="text-left py-3 px-4 font-medium text-gray-400">Domain</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Owner</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Expiry</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Auto-Renew</th>
                <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDomains.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No domains found
                  </td>
                </tr>
              ) : (
                filteredDomains.map((domain, index) => {
                  const statusInfo = getStatusBadge(domain.status);
                  const StatusIcon = statusInfo.icon;
                  const daysUntilExpiry = getDaysUntilExpiry(domain.expiryDate);

                  return (
                    <motion.tr
                      key={domain.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <FiGlobe className="w-4 h-4 text-accent-400" />
                          <span className="text-white font-medium">{domain.domainName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-[10px]">
                            {domain.user?.firstName?.charAt(0) || 'U'}{domain.user?.lastName?.charAt(0) || ''}
                          </div>
                          <div>
                            <span className="text-white text-xs">{domain.user?.firstName} {domain.user?.lastName}</span>
                            <span className="text-gray-400 text-xs block">{domain.user?.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-white text-xs">{new Date(domain.expiryDate).toLocaleDateString()}</span>
                          {daysUntilExpiry > 0 && daysUntilExpiry <= 30 && (
                            <span className="text-yellow-400 text-[10px]">Expires in {daysUntilExpiry} days</span>
                          )}
                          {daysUntilExpiry <= 0 && (
                            <span className="text-red-400 text-[10px]">Expired</span>
                          )}
                          {daysUntilExpiry > 30 && (
                            <span className="text-gray-500 text-[10px]">{daysUntilExpiry} days left</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAutoRenew(domain.id, domain.autoRenew)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            domain.autoRenew
                              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                              : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                          }`}
                        >
                          {domain.autoRenew ? 'Enabled' : 'Disabled'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedDomain(domain);
                              setShowDetailsModal(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                            title="View details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://${domain.domainName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                            title="Visit website"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </a>
                          {isSuperAdmin && (
                            <button
                              onClick={() => handleDeleteDomain(domain.id, domain.domainName)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-400"
                              title="Delete domain"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredDomains.length} of {domains.length} domains
      </div>

      {/* Domain Details Modal */}
      {showDetailsModal && selectedDomain && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/5"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FiGlobe className="w-5 h-5 text-accent-400" />
                Domain Details
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">Domain Name</p>
                  <p className="text-white font-medium">{selectedDomain.domainName}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    getStatusBadge(selectedDomain.status).color
                  }`}>
                    {selectedDomain.status}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400">Owner</p>
                <p className="text-white font-medium">
                  {selectedDomain.user?.firstName} {selectedDomain.user?.lastName}
                </p>
                <p className="text-sm text-gray-400">{selectedDomain.user?.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">Registration Date</p>
                  <p className="text-white">{new Date(selectedDomain.registrationDate).toLocaleDateString()}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400">Expiry Date</p>
                  <p className="text-white">{new Date(selectedDomain.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400">Auto-Renew</p>
                <p className={`font-medium ${selectedDomain.autoRenew ? 'text-emerald-400' : 'text-gray-400'}`}>
                  {selectedDomain.autoRenew ? 'Enabled' : 'Disabled'}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-3">
                <button
                  onClick={() => {
                    handleToggleAutoRenew(selectedDomain.id, selectedDomain.autoRenew);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 btn-secondary py-2.5 text-sm"
                >
                  Toggle Auto-Renew
                </button>
                {isSuperAdmin && (
                  <button
                    onClick={() => {
                      handleDeleteDomain(selectedDomain.id, selectedDomain.domainName);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 bg-red-500/20 text-red-400 py-2.5 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                  >
                    Delete Domain
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 btn-primary py-2.5 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};