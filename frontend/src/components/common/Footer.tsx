import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  // FiPhone, 
  // FiMapPin, 
  FiTwitter, 
  FiLinkedin, 
  FiGithub, 
  FiYoutube,
  FiSend,
  FiArrowUp,
  FiHeart,
  FiGlobe,
  FiCode,
  FiServer,
  FiShield,
  FiCloud,
  FiSmartphone,
  FiAward
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };

  const footerLinks = {
    'Solutions': [
      { name: 'Custom Software', href: '/services#software', icon: FiCode },
      { name: 'Web Hosting', href: '/hosting', icon: FiServer },
      { name: 'Domain Registration', href: '/domains', icon: FiGlobe },
      { name: 'Cloud Solutions', href: '/services#cloud', icon: FiCloud },
      { name: 'Mobile Apps', href: '/services#mobile', icon: FiSmartphone },
    ],
    'Company': [
      { name: 'About Us', href: '/about', icon: FiAward },
      { name: 'Careers', href: '/careers', icon: FiHeart },
      { name: 'Blog', href: '/blog', icon: FiCode },
      { name: 'Partners', href: '/partners', icon: FiShield },
      { name: 'Contact', href: '/contact', icon: FiMail },
    ],
    'Support': [
      { name: 'Help Center', href: '/support' },
      { name: 'Ticket System', href: '/support' },
      { name: 'Knowledge Base', href: '/knowledge' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Security', href: '/security' },
    ]
  };

  const socialLinks = [
    { icon: FiTwitter, href: '#', label: 'Twitter', color: 'hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5' },
    { icon: FiGithub, href: '#', label: 'GitHub', color: 'hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-500/5' },
    { icon: FiYoutube, href: '#', label: 'YouTube', color: 'hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/5' },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-white/5 overflow-hidden w-full">
      {/* Premium Ambient Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Mesh Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-15 pointer-events-none"></div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Layout Blocks */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
            
            {/* Brand Capsule Column */}
            <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start text-left">
              <Link to="/" className="flex items-center space-x-3 mb-5 group">
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-11 h-11 bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/10"
                >
                  <span className="text-slate-950 font-black text-xl tracking-tighter">E</span>
                </motion.div>
                <div>
                  <span className="text-xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">EvolTech</span>
                  <p className="text-[9px] text-slate-500 tracking-widest uppercase font-bold">Digital Solutions</p>
                </div>
              </Link>

              <p className="text-slate-400 text-sm font-normal leading-relaxed mb-6 max-w-sm">
                Empowering business structures with unified tech deployments. From responsive domain registration pipelines to dedicated enterprise custom core engineering.
              </p>

              {/* Dynamic Action Social Group */}
              <div className="flex items-center gap-2.5 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-400 transition-all duration-200 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>

              {/* Secure Newsletter Module */}
              <div className="w-full max-w-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Stay updated with our newsletter</p>
                <form onSubmit={handleSubmit} className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    className="w-full pl-4 pr-32 h-11 bg-slate-900/80 border border-white/5 rounded-xl text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-slate-900 transition-all shadow-inner"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 bg-white text-slate-950 text-xs font-bold rounded-lg hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow"
                  >
                    <FiSend className="w-3 h-3 text-slate-950" />
                    <span>Join</span>
                  </button>
                </form>
                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-xs font-medium mt-2 flex items-center gap-1"
                  >
                    <span>✓ Complete! You have been added to our feed registry.</span>
                  </motion.p>
                )}
              </div>
            </div>

            {/* Structured Link Matrices */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <div key={index} className="sm:col-span-1 text-left">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2" style={{ marginBottom: "0.6rem" }}>
                  <span className="w-1 h-3.5 bg-gradient-to-b from-indigo-500 to-cyan-400 rounded-full"></span>
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link, idx) => (
                    <motion.li 
                      key={idx}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white transition-colors duration-150 text-xs font-medium flex items-center gap-2 group"
                      >
                        {('icon' in link) && (
                          <link.icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                        )}
                        <span>{link.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>

        {/* Global Security Badges Ribbon */}
        <div className="py-5 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-semibold text-slate-500">
          <span className="flex items-center gap-2 hover:text-slate-400 transition-colors">
            <FiShield className="w-3.5 h-3.5 text-indigo-500/70" />
            End-to-End 256-Bit SSL Protection
          </span>
          <span className="flex items-center gap-2 hover:text-slate-400 transition-colors">
            <FiAward className="w-3.5 h-3.5 text-cyan-500/70" />
            ISO 27001 Data Architecture Standard
          </span>
          <span className="flex items-center gap-2 hover:text-slate-400 transition-colors">
            <FiHeart className="w-3.5 h-3.5 text-rose-500/70" />
            Continuous SLA Uptime Execution
          </span>
          <span className="flex items-center gap-2 hover:text-slate-400 transition-colors">
            <FiGlobe className="w-3.5 h-3.5 text-blue-500/70" />
            Anycast Node Network System
          </span>
        </div>

        {/* Lower Utility & Legal Copyright Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium order-2 sm:order-1">
            <span>&copy; {currentYear} EvolTech.</span>
            <span className="hidden xs:inline">All operational infrastructure reserves maintained.</span>
            {/* <span className="inline-flex items-center gap-1 ml-1 text-slate-400">
              Built with <FiHeart className="w-3 h-3 text-rose-500 animate-pulse" /> in Kenya
            </span> */}
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold order-1 sm:order-2">
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="text-slate-400 hover:text-white transition-colors">Cookies</Link>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl bg-slate-900 border border-white/5 transition-all duration-300 ${
                showScrollTop ? 'opacity-100 visibility-visible' : 'opacity-0 md:opacity-100'
              }`}
              aria-label="Scroll to top"
            >
              <FiArrowUp className="w-3.5 h-3.5 text-slate-400 hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>

      </div>

      {/* Responsive Floating Action Top Button on Mobile Devices */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:hidden z-50 p-3.5 rounded-full bg-indigo-600 shadow-xl shadow-indigo-600/20 text-white outline-none active:bg-indigo-500"
        >
          <FiArrowUp className="w-4 h-4 text-white" />
        </motion.button>
      )}
    </footer>
  );
};