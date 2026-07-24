import { useAuth } from '../../context/AuthContext/useAuth';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-20 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold hidden md:block">Administrator Dashboard</h2>
      <div className="flex items-center space-x-4 ml-auto md:ml-0">
        <span className="text-sm text-gray-400 hidden sm:block">
          {user?.firstName} {user?.lastName}
        </span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
          {user?.firstName?.charAt(0) || 'A'}
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
          title="Logout"
        >
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};