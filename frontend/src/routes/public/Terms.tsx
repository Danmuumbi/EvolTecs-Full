import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from "../../components/seo/SEO";
import {
  // FiArrowLeft,
  FiArrowUp,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiGlobe,
  FiInfo,
  FiMail,
  FiShield,
  FiUsers,
  FiXCircle,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';

export const Terms = () => {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const lastUpdated = 'July 23, 2026';

  const sections = [
    {
      id: 'acceptance',
      number: '01',
      title: 'Acceptance of Terms',
    },
    {
      id: 'our-services',
      number: '02',
      title: 'Our Services',
    },
    {
      id: 'accounts',
      number: '03',
      title: 'User Accounts',
    },
    {
      id: 'domains',
      number: '04',
      title: 'Domains & Hosting',
    },
    {
      id: 'payments',
      number: '05',
      title: 'Payments & Billing',
    },
    {
      id: 'acceptable-use',
      number: '06',
      title: 'Acceptable Use',
    },
    {
      id: 'intellectual-property',
      number: '07',
      title: 'Intellectual Property',
    },
    {
      id: 'third-party',
      number: '08',
      title: 'Third-Party Services',
    },
    {
      id: 'availability',
      number: '09',
      title: 'Service Availability',
    },
    {
      id: 'termination',
      number: '10',
      title: 'Termination',
    },
    {
      id: 'disclaimers',
      number: '11',
      title: 'Disclaimers',
    },
    {
      id: 'liability',
      number: '12',
      title: 'Limitation of Liability',
    },
    {
      id: 'indemnification',
      number: '13',
      title: 'Indemnification',
    },
    {
      id: 'changes',
      number: '14',
      title: 'Changes to These Terms',
    },
    {
      id: 'governing-law',
      number: '15',
      title: 'Governing Law',
    },
    {
      id: 'contact',
      number: '16',
      title: 'Contact Us',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      let current = 'acceptance';

      sectionElements.forEach((section) => {
        if (section && window.scrollY >= section.offsetTop - 180) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-white overflow-x-hidden">

      <SEO
  title="Terms of Service | EvolTechs"
  description="Read the terms and conditions governing the use of EvolTechs Software Solutions services."
  canonical="https://evoltecs.com/terms"
/>

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute top-[40%] -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[140px]" />
      </div>

      {/* Top Header */}
      {/* <section className="relative border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to EvolTechs
            </Link>
          </div>
        </div>
      </section> */}

      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-[0.16em] mb-7">
              <FiFileText className="w-3.5 h-3.5" />
              Legal Documentation
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Terms of
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              These terms govern your access to and use of EvolTechs Software
              Solutions products, services, platforms, and digital infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <FiClock className="w-4 h-4 text-blue-400" />
                Last updated: {lastUpdated}
              </span>

              <span className="hidden sm:block h-4 w-px bg-white/10" />

              <span className="inline-flex items-center gap-2">
                <FiGlobe className="w-4 h-4 text-cyan-400" />
                Applicable to our digital services
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-500/[0.08] to-cyan-500/[0.04] p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                  <FiInfo className="w-5 h-5 text-blue-300" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  Please read these terms carefully
                </h2>

                <p className="text-sm md:text-base leading-7 text-slate-400">
                  By accessing or using any service provided by EvolTechs, you
                  agree to be bound by these Terms of Service. If you do not
                  agree with any part of these terms, you should not use our
                  services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-12 lg:gap-20">
            
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold mb-5">
                  On this page
                </p>

                <nav className="space-y-1 border-l border-white/10">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                        activeSection === section.id
                          ? 'text-blue-300 border-l-2 border-blue-400 -ml-px bg-blue-500/5'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-60">
                        {section.number}
                      </span>

                      <span>{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Document */}
            <article className="max-w-4xl">

              {/* Mobile Contents */}
              <div className="lg:hidden mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold mb-4">
                  Contents
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="text-left flex items-center gap-3 p-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="text-xs font-mono text-blue-400">
                        {section.number}
                      </span>

                      {section.title}

                      <FiChevronRight className="w-3.5 h-3.5 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>

              <TermsSection
                id="acceptance"
                number="01"
                title="Acceptance of Terms"
              >
                <p>
                  These Terms of Service constitute a legally binding agreement
                  between you and EvolTechs Software Solutions regarding your
                  access to and use of our websites, platforms, applications,
                  products, and services.
                </p>

                <p>
                  By accessing our website, creating an account, purchasing a
                  service, or otherwise using our services, you confirm that you
                  have read, understood, and agreed to these Terms of Service.
                </p>

                <p>
                  If you are using our services on behalf of a company,
                  organization, or other legal entity, you represent that you
                  have the authority to bind that entity to these terms.
                </p>
              </TermsSection>

              <TermsSection
                id="our-services"
                number="02"
                title="Our Services"
              >
                <p>
                  EvolTechs provides technology and digital infrastructure
                  services, which may include:
                </p>

                <BulletList
                  items={[
                    'Custom software and web application development',
                    'Website design and development',
                    'Domain registration and management',
                    'Web hosting and related infrastructure services',
                    'Cloud and infrastructure solutions',
                    'Technical support and maintenance',
                    'Mobile application development',
                    'Cybersecurity and technology consulting',
                  ]}
                />

                <p>
                  The specific features, limitations, pricing, availability,
                  and requirements of each service may vary depending on the
                  service selected and the applicable agreement or order.
                </p>
              </TermsSection>

              <TermsSection
                id="accounts"
                number="03"
                title="User Accounts"
              >
                <p>
                  Certain services may require you to create an account. You are
                  responsible for providing accurate and current information
                  when creating and maintaining your account.
                </p>

                <p>
                  You are responsible for maintaining the confidentiality of
                  your login credentials and for all activities that occur under
                  your account.
                </p>

                <p>
                  You must notify us promptly if you believe that your account
                  has been accessed without authorization.
                </p>

                <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
                  <div className="flex gap-3">
                    <FiShield className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />

                    <p className="text-sm text-slate-300 leading-7">
                      You must not share your account credentials in a manner
                      that compromises the security of your account or our
                      systems.
                    </p>
                  </div>
                </div>
              </TermsSection>

              <TermsSection
                id="domains"
                number="04"
                title="Domains & Hosting"
              >
                <p>
                  Domain registration and hosting services may be subject to
                  additional rules, policies, and requirements imposed by
                  relevant domain registries, registrars, infrastructure
                  providers, and other third parties.
                </p>

                <p>
                  Domain names are subject to availability and cannot be
                  guaranteed until registration has been successfully completed.
                </p>

                <p>
                  You are responsible for ensuring that the information
                  associated with your domain registration is accurate and
                  remains up to date.
                </p>

                <p>
                  Hosting resources must be used in accordance with these terms,
                  applicable laws, and any service-specific usage policies.
                </p>
              </TermsSection>

              <TermsSection
                id="payments"
                number="05"
                title="Payments & Billing"
              >
                <p>
                  Fees for paid services are displayed or communicated before
                  purchase or commencement of the applicable service.
                </p>

                <p>
                  You agree to provide accurate billing information and to pay
                  all applicable charges when they become due.
                </p>

                <p>
                  Certain services may be suspended or terminated if required
                  payments are not received within the applicable payment
                  period.
                </p>

                <p>
                  Pricing may change from time to time. Where applicable, we
                  will provide reasonable notice of material changes to
                  recurring services.
                </p>
              </TermsSection>

              <TermsSection
                id="acceptable-use"
                number="06"
                title="Acceptable Use"
              >
                <p>
                  You agree to use our services lawfully and responsibly.
                </p>

                <p>You must not use our services to:</p>

                <BulletList
                  icon={<FiXCircle className="w-4 h-4 text-red-400" />}
                  items={[
                    'Violate applicable laws or regulations',
                    'Commit fraud or facilitate fraudulent activity',
                    'Distribute malware, viruses, or other malicious code',
                    'Attempt to gain unauthorized access to systems or networks',
                    'Conduct attacks against infrastructure or third-party systems',
                    'Host illegal, abusive, or harmful content',
                    'Infringe the rights of other individuals or organizations',
                    'Interfere with the normal operation of our services',
                  ]}
                />

                <p>
                  We reserve the right to investigate suspected violations and
                  take appropriate action where necessary.
                </p>
              </TermsSection>

              <TermsSection
                id="intellectual-property"
                number="07"
                title="Intellectual Property"
              >
                <p>
                  Unless otherwise agreed in writing, EvolTechs and its
                  licensors retain all rights, title, and interest in our
                  websites, platforms, software, branding, designs,
                  documentation, content, and technology.
                </p>

                <p>
                  You may not copy, reproduce, modify, distribute, reverse
                  engineer, or commercially exploit our intellectual property
                  without appropriate authorization.
                </p>

                <p>
                  For custom development projects, ownership and licensing
                  rights may be governed by the specific agreement between
                  EvolTechs and the client.
                </p>
              </TermsSection>

              <TermsSection
                id="third-party"
                number="08"
                title="Third-Party Services"
              >
                <p>
                  Our services may integrate with or depend on third-party
                  services, platforms, APIs, payment providers, hosting
                  providers, registries, or other external systems.
                </p>

                <p>
                  Third-party services may have their own terms, policies, fees,
                  and availability requirements. Your use of those services may
                  therefore be subject to their respective terms.
                </p>
              </TermsSection>

              <TermsSection
                id="availability"
                number="09"
                title="Service Availability"
              >
                <p>
                  We aim to provide reliable and secure services, but we do not
                  guarantee that our services will always be available,
                  uninterrupted, error-free, or free from security
                  vulnerabilities.
                </p>

                <p>
                  Services may occasionally be affected by maintenance,
                  upgrades, technical issues, network failures, third-party
                  outages, or circumstances beyond our reasonable control.
                </p>
              </TermsSection>

              <TermsSection
                id="termination"
                number="10"
                title="Termination"
              >
                <p>
                  You may stop using our services at any time, subject to any
                  applicable contractual obligations or payment commitments.
                </p>

                <p>
                  We may suspend or terminate access to services where we
                  reasonably believe that you have violated these terms,
                  applicable laws, or service-specific requirements.
                </p>

                <p>
                  Upon termination, provisions that by their nature should
                  survive termination will continue to apply.
                </p>
              </TermsSection>

              <TermsSection
                id="disclaimers"
                number="11"
                title="Disclaimers"
              >
                <p>
                  Our services are provided on an “as available” and “as is”
                  basis to the maximum extent permitted by applicable law.
                </p>

                <p>
                  We do not guarantee that every service will meet every
                  individual requirement or that services will operate without
                  interruption or error.
                </p>
              </TermsSection>

              <TermsSection
                id="liability"
                number="12"
                title="Limitation of Liability"
              >
                <p>
                  To the maximum extent permitted by applicable law, EvolTechs
                  shall not be liable for indirect, incidental, special,
                  consequential, or punitive damages arising from or related to
                  your use of our services.
                </p>

                <p>
                  This includes, where applicable, loss of profits, revenue,
                  data, business opportunities, goodwill, or anticipated
                  savings.
                </p>
              </TermsSection>

              <TermsSection
                id="indemnification"
                number="13"
                title="Indemnification"
              >
                <p>
                  You agree to defend, indemnify, and hold harmless EvolTechs,
                  its team members, partners, and service providers from claims,
                  liabilities, damages, losses, and expenses arising from:
                </p>

                <BulletList
                  items={[
                    'Your use or misuse of our services',
                    'Your violation of these Terms of Service',
                    'Your violation of applicable laws or third-party rights',
                    'Content or materials submitted through your account',
                  ]}
                />
              </TermsSection>

              <TermsSection
                id="changes"
                number="14"
                title="Changes to These Terms"
              >
                <p>
                  We may update these Terms of Service from time to time to
                  reflect changes to our services, legal requirements, or
                  business operations.
                </p>

                <p>
                  The updated version will be published on this page with a
                  revised “Last updated” date.
                </p>

                <p>
                  Your continued use of our services after changes become
                  effective constitutes acceptance of the updated terms.
                </p>
              </TermsSection>

              <TermsSection
                id="governing-law"
                number="15"
                title="Governing Law"
              >
                <p>
                  These Terms of Service shall be interpreted and governed in
                  accordance with the applicable laws and regulations of the
                  Republic of Kenya, unless otherwise required by applicable
                  law or a separate written agreement.
                </p>
              </TermsSection>

              <TermsSection
                id="contact"
                number="16"
                title="Contact Us"
              >
                <p>
                  If you have questions about these Terms of Service, you can
                  contact our team through the following channels:
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="mailto:info@evoltecs.com"
                    className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-blue-400/30 hover:bg-blue-500/[0.05] transition-all"
                  >
                    <FiMail className="w-5 h-5 text-blue-400 mb-4" />

                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Email
                    </p>

                    <p className="text-sm text-white break-all group-hover:text-blue-300 transition-colors">
                      info@evoltecs.com
                    </p>
                  </a>

                  <Link
                    to="/contact"
                    className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-400/30 hover:bg-cyan-500/[0.05] transition-all"
                  >
                    <FiUsers className="w-5 h-5 text-cyan-400 mb-4" />

                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Contact Form
                    </p>

                    <p className="text-sm text-white group-hover:text-cyan-300 transition-colors">
                      Send us a message
                    </p>
                  </Link>
                </div>
              </TermsSection>

              {/* Final Acknowledgement */}
              <div className="mt-20 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] p-6 md:p-8">
                <div className="flex gap-4">
                  <FiCheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Thank you for using EvolTechs
                    </h3>

                    <p className="text-sm leading-7 text-slate-400">
                      We are committed to building reliable, secure, and useful
                      technology solutions for individuals, businesses, and
                      organizations.
                    </p>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-t border-white/[0.06] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Have questions about these terms?
          </h2>

          <p className="mt-3 text-slate-400">
            Our team is happy to help clarify anything you are unsure about.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200 transition-colors"
          >
            Contact EvolTechs
            <FiChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Scroll To Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/20 flex items-center justify-center hover:bg-blue-500 transition-colors"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </main>
  );
};

const TermsSection = ({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section
      id={id}
      className="scroll-mt-28 pb-14 mb-14 border-b border-white/[0.07] last:border-0"
    >
      <div className="flex items-start gap-4 mb-6">
        <span className="flex-shrink-0 text-sm font-mono text-blue-400/70 pt-1">
          {number}
        </span>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="space-y-5 text-[15px] leading-8 text-slate-400">
        {children}
      </div>
    </section>
  );
};

const BulletList = ({
  items,
  icon,
}: {
  items: string[];
  icon?: React.ReactNode;
}) => {
  return (
    <ul className="space-y-3 my-5">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3 text-slate-400"
        >
          {icon || (
            <FiCheckCircle className="w-4 h-4 text-blue-400 mt-1.5 flex-shrink-0" />
          )}

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};