import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState } from "react";
import { submitContact } from "../../services/contactService";

export function Contact() {
  const { setTheme } = useHeaderTheme();

  useEffect(() => {
    setTheme("primary");
  }, [setTheme]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    services: [] as string[],
    budget: "",
    projectIdea: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (service: string) => {
    if (formData.services.includes(service)) {
      setFormData({
        ...formData,
        services: formData.services.filter((s) => s !== service),
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, service],
      });
    }
  };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
          const response = await submitContact({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            services: formData.services,
            budget: formData.budget,
            projectIdea: formData.projectIdea,
            message: formData.message,
          });

          if (response.success) {
            setSuccessMessage(response.message);
            setShowPopup(true);

            setTimeout(() => {
              setShowPopup(false);
            }, 3000);

            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              company: "",
              services: [],
              budget: "",
              projectIdea: "",
              message: "",
            });
          } else {
            setErrorMessage("Something went wrong. Please try again.");
          }
        } catch (error) {
          setErrorMessage("Server error. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
      <ScrollIndicator />

      {/* Hero Section */}
      <Section className="pt-32 md:pt-40 pb-20 bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl"
          >
            <div className="text-xl uppercase tracking-[0.3em] text-[#FF4D00] mb-8">
              GET IN TOUCH
            </div>
            <h1
              className="text-6xl md:text-9xl mb-12 leading-[1.05]"
              style={{ fontWeight: 700 }}
            >
              Let's create something amazing.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed">
              Whether you have a project in mind or just want to chat about the possibilities, we'd love to hear from you.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Form and Info */}
      <Section className="bg-black pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

            {/* Contact Form */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >

            <form className="space-y-8" onSubmit={handleSubmit}>

              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                  Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                />
              </div>

              {/* Services Multi Select */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                  Services *
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Website Development", "SEO", "Social Media", "Branding", "UI/UX Design"].map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => handleServiceChange(service)}
                      className={`px-4 py-2 border rounded-full text-sm transition-all ${
                        formData.services.includes(service)
                          ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                          : "border-white/20 text-white/60"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                  Project Budget *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00]"
                >
                  <option value="" className="bg-black">Select a range</option>
                  <option value="₹10k - ₹25k" className="bg-black">₹10k - ₹25k</option>
                  <option value="₹25k - ₹50k" className="bg-black">₹25k - ₹50k</option>
                  <option value="₹50k - ₹100k" className="bg-black">₹50k - ₹100k</option>
                  <option value="₹100k+" className="bg-black">₹100k+</option>
                </select>
              </div>

              {/* Project Idea */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                  Describe Your Project *
                </label>
                <textarea
                  name="projectIdea"
                  rows={4}
                  value={formData.projectIdea}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00] resize-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-3">
                  Additional Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[#FF4D00] resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="bg-[#FF4D00] text-white px-10 py-5 hover:bg-[#ff6a2d] transition-colors uppercase tracking-widest text-sm disabled:opacity-60"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Requesting..." : "Request Call Back"}
              </motion.button>

            </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-12 md:pl-8">

                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                      <Mail size={18} className="text-[#FF4D00]" />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-white/40">
                      Email
                    </div>
                  </div>
                  <a
                    href="mailto:hello@baunfire.com"
                    className="text-xl text-white hover:text-[#FF4D00] transition-colors block"
                  >
                    hello@baunfire.com
                  </a>
                </div>
                              {/* Phone */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                      <Phone size={18} className="text-[#FF4D00]" />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-white/40">
                      Phone
                    </div>
                  </div>
                  <a
                    href="tel:(408)899-8998"
                    className="text-xl text-white hover:text-[#FF4D00] transition-colors block"
                  >
                    (408) 899-8998
                  </a>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                      <MapPin size={18} className="text-[#FF4D00]" />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-white/40">
                      Location
                    </div>
                  </div>
                  <address className="text-white/60 not-italic leading-relaxed">
                    75 E Santa Clara St, Ste 1425<br />
                    San Jose, California 95113
                  </address>
                </div>

                {/* Social */}
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/40 mb-6">
                    Follow Us
                  </div>
                  <div className="flex gap-4">
                    {[
                      { icon: Instagram, label: 'Instagram' },
                      { icon: Facebook, label: 'Facebook' },
                      { icon: Twitter, label: 'Twitter' },
                      { icon: Linkedin, label: 'LinkedIn' }
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href="#"
                        className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:border-[#FF4D00] transition-colors group"
                        whileHover={{ scale: 1.1 }}
                        aria-label={social.label}
                      >
                        <social.icon
                          size={18}
                          className="text-white/60 group-hover:text-[#FF4D00] transition-colors"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            className="bg-black border border-[#FF4D00]/40 shadow-[0_0_40px_rgba(255,77,0,0.2)] rounded-xl p-8 ..."
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[#FF4D00] text-4xl mb-4">✓</div>

            <h3 className="text-xl font-semibold mb-2">
              Success
            </h3>

            <p className="text-white/60">
              {successMessage}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Map Section */}
      <Section className="relative bg-black py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black z-20"
          initial={{ x: "0%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <Container>
          <motion.div
            className="relative z-10 space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center text-white">
              <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                OUR LOCATION
              </div>
              <h2 className="text-4xl md:text-6xl mb-6" style={{ fontWeight: 700 }}>
                Greater Noida, India
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Operating from Greater Noida, Uttar Pradesh — working with clients globally.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl h-[420px] md:h-[520px] border border-white/10">
              <iframe
                title="BlackInt Location - Greater Noida"
                src="https://www.google.com/maps?q=Greater+Noida,+Uttar+Pradesh,+India&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 brightness-75"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <motion.div
                className="absolute inset-0 bg-[#FF4D00]/40 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <motion.span
                  className="absolute inline-flex h-16 w-16 rounded-full bg-[#FF4D00]/30"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.span
                  className="absolute inline-flex h-10 w-10 rounded-full bg-[#FF4D00]/40"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />

                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#FF4D00] shadow-[0_0_12px_rgba(255,77,0,0.8)]" />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-black py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8 text-center">
              COMMON QUESTIONS
            </div>
            <h2 className="text-4xl md:text-6xl mb-16 text-center" style={{ fontWeight: 700 }}>
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              {[
                {
                  q: 'What is your typical project timeline?',
                  a: 'Most projects take 8-12 weeks from kickoff to launch, depending on scope and complexity.',
                },
                {
                  q: 'Do you work with startups?',
                  a: 'Absolutely! We love working with startups and have helped many launch their digital presence.',
                },
                {
                  q: 'What is your design process?',
                  a: 'We follow a proven process: Discovery, Strategy, Design, Development, and Launch with ongoing support.',
                },
                {
                  q: 'Do you offer ongoing support?',
                  a: 'Yes, we offer maintenance and support packages to keep your website running smoothly.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/10 pb-6"
                >
                  <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>
                    {faq.q}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}