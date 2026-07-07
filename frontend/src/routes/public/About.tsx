import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCode, 
  FiUsers, 
  FiAward, 
  FiGlobe,
  FiHeart,
  FiTarget,
  FiEye,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiBriefcase,
  FiBook,
  FiCoffee,
  FiSmile,
  FiStar
} from 'react-icons/fi';
import { useRef } from 'react';

export const About = () => {
  // const targetRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      icon: FiCode,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technology and creative thinking to solve complex problems.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: FiUsers,
      title: 'Collaborative Spirit',
      description: 'We work closely with clients, ensuring transparency and partnership throughout.',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: FiHeart,
      title: 'Customer-Centric',
      description: 'Your success is our priority. We deliver solutions that truly make a difference.',
      color: 'from-red-500 to-rose-400'
    },
    {
      icon: FiTarget,
      title: 'Excellence Driven',
      description: 'We strive for perfection in every project, from planning to deployment.',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  // const team = [
  //   {
  //     name: 'Michael Kiprop',
  //     role: 'CEO & Founder',
  //     image: 'https://ui-avatars.com/api/?name=Michael+Kiprop&background=1a237e&color=fff&size=128',
  //     bio: 'Visionary leader with 15+ years in tech',
  //     social: { twitter: '#', linkedin: '#' }
  //   },
  //   {
  //     name: 'Sarah Wanjiku',
  //     role: 'CTO',
  //     image: 'https://ui-avatars.com/api/?name=Sarah+Wanjiku&background=0d47a1&color=fff&size=128',
  //     bio: 'Full-stack architect & cloud expert',
  //     social: { twitter: '#', linkedin: '#' }
  //   },
  //   {
  //     name: 'David Ochieng',
  //     role: 'Lead Developer',
  //     image: 'https://ui-avatars.com/api/?name=David+Ochieng&background=00bcd4&color=fff&size=128',
  //     bio: 'Senior full-stack developer',
  //     social: { twitter: '#', linkedin: '#' }
  //   },
  //   {
  //     name: 'Grace Akinyi',
  //     role: 'UI/UX Designer',
  //     image: 'https://ui-avatars.com/api/?name=Grace+Akinyi&background=1a237e&color=fff&size=128',
  //     bio: 'Creative designer with 8+ years experience',
  //     social: { twitter: '#', linkedin: '#' }
  //   }
  // ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'EvolTechs was born with a vision to transform digital solutions' },
    { year: '2021', title: 'First 100 Clients', description: 'Reached 100 clients and expanded our services' },
    { year: '2022', title: 'Global Expansion', description: 'Extended services to international markets' },
    { year: '2023', title: '500+ Projects', description: 'Completed over 500 projects successfully' },
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered', icon: FiBriefcase },
    { number: '98%', label: 'Client Satisfaction', icon: FiSmile },
    { number: '50+', label: 'Expert Team', icon: FiUsers },
    { number: '24/7', label: 'Support Available', icon: FiClock },
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
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Building the <span className="gradient-text">Future of Tech</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              We're a passionate team of developers, designers, and innovators 
              dedicated to creating digital solutions that make a difference.
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

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-primary-900/10 to-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 mb-4">
                <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                  <FiEye className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be Africa's leading digital solutions provider, empowering businesses 
                with innovative technology that drives growth, efficiency, and global competitiveness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 p-0.5 mb-4">
                <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                  <FiTarget className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To deliver exceptional digital solutions through technical excellence, 
                creative innovation, and unwavering commitment to client success, 
                while fostering a culture of growth and collaboration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              Our Values
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Drives <span className="gradient-text">Us</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These core values guide everything we do, from how we work to how we treat our clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} p-0.5 mx-auto mb-4`}>
                  <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-gradient-to-b from-primary-900/10 to-[#0a0a0a]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
              Meet Our Team
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The People Behind <span className="gradient-text">EvolTechs</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A passionate team of experts dedicated to delivering excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-accent-400/30">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-accent-400 mb-2">{member.role}</p>
                <p className="text-xs text-gray-400 mb-3">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a href={member.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                    <FiStar className="w-4 h-4" />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
                    <FiUsers className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Milestones */}
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
              Our Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Key <span className="gradient-text">Milestones</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center group hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{milestone.year}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{milestone.title}</h3>
                <p className="text-sm text-gray-400">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-primary-900/10 to-[#0a0a0a]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full inline-block mb-4">
              Why Choose EvolTechs
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Digital Partner</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: FiZap, title: 'Technical Excellence', description: 'Expertise in modern technologies and best practices' },
              { icon: FiShield, title: 'Reliability & Trust', description: 'Proven track record of delivering quality solutions' },
              { icon: FiTrendingUp, title: 'Growth Focused', description: 'Solutions designed to scale with your business' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <item.icon className="w-10 h-10 text-accent-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
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
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Work With <span className="gradient-text">Us?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate and build something extraordinary together
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                Get In Touch
                <FiArrowRight />
              </Link>
              <Link to="/services" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                Explore Services
                <FiCode />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};