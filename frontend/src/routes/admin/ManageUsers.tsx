import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext/useAuth';
import { apiClient } from '../../api/client';
import { 
  FiUsers, 
  FiSearch, 
  // FiPlus, 
  FiRefreshCw,
  // FiEdit,
  FiTrash2,
  // FiMail,
  FiUserPlus,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiSend,
  // FiUser,
  FiShield,
  // FiStar,
  FiLock
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  role: string;
  adminType?: string;
  emailVerified: boolean;
  createdAt: string;
}

export const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('admin');
  const [inviteAdminType, setInviteAdminType] = useState('support');
  const [isInviting, setIsInviting] = useState(false);

  // ✅ Check if user is Super Admin - using role and a fallback
  const isSuperAdmin = user?.role === 'admin' && (user as any)?.adminType === 'super';
  

  useEffect(() => {
    // ✅ Redirect if not super admin
    if (!isSuperAdmin) {
      toast.error('You do not have permission to access this page');
    } else {
      fetchUsers();
    }
  }, [isSuperAdmin]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/users/all');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    setIsInviting(true);
    try {
      await apiClient.post('/admin/invite', {
        email: inviteEmail,
        role: inviteRole,
        adminType: inviteAdminType,
      });
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      setShowInviteModal(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Failed to invite admin:', error);
      toast.error(error.response?.data?.message || 'Failed to send invitation');
    } finally {
      setIsInviting(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user ${userName}?`)) return;
    
    try {
      await apiClient.delete(`/admin/user/${userId}`);
      toast.success(`User ${userName} deleted successfully`);
      fetchUsers();
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string, newAdminType?: string) => {
    try {
      await apiClient.put(`/admin/user/${userId}/role`, { 
        role: newRole,
        adminType: newRole === 'admin' ? newAdminType : null,
      });
      toast.success(`User role updated successfully`);
      fetchUsers();
    } catch (error: any) {
      console.error('Failed to update role:', error);
      toast.error(error.response?.data?.message || 'Failed to update role');
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Access Denied for non-super admins
  if (!isSuperAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLock className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            You do not have permission to access this page. This area is restricted to Super Administrators only.
          </p>
          <button
            onClick={() => window.location.href = '/admin'}
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiUsers className="w-4 h-4" />
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading users...</p>
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
            <FiUsers className="w-8 h-8 text-accent-400" />
            Manage Users
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage all users and administrators on the platform
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full mt-1">
            Super Admin Access
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchUsers}
            className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
          >
            <FiUserPlus className="w-4 h-4" />
            Invite Admin
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 border border-white/5">
          <div className="text-2xl font-bold text-white">{users.length}</div>
          <div className="text-sm text-gray-400">Total Users</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-purple-500/20">
          <div className="text-2xl font-bold text-purple-400">
            {users.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-sm text-gray-400">Admins</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-400">
            {users.filter(u => u.role === 'customer').length}
          </div>
          <div className="text-sm text-gray-400">Customers</div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-emerald-500/20">
          <div className="text-2xl font-bold text-emerald-400">
            {users.filter(u => u.emailVerified).length}
          </div>
          <div className="text-sm text-gray-400">Verified</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name or email..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm"
        />
      </div>

      {/* Users Table */}
      <div className="glass-effect rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="text-left py-3 px-4 font-medium text-gray-400">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Admin Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">Joined</th>
                <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs">
                          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </div>
                        <span className="text-white">{user.firstName} {user.lastName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.role === 'admin' && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.adminType === 'super' 
                            ? 'bg-amber-500/20 text-amber-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {user.adminType || 'support'}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {user.emailVerified ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <FiCheckCircle className="w-4 h-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-400">
                          <FiAlertCircle className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={user.role}
                          onChange={(e) => {
                            const newRole = e.target.value;
                            handleUpdateRole(user.id, newRole, 'support');
                          }}
                          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-accent-400"
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                        {user.role === 'admin' && (
                          <select
                            value={user.adminType || 'support'}
                            onChange={(e) => {
                              handleUpdateRole(user.id, 'admin', e.target.value);
                            }}
                            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-accent-400"
                          >
                            <option value="support">Support</option>
                            <option value="super">Super</option>
                          </select>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-400"
                          title="Delete user"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Admin Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-effect rounded-2xl p-6 md:p-8 max-w-md w-full border border-white/5"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FiUserPlus className="w-5 h-5 text-accent-400" />
                Invite Admin
              </h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleInviteAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-400 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Role *
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-400 transition-colors text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              {inviteRole === 'admin' && (
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Admin Type *
                  </label>
                  <select
                    value={inviteAdminType}
                    onChange={(e) => setInviteAdminType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-accent-400 transition-colors text-sm"
                  >
                    <option value="support">Support Admin (Limited Access)</option>
                    <option value="super">Super Admin (Full Access)</option>
                  </select>
                </div>
              )}

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-xs text-yellow-400">
                  <FiShield className="w-4 h-4 inline mr-1" />
                  The invited user will receive an email with instructions to set up their account.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 btn-secondary py-2.5 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isInviting}
                  className="flex-1 btn-primary py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isInviting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Send Invitation
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};