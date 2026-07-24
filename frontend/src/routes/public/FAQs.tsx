import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SEO from "../../components/seo/SEO";
import {
  FiChevronDown,
  FiSearch,
  FiMessageCircle,
  FiMail,
  FiArrowRight,
  FiGlobe,
  FiServer,
  FiCode,
  FiCreditCard,
  FiShield,
  FiHelpCircle,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: FiHelpCircle },
    { name: 'Software Development', icon: FiCode },
    { name: 'Domains', icon: FiGlobe },
    { name: 'Hosting', icon: FiServer },
    { name: 'Payments', icon: FiCreditCard },
    { name: 'Security', icon: FiShield },
  ];

  const faqs: FAQ[] = [
    {
      category: 'Software Development',
      question: 'What software development services does EvolTechs offer?',
      answer:
        'We design and develop custom digital solutions including business websites, e-commerce platforms, web applications, APIs, dashboards, mobile applications, business management systems, and other software tailored to your specific needs.',
    },
    {
      category: 'Software Development',
      question: 'Can you build software specifically for my business?',
      answer:
        'Yes. We build custom software around your business processes, requirements, users, and long-term goals. We do not believe every business should be forced into the same generic solution.',
    },
    {
      category: 'Software Development',
      question: 'How long does it take to build a website or software system?',
      answer:
        'The timeline depends on the complexity of the project. A simple business website may take considerably less time than a custom platform with authentication, payments, dashboards, integrations, and other advanced features. After understanding your requirements, we provide a realistic project timeline.',
    },
    {
      category: 'Software Development',
      question: 'Do you provide support after a project is completed?',
      answer:
        'Yes. We provide ongoing technical support and maintenance services after launch. This can include bug fixes, security updates, backups, technical assistance, hosting-related support, and small content changes depending on the support arrangement.',
    },

    {
      category: 'Domains',
      question: 'Can I register a domain name through EvolTechs?',
      answer:
        'Yes. You can search for available domain names and register suitable domains through our domain services. We support a wide range of domain extensions for businesses, organizations, and individuals.',
    },
    {
      category: 'Domains',
      question: 'Can I transfer my existing domain to EvolTechs?',
      answer:
        'Yes. Existing domains can generally be transferred to a new registrar, provided the domain meets the applicable transfer requirements. We can guide you through the process.',
    },
    {
      category: 'Domains',
      question: 'What happens when my domain is about to expire?',
      answer:
        'Domain expiration can affect your website and email services. We provide domain management and renewal services to help you keep track of your domain and renew it before expiration.',
    },

    {
      category: 'Hosting',
      question: 'What type of hosting do you offer?',
      answer:
        'We provide hosting solutions for different types of websites and applications. Depending on your requirements, we can help you choose an appropriate hosting environment based on performance, traffic, storage, scalability, and application requirements.',
    },
    {
      category: 'Hosting',
      question: 'Can you host a website that was built by another developer?',
      answer:
        'Yes. We can review the website and its technical requirements and help determine the most suitable hosting environment for it.',
    },
    {
      category: 'Hosting',
      question: 'Can my hosting plan be upgraded later?',
      answer:
        'Yes. As your website or application grows, your hosting requirements may change. We can help you move to a more suitable environment when additional resources or performance are required.',
    },

    {
      category: 'Payments',
      question: 'What payment methods are available?',
      answer:
        'Available payment methods depend on the service and the payment options currently supported. For applicable services, we can support convenient digital payment options and provide the relevant payment instructions during the purchase process.',
    },
    {
      category: 'Payments',
      question: 'Can you integrate payments into my website or application?',
      answer:
        'Yes. We can integrate payment systems into custom software, e-commerce websites, and other digital platforms where the required payment provider and integration access are available.',
    },

    {
      category: 'Security',
      question: 'How do you help protect websites and applications?',
      answer:
        'Security depends on the project and its requirements. Our development approach can include secure authentication, access controls, input validation, secure API design, protection of sensitive data, backups, updates, and other appropriate security practices.',
    },
    {
      category: 'Security',
      question: 'Do you provide backups and recovery support?',
      answer:
        'Backup and recovery options depend on the hosting and support arrangement. Where included, backups can help restore a website or system following certain technical problems or data loss incidents.',
    },
  ];

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === 'All' || faq.category === activeCategory;

      const search = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !search ||
        faq.question.toLowerCase().includes(search) ||
        faq.answer.toLowerCase().includes(search) ||
        faq.category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a0a] pt-20">

      <SEO
  title="Frequently Asked Questions | EvolTechs"
  description="Find answers to common questions about domains, hosting, software development and EvolTechs technology services."
  canonical="https://evoltecs.com/faqs"
/>

      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-[#0a0a0a] to-[#0a0a0a]" />

        <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-primary-500/10 blur-[140px]" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-400/20 bg-accent-400/10 px-4 py-2 text-sm font-medium uppercase tracking-wider text-accent-400">
              <FiHelpCircle className="h-4 w-4" />
              Knowledge Center
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Questions?
              <br />
              <span className="gradient-text">We Have Answers.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
              Find answers to common questions about our software development,
              domains, hosting, support, payments, and digital solutions.
            </p>
          </motion.div>

          {/* SEARCH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <div className="relative">
              <FiSearch className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null);
                }}
                placeholder="Search your question..."
                className="h-16 w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-14 pr-6 text-white shadow-2xl shadow-black/20 outline-none transition-all placeholder:text-gray-500 focus:border-accent-400/50 focus:bg-white/[0.08]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="relative bg-[#0a0a0a] pb-24">
        <div className="container-custom">

          {/* CATEGORY FILTERS */}
          <div className="mb-12 flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setOpenIndex(null);
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'border-accent-400/40 bg-accent-400/10 text-accent-400'
                      : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* RESULTS */}
          <div className="mx-auto max-w-4xl">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <motion.div
                      key={`${faq.category}-${faq.question}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? 'border-accent-400/30 bg-white/[0.06]'
                          : 'border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-7"
                        aria-expanded={isOpen}
                      >
                        <div>
                          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-accent-400">
                            {faq.category}
                          </span>

                          <h2 className="text-base font-semibold leading-relaxed text-white md:text-lg">
                            {faq.question}
                          </h2>
                        </div>

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-transform duration-300 ${
                            isOpen ? 'rotate-180 border-accent-400/30' : ''
                          }`}
                        >
                          <FiChevronDown className="h-5 w-5 text-gray-400" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="border-t border-white/10 px-6 pb-7 pt-5 md:px-7">
                              <p className="max-w-3xl text-sm leading-8 text-gray-400 md:text-base">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                <FiSearch className="mx-auto mb-4 h-10 w-10 text-gray-600" />

                <h2 className="mb-2 text-xl font-semibold text-white">
                  No questions found
                </h2>

                <p className="mb-6 text-gray-400">
                  Try searching with different words or browse another category.
                </p>

                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-400"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative overflow-hidden border-t border-white/5 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-secondary-900/20 to-primary-900/40" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-400/20 bg-accent-400/10">
              <FiMessageCircle className="h-7 w-7 text-accent-400" />
            </div>

            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Still Have Questions?
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-gray-400">
              Every project is different. If you cannot find the answer you are
              looking for, our team is ready to help.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 font-semibold text-white transition-all hover:bg-accent-400"
              >
                Contact Our Team
                <FiArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="mailto:info@evoltecs.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-semibold text-white transition-all hover:border-white/20 hover:bg-white/[0.08]"
              >
                <FiMail className="h-4 w-4" />
                Send Us an Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};