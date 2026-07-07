import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiServer, 
  FiCheckCircle, 
  FiArrowRight,
  FiShield,
  FiClock,
  FiUsers,
  FiAward,
  FiZap,
  FiDatabase,
  FiGlobe,
  FiMail,
  FiLock,
  FiRefreshCw,
  FiTrendingUp,
  FiCpu,
  FiHardDrive,
  FiCloud,
  FiBox
} from 'react-icons/fi';
import { useState } from 'react';

export const Hosting = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const hostingPlans = [
    {
      id: 1,
      name: 'Starter',
      icon: FiBox,
      price: { monthly: 4.99, yearly: 49.99 },
      description: 'Perfect for small websites and beginners',
      features: [
        '1 Website',
        '10 GB SSD Storage',
        '50 GB Bandwidth',
        'Free SSL Certificate',
        'Email Accounts: 5',
        '24/7 Support',
        'cPanel Control Panel'
      ],
      gradient: 'from-blue-500 to-cyan-400',
      popular: false,
      badge: null
    },
    {
      id: 2,
      name: 'Professional',
      icon: FiServer,
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Ideal for growing businesses and professionals',
      features: [
        '10 Websites',
        '50 GB SSD Storage',
        '200 GB Bandwidth',
        'Free SSL Certificate',
        'Email Accounts: 50',
        '24/7 Priority Support',
        'cPanel Control Panel',
        'Daily Backups',
        'CDN Included'
      ],
      gradient: 'from-purple-500 to-pink-400',
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 3,
      name: 'Business',
      icon: FiCloud,
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'For businesses requiring advanced features',
      features: [
        'Unlimited Websites',
        '100 GB SSD Storage',
        '500 GB Bandwidth',
        'Free SSL Certificate',
        'Email Accounts: Unlimited',
        '24/7 Premium Support',
        'cPanel Control Panel',
        'Daily Backups',
        'CDN Included',
        'Advanced Security',
        'Dedicated IP'
      ],
      gradient: 'from-green-500 to-emerald-400',
      popular: false,
      badge: 'Best Value'
    },
    {
      id: 4,
      name: 'Enterprise',
      icon: FiCpu,
      price: { monthly: 49.99, yearly: 499.99 },
      description: 'For high-traffic websites and enterprises',
      features: [
        'Unlimited Websites',
        '500 GB SSD Storage',
        'Unlimited Bandwidth',
        'Free SSL Certificate',
        'Email Accounts: Unlimited',
        '24/7 VIP Support',
        'cPanel Control Panel',
        'Hourly Backups',
        'CDN Included',
        'Advanced Security',
        'Dedicated IP',
        'Managed WordPress',
        'Custom Server Config'
      ],
      gradient: 'from-orange-500 to-yellow-400',
      popular: false,
      badge: 'Premium'
    }
  ];

  const hostingFeatures = [
    { icon: FiZap, title: 'Lightning Fast Speed', description: 'Optimized servers with SSD storage' },
    { icon: FiShield, title: 'Secure & Reliable', description: 'Advanced security and monitoring' },
    { icon: FiClock, title: '99.9% Uptime', description: 'Guaranteed uptime for your website' },
    { icon: FiUsers, title: '24/7 Support', description: 'Expert support whenever you need it' },
  ];

  const additionalFeatures = [
    { icon: FiDatabase, title: 'SSD Storage', description: 'High-performance SSD storage' },
    { icon: FiGlobe, title: 'Free SSL', description: 'Secure your website with HTTPS' },
    { icon: FiMail, title: 'Email Hosting', description: 'Professional email accounts' },
    { icon: FiLock, title: 'DDoS Protection', description: 'Protection against attacks' },
    { icon: FiRefreshCw, title: 'Daily Backups', description: 'Automatic daily backups' },
    { icon: FiTrendingUp, title: 'SEO Tools', description: 'Built-in SEO optimization tools' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-primary-900/10 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
              Web Hosting
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Fast, Secure & <span className="gradient-text">Reliable</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Choose the perfect hosting plan for your website. 
              From small blogs to enterprise applications, we've got you covered.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 glass-effect rounded-xl p-2 backdrop-blur-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-accent-400 text-white text-[8px] rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hosting Plans */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border relative ${
                  plan.popular 
                    ? 'border-accent-400/40 shadow-xl shadow-accent-400/10' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-400 to-primary-500 rounded-full text-xs font-medium text-white shadow-lg shadow-accent-400/30">
                    {plan.badge}
                  </div>
                )}

                {/* Plan Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.gradient} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                    <plan.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div className="text-xs text-accent-400 mt-0.5">
                      Save {Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100)}%
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <FiCheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  Get Started
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-primary-900/10 to-[#0a0a0a]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
              Why Host With Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for <span className="gradient-text">Performance</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              All the features you need to build, grow, and scale your online presence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400/20 to-primary-400/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-accent-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
              Advanced Features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Premium <span className="gradient-text">Features Included</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every hosting plan comes with powerful features to help you succeed online
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-accent-400 mx-auto mb-2" />
                <h4 className="text-sm font-medium text-white">{feature.title}</h4>
                <p className="text-[10px] text-gray-500 mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Launch Your <span className="gradient-text">Website?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose your hosting plan and get started with EvolTech today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/domains" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                Find Your Domain
                <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                Talk to Expert
                <FiUsers />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};