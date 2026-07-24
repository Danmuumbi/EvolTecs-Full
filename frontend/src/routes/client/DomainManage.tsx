import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiArrowLeft,
  FiGlobe,
  FiServer,
  // FiSettings,
  FiShield,
  FiLock,
  // FiUnlock,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiEdit,
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  // FiCopy,
  FiExternalLink,
  // FiMail,
  FiFileText,
  FiInfo,
  FiCalendar,
  FiUsers
} from 'react-icons/fi';
import toast from 'react-hot-toast';

interface DomainDetails {
  id: string;
  domainName: string;
  registrationDate: string;
  expiryDate: string;
  status: string;
  autoRenew: boolean;
  registrarLock: boolean;
  nameservers: string[];
  dnsRecords: DnsRecord[];
  whois: {
    registrant: string;
    email: string;
    phone: string;
    organization: string;
  };
}

interface DnsRecord {
  id: string;
  type: string;
  name: string;
  value: string;
  ttl: number;
  priority: number;
}

export const DomainManage = () => {
  const { domainId } = useParams<{ domainId: string }>();
  // const { user } = useAuth();
  // const navigate = useNavigate();
  
  const [domain, setDomain] = useState<DomainDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'dns' | 'nameservers' | 'security' | 'whois'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedNameservers, setEditedNameservers] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchDomainDetails();
  }, [domainId]);

  const fetchDomainDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/domains/${domainId}`);
      setDomain(response.data.domain);
      setEditedNameservers(response.data.domain.nameservers || ['', '']);
    } catch (error) {
      console.error('Failed to fetch domain details:', error);
      toast.error('Failed to load domain details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutoRenew = async () => {
    if (!domain) return;
    try {
      await apiClient.put(`/domains/${domain.id}/auto-renew`, {
        autoRenew: !domain.autoRenew
      });
      toast.success(`Auto-renew ${!domain.autoRenew ? 'enabled' : 'disabled'}`);
      fetchDomainDetails();
    } catch (error) {
      console.error('Failed to update auto-renew:', error);
      toast.error('Failed to update auto-renew');
    }
  };

  const handleToggleRegistrarLock = async () => {
    if (!domain) return;
    try {
      await apiClient.put(`/domains/${domain.id}/registrar-lock`, {
        lock: !domain.registrarLock
      });
      toast.success(`Registrar lock ${!domain.registrarLock ? 'enabled' : 'disabled'}`);
      fetchDomainDetails();
    } catch (error) {
      console.error('Failed to update registrar lock:', error);
      toast.error('Failed to update registrar lock');
    }
  };

  const handleUpdateNameservers = async () => {
    if (!domain) return;
    setIsSaving(true);
    try {
      await apiClient.put(`/domains/${domain.id}/nameservers`, {
        nameservers: editedNameservers.filter(ns => ns.trim() !== '')
      });
      toast.success('Nameservers updated successfully');
      setIsEditing(false);
      fetchDomainDetails();
    } catch (error) {
      console.error('Failed to update nameservers:', error);
      toast.error('Failed to update nameservers');
    } finally {
      setIsSaving(false);
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

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading domain details...</p>
        </div>
      </div>
    );
  }

  if (!domain) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-400">Domain not found</p>
          <Link to="/my-domains" className="mt-4 btn-primary inline-flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" />
            Back to Domains
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusBadge(domain.status);
  const StatusIcon = statusInfo.icon;
  const daysUntilExpiry = getDaysUntilExpiry(domain.expiryDate);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link 
            to="/my-domains" 
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <FiGlobe className="w-8 h-8 text-accent-400" />
              {domain.domainName}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                <StatusIcon className="w-3 h-3" />
                {statusInfo.label}
              </span>
              {daysUntilExpiry > 0 && (
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <FiCalendar className="w-4 h-4" />
                  Expires in {daysUntilExpiry} days
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchDomainDetails}
            className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <a
            href={`https://${domain.domainName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiExternalLink className="w-4 h-4" />
            Visit Website
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: FiInfo },
          { id: 'nameservers', label: 'Nameservers', icon: FiServer },
          { id: 'dns', label: 'DNS Records', icon: FiFileText },
          { id: 'security', label: 'Security', icon: FiShield },
          { id: 'whois', label: 'WHOIS', icon: FiUsers },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-accent-500/20 text-accent-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-effect rounded-2xl p-6 md:p-8 border border-white/5">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Domain Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Domain Name</span>
                  <span className="text-white font-medium">{domain.domainName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Registration Date</span>
                  <span className="text-white">{new Date(domain.registrationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Expiry Date</span>
                  <span className="text-white">{new Date(domain.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.label}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Auto-Renew</span>
                  <span className={`font-medium ${domain.autoRenew ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {domain.autoRenew ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Registrar Lock</span>
                  <span className={`font-medium ${domain.registrarLock ? 'text-emerald-400' : 'text-gray-400'}`}>
                    {domain.registrarLock ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Nameservers</span>
                  <span className="text-white text-sm text-right">
                    {domain.nameservers?.join(', ') || 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">DNS Records</span>
                  <span className="text-white">{domain.dnsRecords?.length || 0} records</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Nameservers Tab */}
        {activeTab === 'nameservers' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Nameservers</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <FiEdit className="w-4 h-4" />
                  Edit Nameservers
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-400 mb-4">
                  Enter your custom nameservers. Leave empty to use default nameservers.
                </div>
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index}>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Nameserver {index + 1}
                      </label>
                      <input
                        type="text"
                        value={editedNameservers[index] || ''}
                        onChange={(e) => {
                          const newNs = [...editedNameservers];
                          newNs[index] = e.target.value;
                          setEditedNameservers(newNs);
                        }}
                        placeholder={`ns${index + 1}.yourhost.com`}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleUpdateNameservers}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Save Nameservers
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedNameservers(domain.nameservers || ['', '']);
                    }}
                    className="btn-secondary flex items-center gap-2 px-6 py-2.5 text-sm"
                  >
                    <FiX className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {domain.nameservers && domain.nameservers.length > 0 ? (
                  domain.nameservers.map((ns, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <FiServer className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{ns}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm">No custom nameservers set</div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* DNS Records Tab */}
        {activeTab === 'dns' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">DNS Records</h3>
              <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
                <FiPlus className="w-4 h-4" />
                Add Record
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/5">
                    <th className="text-left py-3 px-2 font-medium">Type</th>
                    <th className="text-left py-3 px-2 font-medium">Name</th>
                    <th className="text-left py-3 px-2 font-medium">Value</th>
                    <th className="text-left py-3 px-2 font-medium">TTL</th>
                    <th className="text-left py-3 px-2 font-medium">Priority</th>
                    <th className="text-right py-3 px-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {domain.dnsRecords && domain.dnsRecords.length > 0 ? (
                    domain.dnsRecords.map((record) => (
                      <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-2">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-accent-500/20 text-accent-400">
                            {record.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-white">{record.name}</td>
                        <td className="py-3 px-2 text-gray-300 truncate max-w-[150px]">{record.value}</td>
                        <td className="py-3 px-2 text-gray-400">{record.ttl}</td>
                        <td className="py-3 px-2 text-gray-400">{record.priority || '-'}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400">
                        No DNS records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
            <div className="space-y-6">
              {/* Registrar Lock */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <FiLock className="w-5 h-5 text-accent-400" />
                    <h4 className="font-medium text-white">Registrar Lock</h4>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Prevents unauthorized transfer of your domain
                  </p>
                </div>
                <button
                  onClick={handleToggleRegistrarLock}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    domain.registrarLock
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                  }`}
                >
                  {domain.registrarLock ? 'Locked' : 'Unlocked'}
                </button>
              </div>

              {/* Auto-Renew */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <FiRefreshCw className="w-5 h-5 text-accent-400" />
                    <h4 className="font-medium text-white">Auto-Renew</h4>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Automatically renew your domain before expiry
                  </p>
                </div>
                <button
                  onClick={handleToggleAutoRenew}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    domain.autoRenew
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                  }`}
                >
                  {domain.autoRenew ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* WHOIS Tab */}
        {activeTab === 'whois' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">WHOIS Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Registrant</span>
                  <span className="text-white">{domain.whois?.registrant || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Organization</span>
                  <span className="text-white">{domain.whois?.organization || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">{domain.whois?.email || 'Not set'}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Phone</span>
                  <span className="text-white">{domain.whois?.phone || 'Not set'}</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <FiUsers className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">WHOIS privacy protection</p>
                  <p className="text-xs text-gray-500 mt-1">Your contact information is protected</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};