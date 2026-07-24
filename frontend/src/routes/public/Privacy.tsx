import { motion } from 'framer-motion';
import {
  FiShield,
  FiLock,
  FiDatabase,
  FiUserCheck,
  FiMail,
  FiGlobe,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';

export const Privacy = () => {
  const lastUpdated = 'July 24, 2026';

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20 text-gray-300">
      <SEO
        title="Privacy Policy | EvolTechs Software Solutions"
        description="Learn how EvolTechs Software Solutions collects, uses, protects, and manages your personal information when you use our website and digital services."
        canonical="https://evoltecs.com/privacy"
      />

      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/25 via-[#0a0a0a] to-[#0a0a0a]" />

          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="absolute right-[-10%] top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/[0.05] blur-[160px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(103,232,249,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(103,232,249,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
              <FiShield className="h-4 w-4 text-cyan-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Your Privacy Matters
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Privacy{' '}
              <span className="gradient-text">
                Policy
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
              We believe your information should be handled responsibly,
              transparently, and securely.
            </p>

            <p className="mt-6 text-sm text-gray-500">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUICK OVERVIEW */}
      <section className="relative pb-16">
        <div className="container-custom">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: FiLock,
                title: 'Secure by Design',
                description:
                  'We take reasonable measures to protect information entrusted to us.',
              },
              {
                icon: FiDatabase,
                title: 'Responsible Data Use',
                description:
                  'We collect and use information only for legitimate business purposes.',
              },
              {
                icon: FiUserCheck,
                title: 'Your Rights Matter',
                description:
                  'You have rights regarding your personal information and how it is used.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                  <item.icon className="h-6 w-6 text-cyan-400" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl">

            {/* INTRODUCTION */}
            <PolicySection
              number="01"
              title="Introduction"
              icon={<FiShield />}
            >
              <p>
                EvolTechs Software Solutions ("EvolTechs", "we", "us", or
                "our") respects your privacy and is committed to protecting
                the personal information you provide to us.
              </p>

              <p>
                This Privacy Policy explains how we collect, use, store,
                protect, and disclose information when you visit our website,
                use our services, contact us, or otherwise interact with
                EvolTechs.
              </p>

              <p>
                By using our website or services, you acknowledge that you
                have read and understood this Privacy Policy.
              </p>
            </PolicySection>

            {/* INFORMATION COLLECTED */}
            <PolicySection
              number="02"
              title="Information We Collect"
              icon={<FiDatabase />}
            >
              <p>
                Depending on how you interact with us, we may collect
                different types of information.
              </p>

              <h3>Information You Provide Directly</h3>

              <p>
                You may voluntarily provide information when you:
              </p>

              <BulletList
                items={[
                  'Create an account or register for our services.',
                  'Purchase a domain, hosting service, email service, or other product.',
                  'Submit a contact form or request support.',
                  'Communicate with us through email, messaging platforms, or other channels.',
                  'Subscribe to communications or updates.',
                  'Make payments or complete transactions with us.',
                ]}
              />

              <p>
                This information may include your name, email address, phone
                number, billing information, account details, business
                information, and any other information you choose to provide.
              </p>

              <h3>Information Collected Automatically</h3>

              <p>
                When you access our website, certain technical information may
                be collected automatically, including your IP address, browser
                type, device information, operating system, pages visited,
                approximate location, and information about how you interact
                with our website.
              </p>
            </PolicySection>

            {/* USE */}
            <PolicySection
              number="03"
              title="How We Use Your Information"
              icon={<FiCheckCircle />}
            >
              <p>
                We may use the information we collect for legitimate business
                and service-related purposes, including to:
              </p>

              <BulletList
                items={[
                  'Provide, operate, maintain, and improve our services.',
                  'Process orders, registrations, payments, and service requests.',
                  'Create and manage user accounts.',
                  'Communicate with you about your account, services, or requests.',
                  'Respond to customer support inquiries.',
                  'Detect, prevent, and address fraud, abuse, security issues, or technical problems.',
                  'Improve the performance, security, and functionality of our website.',
                  'Send service-related communications.',
                  'Comply with applicable legal and regulatory obligations.',
                ]}
              />
            </PolicySection>

            {/* COOKIES */}
            <PolicySection
              number="04"
              title="Cookies and Similar Technologies"
              icon={<FiGlobe />}
            >
              <p>
                Our website may use cookies and similar technologies to
                improve functionality, understand website usage, remember
                preferences, and enhance the user experience.
              </p>

              <p>
                Cookies are small text files stored on your device by your
                browser. You may configure your browser to reject certain
                cookies, although doing so may affect some website
                functionality.
              </p>
            </PolicySection>

            {/* SHARING */}
            <PolicySection
              number="05"
              title="Sharing of Information"
              icon={<FiUserCheck />}
            >
              <p>
                We do not sell your personal information.
              </p>

              <p>
                We may share information where reasonably necessary to provide
                our services or operate our business, including with:
              </p>

              <BulletList
                items={[
                  'Service providers and technology partners who help us operate our business.',
                  'Payment processors and financial service providers.',
                  'Domain registries, hosting providers, infrastructure providers, or other service partners where required to provide a requested service.',
                  'Professional advisers where reasonably necessary.',
                  'Government authorities or law enforcement where required by law or valid legal process.',
                ]}
              />

              <p>
                Where we work with third-party service providers, we aim to
                work with parties that handle information appropriately and
                only for legitimate purposes.
              </p>
            </PolicySection>

            {/* SECURITY */}
            <PolicySection
              number="06"
              title="Data Security"
              icon={<FiLock />}
            >
              <p>
                We take reasonable technical and organizational measures to
                protect personal information from unauthorized access,
                alteration, disclosure, misuse, or destruction.
              </p>

              <p>
                However, no method of transmission over the internet or method
                of electronic storage is completely secure. Therefore, while
                we strive to protect your information, we cannot guarantee
                absolute security.
              </p>
            </PolicySection>

            {/* RETENTION */}
            <PolicySection
              number="07"
              title="Data Retention"
              icon={<FiDatabase />}
            >
              <p>
                We retain personal information only for as long as reasonably
                necessary to provide our services, fulfill the purposes
                described in this Privacy Policy, comply with legal
                obligations, resolve disputes, and enforce our agreements.
              </p>

              <p>
                The specific retention period may vary depending on the type of
                information and the reason it was collected.
              </p>
            </PolicySection>

            {/* RIGHTS */}
            <PolicySection
              number="08"
              title="Your Privacy Rights"
              icon={<FiUserCheck />}
            >
              <p>
                Depending on applicable law, you may have rights regarding your
                personal information, including the right to:
              </p>

              <BulletList
                items={[
                  'Request access to personal information we hold about you.',
                  'Request correction of inaccurate or incomplete information.',
                  'Request deletion of personal information where legally applicable.',
                  'Object to or restrict certain processing activities.',
                  'Withdraw consent where processing is based on consent.',
                  'Request information about how your personal data is handled.',
                ]}
              />

              <p>
                To exercise a privacy-related right, you may contact us using
                the details provided below. We may need to verify your identity
                before processing certain requests.
              </p>
            </PolicySection>

            {/* THIRD PARTY */}
            <PolicySection
              number="09"
              title="Third-Party Services and Links"
              icon={<FiGlobe />}
            >
              <p>
                Our website may contain links to third-party websites,
                services, platforms, or tools.
              </p>

              <p>
                Third-party services operate under their own privacy policies
                and terms. We are not responsible for the privacy practices,
                content, or security of third-party websites or services that
                we do not control.
              </p>
            </PolicySection>

            {/* CHILDREN */}
            <PolicySection
              number="10"
              title="Children's Privacy"
              icon={<FiUserCheck />}
            >
              <p>
                Our services are not intended to knowingly collect personal
                information from children in circumstances where such
                collection is prohibited by applicable law.
              </p>

              <p>
                If you believe that a child has provided us with personal
                information inappropriately, please contact us so that we can
                review the matter.
              </p>
            </PolicySection>

            {/* CHANGES */}
            <PolicySection
              number="11"
              title="Changes to This Privacy Policy"
              icon={<FiShield />}
            >
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes to our services, technology, legal requirements, or
                business practices.
              </p>

              <p>
                When we make changes, we will update the "Last Updated" date at
                the top of this page. We encourage you to review this Privacy
                Policy periodically.
              </p>
            </PolicySection>

            {/* CONTACT */}
            <PolicySection
              number="12"
              title="Contact Us"
              icon={<FiMail />}
            >
              <p>
                If you have questions, concerns, or requests regarding this
                Privacy Policy or the handling of your personal information,
                please contact us.
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                    <FiMail className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="mb-1 font-semibold text-white">
                      Privacy Enquiries
                    </h3>

                    <a
                      href="mailto:info@evoltecs.com"
                      className="text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                      info@evoltecs.com
                    </a>
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.08] to-blue-500/[0.05] p-8 text-center md:p-12"
            >
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Have a question about your privacy?
              </h2>

              <p className="mx-auto mb-8 max-w-xl text-gray-400">
                If you have any questions about how we handle your information,
                our team is here to help.
              </p>

              <Link
                to="/contact"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5"
              >
                Contact Us
                <FiArrowRight />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};


/* -------------------------------- */
/* REUSABLE POLICY SECTION */
/* -------------------------------- */

interface PolicySectionProps {
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const PolicySection = ({
  number,
  title,
  icon,
  children,
}: PolicySectionProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-white/10 py-10 first:pt-0"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
          {icon}
        </div>

        <div>
          <span className="text-xs font-semibold tracking-widest text-cyan-400">
            SECTION {number}
          </span>

          <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="space-y-5 text-[15px] leading-8 text-gray-400">
        {children}
      </div>
    </motion.article>
  );
};


/* -------------------------------- */
/* REUSABLE BULLET LIST */
/* -------------------------------- */

const BulletList = ({ items }: { items: string[] }) => {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <FiCheckCircle className="mt-1.5 h-4 w-4 shrink-0 text-cyan-400" />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};