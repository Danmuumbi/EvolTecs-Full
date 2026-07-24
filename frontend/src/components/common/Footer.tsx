import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiYoutube,
  FiArrowUp,
  FiHeart,
  FiGlobe,
  FiCode,
  FiServer,
  FiShield,
  FiCloud,
  FiSmartphone,
  FiAward,
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitted(true);
    setEmail('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const footerLinks = {
    Solutions: [
      { name: 'Custom Software', href: '/services#software' },
      { name: 'Web Hosting', href: '/hosting' },
      { name: 'Domain Registration', href: '/domains' },
      { name: 'Cloud Solutions', href: '/services#cloud' },
      { name: 'Mobile Apps', href: '/services#mobile' },
    ],

    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Partners', href: '/partners' },
      { name: 'Contact', href: '/contact' },
    ],

    Support: [
      { name: 'Help Center', href: '/support' },
      { name: 'Ticket System', href: '/support' },
      { name: 'Knowledge Base', href: '/knowledge' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
    ],

    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Security', href: '/security' },
    ],
  };

  const socialLinks = [
    {
      icon: FiTwitter,
      href: '#',
      label: 'Twitter',
    },
    {
      icon: FiLinkedin,
      href: '#',
      label: 'LinkedIn',
    },
    {
      icon: FiGithub,
      href: '#',
      label: 'GitHub',
    },
    {
      icon: FiYoutube,
      href: '#',
      label: 'YouTube',
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080b14]">

      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[140px]" />

        <div className="absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full bg-blue-500/[0.03] blur-[130px]" />

        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] rounded-full bg-cyan-400/[0.025] blur-[120px]" />

      </div>


      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">


        {/* MAIN FOOTER */}
        <div className="py-14 sm:py-16 lg:py-20">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-10">


            {/* BRAND */}
            <div className="text-center lg:col-span-2 lg:text-left">

              <Link
                to="/"
                className="group inline-flex items-center gap-3"
              >

                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-cyan-300 shadow-lg shadow-cyan-500/10"
                >
                  <span className="text-xl font-black tracking-tighter text-[#080b14]">
                    E
                  </span>
                </motion.div>


                <div className="text-left">

                  <span className="block text-xl font-black tracking-tight text-white transition-colors group-hover:text-cyan-400">
                    EvolTechs
                  </span>

                  <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    Software & Digital Solutions
                  </span>

                </div>

              </Link>


              <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-slate-400 lg:mx-0">
                We build software and digital solutions that help businesses
                launch, grow, and scale with confidence.
              </p>


              {/* SOCIALS */}
              <div className="mt-6 flex justify-center gap-3 lg:justify-start">

                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}

              </div>

            </div>


            {/* LINK COLUMNS */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-4 lg:gap-8">

              {Object.entries(footerLinks).map(([category, links]) => (

                <div key={category}>

                  <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white">
                    {category}
                  </h3>

                  <ul className="space-y-3">

                    {links.map((link) => (

                      <li key={link.name}>

                        <Link
                          to={link.href}
                          className="text-sm text-slate-400 transition-colors duration-200 hover:text-cyan-300"
                        >
                          {link.name}
                        </Link>

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* TRUST STRIP */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-white/[0.07] py-6 text-xs text-slate-500">

          <span className="flex items-center gap-2">
            <FiShield className="h-4 w-4 text-cyan-400/70" />
            Secure Infrastructure
          </span>

          <span className="flex items-center gap-2">
            <FiAward className="h-4 w-4 text-blue-400/70" />
            Reliable Technology
          </span>

          <span className="flex items-center gap-2">
            <FiGlobe className="h-4 w-4 text-cyan-400/70" />
            Built for the Digital World
          </span>

        </div>


        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] py-6 sm:flex-row">

          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {currentYear} EvolTechs Software Solutions. All rights reserved.
          </p>


          <div className="flex items-center gap-5">

            <Link
              to="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Contact
            </Link>


            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all hover:border-cyan-400/30 hover:text-cyan-300 ${
                showScrollTop
                  ? 'opacity-100'
                  : 'opacity-60'
              }`}
              aria-label="Scroll to top"
            >
              <FiArrowUp className="h-4 w-4" />
            </motion.button>

          </div>

        </div>


        {/* SMALL FOOTER SIGNATURE */}
        {/* <div className="pb-6 text-center text-[11px] text-slate-600">

          Built with
          <FiHeart className="mx-1 inline h-3 w-3 text-cyan-500" />
          By EvolTechs

        </div> */}

      </div>


      {/* MOBILE FLOATING SCROLL BUTTON */}
      {showScrollTop && (

        <motion.button
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-[#080b14] shadow-xl shadow-cyan-500/20 md:hidden"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="h-5 w-5" />
        </motion.button>

      )}

    </footer>
  );
};