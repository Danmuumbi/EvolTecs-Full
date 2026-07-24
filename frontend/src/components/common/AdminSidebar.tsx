import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiGlobe, 
  FiServer, 
  FiCreditCard, 
  FiHelpCircle,
  FiMenu,
  FiX,
  // FiBarChart2,
  // FiMail,
  FiSettings,
  FiShield
} from 'react-icons/fi';

export const AdminSidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/domains', icon: FiGlobe, label: 'Domains' },
    { path: '/admin/hosting', icon: FiServer, label: 'Hosting' },
    { path: '/admin/payments', icon: FiCreditCard, label: 'Payments' },
    { path: '/admin/support', icon: FiHelpCircle, label: 'Support' },
    { path: '/admin/profile', icon: FiSettings, label: 'My Profile' },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const DesktopSidebar = () => (
    <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 p-4 z-30">
      <div className="flex items-center space-x-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <span className="text-lg font-bold gradient-text">Admin Panel</span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/5 border border-white/5">
        <div className="flex items-center space-x-3">
          <FiShield className="w-5 h-5 text-accent-400" />
          <div>
            <p className="text-sm font-medium text-white">Admin Access</p>
            <p className="text-xs text-gray-400">Full System Control</p>
          </div>
        </div>
      </div>
    </aside>
  );

  const MobileSidebar = () => (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <div className={`fixed top-0 left-0 h-full w-72 bg-[#0a0a0a] border-r border-white/5 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold gradient-text">Admin Panel</span>
          </div>
          <button
            onClick={closeMobileSidebar}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileSidebar}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/5 border border-white/5">
          <div className="flex items-center space-x-3">
            <FiShield className="w-5 h-5 text-accent-400" />
            <div>
              <p className="text-sm font-medium text-white">Admin Access</p>
              <p className="text-xs text-gray-400">Full System Control</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 md:hidden"
        aria-label="Toggle admin menu"
      >
        <FiMenu className="w-5 h-5 text-white" />
      </button>

      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};