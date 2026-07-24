import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from "../../components/seo/SEO";
import OrganizationSchema from "../../components/seo/OrganizationSchema";
import WebsiteSchema from "../../components/seo/WebsiteSchema";
import { 
  FiArrowRight, 
  FiServer, 
  FiGlobe, 
  FiMail, 
  FiCode, 
  FiShield,
  FiCloud,
  FiSmartphone,
  FiDatabase,
  FiCheckCircle,
  // FiPlay,
  FiSearch,
  FiHeadphones,
  FiLayers,
  FiTrendingUp,
  FiZap,
  FiSun,
} from 'react-icons/fi';
import { 
  SiReact, 
  SiNodedotjs, 
  SiTypescript, 
  SiPostgresql, 
  SiTailwindcss, 
  SiPython,
  SiAmazonaws,
  SiDocker,
  SiVuedotjs,
  SiMongodb,
  SiGraphql,
  SiNextdotjs,
  SiFirebase,
  SiKubernetes,
  SiRedis,
  SiSpring
} from 'react-icons/si';
import { useRef, useState } from 'react';
import { apiClient } from "../../api/client";

export const Home = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState("");
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const handleDomainSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    try {
      setIsSearching(true);
      setSearchError("");
      setResults([]);

      // const response = await apiClient.get(
      //   `/domains/search?domain=${encodeURIComponent(searchQuery)}`
      // );

      const response = await apiClient.get(
  `/domains/search?query=${encodeURIComponent(searchQuery)}`
);

      setResults(response.data.results);

    } catch (err: any) {

      console.error(err);

      setSearchError(
        err.response?.data?.message ||
        "Unable to search domains."
      );

    } finally {

      setIsSearching(false);

    }
  };

  const services = [
    {
      icon: FiCode,
      title: 'Custom Software Development',
      description: 'Tailored software solutions built with modern technologies to solve your unique business challenges.',
      features: ['Web Applications', 'Mobile Apps', 'Enterprise Solutions', 'API Development'],
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: FiGlobe,
      title: 'Domain Registration',
      description: 'Find and register your perfect domain name with competitive pricing and free privacy protection.',
      features: ['Domain Search', 'Transfer Domains', 'DNS Management', 'SSL Certificates'],
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      icon: FiServer,
      title: 'Web Hosting',
      description: 'Reliable, fast, and secure hosting solutions optimized for performance and scalability.',
      features: ['Shared Hosting', 'VPS Hosting', 'Cloud Hosting', 'Managed Services'],
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      icon: FiMail,
      title: 'Business Email',
      description: 'Professional email hosting with your domain name for enhanced credibility and brand trust.',
      features: ['Custom Domains', 'Spam Protection', 'Large Storage', 'Mobile Access'],
      gradient: 'from-orange-500 to-yellow-400'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      features: ['iOS Apps', 'Android Apps', 'Cross-Platform', 'App Maintenance'],
      gradient: 'from-red-500 to-rose-400'
    },
    {
      icon: FiCloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to modernize your business operations.',
      features: ['Cloud Migration', 'DevOps', 'AWS/Azure/GCP', 'Containerization'],
      gradient: 'from-indigo-500 to-violet-400'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Expert Team' },
    { number: '24/7', label: 'Support Available' }
  ];

  const expertise = [
    { icon: FiDatabase, label: 'Full-Stack Development', color: 'text-blue-400' },
    { icon: FiCode, label: 'UI/UX Design', color: 'text-purple-400' },
    { icon: FiCloud, label: 'Cloud Architecture', color: 'text-cyan-400' },
    { icon: FiShield, label: 'Cybersecurity', color: 'text-green-400' },
  ];

  const techStack = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'AWS', icon: SiAmazonaws, color: '#FF9900' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
    { name: 'Spring Boot', icon: SiSpring, color: '#6DB33F' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  ];

  const popularTLDs = [
    { tld: '.com', price: '$9.99', popular: true },
    { tld: '.ke', price: '$12.99', popular: true },
    { tld: '.org', price: '$8.99', popular: false },
    { tld: '.net', price: '$10.99', popular: false },
    { tld: '.tech', price: '$14.99', popular: false },
    { tld: '.cloud', price: '$16.99', popular: false },
    { tld: '.io', price: '$18.99', popular: false },
    { tld: '.app', price: '$15.99', popular: false },
  ];

  

  return (


    
    <div className="min-h-screen overflow-x-hidden">


      <SEO
  title="EvolTechs | Software, Hosting, Domains & Digital Solutions"
  description="EvolTechs provides custom software development, domain registration, web hosting, business email, cloud solutions, cybersecurity and AI services for businesses ready to grow digitally."
  canonical="https://evoltecs.com/"
/>

<OrganizationSchema />
<WebsiteSchema />

   {/* Premium Technology Hero Section */}
<section
  ref={targetRef}
  className="relative min-h-screen overflow-hidden bg-[#080b14]"
>
  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">

    {/* Technology Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/background.jpeg')"
      }}
    />

    {/* Dark overlay to blend image with the website */}
    <div className="absolute inset-0 bg-[#080b14]/75" />

    {/* Soft blue/cyan atmospheric glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#080b14]/80 via-transparent to-[#05070c]/90" />

    {/* Subtle color atmosphere */}
    <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />

    <div className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/[0.05] blur-[170px]" />

    {/* Smooth transition into the next section */}
    <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#080b14] via-[#080b14]/70 to-transparent" />

  </div>


  {/* HERO CONTENT */}
  <motion.div
    style={{ opacity, scale }}
    className="relative z-10 container-custom w-full pt-28 pb-16 sm:pt-32 sm:pb-20 lg:py-40"
  >

    {/* MAIN HERO */}
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">


      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center lg:text-left"
      >

        {/* Label */}
        <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">

          {/* <span className="w-8 sm:w-10 h-px bg-cyan-400" /> */}

          <span className="text-cyan-300 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs font-semibold">
            Software & Digital Solutions
          </span>

        </div>


        {/* Heading */}
        <h1 className="text-[3.2rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 sm:mb-8">

          <span className="block text-white">
            Build Digital
          </span>

          <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Scale & Thrive
          </span>

        </h1>


        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
          We provide the technology, infrastructure, and digital expertise businesses need to launch, grow, and scale with confidence.
        </p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 sm:gap-4">

          <Link
            to="/services"
            className="btn-primary w-full sm:w-auto inline-flex justify-center items-center gap-2 text-base sm:text-lg px-7 sm:px-8 py-3.5 sm:py-4 group"
          >
            Explore Our Services

            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>


          <Link
            to="/contact"
            className="btn-secondary w-full sm:w-auto inline-flex justify-center items-center gap-2 text-base sm:text-lg px-7 sm:px-8 py-3.5 sm:py-4"
          >
            Start Your Project
          </Link>

        </div>

      </motion.div>


      {/* RIGHT TECHNOLOGY VISUAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative hidden sm:flex items-center justify-center h-[360px] md:h-[440px] lg:min-h-[560px]"
      >

        {/* Logo glow */}
        <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-cyan-400/[0.08] blur-[80px] lg:blur-[110px]" />


        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[470px] lg:h-[470px] rounded-full border border-cyan-400/20"
        />


        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[215px] h-[215px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-blue-400/20 border-dashed"
        />


        {/* E LOGO */}
        <div className="relative z-10 w-[190px] h-[190px] sm:w-[270px] sm:h-[270px] lg:w-[380px] lg:h-[380px] rounded-full flex items-center justify-center">

          <div className="absolute inset-0 rounded-full bg-cyan-400/15 blur-3xl" />

          <div className="relative w-full h-full rounded-full border-2 border-cyan-200/70 bg-gradient-to-br from-[#172536]/95 to-[#080b14]/95 shadow-[0_0_60px_rgba(34,211,238,0.25)] flex items-center justify-center overflow-hidden">

            <div className="absolute inset-6 sm:inset-8 rounded-full border border-cyan-400/15" />

            <div className="absolute inset-10 sm:inset-14 rounded-full border border-blue-400/15" />

            <div className="relative z-10 text-[115px] sm:text-[165px] lg:text-[230px] font-black italic leading-none text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              E
            </div>

            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />

          </div>

        </div>


        {/* Floating nodes */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-[8%] right-[12%] w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyan-300 shadow-[0_0_22px_#67e8f9]"
        />


        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-[10%] left-[10%] w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-400 shadow-[0_0_22px_#60a5fa]"
        />

      </motion.div>

    </div>


    {/* STATS */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mt-10 sm:mt-16 lg:mt-20"
    >

      {stats.map((stat, index) => (

        <div
          key={index}
          className="border border-white/10 bg-[#080b14]/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:border-cyan-400/30 transition-colors"
        >

          <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-1">
            {stat.number}
          </div>

          <div className="text-[11px] sm:text-sm text-gray-400">
            {stat.label}
          </div>

        </div>

      ))}

    </motion.div>

  </motion.div>

</section>

      {/* Expertise Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-primary-900/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              What Makes Us <span className="gradient-text">Different</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Combining technical excellence with creative innovation to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color.replace('text', 'from')}/20 to-transparent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-white font-semibold">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      

      {/* Domain Search Section - Premium Version */}
      <section className="py-24 bg-gradient-to-b from-primary-900/30 via-primary-900/10 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
                Find Your Perfect Domain
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Start Your <span className="gradient-text">Online Journey</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Search thousands of domain extensions instantly and secure your online identity.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-6 md:p-8 lg:p-10 backdrop-blur-xl border border-white/5">
              <form onSubmit={handleDomainSearch} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your perfect domain..."
                    className="w-full pl-12 pr-4 py-4 md:py-5 bg-white/5 border border-white/10 rounded-xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 transition-all duration-300"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="btn-primary px-8 py-4 md:py-5 whitespace-nowrap flex items-center justify-center gap-2 text-lg min-w-[180px]"
                >
                  {isSearching ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
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

              {searchError && (
                <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400">
                  {searchError}
                </div>
              )}

              {results.length > 0 && (
                <div className="mt-8 space-y-3">
                  {results.map((item) => (
                    <div
                      key={item.domain}
                      className="flex justify-between items-center bg-white/5 rounded-xl p-5 border border-white/5"
                    >
                      <div>
                        <h4 className="text-white font-semibold">
                          {item.domain}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {item.available
                            ? "Available"
                            : "Already Registered"}
                        </p>
                      </div>
                      <div className="text-right">
                        {item.available ? (
                          <>
                            <div className="text-accent-400 font-bold">
                              ${item.price}
                            </div>
                            <button
                              className="btn-primary mt-2 px-5 py-2 text-sm"
                            >
                              Register
                            </button>
                          </>
                        ) : (
                          <span className="text-red-400 font-medium">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <p className="text-sm text-gray-400 mb-4 text-center">Popular domain extensions</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {popularTLDs.map((tld) => (
                    <button
                      key={tld.tld}
                      onClick={() => setSearchQuery(searchQuery + tld.tld)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                        tld.popular 
                          ? 'bg-accent-400/20 text-accent-400 hover:bg-accent-400/30 border border-accent-400/30' 
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {tld.tld}
                      <span className="ml-2 text-xs opacity-60">{tld.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              Comprehensive <span className="gradient-text">Digital Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end services to power your digital success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <FiCheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Businesses Choose EvolTechs */}
<section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
  {/* Background atmosphere */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
  </div>

  <div className="container-custom relative z-10">

    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <span className="text-sm font-medium text-accent-400 uppercase tracking-wider">
        Why EvolTechs
      </span>

      <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-5">
        Technology That Moves Your
        <span className="gradient-text"> Business Forward</span>
      </h2>

      <p className="text-gray-400 text-lg leading-relaxed">
        We combine engineering expertise, reliable infrastructure, and
        business-focused thinking to create technology that works for your
        goals — not just technology that looks impressive.
      </p>
    </motion.div>

    {/* Value Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {[
        {
          icon: FiZap,
          number: '01',
          title: 'Built for Performance',
          description:
            'Fast, reliable digital products engineered to perform smoothly as your users and business grow.',
        },
        {
          icon: FiLayers,
          number: '02',
          title: 'One Technology Partner',
          description:
            'From domains and hosting to custom software and cloud infrastructure, everything can work together under one roof.',
        },
        {
          icon: FiTrendingUp,
          number: '03',
          title: 'Designed to Scale',
          description:
            'We build with your future in mind, making it easier to expand, improve, and grow without rebuilding everything.',
        },
        {
          icon: FiHeadphones,
          number: '04',
          title: 'Human Support',
          description:
            'You get real technical support from people who understand your systems, your goals, and your business.',
        },
      ].map((item, index) => (
        <motion.div
          key={item.number}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
          }}
          viewport={{ once: true }}
          className="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500"
        >

          {/* Number */}
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center">
              <item.icon className="w-6 h-6 text-accent-400" />
            </div>

            <span className="text-sm font-bold text-white/20 group-hover:text-accent-400/50 transition-colors">
              {item.number}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors">
            {item.title}
          </h3>

          <p className="text-gray-400 leading-relaxed text-sm">
            {item.description}
          </p>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      ))}

    </div>

    {/* Bottom Statement */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="mt-14 flex flex-col md:flex-row items-center justify-center gap-4 text-center"
    >
      <div className="flex items-center gap-2 text-gray-300">
        <FiCheckCircle className="text-accent-400 w-5 h-5" />
        <span>Built around your goals</span>
      </div>

      <span className="hidden md:block text-gray-600">•</span>

      <div className="flex items-center gap-2 text-gray-300">
        <FiCheckCircle className="text-accent-400 w-5 h-5" />
        <span>Designed for long-term growth</span>
      </div>

      <span className="hidden md:block text-gray-600">•</span>

      <div className="flex items-center gap-2 text-gray-300">
        <FiCheckCircle className="text-accent-400 w-5 h-5" />
        <span>Supported by real people</span>
      </div>
    </motion.div>

  </div>
</section>


      {/* From Idea to Impact Section */}
      <section className="py-24 relative overflow-hidden bg-[#0a0a0a]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="container-custom relative z-10">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider">
              How We Work
            </span>

            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-5">
              Great Digital Products
              <br />
              <span className="gradient-text">Don't Happen by Accident</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you are starting with an idea, launching a business,
              or scaling an existing operation, we turn complexity into
              technology that works for you.
            </p>
          </motion.div>

          {/* Journey */}
          <div className="relative">

            {/* Connecting Line - Desktop */}
            <div className="hidden lg:block absolute top-[72px] left-[12%] right-[12%] h-px bg-gradient-to-r from-primary-500/10 via-accent-400/50 to-primary-500/10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-7 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-accent-400/50 transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-primary-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <FiSun className="relative z-10 w-7 h-7 text-accent-400" />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-accent-400 tracking-widest">
                    01
                  </span>

                  <h3 className="text-xl font-bold text-white mt-2 mb-3">
                    Understand
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    We start by understanding your goals, your challenges,
                    and what success looks like for your business.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-7 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-accent-400/50 transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-primary-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <FiLayers className="relative z-10 w-7 h-7 text-accent-400" />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-accent-400 tracking-widest">
                    02
                  </span>

                  <h3 className="text-xl font-bold text-white mt-2 mb-3">
                    Design
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    We create a clear strategy and design the right digital
                    solution around your users and your objectives.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-7 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-accent-400/50 transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-primary-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <FiZap className="relative z-10 w-7 h-7 text-accent-400" />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-accent-400 tracking-widest">
                    03
                  </span>

                  <h3 className="text-xl font-bold text-white mt-2 mb-3">
                    Build
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our engineers turn the strategy into reliable software,
                    infrastructure, websites, and digital experiences.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative z-10 w-16 h-16 mx-auto mb-7 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-accent-400/50 transition-all duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-primary-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <FiTrendingUp className="relative z-10 w-7 h-7 text-accent-400" />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-accent-400 tracking-widest">
                    04
                  </span>

                  <h3 className="text-xl font-bold text-white mt-2 mb-3">
                    Evolve
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    We help you improve, scale, and keep moving as your
                    business and technology continue to grow.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Bottom Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center">
                <FiCheckCircle className="w-5 h-5 text-accent-400" />
              </div>

              <div>
                <p className="text-white font-semibold">
                  Technology with purpose
                </p>

                <p className="text-gray-500 text-sm">
                  Built around your goals, not just the latest trend.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-accent-400 hover:text-white font-semibold transition-colors group"
            >
              Let's build something meaningful
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Tech Stack Section - Professional Version */}
      <section className="py-24 bg-gradient-to-b from-primary-900/5 via-[#0a0a0a] to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
              Our Technology Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
              Built With <span className="gradient-text">Modern Technologies</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We leverage the latest and most reliable technologies to build robust, scalable solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="glass-effect rounded-xl p-4 text-center group hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 border border-white/5 hover:border-white/10"
              >
                <div className="flex items-center justify-center mb-3">
                  <tech.icon 
                    className="w-10 h-10 transition-all duration-300 group-hover:scale-110" 
                    style={{ color: tech.color }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Build Your <span className="gradient-text">Digital Future?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something extraordinary together
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 shadow-2xl shadow-primary-500/30">
                Start Your Project
                <FiArrowRight />
              </Link>
              <Link to="/services" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};