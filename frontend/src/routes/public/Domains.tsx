import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiClient } from '../../api/client';
import SEO from "../../components/seo/SEO";
import { 
  FiSearch, 
  FiGlobe, 
  FiArrowRight,
  FiShield,
  FiLock,
  FiRefreshCw,
  FiDollarSign,
  FiShoppingCart,
  FiLoader,
  FiAlertCircle
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext/CartProvider';
import toast from 'react-hot-toast';

export const Domains = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  const popularTLDs = [
    { name: '.com', price: 'KSH 1,100', popular: true, color: 'from-blue-400 to-blue-600' },
    { name: '.ke', price: 'KSH 1,200', popular: true, color: 'from-green-400 to-green-600' },
    { name: '.org', price: 'KSH 800', popular: true, color: 'from-purple-400 to-purple-600' },
    { name: '.net', price: 'KSH 1,000', popular: false, color: 'from-red-400 to-red-600' },
    { name: '.tech', price: 'KSH 1,400', popular: false, color: 'from-cyan-400 to-cyan-600' },
    { name: '.cloud', price: 'KSH 1,600', popular: false, color: 'from-indigo-400 to-indigo-600' },
    { name: '.io', price: 'KSH 1,800', popular: false, color: 'from-pink-400 to-pink-600' },
    { name: '.app', price: 'KSH 1,500', popular: false, color: 'from-yellow-400 to-yellow-600' },
    { name: '.co', price: 'KSH 1,100', popular: false, color: 'from-orange-400 to-orange-600' },
    { name: '.online', price: 'KSH 1,300', popular: false, color: 'from-teal-400 to-teal-600' },
    { name: '.shop', price: 'KSH 1,700', popular: false, color: 'from-rose-400 to-rose-600' },
    { name: '.dev', price: 'KSH 1,900', popular: false, color: 'from-violet-400 to-violet-600' },
  ];

  const domainFeatures = [
    { icon: FiShield, title: 'Free Privacy Protection', description: 'Keep your personal information private' },
    { icon: FiLock, title: 'SSL Certificate Included', description: 'Secure your website with HTTPS' },
    { icon: FiRefreshCw, title: 'Easy Transfer', description: 'Transfer your domain in minutes' },
    { icon: FiDollarSign, title: 'Competitive Pricing', description: 'Best prices with no hidden fees' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔍 Search triggered for:', searchQuery);
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a domain name');
      return;
    }

    setIsSearching(true);
    setError(null);
    setShowResults(false);

    try {
      console.log('📡 Calling API...');
      const response = await apiClient.get('/domains/search', {
        params: {
          query: searchQuery.trim(),
        },
      });
      
      console.log('📊 API Response:', response.data);
      
      setSearchResults(response.data.results || []);
      setShowResults(true);
      
      if (response.data.results?.length === 0) {
        toast('No domains found', {
          icon: '🔍',
        });
      }
    } catch (error: any) {
      console.error('❌ Search error:', error);
      setError(error.response?.data?.message || 'Failed to search domains. Please try again.');
      toast.error('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleTLDClick = (tld: string) => {
    setSearchQuery(searchQuery + tld);
  };

  const handleAddToCart = (result: any) => {
    // ✅ Ensure price is a number
    const price = typeof result.price === 'string' ? parseFloat(result.price) : (result.price || 0);
    
    addItem({
      id: `domain-${result.domain}`,
      type: 'domain',
      name: result.domain,
      price: price,
      quantity: 1,
      details: {
        domain: result.domain,
        tld: result.tld,
        price: result.price
      }
    });
  };

  console.log('📄 Domains page rendering');

  return (
    <div className="min-h-screen overflow-x-hidden pt-20 bg-[#0a0a0a]">

      <SEO
  title="Domain Search & Registration | EvolTechs"
  description="Search and register your perfect domain name with EvolTechs Software Solutions. Find the right domain for your business, brand or online project."
  canonical="https://evoltecs.com/domains"
/>
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
              Find Your Perfect Domain
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Claim Your <span className="gradient-text">Digital Identity</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Search for the perfect domain name for your business, brand, or project.
              Your online journey starts here.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="glass-effect rounded-2xl p-2 flex flex-col sm:flex-row gap-2 backdrop-blur-xl">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for your domain..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="btn-primary px-8 py-4 whitespace-nowrap flex items-center justify-center gap-2 min-w-[180px]"
                >
                  {isSearching ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FiGlobe className="w-5 h-5" />
                      Search Domain
                    </>
                  )}
                </button>
              </form>

              {/* Popular TLDs */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {popularTLDs.slice(0, 6).map((tld) => (
                  <button
                    key={tld.name}
                    onClick={() => handleTLDClick(tld.name)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      tld.popular 
                        ? 'bg-accent-400/20 text-accent-400 hover:bg-accent-400/30 border border-accent-400/30' 
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {tld.name}
                    <span className="ml-2 text-xs opacity-60">{tld.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && (
        <section className="py-12 bg-[#0a0a0a]">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Search Results for <span className="text-accent-400">"{searchQuery}"</span>
                </h3>
                <span className="text-sm text-gray-400">{searchResults.length} results</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <FiAlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-gray-400">No domains found. Try a different search.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex-wrap gap-2"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${result.available ? 'from-accent-400 to-primary-400' : 'from-gray-600 to-gray-400'} flex items-center justify-center`}>
                          <FiGlobe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-lg font-medium text-white">{result.domain}</span>
                          {result.available && (
                            <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Available</span>
                          )}
                          {!result.available && (
                            <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">Taken</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-sm font-semibold text-accent-400">
                          {/* ✅ FIX: Convert price to number before toFixed */}
                          KSH {result.price ? Number(result.price).toFixed(0) : '0'}/yr
                        </span>
                        {result.available ? (
                          <button
                            onClick={() => handleAddToCart(result)}
                            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 flex items-center gap-2"
                          >
                            <FiShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        ) : (
                          <span className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                            Taken
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-8">
          <div className="container-custom">
            <div className="glass-effect rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3 text-red-400">
                <FiAlertCircle className="w-6 h-6" />
                <p>{error}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-primary-900/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need for <span className="gradient-text">Your Domain</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get more than just a domain name. Enjoy premium features and services with every registration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domainFeatures.map((feature, index) => (
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

      {/* Pricing Section */}
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
              Popular TLDs
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Competitive <span className="gradient-text">Domain Pricing</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find the perfect domain at the right price with no hidden fees
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularTLDs.map((tld, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`text-2xl font-bold bg-gradient-to-r ${tld.color} bg-clip-text text-transparent`}>
                  {tld.name}
                </div>
                <div className="text-xl font-bold text-white mt-2">{tld.price}</div>
                <div className="text-xs text-gray-500">per year</div>
                {tld.popular && (
                  <div className="mt-2 px-2 py-0.5 bg-accent-400/20 text-accent-400 text-xs rounded-full inline-block">
                    Popular
                  </div>
                )}
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
              Start with a domain name and build your online presence today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/hosting" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                Explore Hosting
                <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                Need Help?
                <FiGlobe />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};