import { motion } from 'motion/react';
import { Container } from '../components/layout/container';
import { Section } from '../components/layout/section';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useHeaderTheme } from '../context/header-theme';
import { useEffect, useState } from "react";
import { submitContact } from "../../services/contactService";
import { getCachedData, setCachedData } from "../utils/cache";
import { getPublishedOfferings } from "../../services/offeringService";
import { Offering } from "../../types/offering";
import { useLocation } from "react-router-dom";

export function Contact() {

  const [servicesList, setServicesList] = useState<Offering[]>([]);
  const { setTheme } = useHeaderTheme();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedService) {
      setFormData((prev) => ({
        ...prev,
        services: [location.state.selectedService],
      }));
    }
  }, [location.state]);

  useEffect(() => {
    async function loadServices() {
      try {
        const cacheKey = "contact_offerings";
        const cached = getCachedData<Offering[]>(cacheKey);

        if (cached) {
          setServicesList(cached);
          return;
        }

        const data = await getPublishedOfferings();

        if (data) {
          setServicesList(data);
          setCachedData(cacheKey, data);
        }

      } catch (error) {
        console.error("Failed to load offerings", error);
      }
    }

    loadServices();
  }, []);

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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (serviceTitle: string) => {
    let updatedServices;

    if (formData.services.includes(serviceTitle)) {
      updatedServices = formData.services.filter(
        (s) => s !== serviceTitle
      );
    } else {
      updatedServices = [...formData.services, serviceTitle];
    }

    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
    }));

    const selectedObjects = servicesList.filter((s) =>
      updatedServices.includes(s.title)
    );

    const totalPrice = selectedObjects.reduce((acc, curr) => {
      const priceNumber = parseInt(
        curr.price?.replace(/[^\d]/g, "") || "0"
      );
      return acc + priceNumber;
    }, 0);

    if (totalPrice > 0) {
      setFormData((prev) => ({
        ...prev,
        budget: `Approx ₹${totalPrice.toLocaleString()}`
      }));
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

      const isFormValid =
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.projectIdea.trim() !== "" &&
        formData.services.length > 0 &&
        formData.budget !== "";

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
              className="text-5xl md:text-8xl mb-10 leading-[1.05]"
              style={{ fontWeight: 700 }}
            >
              Let's create something amazing.
            </h1>
            <p className="text-l md:text-xl text-white/60 max-w-3xl leading-relaxed">
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
                  type="tel"
                  name="phone"
                  pattern="^(\+91[\-\s]?)?[6-9]\d{9}$"
                  title="Enter valid 10-digit Indian mobile number"
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
                  {servicesList.map((service) => (
                    <button
                      type="button"
                      key={service.publicId}
                      onClick={() => handleServiceChange(service.title)}
                      className={`
                        px-4 py-2 rounded-full text-sm border transition-all duration-300
                        ${
                          formData.services.includes(service.title)
                            ? "bg-[#FF4D00] text-white border-[#FF4D00]"
                            : "border-white/20 text-white/60 hover:border-[#FF4D00] hover:text-white"
                        }
                      `}
                    >
                      {service.title}
                      {service.price && (
                        <span className="ml-2 text-xs opacity-70">
                          ({service.price})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
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

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading || !isFormValid && captchaToken !== null}
                className={`px-10 py-5 uppercase tracking-widest text-sm transition-all
                  ${
                    loading || !isFormValid && captchaToken !== null
                      ? "bg-gray-700 text-white/40 cursor-not-allowed"
                      : "bg-[#FF4D00] text-white hover:bg-[#ff6a2d]"
                  }
                `}
              >
                {loading ? "Requesting..." : "Request Call Back"}
              </motion.button>
                <p className="text-xs text-white/40 mt-4">
                  Your information is confidential and secure.
                </p>
              </form>
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