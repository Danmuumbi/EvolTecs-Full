import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiGlobe, 
  FiServer, 
  FiMail, 
  FiFileText, 
  FiHelpCircle, 
  FiUser,
  FiMenu,
  FiX
} from 'react-icons/fi';

export const ClientSidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/my-domains', icon: FiGlobe, label: 'My Domains' },
    { path: '/my-hosting', icon: FiServer, label: 'My Hosting' },
    { path: '/my-emails', icon: FiMail, label: 'My Emails' },
    { path: '/invoices', icon: FiFileText, label: 'Invoices' },
    { path: '/support', icon: FiHelpCircle, label: 'Support' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // Desktop Sidebar - Same as original
  const DesktopSidebar = () => (
    <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 p-4 z-30">
      <div className="flex items-center space-x-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">E</span>
        </div>
        <span className="text-lg font-bold gradient-text">EvolTech</span>
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
    </aside>
  );

  // Mobile Sidebar - Slides in from left
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#0a0a0a] border-r border-white/5 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold gradient-text">EvolTech</span>
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
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 md:hidden"
        aria-label="Toggle menu"
      >
        <FiMenu className="w-5 h-5 text-white" />
      </button>

      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};