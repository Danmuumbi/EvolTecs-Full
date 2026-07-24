import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from "../../components/seo/SEO";
import { 
  FiArrowRight, 
  FiCode, 
  FiServer, 
  FiGlobe, 
  FiMail, 
  FiShield,
  FiCloud,
  FiSmartphone,
  FiDatabase,
  FiCheckCircle,
  // FiZap,
  FiTrendingUp,
  FiUsers,
  FiClock,
  // FiAward,
  // FiLock,
  FiCpu,
  FiLayers,
  FiBox,
  // FiGrid,
  FiBarChart2,
  FiLifeBuoy
} from 'react-icons/fi';
import { useState } from 'react';

export const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'development', label: 'Development' },
    { id: 'hosting', label: 'Hosting & Domains' },
    { id: 'cloud', label: 'Cloud Solutions' },
    { id: 'support', label: 'Support & Security' },
  ];

  const services = [
    {
      id: 1,
      category: 'development',
      icon: FiCode,
      title: 'Custom Software Development',
      description: 'Tailored software solutions built with modern technologies to solve your unique business challenges.',
      features: [
        'Enterprise-grade applications',
        'Scalable microservices architecture',
        'API-first development',
        'Agile methodology'
      ],
      gradient: 'from-blue-500 to-cyan-400',
      iconBg: 'bg-blue-500/20',
      price: 'Custom Quote',
      popular: true
    },
    {
      id: 2,
      category: 'development',
      icon: FiSmartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      features: [
        'iOS & Android native apps',
        'Cross-platform (React Native, Flutter)',
        'App store optimization',
        'Continuous maintenance'
      ],
      gradient: 'from-purple-500 to-pink-400',
      iconBg: 'bg-purple-500/20',
      price: 'Custom Quote',
      popular: false
    },
    {
      id: 3,
      category: 'development',
      icon: FiDatabase,
      title: 'Database Design & Optimization',
      description: 'Expert database architecture, optimization, and management for peak performance.',
      features: [
        'Schema design & optimization',
        'Performance tuning',
        'Data migration services',
        'Real-time analytics'
      ],
      gradient: 'from-green-500 to-emerald-400',
      iconBg: 'bg-green-500/20',
      price: 'Custom Quote',
      popular: false
    },
    {
      id: 4,
      category: 'hosting',
      icon: FiServer,
      title: 'Premium Web Hosting',
      description: 'Reliable, fast, and secure hosting solutions optimized for performance and scalability.',
      features: [
        '99.9% uptime guarantee',
        'Free SSL certificates',
        '24/7 technical support',
        'Automatic backups'
      ],
      gradient: 'from-orange-500 to-yellow-400',
      iconBg: 'bg-orange-500/20',
      price: 'From $4.99/mo',
      popular: true
    },
    {
      id: 5,
      category: 'hosting',
      icon: FiGlobe,
      title: 'Domain Registration',
      description: 'Find and register your perfect domain name with competitive pricing and free privacy protection.',
      features: [
        '500+ TLDs available',
        'Free WHOIS privacy',
        'Domain transfer services',
        'DNS management'
      ],
      gradient: 'from-red-500 to-rose-400',
      iconBg: 'bg-red-500/20',
      price: 'From $8.99/yr',
      popular: false
    },
    {
      id: 6,
      category: 'hosting',
      icon: FiMail,
      title: 'Business Email Hosting',
      description: 'Professional email hosting with your domain name for enhanced credibility and brand trust.',
      features: [
        'Custom domain emails',
        'Advanced spam protection',
        '50GB+ storage',
        'Mobile & desktop sync'
      ],
      gradient: 'from-indigo-500 to-violet-400',
      iconBg: 'bg-indigo-500/20',
      price: 'From $2.99/mo',
      popular: false
    },
    {
      id: 7,
      category: 'cloud',
      icon: FiCloud,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud infrastructure and migration services to modernize your business operations.',
      features: [
        'AWS, Azure, GCP expertise',
        'Cloud migration strategy',
        'Cost optimization',
        'Container orchestration'
      ],
      gradient: 'from-cyan-500 to-teal-400',
      iconBg: 'bg-cyan-500/20',
      price: 'Custom Quote',
      popular: true
    },
    {
      id: 8,
      category: 'cloud',
      icon: FiBox,
      title: 'DevOps & CI/CD',
      description: 'Automated deployment pipelines and DevOps practices for faster, reliable software delivery.',
      features: [
        'CI/CD pipeline setup',
        'Infrastructure as Code',
        'Monitoring & logging',
        'Automated testing'
      ],
      gradient: 'from-pink-500 to-rose-400',
      iconBg: 'bg-pink-500/20',
      price: 'Custom Quote',
      popular: false
    },
    {
      id: 9,
      category: 'support',
      icon: FiShield,
      title: 'Cybersecurity Services',
      description: 'Comprehensive security solutions to protect your digital assets and maintain compliance.',
      features: [
        'Penetration testing',
        'Security audits',
        'Compliance assessment',
        'Incident response'
      ],
      gradient: 'from-lime-500 to-green-400',
      iconBg: 'bg-lime-500/20',
      price: 'Custom Quote',
      popular: false
    },
    {
      id: 10,
      category: 'support',
      icon: FiLifeBuoy,
      title: '24/7 Technical Support',
      description: 'Round-the-clock technical support to ensure your systems run smoothly and issues are resolved quickly.',
      features: [
        '24/7 availability',
        'SLA-backed response times',
        'Multi-channel support',
        'Expert technical team'
      ],
      gradient: 'from-amber-500 to-orange-400',
      iconBg: 'bg-amber-500/20',
      price: 'Included',
      popular: true
    },
    {
      id: 11,
      category: 'development',
      icon: FiCpu,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions leveraging artificial intelligence and machine learning to transform your business.',
      features: [
        'Custom AI models',
        'Data analytics & insights',
        'Predictive modeling',
        'Automation solutions'
      ],
      gradient: 'from-violet-500 to-purple-400',
      iconBg: 'bg-violet-500/20',
      price: 'Custom Quote',
      popular: false
    },
    {
      id: 12,
      category: 'cloud',
      icon: FiBarChart2,
      title: 'Data Analytics & BI',
      description: 'Transform your data into actionable insights with powerful business intelligence solutions.',
      features: [
        'Data warehousing',
        'Dashboard development',
        'Real-time analytics',
        'Predictive insights'
      ],
      gradient: 'from-rose-500 to-pink-400',
      iconBg: 'bg-rose-500/20',
      price: 'Custom Quote',
      popular: false
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: FiCheckCircle },
    { number: '98%', label: 'Client Satisfaction', icon: FiTrendingUp },
    { number: '50+', label: 'Expert Team Members', icon: FiUsers },
    { number: '24/7', label: 'Support Available', icon: FiClock },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden pt-20">

       <SEO
      title="Software & Digital Solutions | EvolTechs"
      description="Explore software development, cloud solutions, cybersecurity, AI and other digital technology solutions from EvolTechs Software Solutions."
      canonical="https://evoltecs.com/services"
    />

    <div></div>
     {/* Hero Section */}
<section className="relative py-24 md:py-32 overflow-hidden">

  {/* Deep base background */}
  <div className="absolute inset-0 bg-[#080b14]"></div>

  {/* Large ambient technology glow */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">

    <div className="absolute top-[-25%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

    <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[160px]" />

    <div className="absolute bottom-[-40%] left-[35%] w-[600px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />

  </div>

  {/* Technical grid */}
  <div
    className="
      absolute inset-0
      opacity-[0.12]
      pointer-events-none
      [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
      [background-size:70px_70px]
      [mask-image:linear-gradient(to_bottom,black,transparent)]
    "
  />

  {/* Abstract network lines */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">

    <motion.div
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
        opacity: [0.2, 0.45, 0.2],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        absolute
        top-[15%]
        left-[8%]
        w-[500px]
        h-[300px]
        border-t
        border-l
        border-cyan-400/20
        rounded-[40%]
        rotate-[-18deg]
      "
    />

    <motion.div
      animate={{
        x: [0, -40, 0],
        y: [0, 25, 0],
        opacity: [0.15, 0.4, 0.15],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        absolute
        top-[5%]
        right-[5%]
        w-[550px]
        h-[350px]
        border-r
        border-b
        border-purple-400/20
        rounded-[40%]
        rotate-[20deg]
      "
    />

  </div>

  {/* Floating technology nodes */}
  <div className="absolute inset-0 pointer-events-none">

    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute top-[22%] left-[15%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
    />

    <motion.div
      animate={{ y: [0, 20, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute top-[35%] right-[18%] w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
    />

    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute bottom-[25%] left-[25%] w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
    />

  </div>

  {/* Bottom fade */}
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />

  {/* Hero Content */}
  <div className="container-custom relative z-10 text-center">

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >

      <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 border border-accent-400/20 px-4 py-2 rounded-full mb-6">

        <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>

        Our Services

      </span>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">

        Digital Solutions for

        <br />

        <span className="gradient-text">
          Modern Business
        </span>

      </h1>

      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">

        From custom software development to cloud infrastructure,
        we engineer the technology that helps ambitious businesses
        build, scale, and move forward.

      </p>

    </motion.div>

  </div>

</section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-transparent to-primary-900/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 text-center"
              >
                <stat.icon className="w-6 h-6 text-accent-400 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 sticky top-20 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="glass-effect rounded-2xl p-6 h-full hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 border border-white/5 hover:border-accent-400/20">
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-accent-400 to-primary-500 rounded-full text-xs font-medium text-white shadow-lg shadow-accent-400/30">
                      Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-7 h-7 text-white bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <FiCheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-sm font-semibold text-accent-400">
                      {service.price}
                    </span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm text-white hover:text-accent-400 transition-colors group-hover:gap-3"
                    >
                      Learn More
                      <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How We <span className="gradient-text">Work</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A transparent, collaborative approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', description: 'We understand your needs and goals', icon: FiUsers },
              { step: '02', title: 'Planning', description: 'Strategic planning and architecture design', icon: FiLayers },
              { step: '03', title: 'Development', description: 'Agile development with regular feedback', icon: FiCode },
              { step: '04', title: 'Launch & Support', description: 'Deployment and ongoing maintenance', icon: FiLifeBuoy },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-accent-400" />
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent-400/50 to-transparent"></div>
                  )}
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a solution that drives your business forward
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                Get a Free Quote
                <FiArrowRight />
              </Link>
              <Link to="/domains" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                Search Domains
                <FiGlobe />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};