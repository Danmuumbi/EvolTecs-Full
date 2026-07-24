import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/useAuth';
import { useTheme } from '../../context/ThemeContext/ThemeProvider';
import { useCart } from '../../context/CartContext/CartProvider';

import { 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon, 
  FiUser, 
  FiLogOut, 
  FiChevronDown,
  FiHome,
  FiServer,
  FiGlobe,
  FiCode,
  FiMail,
  FiPhone,
  FiShoppingCart
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { totalItems, toggleCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: FiHome },
    { name: 'Services', href: '/services', icon: FiCode, hasDropdown: true },
    { name: 'Hosting', href: '/hosting', icon: FiServer },
    { name: 'Domains', href: '/domains', icon: FiGlobe },
    { name: 'Support', href: '/contact', icon: FiPhone },
  ];

  const serviceDropdown = [
    { name: 'Software Development', href: '/services#software', icon: FiCode },
    { name: 'Web Hosting', href: '/hosting', icon: FiServer },
    { name: 'Domain Registration', href: '/domains', icon: FiGlobe },
    { name: 'Business Email', href: '/services#email', icon: FiMail },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30"
            >
              <span className="text-white font-bold text-2xl">E</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold gradient-text">EvolTechs</span>
              <span className="block text-[10px] text-gray-400 tracking-widest uppercase">Digital Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.hasDropdown ? (
                  <div
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="relative"
                  >
                    <button
                      className={`flex items-center space-x-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(link.href) || location.pathname.startsWith('/services')
                          ? 'text-accent-400 bg-white/5'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                      <FiChevronDown className={`w-3 h-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-64 glass-effect rounded-xl shadow-2xl shadow-primary-500/20 py-2 border border-white/10"
                        >
                          {serviceDropdown.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors"
                            >
                              <item.icon className="w-4 h-4 text-accent-400" />
                              <span className="text-sm text-gray-300 hover:text-white">{item.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`flex items-center space-x-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-accent-400 bg-white/5'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side - Cart, Theme toggle & Auth buttons */}
          <div className="flex items-center space-x-3">
            {/* Cart Button - ALWAYS VISIBLE */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 relative"
              aria-label="Open cart"
            >
              <FiShoppingCart className="w-5 h-5 text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </motion.button>

            {/* Theme Toggle - Always visible */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-indigo-400" />
              )}
            </motion.button>

            {/* Desktop Auth - Only visible when logged in/out */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-all duration-200"
                  >
                    <FiLogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary px-6 py-2.5 text-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="container-custom py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'bg-white/5 text-accent-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
              
              {/* Mobile Service sub-items */}
              {serviceDropdown.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 pl-10 pr-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10 space-y-3">
                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block btn-primary text-center"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 bg-red-600/20 text-red-400 rounded-lg text-center"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center text-gray-300 hover:text-white py-2.5"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block btn-primary text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};