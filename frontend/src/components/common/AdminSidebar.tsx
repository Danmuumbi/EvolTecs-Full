import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiGlobe, FiServer, FiCreditCard, FiHelpCircle } from 'react-icons/fi';

export const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/domains', icon: FiGlobe, label: 'Domains' },
    { path: '/admin/hosting', icon: FiServer, label: 'Hosting' },
    { path: '/admin/payments', icon: FiCreditCard, label: 'Payments' },
    { path: '/admin/support', icon: FiHelpCircle, label: 'Support' },
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