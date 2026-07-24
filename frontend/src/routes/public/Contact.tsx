import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/seo/SEO";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiClock,
  FiMessageSquare,
  FiUser,
  FiArrowRight,
  FiCheckCircle,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiYoutube,
  FiInstagram,
} from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiClient } from "@/api/client";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  service: string;
};

export const Contact = () => {
  const [formData, setFormData] =
    useState<ContactFormData>({
      name: "",
      email: "",
      subject: "",
      message: "",
      service: "general",
    });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await apiClient.post(
        "/contact",
        formData
      );

      toast.success(
        "Message sent successfully! We'll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        service: "general",
      });

    } catch (error: any) {
      console.error(
        "Contact form submission failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to send your message. Please try again."
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: [
        "Westlands",
        "Nairobi, Kenya",
      ],
      color:
        "from-blue-500 to-cyan-400",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: [
        "+254 797 192 917",
        "+254 714 202 946",
      ],
      color:
        "from-purple-500 to-pink-400",
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: [
        "info@evoltecs.com",
        "support@evoltecs.com",
      ],
      color:
        "from-green-500 to-emerald-400",
    },
    {
      icon: FiClock,
      title: "Working Hours",
      details: [
        "Mon-Fri: 8:00 AM - 6:00 PM",
        "Sat: 9:00 AM - 2:00 PM",
      ],
      color:
        "from-orange-500 to-yellow-400",
    },
  ];

  const services = [
    "General Inquiry",
    "Software Development",
    "Web Hosting",
    "Domain Registration",
    "Cloud Solutions",
    "Technical Support",
  ];

  const faqs = [
    {
      q: "What services does EvolTechs offer?",
      a: "We offer custom software development, web hosting, domain registration, cloud solutions, mobile app development, and more.",
    },
    {
      q: "How long does it take to get a response?",
      a: "We typically respond to inquiries within 24 hours during business days.",
    },
    {
      q: "Do you offer support after project completion?",
      a: "Yes, we provide ongoing support and maintenance for all our projects.",
    },
    {
      q: "What technologies do you specialize in?",
      a: "We specialize in React, Node.js, Python, Cloud (AWS/Azure/GCP), and modern technologies.",
    },
  ];

  const socialLinks = [
    {
      icon: FiTwitter,
      label: "Twitter",
      color: "hover:text-blue-400",
      href: "#",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      color: "hover:text-blue-500",
      href: "#",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      color: "hover:text-gray-300",
      href: "#",
    },
    {
      icon: FiYoutube,
      label: "YouTube",
      color: "hover:text-red-500",
      href: "#",
    },
    {
      icon: FiInstagram,
      label: "Instagram",
      color: "hover:text-pink-500",
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden pt-20">

      <SEO
  title="Contact EvolTechs Software Solutions"
  description="Contact EvolTechs for domain registration, web hosting, software development and other technology solutions."
  canonical="https://evoltecs.com/contact"
/>

      {/* HERO */}

      <section className="relative overflow-hidden py-16 md:py-20">

        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-primary-900/10 to-transparent" />

        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />

        <div className="container-custom relative z-10">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-3xl text-center"
          >

            <span className="mb-4 inline-block rounded-full bg-accent-400/10 px-4 py-2 text-sm font-medium uppercase tracking-wider text-accent-400">
              Contact Us
            </span>

            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Let's{" "}
              <span className="gradient-text">
                Connect
              </span>
            </h1>

            <p className="text-lg leading-relaxed text-gray-300">
              Have a project in mind or need help with something?
              We're here to help. Reach out and let's make something
              amazing together.
            </p>

          </motion.div>

        </div>

      </section>


      {/* CONTACT INFORMATION */}

      <section className="bg-[#0a0a0a] py-12">

        <div className="container-custom">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {contactInfo.map(
              (info, index) => {

                const Icon =
                  info.icon;

                return (
                  <motion.div
                    key={info.title}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.1,
                    }}
                    className="glass-effect group rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10"
                  >

                    <div
                      className={`mx-auto mb-4 h-14 w-14 rounded-xl bg-gradient-to-br ${info.color} p-0.5`}
                    >

                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0a0a0a] transition-transform group-hover:scale-110">

                        <Icon className="h-6 w-6 text-white" />

                      </div>

                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {info.title}
                    </h3>

                    {info.details.map(
                      (detail) => (
                        <p
                          key={detail}
                          className="text-sm text-gray-400"
                        >
                          {detail}
                        </p>
                      )
                    )}

                  </motion.div>
                );
              }
            )}

          </div>

        </div>

      </section>


      {/* FORM AND MAP */}

      <section className="bg-gradient-to-b from-[#0a0a0a] to-primary-900/10 py-20">

        <div className="container-custom">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* FORM */}

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
            >

              <div className="glass-effect rounded-2xl p-8 md:p-10">

                <h2 className="mb-6 text-2xl font-bold text-white">
                  Send us a Message
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* NAME */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Full Name
                    </label>

                    <div className="relative">

                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-400 focus:outline-none"
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Email Address
                    </label>

                    <div className="relative">

                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-400 focus:outline-none"
                      />

                    </div>

                  </div>


                  {/* SERVICE */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Service Interested In
                    </label>

                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all duration-300 focus:border-accent-400 focus:outline-none"
                    >

                      {services.map(
                        (service) => (

                          <option
                            key={service}
                            value={service
                              .toLowerCase()
                              .replace(
                                /\s/g,
                                "-"
                              )}
                          >
                            {service}
                          </option>

                        )
                      )}

                    </select>

                  </div>


                  {/* SUBJECT */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-400 focus:outline-none"
                    />

                  </div>


                  {/* MESSAGE */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Message
                    </label>

                    <div className="relative">

                      <FiMessageSquare className="absolute left-4 top-4 text-gray-500" />

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your project..."
                        required
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-400 focus:outline-none"
                      />

                    </div>

                  </div>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex w-full items-center justify-center gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {isSubmitting ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="h-5 w-5" />

                        Send Message
                      </>
                    )}

                  </button>

                </form>

              </div>

            </motion.div>


            {/* MAP AND SOCIAL */}

            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
              className="space-y-6"
            >

              <div className="glass-effect h-64 overflow-hidden rounded-2xl md:h-80">

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d36.68219672266709!3d-1.3028611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1700000000000"
                  className="h-full w-full"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EvolTechs Location"
                />

              </div>


              <div className="glass-effect rounded-2xl p-8">

                <h3 className="mb-4 text-xl font-bold text-white">
                  Connect With Us
                </h3>

                <p className="mb-6 text-sm text-gray-400">
                  Follow us on social media for updates, news, and insights.
                </p>

                <div className="flex flex-wrap gap-3">

                  {socialLinks.map(
                    (social) => {

                      const Icon =
                        social.icon;

                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          className={`rounded-xl border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:bg-white/10 ${social.color}`}
                        >

                          <Icon className="h-5 w-5" />

                        </motion.a>
                      );
                    }
                  )}

                </div>

              </div>


              <div className="glass-effect rounded-2xl border border-green-500/20 p-6">

                <div className="flex items-center gap-3">

                  <FiCheckCircle className="h-6 w-6 text-green-400" />

                  <div>

                    <h4 className="text-sm font-medium text-white">
                      Fast Response Time
                    </h4>

                    <p className="text-xs text-gray-400">
                      We typically respond within 24 hours
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* FAQ */}

      <section className="bg-[#0a0a0a] py-20">

        <div className="container-custom">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
            className="mb-12 text-center"
          >

            <span className="mb-4 inline-block rounded-full bg-accent-400/10 px-4 py-2 text-sm font-medium uppercase tracking-wider text-accent-400">
              Quick Help
            </span>

            <h2 className="text-3xl font-bold md:text-4xl">
              Frequently Asked{" "}
              <span className="gradient-text">
                Questions
              </span>
            </h2>

          </motion.div>


          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">

            {faqs.map(
              (faq, index) => (

                <motion.div
                  key={faq.q}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      index * 0.1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5"
                >

                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-white">

                    <span className="text-accent-400">
                      Q:
                    </span>

                    {faq.q}

                  </h3>

                  <p className="pl-6 text-sm text-gray-400">
                    A: {faq.a}
                  </p>

                </motion.div>

              )
            )}

          </div>


          <div className="mt-8 text-center">

            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 text-accent-400 transition-colors hover:text-accent-300"
            >

              View All FAQs

              <FiArrowRight className="h-4 w-4" />

            </Link>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="relative overflow-hidden py-16">

        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 opacity-95" />

        <div className="container-custom relative z-10 text-center">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >

            <h2 className="mb-3 text-2xl font-bold text-white md:text-4xl">
              Prefer to Talk Over the Phone?
            </h2>

            <p className="mb-6 text-lg text-gray-300">
              Give us a call and let's discuss your project directly.
            </p>

            <a
              href="tel:+254797192917"
              className="inline-flex items-center gap-3 text-xl font-semibold text-white transition-colors hover:text-accent-400"
            >

              <FiPhone className="h-6 w-6" />

              +254 797 192 917

            </a>

          </motion.div>

        </div>

      </section>

    </div>
  );
};