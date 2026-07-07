import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGlobe, FiServer, FiMail, FiFileText, FiHelpCircle, FiUser } from 'react-icons/fi';

export const ClientSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/my-domains', icon: FiGlobe, label: 'My Domains' },
    { path: '/my-hosting', icon: FiServer, label: 'My Hosting' },
    { path: '/my-emails', icon: FiMail, label: 'My Emails' },
    { path: '/invoices', icon: FiFileText, label: 'Invoices' },
    { path: '/support', icon: FiHelpCircle, label: 'Support' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 p-4">
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
};